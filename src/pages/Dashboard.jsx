// src/pages/Dashboard.jsx
import GroupInfo from '../components/groupinfo';
import ChatBox from '../components/chatbox';

const Dashboard = ({ background }) => {
  return (
    <div className="relative min-h-screen">
      {background}
      {/* Tambahkan md:items-start di sini */}
      <div className="relative z-10 p-4 md:p-8 flex justify-center md:items-start min-h-screen">
        <div className="w-full max-w-4xl rounded-xl grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
          
          <GroupInfo />
          <ChatBox />
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;