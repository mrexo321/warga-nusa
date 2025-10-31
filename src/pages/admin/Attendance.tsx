import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Search,
  BarChart3,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { attendanceService } from "../../services/attendanceService";

const Attendance = () => {
  const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
  const [search, setSearch] = useState("");
  const [showRekap, setShowRekap] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);

  const { data } = useSuspenseQuery({
    queryKey: ["todayAttendances", selectedDate],
    queryFn: () => attendanceService.todayAttendance(selectedDate),
  });

  const todayAttendances = data?.data || [];

  console.log(todayAttendances);

  // Statistik harian
  const stats = {
    hadir: todayAttendances.filter((d) => d.status === "PRESENT").length,
    terlambat: todayAttendances.filter((d) => d.status === "LATE").length,
    izin: todayAttendances.filter((d) => d.status === "PERMIT").length,
    absen: todayAttendances.filter((d) => d.status === "ABSENT").length,
  };

  const filteredData = todayAttendances.filter((item) =>
    item.user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Rekap harian
  const generateDailyRekap = (attendances) => {
    const grouped = {};

    attendances.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
      });

      if (!grouped[date]) {
        grouped[date] = {
          name: date,
          hadir: 0,
          terlambat: 0,
          izin: 0,
          absen: 0,
        };
      }

      if (item.status === "PRESENT") grouped[date].hadir++;
      else if (item.status === "LATE") grouped[date].terlambat++;
      else if (item.status === "PERMIT") grouped[date].izin++;
      else grouped[date].absen++;
    });

    return Object.values(grouped).slice(-7);
  };

  const rekapData = generateDailyRekap(todayAttendances);

  return (
    <MainLayout>
      <div className="p-6 space-y-8 relative min-h-screen bg-transparent">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            Kehadiran Personel
          </h1>

          {/* Date Picker + Rekap Button */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative flex items-center bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 shadow-md hover:border-amber-400/60 transition"
            >
              <Calendar size={18} className="text-amber-400 mr-2" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-slate-200 outline-none cursor-pointer appearance-none"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRekap((prev) => !prev)}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
            >
              <BarChart3 size={18} />
              <span>
                {showRekap ? "Tutup Rekap Harian" : "Lihat Rekap Harian"}
              </span>
            </motion.button>
          </div>
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
                <th className="px-6 py-3 text-left">Check In</th>
                <th className="px-6 py-3 text-left">Check Out</th>
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
                  <td className="px-6 py-3 font-medium">
                    {item.user?.name || "-"}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        item.status === "PRESENT"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "PERMIT"
                          ? "bg-blue-500/20 text-blue-400"
                          : item.status === "LATE"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">{item.checkIn || "-"}</td>
                  <td className="px-6 py-3">{item.checkOut || "-"}</td>
                </motion.tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-slate-500 italic"
                  >
                    Tidak ada data kehadiran ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Rekap Harian */}
        <AnimatePresence>
          {showRekap && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900/60 border border-slate-700 rounded-xl p-6 shadow-xl backdrop-blur-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-slate-100">
                Rekap Kehadiran 7 Hari Terakhir
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={rekapData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="hadir"
                    stackId="a"
                    fill="#22c55e"
                    name="Hadir"
                  />
                  <Bar
                    dataKey="terlambat"
                    stackId="a"
                    fill="#facc15"
                    name="Terlambat"
                  />
                  <Bar dataKey="izin" stackId="a" fill="#3b82f6" name="Izin" />
                  <Bar
                    dataKey="absen"
                    stackId="a"
                    fill="#ef4444"
                    name="Tidak Hadir"
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default Attendance;
