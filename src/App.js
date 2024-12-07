import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import InteractiveQuiz from "./components/InteractiveQuiz";

function App() {

  return (
    <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/quizgpt" element={<InteractiveQuiz />} />
            </Routes>
      </Router>
  );
}

export default App;
