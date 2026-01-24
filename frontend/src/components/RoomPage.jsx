import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { io } from "socket.io-client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "../utils/Particles";
import ProfileModal from "./ProfileModal";

// import "../App.css"; 

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const [code, setCode] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeUsersHover, setActiveUsersHover] = useState(false);
  const [runResult, setRunResult] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [activeUsers, setActiveUsers] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      new Particles(canvasRef.current);
    }
  }, []);

  // Chat state removed or commented out if you want to keep reference
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState("");
  // const [showChat, setShowChat] = useState(true);
  // const chatEndRef = useRef(null);

  const socketRef = useRef(null);

  useEffect(() => {
    const setInitialCode = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/rooms/get-code/${roomId}`
        );
        setCode(response.data.iniCode);
      } catch (error) {
        console.error("Error fetching initial code:", error);
      }
    };
    setInitialCode();
  }, []);

  useEffect(() => {
    toast.success(`Welcome to room ${roomId}!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  }, [roomId]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`${import.meta.env.VITE_BACKEND_URL}`, {
        query: { username },
      });

      socketRef.current.emit("join-room", { roomId, username });

      socketRef.current.on("room-language", (lang) => {
        setLanguage(lang);
        toast.info(`Language switched to ${lang}`, { autoClose: 2000, theme: "dark" });
      });

      socketRef.current.on("active-users", (users) => {
        console.log("Received active users:", users);
        setActiveUsers(users);
      });

      socketRef.current.on("update-code", (data) => {
        if (data.roomId === roomId) {
          setCode(data.code);
        }
      });

      // Removed chat listeners
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leave-room", { roomId, username });
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [socketRef, roomId, username]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLeaveRoom = () => {
    navigate("/create-join");
  };

  // Removed handleSendMessage

  // Tracking viewed profile
  const [viewedUsername, setViewedUsername] = useState(null);

  const runCode = () => {
    setIsRunning(true);
    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        version: "*",
        files: [
          {
            name: `file.${language === "javascript" ? "js" : language}`,
            content: code,
          },
        ],
        stdin: "",
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_cpu_time: 10000,
        run_cpu_time: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.run && data.run.output) {
          setRunResult(data.run.output);

          // Increment in backend
          const token = localStorage.getItem("token");
          axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile/increment-execution`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(e => console.error("Increment error:", e));

        } else if (data.message) {
          setRunResult(data.message);
        }
      })
      .catch((error) => {
        console.error("Error executing code:", error);
        setRunResult("Error executing code");
      })
      .finally(() => {
        setIsRunning(false);
      });
  };

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case "python":
        return python();
      case "cpp":
        return cpp();
      case "java":
        return java();
      default:
        return javascript();
    }
  };

  const clearOutput = () => {
    setRunResult("");
  };

  const handleCodeChange = async (value) => {
    setCode(value);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/update-code/${roomId}`,
        { code: value }
      );
    } catch (error) {
      console.error("Error updating room code:", error);
    }
    socketRef.current.emit("code-update", {
      roomId: roomId,
      code: value,
    });
  };

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/update-language/${roomId}`, { language: newLang });
    } catch (error) {
      console.error("Error updating language:", error);
    }
    socketRef.current.emit("set-language", {
      roomId,
      language: newLang,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room ID copied to clipboard!", { autoClose: 1500, theme: "dark" });
  };

  const shareToFriends = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Room link copied! Share it with your friends.", { autoClose: 2000, theme: "dark" });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-slate-950">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100" />
        <div className="absolute inset-0 bg-slate-950/70 z-0"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-slate-900/40 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-900/20 blur-[120px]"></div>
      </div>

      <ToastContainer position="top-center" theme="dark" />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setViewedUsername(null);
        }}
        username={viewedUsername || username}
        recentRooms={JSON.parse(localStorage.getItem("previousRooms") || "[]")}
      />

      {/* Navbar */}
      <nav className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-20">
        <div className="flex items-center gap-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-white tracking-tight hidden sm:block cursor-pointer hover:text-cyan-400 transition-colors"
            onClick={() => navigate('/create-join')}
          >
            Algo<span className="text-cyan-400 font-black">Arena</span>
          </motion.h1>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700 text-sm font-mono group">
            <span className="text-slate-500 uppercase text-[10px] font-bold tracking-tighter">Room</span>
            <span className="text-white font-bold">{roomId?.substring(0, 8)}...</span>
            <button
              onClick={copyToClipboard}
              className="ml-2 p-1 text-slate-500 hover:text-cyan-400 transition-colors"
              title="Copy Room ID"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
            </button>
          </div>
          <button
            onClick={shareToFriends}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:text-white transition-all bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            Share
          </button>
          <button
            onClick={() => navigate('/create-join')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Dashboard
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {/* Active Users Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveUsersHover(true)}
            onMouseLeave={() => setActiveUsersHover(false)}
          >
            <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <span className="hidden sm:inline">Active Users</span>
              <span className="bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">{activeUsers.length}</span>
            </button>

            <AnimatePresence>
              {activeUsersHover && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden z-50 p-2"
                >
                  <h3 className="text-xs font-semibold text-slate-500 uppercase px-2 py-1 mb-1">Online Now</h3>
                  {activeUsers.length === 0 ? (
                    <p className="text-sm text-slate-500 px-2 py-1">No users online</p>
                  ) : (
                    <ul className="space-y-1">
                      {activeUsers.map((user, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setViewedUsername(user);
                            setIsProfileOpen(true);
                          }}
                          className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-800 rounded-lg text-sm text-slate-300 cursor-pointer group/user"
                        >
                          <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover/user:animate-ping"></div>
                          {user}
                          {user === username && <span className="text-[10px] text-slate-500 ml-auto">You</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>

          {/* Chat Toggle Button REMOVED */}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLeaveRoom}
              className="text-sm font-medium text-slate-500 hover:text-cyan-400 transition-colors"
            >
              Leave
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all"
              >
                <span className="text-sm font-medium text-slate-300">{username}</span>
                <svg className={`w-4 h-4 text-slate-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden z-50 py-1"
                  >
                    <button
                      onClick={() => {
                        setIsProfileOpen(true);
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      Profile
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors">Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Editor Section */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-slate-800 bg-slate-950">
          {/* Editor Toolbar */}
          <div className="h-12 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <span className="font-mono text-cyan-400/80">main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : 'java'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="appearance-none bg-slate-900 text-slate-300 text-xs font-medium px-3 py-1.5 pr-8 rounded-lg border border-slate-700 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer transition-colors"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold px-4 py-1.5 rounded-lg shadow-[0_0_12px_rgba(34,211,238,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isRunning ? (
                  <svg className="animate-spin w-3 h-3 text-black" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
                <span>Run</span>
              </motion.button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-auto custom-scrollbar relative">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[getLanguageExtension(language)]}
              onChange={handleCodeChange}
              theme="dark"
              className="h-full text-base font-mono"
            />
          </div>
        </div>

        {/* Output Section Only (Chat removed) */}
        <div className="h-1/3 lg:h-auto lg:w-1/3 flex flex-col bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 shadow-xl z-10">
          <div className="h-12 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-800/30">
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Output</span>
            <button
              onClick={clearOutput}
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Clear Console
            </button>
          </div>

          <div className="flex-1 p-4 overflow-auto font-mono text-sm custom-scrollbar bg-slate-950">
            {runResult ? (
              <pre className="whitespace-pre-wrap text-cyan-400">{runResult}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-700 italic">
                <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>Run code to see output</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoomPage;
