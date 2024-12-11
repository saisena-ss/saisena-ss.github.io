import './App.css';
import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./components/MainPage";
import InteractiveQuiz from "./components/InteractiveQuiz";
import { useEffect } from 'react';

function TitleAndFavicon() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/quizify.ai") {
      document.title = "Interactive Quiz Generator";
      const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
      link.rel = "icon";
      link.href = "/quizify.webp";
      document.head.appendChild(link);
    } 
  }, [location]);

  return null; 
}

function App() {
  return (
    <Router>
      <TitleAndFavicon />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/quizify.ai" element={<InteractiveQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
