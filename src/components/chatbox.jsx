// src/components/ChatBox.jsx
import { useState } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { user: 'Anggota 1', text: 'Halo semua!' },
    { user: 'Anggota 2', text: 'Hai, selamat datang di halaman kelompok kita.' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { user: 'Anda', text: newMessage }]);
    setNewMessage('');
  };

  return (
    // Kontainer utama Chat Box
    // Tambahkan backdrop-blur-md, border, rounded-lg, dan padding
    <div className="md:col-span-2 backdrop-blur-md rounded-lg border border-blue-900 p-4 md:p-6 flex flex-col h-[60vh] md:h-[80vh]">
      
      {/* Header Chat Box dengan Gradient */}
      <div className="relative w-full text-center py-2 mb-4 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-md">
        <h2 className="text-white text-lg font-semibold">Chat Box</h2>
      </div>

      {/* Area Pesan */}
      <div className="flex-grow backdrop-blur-md rounded-lg p-4 overflow-y-auto space-y-4 mb-4 border border-blue-700">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.user === 'Anda' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${msg.user === 'Anda' ? 'bg-blue-800' : 'bg-gray-700'} text-sm`}>
              <p className="text-xs font-bold mb-1 text-blue-300">{msg.user}</p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Pesan dan Tombol Kirim */}
      <div className="flex items-center space-x-2 mt-auto"> {/* mt-auto untuk push ke bawah */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Kirim Pesan"
          className="flex-grow px-4 py-3 backdrop-blur-md border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
        />
        <button
          onClick={handleSendMessage}
          className="p-3 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
        >
          {/* Ikon panah ke kanan */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;