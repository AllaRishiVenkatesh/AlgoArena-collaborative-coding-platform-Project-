import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Particles from "../utils/Particles";
// import "../App.css"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      new Particles(canvasRef.current);
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      if (response.data.username) {
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("token", response.data.token);
      }
      navigate("/create-join");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Email might already be in use.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-slate-200 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-slate-950">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100" />
        <div className="absolute inset-0 bg-slate-950/70 z-0"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-slate-900/40 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-900/20 blur-[120px]"></div>
      </div>

      <div className="z-10 w-full max-w-md px-6">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
              Algo<span className="text-cyan-400">Arena</span>
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-slate-200 mb-2">Create Account</h2>
            <p className="text-slate-400 text-sm">Join the community and start coding</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Username</label>
              <input
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600 text-slate-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600 text-slate-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600 text-slate-200"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg shadow-lg hover:shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate("/login")}
                className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors hover:underline decoration-cyan-400/30 underline-offset-4"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default SignupPage;
