// src/App.jsx
import { useState, useMemo } from 'react'; // Impor useMemo
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ParticlesComponent from './components/particle'; // Impor ParticlesComponent di sini

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Pindahkan logika useMemo untuk partikel ke sini
  const memoizedParticles = useMemo(() => {
    return <ParticlesComponent id="particles" className="absolute top-0 left-0 w-full h-full z-0"/>;
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            !isLoggedIn ? (
              // Berikan background sebagai prop
              <LandingPage onLoginSuccess={handleLogin} background={memoizedParticles} />
            ) : (
              <Navigate to="/dashboard" />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isLoggedIn ? (
              // Berikan background yang sama ke Dashboard
              <Dashboard background={memoizedParticles} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;