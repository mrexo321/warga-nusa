import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import { User, ShieldCheck, Newspaper, Clock, Activity } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const user = {
    name: "Maulana Ikhsan",
    role: "Admin",
    email: "ikhsan@example.com",
    totalCourses: 8,
    totalSecurity: 24,
    totalNews: 6,
    shifts: { pagi: 10, siang: 8, malam: 5 },
  };

  const chartData = [
    { name: "Sen", total: 12 },
    { name: "Sel", total: 9 },
    { name: "Rab", total: 15 },
    { name: "Kam", total: 10 },
    { name: "Jum", total: 17 },
    { name: "Sab", total: 8 },
    { name: "Min", total: 11 },
  ];

  const recentActivity = [
    {
      id: 1,
      message: "Security A melapor kegiatan patroli malam",
      time: "10:32",
    },
    { id: 2, message: "Pelatihan keamanan baru telah dimulai", time: "09:15" },
    { id: 3, message: "Admin menambahkan berita baru", time: "08:02" },
    { id: 4, message: "Shift malam selesai tanpa insiden", time: "07:00" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 80 },
    }),
  };

  return (
    <MainLayout>
      <motion.div
        className="min-h-screen p-6 md:p-8 bg-transparent text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* ===== HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Selamat Datang, <span className="text-cyan-400">{user.name}</span>{" "}
              👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Pantau keamanan & aktivitas harian secara real-time
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-lg font-mono text-cyan-300 shadow-inner text-center">
            {time.toLocaleTimeString("id-ID")}
          </div>
        </div>

        {/* ===== PROFILE CARD ===== */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-blue-800/40 bg-gradient-to-r from-blue-900/70 to-cyan-900/30 backdrop-blur-md shadow-[0_0_25px_-5px_rgba(59,130,246,0.3)] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-blue-600/10 rounded-2xl pointer-events-none"></div>

          <div className="flex items-center gap-5 z-10">
            <div className="bg-gradient-to-br from-cyan-400/30 to-blue-700/30 p-4 rounded-full shadow-lg">
              <User className="text-cyan-400" size={38} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">{user.name}</h2>
              <p className="text-slate-300 text-sm break-all">{user.email}</p>
              <span className="inline-block mt-2 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium shadow-inner">
                {user.role}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ===== DASHBOARD GRID ===== */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <motion.div
            variants={cardVariants}
            custom={0}
            initial="hidden"
            animate="visible"
            className="group bg-gradient-to-br from-emerald-700/20 via-emerald-900/20 to-slate-900/20 border border-emerald-700/40 rounded-2xl p-6 backdrop-blur-md shadow-lg hover:shadow-emerald-800/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">
                Total Pelatihan
              </h3>
              <ShieldCheck
                className="text-emerald-400 group-hover:scale-110 transition-transform"
                size={28}
              />
            </div>
            <p className="text-4xl font-bold text-emerald-400 mt-4">
              {user.totalCourses}
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Jumlah pelatihan aktif yang sedang diikuti.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            variants={cardVariants}
            custom={1}
            initial="hidden"
            animate="visible"
            className="group bg-gradient-to-br from-blue-700/20 via-blue-900/20 to-slate-900/20 border border-blue-700/40 rounded-2xl p-6 backdrop-blur-md shadow-lg hover:shadow-blue-800/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">Data Umum</h3>
              <Newspaper
                className="text-blue-400 group-hover:scale-110 transition-transform"
                size={28}
              />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-slate-300 text-sm">
                Jumlah Security:{" "}
                <span className="text-blue-400 font-semibold">
                  {user.totalSecurity}
                </span>
              </p>
              <p className="text-slate-300 text-sm">
                Jumlah Berita:{" "}
                <span className="text-blue-400 font-semibold">
                  {user.totalNews}
                </span>
              </p>
            </div>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            variants={cardVariants}
            custom={2}
            initial="hidden"
            animate="visible"
            className="group bg-gradient-to-br from-amber-700/20 via-yellow-900/20 to-slate-900/20 border border-amber-700/40 rounded-2xl p-6 backdrop-blur-md shadow-lg hover:shadow-amber-800/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">Total Shift</h3>
              <Clock
                className="text-amber-400 group-hover:scale-110 transition-transform"
                size={28}
              />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {Object.entries(user.shifts).map(([label, value]) => (
                <div
                  key={label}
                  className="bg-amber-800/30 rounded-lg py-3 hover:bg-amber-700/30 transition-all"
                >
                  <p className="text-amber-400 font-bold text-lg">{value}</p>
                  <p className="text-slate-400 text-xs mt-1 capitalize">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ===== STATISTICS CHART ===== */}
        <motion.div
          className="mt-10 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-cyan-400" size={22} />
            <h3 className="text-lg font-semibold">
              Statistik Kehadiran Mingguan
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                }}
              />
              <Bar dataKey="total" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ===== RECENT ACTIVITY ===== */}
        <motion.div
          className="mt-10 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="text-yellow-400" size={20} />
            Aktivitas Terbaru
          </h3>
          <ul className="space-y-3">
            {recentActivity.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-slate-900/50 px-4 py-3 rounded-lg border border-slate-700/50 hover:bg-slate-900/70 transition-colors"
              >
                <span className="text-slate-300 text-sm">{item.message}</span>
                <span className="text-slate-500 text-xs font-mono">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Dashboard;
