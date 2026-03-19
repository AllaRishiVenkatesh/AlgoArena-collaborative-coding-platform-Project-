import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom, joinRoom } from "../api/roomService";
import Particles from "../utils/Particles";
import ProfileModal from "./ProfileModal";
// import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateJoinPage = () => {
  const navigate = useNavigate();
  const [roomIdInput, setRoomIdInput] = useState("");
  const [previousRooms, setPreviousRooms] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const username = localStorage.getItem("username") || "Guest";
  const canvasRef = useRef(null);

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("previousRooms")) || [];
    setPreviousRooms(storedRooms);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      new Particles(canvasRef.current);
    }
  }, []);

  const handleCreateRoom = async () => {
    try {
      const response = await createRoom();
      const { roomId } = response.data;
      const updatedRooms = [roomId, ...previousRooms];
      localStorage.setItem("previousRooms", JSON.stringify(updatedRooms));
      setPreviousRooms(updatedRooms);
      navigate(`/room/${roomId}`);
      toast.success("New room created successfully!");
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room. Please try again.");
    }
  };

  const handleJoinRoom = async () => {
    try {
      await joinRoom(roomIdInput);
      if (!previousRooms.includes(roomIdInput)) {
        const updatedRooms = [roomIdInput, ...previousRooms];
        localStorage.setItem("previousRooms", JSON.stringify(updatedRooms));
        setPreviousRooms(updatedRooms);
      }
      navigate(`/room/${roomIdInput}`);
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error("Room not found. Please check the room ID.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const deleteRoom = (e, roomIdToDelete) => {
    e.stopPropagation(); // Prevent navigating to the room
    const updatedRooms = previousRooms.filter(id => id !== roomIdToDelete);
    setPreviousRooms(updatedRooms);
    localStorage.setItem("previousRooms", JSON.stringify(updatedRooms));
    toast.info("Room removed from history");
  };

  const clearAllRooms = () => {
    if (window.confirm("Clear all recent rooms?")) {
      setPreviousRooms([]);
      localStorage.removeItem("previousRooms");
      toast.info("History cleared");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-black flex flex-col relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-slate-950">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100" />
        <div className="absolute inset-0 bg-slate-950/70 z-0"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-slate-900/40 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-900/20 blur-[120px]"></div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        username={username}
        recentRooms={previousRooms}
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Navbar */}
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span
                  className="text-2xl font-bold tracking-tight text-white cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  Algo<span className="text-cyan-400">Arena</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700/50 transition-all group"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-black uppercase">
                    {username.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-slate-400 group-hover:text-white">Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Section: Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-8">
            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl shadow-md relative overflow-hidden group hover:border-slate-700 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-48 h-48 text-cyan-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Start Coding Now</h2>
              <p className="text-slate-400 mb-8 max-w-md">Create a new playground to practice algorithms or invite friends for a coding session.</p>

              <button
                onClick={handleCreateRoom}
                className="inline-flex items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg shadow-lg hover:shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-all transform hover:-translate-y-0.5"
              >
                <span className="mr-2">+</span> Create New Room
              </button>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl relative overflow-hidden">
              <h2 className="text-2xl font-bold mb-6 text-white">Join Existing Room</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter Room ID"
                  value={roomIdInput}
                  onChange={(e) => setRoomIdInput(e.target.value)}
                  className="flex-1 px-5 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-200 placeholder:text-slate-600 transition-all"
                />
                <button
                  onClick={handleJoinRoom}
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white font-semibold rounded-lg transition-all"
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>

          {/* Right Section: History */}
          <div className="lg:col-span-12 xl:col-span-5 lg:order-last">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-full min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center text-white">
                  <svg className="w-5 h-5 mr-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Recent Rooms
                </h2>
                {previousRooms.length > 0 && (
                  <button
                    onClick={clearAllRooms}
                    className="text-xs font-semibold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {previousRooms.length > 0 ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {previousRooms.map((roomId, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/room/${roomId}`)}
                      className="group p-4 bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800/50 hover:border-slate-700 rounded-lg cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-cyan-500 group-hover:bg-slate-800 transition-colors">
                          <span className="font-mono text-xs font-bold">ID</span>
                        </div>
                        <div>
                          <div className="font-mono font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">{roomId}</div>
                          <div className="text-xs text-slate-500">Last visited recently</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => deleteRoom(e, roomId)}
                          className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-md hover:bg-red-400/10"
                          title="Delete room"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                        <svg className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                  <p>No recent rooms found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto py-6 text-center border-t border-slate-800/30">
          <p className="text-slate-600 text-xs font-mono uppercase tracking-widest">© 2026 Algo Arena. Crafted for Engineers.</p>
        </div>
      </div>
    </div>
  );
};

export default CreateJoinPage;
