import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, BrowserRouter } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Company from './pages/Company';
import ToCheck from './pages/ToCheck';
import TakenProjects from './pages/TakenProjects';
import { Toaster } from 'react-hot-toast';

const pageTransition = {
  in: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  out: { opacity: 0, x: '-100%', transition: { duration: 0 } },
};

function AppContent() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userLogin = localStorage.getItem('login');
  useEffect(() => {
    if (userLogin) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [userLogin])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isAuthenticated ? (
        <>
          <Toaster />
          <Navbar />
          <main className="flex-grow">
          <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                    path="/taken"
                    element={
                      <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                        <TakenProjects />
                      </motion.div>
                    }
                  />
                <Route
                  path="/toCheck"
                  element={
                    <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                      <ToCheck />
                    </motion.div>
                  }
                />
                <Route
                  path="/"
                  element={
                    <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                      <Home />
                    </motion.div>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                      <Projects />
                    </motion.div>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                      <Profile />
                    </motion.div>
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                      <ProjectDetails />
                    </motion.div>
                  }
                />
                <Route
                  path="/pricing"
                  element={
                    <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                      <Pricing />
                    </motion.div>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                      <About />
                    </motion.div>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                      <Admin />
                    </motion.div>
                  }
                />
                <Route
                  path="/company"
                  element={
                    <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                      <Company />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </>
      ) : (
        <>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                  <Login onLoginSuccess={handleLoginSuccess} />
                </motion.div>
              }
            />
            <Route
              path="/register"
              element={
                <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                  <Register />
                </motion.div>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </div>
  );
}

// Внешний компонент, который содержит Router
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;