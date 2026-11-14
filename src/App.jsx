import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from './pages/Intro';
import Home from './pages/Home';
import ProjectPage from './projects/ProjectPage';
import ThemeToggle from './ui/data/ThemeToggle';

export default function App() {
  // The intro only plays when the site is opened on the home page.
  const [showIntro, setShowIntro] = useState(
    () => window.location.pathname === '/',
  );

  return (
    <BrowserRouter>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
      <ThemeToggle />
    </BrowserRouter>
  );
}
