import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HelloPage from "./components/HelloPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import CreateJoinPage from "./components/CreateJoinPage";
import RoomPage from "./components/RoomPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelloPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-join" element={<CreateJoinPage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>
  );
};

export default App;
