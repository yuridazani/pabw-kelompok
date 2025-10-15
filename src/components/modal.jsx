// src/components/Modal.jsx
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  // 1. Panggil Hook di level atas (sebelum return atau kondisi apa pun).
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // 2. Logika kondisional sekarang ada di dalam Hook.
    //    Hanya pasang event listener jika modal sedang terbuka.
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    // 3. Cleanup function akan otomatis dipanggil oleh React.
    //    Ini akan menghapus event listener saat modal tertutup atau komponen hilang.
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]); // 4. Tambahkan `isOpen` ke dependency array.

  // Kondisi "early return" sekarang aman dan tidak melanggar aturan.
  if (!isOpen) return null;

  return (
    // Overlay latar belakang
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
    >
      {/* Kontainer Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
      >
        {/* Tombol Tutup (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;