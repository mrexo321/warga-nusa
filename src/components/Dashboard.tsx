import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import {
  User,
  Activity,
  ClipboardList,
  Clock,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// =====================================================
// ⏰ Komponen Jam
// =====================================================
const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-lg font-mono text-cyan-300 shadow-inner text-center">
      {time.toLocaleTimeString("id-ID")}
    </div>
  );
};

// =====================================================
// 📊 Data Grafik
// =====================================================
const chartData = [
  { name: "Sen", total: 10 },
  { name: "Sel", total: 8 },
  { name: "Rab", total: 12 },
  { name: "Kam", total: 9 },
  { name: "Jum", total: 11 },
  { name: "Sab", total: 7 },
  { name: "Min", total: 6 },
];

// =====================================================
// 🧭 Komponen Utama Dashboard
// =====================================================
const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user);
  // user = { role: "admin" | "user", username: string, name: string }

  // =====================================================
  // ✅ Tampilan Admin
  // =====================================================
  const AdminView = () => (
    <motion.div
      className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Statistik Kehadiran */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-cyan-400" size={22} />
          <h3 className="text-lg font-semibold">Statistik Kehadiran</h3>
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
      </div>

      {/* Aktivitas Harian */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="text-amber-400" size={22} />
          <h3 className="text-lg font-semibold">Laporan Aktivitas</h3>
        </div>
        <ul className="space-y-3 text-sm text-slate-300">
          <li>✅ 10 User melakukan check-in</li>
          <li>📝 8 Laporan baru dikirim hari ini</li>
          <li>⏰ 3 User terlambat check-in</li>
        </ul>
      </div>
    </motion.div>
  );

  // =====================================================
  // ✅ Tampilan User
  // =====================================================
  const UserView = () => (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Status Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: <ShieldCheck className="text-green-400" />,
            label: "Check-in",
            value: "Sudah",
          },
          {
            icon: <ClipboardList className="text-blue-400" />,
            label: "Laporan",
            value: "1 Terkirim",
          },
          {
            icon: <Clock className="text-amber-400" />,
            label: "Shift",
            value: "Pagi",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-center shadow-md"
          >
            <div className="flex justify-center mb-2">{item.icon}</div>
            <p className="text-slate-300 text-sm">{item.label}</p>
            <p className="text-cyan-400 font-semibold text-lg">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Grafik Kehadiran Pribadi */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-cyan-400" size={22} />
          <h3 className="text-lg font-semibold">Grafik Kehadiran Mingguan</h3>
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
      </div>
    </motion.div>
  );

  // =====================================================
  // ✅ Layout Utama
  // =====================================================
  return (
    <MainLayout>
      <motion.div
        className="min-h-screen p-6 md:p-8 bg-transparent text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Selamat Datang, <span className="text-cyan-400">{user.name}</span>{" "}
              👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {user.role === "admin"
                ? "Pantau data keamanan dan laporan seluruh pengguna."
                : "Lihat status tugas dan aktivitas Anda hari ini."}
            </p>
          </div>
          <ClockWidget />
        </div>

        {/* PROFILE */}
        <motion.div
          className="rounded-2xl border border-blue-800/40 bg-gradient-to-r from-blue-900/70 to-cyan-900/30 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-5">
            <div className="bg-gradient-to-br from-cyan-400/30 to-blue-700/30 p-4 rounded-full shadow-lg">
              <User className="text-cyan-400" size={38} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">{user.name}</h2>
              <p className="text-slate-300 text-sm">@{user.username}</p>
              <span className="inline-block mt-2 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium">
                {user.role}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ROLE VIEW */}
        {user.role === "admin" ? <AdminView /> : <UserView />}
      </motion.div>
    </MainLayout>
  );
};

export default Dashboard;
