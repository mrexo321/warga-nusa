import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Search,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Attendance = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Data dummy kehadiran
  const attendanceData = [
    { id: 1, name: "Ahmad Yusuf", status: "Hadir" },
    { id: 2, name: "Budi Santoso", status: "Izin" },
    { id: 3, name: "Citra Dewi", status: "Terlambat" },
    { id: 4, name: "Doni Saputra", status: "Tidak Hadir" },
    { id: 5, name: "Eka Pratiwi", status: "Hadir" },
    { id: 6, name: "Farhan Ali", status: "Hadir" },
  ];

  const filteredData = attendanceData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Statistik
  const stats = {
    hadir: attendanceData.filter((x) => x.status === "Hadir").length,
    izin: attendanceData.filter((x) => x.status === "Izin").length,
    terlambat: attendanceData.filter((x) => x.status === "Terlambat").length,
    absen: attendanceData.filter((x) => x.status === "Tidak Hadir").length,
  };

  const rekapData = [
    { name: "Hadir", total: stats.hadir },
    { name: "Izin", total: stats.izin },
    { name: "Terlambat", total: stats.terlambat },
    { name: "Tidak Hadir", total: stats.absen },
  ];

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold text-white">Kehadiran</h1>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
          >
            <BarChart3 size={18} />
            <span>Lihat Rekap Bulanan</span>
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

        {/* Modal Rekap Bulanan */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-2xl w-full max-w-lg shadow-lg border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4 text-center">
                Rekap Bulanan Kehadiran
              </h2>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={rekapData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="name" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderRadius: "8px",
                      border: "1px solid #334155",
                    }}
                  />
                  <Bar dataKey="total" fill="#facc15" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Attendance;
