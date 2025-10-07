import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Search,
} from "lucide-react";

const Attendance = () => {
  const [search, setSearch] = useState("");

  // Data dummy untuk contoh
  const attendanceData = [
    {
      id: 1,
      name: "Ahmad Yusuf",
      date: "2025-10-06",
      timeIn: "07:45",
      timeOut: "15:10",
      status: "Hadir",
    },
    {
      id: 2,
      name: "Budi Santoso",
      date: "2025-10-06",
      timeIn: "-",
      timeOut: "-",
      status: "Izin",
    },
    {
      id: 3,
      name: "Citra Dewi",
      date: "2025-10-06",
      timeIn: "08:30",
      timeOut: "15:00",
      status: "Terlambat",
    },
    {
      id: 4,
      name: "Doni Saputra",
      date: "2025-10-06",
      timeIn: "-",
      timeOut: "-",
      status: "Tidak Hadir",
    },
  ];

  const filteredData = attendanceData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Hitung statistik
  const stats = {
    hadir: attendanceData.filter((x) => x.status === "Hadir").length,
    izin: attendanceData.filter((x) => x.status === "Izin").length,
    terlambat: attendanceData.filter((x) => x.status === "Terlambat").length,
    absen: attendanceData.filter((x) => x.status === "Tidak Hadir").length,
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold text-white">Kehadiran</h1>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200">
            <Calendar size={18} />
            <span>Lihat Kalender</span>
          </button>
        </div>

        {/* Statistik Ringkas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl flex items-center space-x-3">
            <CheckCircle2 className="text-green-400" size={28} />
            <div>
              <p className="text-slate-400 text-sm">Hadir</p>
              <h2 className="text-xl font-bold text-white">{stats.hadir}</h2>
            </div>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl flex items-center space-x-3">
            <Clock className="text-yellow-400" size={28} />
            <div>
              <p className="text-slate-400 text-sm">Terlambat</p>
              <h2 className="text-xl font-bold text-white">
                {stats.terlambat}
              </h2>
            </div>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl flex items-center space-x-3">
            <Users className="text-blue-400" size={28} />
            <div>
              <p className="text-slate-400 text-sm">Izin</p>
              <h2 className="text-xl font-bold text-white">{stats.izin}</h2>
            </div>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl flex items-center space-x-3">
            <XCircle className="text-red-400" size={28} />
            <div>
              <p className="text-slate-400 text-sm">Tidak Hadir</p>
              <h2 className="text-xl font-bold text-white">{stats.absen}</h2>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari nama pegawai..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tabel Kehadiran */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-300 border border-slate-700/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-800/70 text-slate-200 uppercase text-xs tracking-wider">
                <th className="px-6 py-3 text-left">Nama</th>
                <th className="px-6 py-3 text-left">Tanggal</th>
                <th className="px-6 py-3 text-left">Jam Masuk</th>
                <th className="px-6 py-3 text-left">Jam Pulang</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-3 font-medium">{item.name}</td>
                  <td className="px-6 py-3">{item.date}</td>
                  <td className="px-6 py-3">{item.timeIn}</td>
                  <td className="px-6 py-3">{item.timeOut}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Hadir"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "Izin"
                          ? "bg-blue-500/20 text-blue-400"
                          : item.status === "Terlambat"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-slate-500 italic"
                  >
                    Tidak ada data kehadiran ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Attendance;
