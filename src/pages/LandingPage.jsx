// src/App.jsx
import '../App.css';
import { useState, useEffect, useMemo } from 'react';
import ParticlesComponent from '../components/particle';
import Modal from '../components/modal'; // <-- 1. Import komponen Modal

// ... (Konstanta TYPING_SPEED, dll. biarkan saja)
const TYPING_SPEED = 150;
const DELETING_SPEED = 100;
const PAUSE_DURATION = 2000;

const LandingPage = ({ onLoginSuccess }) => {
  // ... (State untuk typing effect biarkan saja)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const greetings = ['Selamat Datang', 'Welcome', 'Bienvenido', 'Bienvenue', 'Willkommen', 'ようこそ'];
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // 2. State untuk mengontrol modal
  const [modalContent, setModalContent] = useState(null); // null, 'login', atau 'register'

  const memoizedParticles = useMemo(() => {
    return <ParticlesComponent id="particles" className="absolute top-0 left-0 w-full h-full z-0"/>;
  }, []);

  useEffect(() => {
    // ... (Logika useEffect untuk mengetik tidak perlu diubah)
    const currentWord = greetings[greetingIndex];
    let timer;
    const handleTyping = () => {
      if (isDeleting) setTypedText(currentWord.substring(0, typedText.length - 1));
      else setTypedText(currentWord.substring(0, typedText.length + 1));
    };
    if (!isDeleting && typedText === currentWord) timer = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
    else if (isDeleting && typedText === '') { setIsDeleting(false); setGreetingIndex((p) => (p + 1) % greetings.length); }
    else timer = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, greetingIndex, greetings]);

  // 3. Fungsi untuk membuka dan menutup modal
  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <div className="relative bg-slate-900 overflow-hidden h-screen">
      {memoizedParticles}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <p className="text-xl text-gray-100 font-light">
          <span>{typedText}</span>
          <span className="blinking-cursor">|</span>
        </p>
        <p className="mt-2 text-base text-gray-100">Kelompok</p>
        <h1 className="my-4 text-6xl md:text-7xl font-bold">Tadika Mesra</h1>
        <div className="flex flex-col sm:flex-row mt-8 space-y-4 sm:space-y-0 sm:space-x-6 text-black">
          {/* 4. Tambahkan onClick pada tombol */}
          <button onClick={() => openModal('login')} className="px-10 py-3 font-semibold  transition-all duration-300 bg-transparent border-2 border-slate-600 rounded-full hover:bg-black hover:text-white hover:border-slate-500">
            Login
          </button>
          <button onClick={() => openModal('register')} className="px-10 py-3 font-semibold  transition-all duration-300 bg-transparent border-2 border-slate-600 rounded-full hover:bg-slate-700 hover:text-white hover:border-slate-500">
            Register
          </button>
        </div>
      </div>

      {/* 5. Render Modal di sini */}
      <Modal isOpen={!!modalContent} onClose={closeModal}>
        {modalContent === 'login' && (
          // Konten Form Login
          <div className="space-y-6 text-white">
            <h2 className="text-3xl font-bold text-center">Login</h2>
            <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <input type="password" placeholder="Password" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <button onClick={onLoginSuccess} className="w-full py-3 font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-700 transition-colors">
              Masuk
            </button>
          </div>
        )}
        {modalContent === 'register' && (
          // Konten Form Register
          <div className="space-y-6 text-white">
            <h2 className="text-3xl font-bold text-center">Register</h2>
            <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <input type="password" placeholder="Password" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <button className="w-full py-3 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors">
              Daftar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LandingPage 