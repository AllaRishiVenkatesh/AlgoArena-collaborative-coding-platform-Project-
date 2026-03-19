import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "../utils/Particles";
// import "../App.css";

const HelloPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Refs for smooth scrolling
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const communityRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      new Particles(canvasRef.current);
    }
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-x-hidden font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-slate-950">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100" />
        <div className="absolute inset-0 bg-slate-950/70 z-0"></div> {/* Dark overlay to keep text readable */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-slate-900/40 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-900/20 blur-[120px]"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 w-full px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer w-40" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="text-black font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AlgoArena</span>
        </div>

        <div className="hidden md:flex flex-1 justify-center gap-12 text-sm font-medium text-slate-400">
          <button onClick={() => scrollToSection(featuresRef)} className="hover:text-white transition-colors focus:outline-none">Features</button>
          <button onClick={() => scrollToSection(pricingRef)} className="hover:text-white transition-colors focus:outline-none">Pricing</button>
          <button onClick={() => scrollToSection(communityRef)} className="hover:text-white transition-colors focus:outline-none">Community</button>
        </div>

        <div className="flex gap-4 w-40 justify-end">
          <button onClick={() => navigate("/login")} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</button>
          <button onClick={() => navigate("/signup")} className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-slate-100 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transform hover:-translate-y-0.5">Sign up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-20 md:mt-0 min-h-[calc(100vh-80px)] mb-32">

        <div className="relative z-20 mb-6 inline-flex items-center px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <span className="flex h-2 w-2 relative mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-medium text-slate-300">AlgoArena v1.0 is now live</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
          Code together.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500">Better. Faster.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultimate real-time collaborative coding platform. Solve complex algorithms, challenge friends, and level up your engineering skills in a premium environment.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <button
            onClick={() => navigate("/signup")}
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            Start Coding for Free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-slate-900/50 backdrop-blur-md text-white border border-slate-700 font-bold rounded-full text-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-slate-800 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            View Demo
          </button>
        </div>

        {/* Floating UI Elements (Decorative) */}
        <div className="mt-20 w-full max-w-4xl relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20"></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-950">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <div className="mx-auto text-xs font-mono text-slate-500">main.js</div>
            </div>
            <div className="p-6 font-mono text-sm text-left overflow-hidden">
              <div className="text-slate-500">// Welcome to AlgoArena</div>
              <div className="mt-2 text-purple-400">function <span className="text-blue-400">solveProblem</span><span className="text-slate-300">(input)</span> {'{'}</div>
              <div className="pl-4 text-slate-300">const <span className="text-cyan-400">solution</span> = <span className="text-yellow-300">maximize</span>(input);</div>
              <div className="pl-4 text-slate-300">return <span className="text-cyan-400">solution</span>;</div>
              <div className="text-purple-400">{'}'}</div>
              <div className="mt-4 flex gap-2">
                <span className="text-green-400">➜</span>
                <span className="text-slate-400 animate-pulse">|</span>
              </div>
            </div>
          </div>
        </div>

      </div>


      {/* Features Section */}
      <div ref={featuresRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50 bg-slate-950/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything you need to <span className="text-cyan-400">excel</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Built for developers who want to master algorithms through collaboration and real-time practice.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Real-time Collaboration</h3>
            <p className="text-slate-400 leading-relaxed">Code simultaneously with peers with sub-millisecond latency. See every keystroke as it happens.</p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Multi-Language Support</h3>
            <p className="text-slate-400 leading-relaxed">Write in your favorite language. Support for JavaScript, Python, C++, and Java out of the box.</p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Execution</h3>
            <p className="text-slate-400 leading-relaxed">Run your code against test cases instantly. Get immediate feedback on performance and correctness.</p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div ref={pricingRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple, transparent <span className="text-cyan-400">pricing</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Start for free, upgrade when you need more power.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col items-center text-center hover:border-slate-700 transition-colors">
            <div className="mb-4 text-slate-400 font-medium tracking-wide uppercase text-sm">Starter</div>
            <div className="text-5xl font-bold text-white mb-6">$0</div>
            <ul className="space-y-4 text-slate-300 mb-8 flex-1">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Unlimited Rooms</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> All 4 Languages</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Community Support</li>
            </ul>
            <button onClick={() => navigate('/signup')} className="w-full py-4 rounded-xl border border-slate-700 text-white font-bold hover:bg-slate-800 transition-all">Get Started</button>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-900/50 border border-cyan-500/30 flex flex-col items-center text-center shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            <div className="absolute top-0 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>
            <div className="mb-4 text-cyan-400 font-medium tracking-wide uppercase text-sm">Professional</div>
            <div className="text-5xl font-bold text-white mb-6">$12<span className="text-lg text-slate-500 font-normal">/mo</span></div>
            <ul className="space-y-4 text-slate-300 mb-8 flex-1">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Everything in Starter</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Private Rooms</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Priority Execution</li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">Upgrade Now</button>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div ref={communityRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-16 text-center border border-slate-700/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <h2 className="relative z-10 text-3xl md:text-5xl font-bold text-white mb-6">Join the <span className="text-cyan-400">Community</span></h2>
          <p className="relative z-10 text-slate-400 max-w-2xl mx-auto text-lg mb-10">
            Connect with thousands of other developers. Share code, discuss algorithms, and participate in weekly challenges.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 20.818 20.818 0 0 0-.972 1.581 19.791 19.791 0 0 0-4.885 1.515.074.074 0 0 0-.079.037 20.818 20.818 0 0 0-.972 1.581c-3.111.455-5.918 2.051-7.749 4.417a.06.06 0 0 0 .01.077c.801.996 1.737 1.848 2.778 2.536a.06.06 0 0 0 .066-.008c.556-.442 1.056-.938 1.487-1.482a.06.06 0 0 0-.03-.1 13.91 13.91 0 0 1-2.112-1.026.059.059 0 0 1-.005-.098c.15-.112.301-.226.449-.344a.059.059 0 0 1 .062-.006c4.228 1.932 8.799 1.932 12.977 0a.059.059 0 0 1 .062.006c.148.118.299.232.449.344a.059.059 0 0 1-.005.098 13.91 13.91 0 0 1-2.112 1.026.06.06 0 0 0-.03.1c.431.544.931 1.04 1.487 1.482a.06.06 0 0 0 .066.008c1.042-.688 1.977-1.54 2.778-2.536a.06.06 0 0 0 .01-.077c-1.831-2.366-4.638-3.962-7.749-4.417a.074.074 0 0 0-.079-.037 20.818 20.818 0 0 0-.972-1.581 19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079-.037ZM9.5 14.5c-1.103 0-2-.996-2-2.222S8.397 10.056 9.5 10.056c1.103 0 2 .996 2 2.222S10.603 14.5 9.5 14.5Zm5 0c-1.103 0-2-.996-2-2.222S13.397 10.056 14.5 10.056c1.103 0 2 .996 2 2.222S15.603 14.5 14.5 14.5Z" /></svg>
              Join Discord
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
              Star on GitHub
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 w-full text-center">
        <p className="text-slate-600 text-xs font-mono uppercase tracking-widest">© 2026 Algo Arena. Crafted for Engineers.</p>
      </div>

    </div>
  );
};

export default HelloPage;
