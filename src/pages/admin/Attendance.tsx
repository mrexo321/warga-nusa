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
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="p-6 space-y-8 relative min-h-screen bg-transparent">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0"
        >
          <h1 className="text-3xl font-bold  tracking-tight bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-cyan-400">
            Kehadiran Personel
          </h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
          >
            <BarChart3 size={18} />
            <span>Lihat Rekap Bulanan</span>
          </motion.button>
        </motion.div>

        {/* Statistik Ringkas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {[
            {
              icon: <CheckCircle2 className="text-green-400" size={28} />,
              label: "Hadir",
              value: stats.hadir,
              color: "from-green-500/20 to-green-800/10",
            },
            {
              icon: <Clock className="text-yellow-400" size={28} />,
              label: "Terlambat",
              value: stats.terlambat,
              color: "from-yellow-500/20 to-yellow-800/10",
            },
            {
              icon: <Users className="text-blue-400" size={28} />,
              label: "Izin",
              value: stats.izin,
              color: "from-blue-500/20 to-blue-800/10",
            },
            {
              icon: <XCircle className="text-red-400" size={28} />,
              label: "Tidak Hadir",
              value: stats.absen,
              color: "from-red-500/20 to-red-800/10",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${stat.color} border border-slate-700/50 p-4 rounded-xl flex items-center space-x-3 backdrop-blur-md transition`}
            >
              {stat.icon}
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <h2 className="text-2xl font-bold text-white">{stat.value}</h2>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari nama personel..."
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner transition-all duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>

        {/* Tabel Kehadiran */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="overflow-x-auto bg-slate-900/50 border border-slate-700 rounded-xl shadow-lg backdrop-blur-md"
        >
          <table className="min-w-full text-sm text-slate-300">
            <thead>
              <tr className="bg-slate-800/60 text-slate-200 uppercase text-xs tracking-wider">
                <th className="px-6 py-3 text-left">Nama</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-3 font-medium">{item.name}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
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
                </motion.tr>
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
        </motion.div>

        {/* Modal Rekap Bulanan */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-slate-900/95 border border-slate-700 rounded-2xl p-8 w-full max-w-3xl shadow-2xl relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Header Modal */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Rekap Bulanan Kehadiran
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Statistik kehadiran personel bulan ini
                  </p>
                </div>

                {/* Chart Container */}
                <div className="relative">
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                      data={rekapData}
                      barSize={60}
                      margin={{ top: 30, right: 20, left: 0, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient
                          id="amberGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#facc15"
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="100%"
                            stopColor="#92400e"
                            stopOpacity={0.5}
                          />
                        </linearGradient>
                        <linearGradient
                          id="blueGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#38bdf8"
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="100%"
                            stopColor="#1e3a8a"
                            stopOpacity={0.5}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#475569"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="#cbd5e1"
                        tick={{ fill: "#cbd5e1" }}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#cbd5e1"
                        tick={{ fill: "#cbd5e1" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(250, 204, 21, 0.1)" }}
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderRadius: "8px",
                          border: "1px solid #334155",
                          color: "#facc15",
                        }}
                      />

                      {/* Bar dengan animasi dan label */}
                      <Bar
                        dataKey="total"
                        radius={[10, 10, 0, 0]}
                        fill="url(#amberGradient)"
                        animationDuration={1000}
                        label={{
                          position: "top",
                          fill: "#facc15",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                        activeBar={{
                          fill: "url(#blueGradient)",
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>

                  {/* Legend kecil di bawah chart */}
                  <div className="flex justify-center gap-6 mt-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                      <span>Jumlah Kehadiran</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                      <span>Aktif Hover</span>
                    </div>
                  </div>
                </div>

                {/* Tombol Tutup */}
                <div className="mt-8 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-90 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                  >
                    Tutup
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default Attendance;
