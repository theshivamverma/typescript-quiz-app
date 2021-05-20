import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom"
import Home from "./components/home/Home";
import QuizHome from "./components/quiz/QuizHome";

function App() {
  return (
    <div className="App">
      <Navbar />    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizHome />} />
      </Routes>  
    </div>
  );
}

export default App;
