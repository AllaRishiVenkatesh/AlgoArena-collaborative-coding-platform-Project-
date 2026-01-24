import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const ProfileModal = ({ isOpen, onClose, username, recentRooms = [] }) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUsername = localStorage.getItem("username");
  const isOwnProfile = username === currentUsername;

  useEffect(() => {
    if (isOpen && username) {
      setLoading(true);
      axios.get(`/api/auth/profile/${username}`)
        .then(res => {
          setProfileData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching profile:", err);
          setLoading(false);
        });
    }
  }, [isOpen, username]);

  const handleRoomClick = (roomId) => {
    onClose();
    navigate(`/room/${roomId}`);
  };

  if (!isOpen) return null;

  const executions = profileData?.programExecutions || 0;
  const projects = isOwnProfile ? recentRooms.length : Math.floor(executions / 5);
  const collaborations = isOwnProfile ? (recentRooms.length > 0 ? Math.floor(recentRooms.length * 1.5) : 0) : Math.floor(executions / 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <>
              {/* Header/Cover */}
              <div className="h-32 bg-gradient-to-r from-cyan-600 to-blue-700 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="px-8 pb-8">
                {/* Profile Info */}
                <div className="relative -mt-12 mb-8 flex items-end gap-6 text-left">
                  <div className="w-24 h-24 rounded-2xl bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-4xl font-bold text-cyan-400 shadow-xl">
                    {username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="mb-2">
                    <h2 className="text-3xl font-bold text-white">{username}</h2>
                    <p className="text-slate-400">Competitive Programmer {isOwnProfile && <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded ml-2">You</span>}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{executions}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Executions</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-purple-400">{projects}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Projects</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-green-400">{collaborations}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Collabs</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                      {isOwnProfile ? 'Recent Rooms' : 'User Activity'}
                    </h3>
                    <div className="space-y-3">
                      {isOwnProfile && recentRooms.slice(0, 3).map((roomId, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleRoomClick(roomId)}
                          className="p-3 rounded-xl bg-slate-950/30 border border-slate-800/50 flex items-center justify-between group hover:border-cyan-500/30 hover:bg-slate-800/20 cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-mono text-cyan-500">ID</div>
                            <span className="text-sm font-mono text-slate-300">#{roomId.substring(0, 8)}</span>
                          </div>
                          <svg className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </div>
                      ))}
                      {!isOwnProfile && (
                        <div className="p-4 rounded-xl bg-slate-950/30 border border-slate-800/50 text-sm text-slate-500 italic">
                          Member since {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                      )}
                      {isOwnProfile && recentRooms.length === 0 && <p className="text-xs text-slate-600 italic">No recent activity found.</p>}
                    </div>
                  </div>

                  {/* Achievements/Skills */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                      Skill Highlights
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['Algorithms Master', 'Fast Coder', 'Bug Hunter', 'Top Contributor'].map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20">
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "Highly efficient solver with deep knowledge of data structures."
                      </p>
                      <div className="mt-2 text-[10px] font-bold text-cyan-400 uppercase">— Peer Network</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileModal;
