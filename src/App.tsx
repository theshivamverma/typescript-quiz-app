import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom"
import Home from "./components/home/Home";
import { Login } from "./components/login";
import { UserScoreboard, QuizHome } from "./components/quiz"
import { ProtectedRoute } from "./components/auth"

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <ProtectedRoute path="/play-quiz" element={<QuizHome />} />
        <ProtectedRoute path="/scoreboard" element={<UserScoreboard />} />
      </Routes>
    </div>
  );
}

export default App;
