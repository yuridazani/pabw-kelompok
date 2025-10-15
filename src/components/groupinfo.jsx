// src/components/GroupInfo.jsx

const GroupInfo = () => {
  return (
    // Hapus min-h-[300px] dari sini
    <div className="md:col-span-1 rounded-lg backdrop-blur-md border h-[400px] border-blue-900 p-6 md:p-8 flex flex-col justify-start">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
        Kelompok Tadika Mesra
      </h2>
      <p className="text-slate-400 mb-6 text-sm">
        Nama Anggota :
      </p>
      <div className="flex-grow rounded-lg border border-blue-900 p-4">
        <ul className="space-y-2 list-none text-slate-300 text-sm">
          <li>Anggota 1</li>
          <li>Anggota 2</li>
          <li>Anggota 3</li>
          <li>Anggota 4</li>
        </ul>
      </div>
    </div>
  );
};

export default GroupInfo;