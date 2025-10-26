import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import {
  User,
  Activity,
  ClipboardList,
  Clock,
  ShieldCheck,
  BookOpen,
  Users,
  TrendingUp,
  Database,
  FileText,
  CalendarCheck,
  XCircle,
  CalendarDays,
  ListChecks,
} from "lucide-react";
import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";
import { Link, useNavigate } from "react-router-dom";

// =====================================================
// ⏰ Komponen Jam
// =====================================================
// Ganti seluruh komponen ClockWidget di atas dengan versi ini:
const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-slate-900/70 via-slate-800/70 to-slate-900/70 border border-cyan-400/20 px-6 py-4 rounded-2xl shadow-[0_0_12px_rgba(34,211,238,0.2)] flex flex-col items-center justify-center select-none"
    >
      {/* Efek Glow Luar */}
      <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 blur-2xl" />

      {/* Jam Digital */}
      <div className="relative z-10 flex items-end gap-1 font-mono">
        <span className="text-4xl md:text-5xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] tracking-wider">
          {hours}
        </span>
        <motion.span
          key={seconds}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold text-cyan-400/80"
        >
          :
        </motion.span>
        <span className="text-4xl md:text-5xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] tracking-wider">
          {minutes}
        </span>
        <span className="text-base text-cyan-400/80 ml-1 pb-1">{seconds}</span>
      </div>

      {/* Hari dan tanggal */}
      <p className="text-sm text-cyan-200/70 mt-2 font-light">
        {time.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
    </motion.div>
  );
};

// =====================================================
// 📊 Data Grafik Dummy
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

  const navigate = useNavigate();

  // Dummy data user hari ini
  // =====================================================
  // 👷‍♂️ VIEW UNTUK USER
  // =====================================================
  const UserView = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
      queryKey: ["dashboard"],
      queryFn: dashboardService.getAll,
    });

    if (isLoading) {
      return (
        <p className="mt-10 text-center text-slate-400 italic">
          Memuat Dashboard...
        </p>
      );
    }

    const todayShift = data?.todayShiftData;
    const attend = data?.isTodayAttended;
    const courseMeet = data?.activeCourseMeet?.[0];

    const userStatus = {
      absensi: attend?.status === "PRESENT" ? "Sudah Absen" : "Belum Absen",
      shift: todayShift ? todayShift.shift.name : "Tidak Ada Shift",
      kursus: courseMeet ? courseMeet.name : "Tidak Ada Pelatihan",
    };

    const weeklyAttendance = [
      { name: "Sen", total: 1 },
      { name: "Sel", total: 1 },
      { name: "Rab", total: 0 },
      { name: "Kam", total: 1 },
      { name: "Jum", total: 1 },
      { name: "Sab", total: 0 },
      { name: "Min", total: 0 },
    ];

    return (
      <motion.div
        className="mt-6 md:mt-10 space-y-6 md:space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* ALERT BELUM ABSEN */}
        {attend?.status !== "PRESENT" && (
          <div
            onClick={() => navigate("/shift-kehadiran")}
            className="bg-rose-500/20 border border-rose-600 text-rose-300 cursor-pointer p-3 rounded-xl text-sm text-center animate-pulse"
          >
            Kamu belum absen hari ini. Jangan lupa ya 👀
          </div>
        )}

        {/* STATUS HARI INI */}
        <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/40 border border-slate-700 rounded-2xl p-4 md:p-6 shadow-lg">
          <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="text-green-400" size={20} />
            Status Kehadiran Hari Ini
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {/* Absensi */}
            <div className="p-4 bg-slate-800/40 border border-slate-700 rounded-xl">
              <ClipboardList className="text-cyan-400 mx-auto mb-2" size={22} />
              <p className="text-slate-400 text-sm">Status Absensi</p>
              <p
                className={`text-lg font-semibold ${
                  attend?.status === "PRESENT"
                    ? "text-green-400"
                    : "text-amber-400"
                }`}
              >
                {userStatus.absensi}
              </p>
              {attend?.checkIn && (
                <p className="text-xs text-slate-400 mt-1">
                  CI: {attend.checkIn}
                  {attend.checkOut && ` | CO: ${attend.checkOut}`}
                </p>
              )}
            </div>

            {/* Shift */}
            <div className="p-4 bg-slate-800/40 border border-slate-700 rounded-xl">
              <Clock className="text-blue-400 mx-auto mb-2" size={22} />
              <p className="text-slate-400 text-sm">Shift Anda</p>
              <p className="text-lg font-semibold text-cyan-400">
                {userStatus.shift}
              </p>
              {todayShift?.shift && (
                <p className="text-xs text-slate-400 mt-1">
                  {todayShift.shift.checkIn} - {todayShift.shift.checkOut}
                </p>
              )}
            </div>

            {/* Kursus */}
            <div
              onClick={() =>
                navigate(`/course-satpam/detail/${courseMeet?.id}`)
              }
              className="p-4 bg-slate-800/40 border border-slate-700 rounded-xl cursor-pointer hover:bg-slate-700/40 transition"
            >
              <BookOpen className="text-amber-400 mx-auto mb-2" size={22} />
              <p className="text-slate-400 text-sm">Pelatihan Hari Ini</p>
              <p className="text-lg font-semibold text-cyan-400 line-clamp-1">
                {userStatus.kursus}
              </p>
            </div>
          </div>
        </div>

        {/* KEHADIRAN MINGGU INI */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 md:p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <CalendarCheck className="text-green-400" size={22} />
            <h3 className="text-base md:text-lg font-semibold">
              Kehadiran Mingguan
            </h3>
          </div>

          {/* Grid responsif */}
          <div
            className="
    grid
    grid-cols-2       /* mobile: 3 kolom */
    sm:grid-cols-5    /* tablet: 5 kolom */
    md:grid-cols-7    /* desktop: 7 kolom */
    gap-3 sm:gap-4 md:gap-5
    text-center
  "
          >
            {weeklyAttendance.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className="p-3 sm:p-4 rounded-xl border border-slate-700 bg-slate-900/40 flex flex-col items-center justify-center"
              >
                <p className="text-[11px] sm:text-xs text-slate-400 mb-1">
                  {day.name}
                </p>

                <div
                  className={`mx-auto w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full font-bold ${
                    day.total === 1
                      ? "bg-green-500/20 text-green-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {day.total === 1 ? "✓" : "×"}
                </div>

                {index === new Date().getDay() - 1 && (
                  <p className="text-[10px] sm:text-[11px] text-cyan-400 mt-1 font-medium">
                    Hari Ini
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Kursus Aktif Detail */}
        {/* {courseMeet && (
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 md:p-6 shadow-lg">
            <h3 className="text-base md:text-lg font-semibold mb-2 text-amber-400">
              Kursus Aktif Saat Ini
            </h3>
            <p className="text-slate-300 font-medium">{courseMeet.name}</p>
            <p className="text-sm text-slate-400 mt-1">
              Mulai:{" "}
              {new Date(
                courseMeet.courseMeeting[0].startAt
              ).toLocaleTimeString()}{" "}
              | Selesai:{" "}
              {new Date(courseMeet.courseMeeting[0].endAt).toLocaleTimeString()}
            </p>
          </div>
        )} */}
      </motion.div>
    );
  };

  // =====================================================
  // 🧠 VIEW UNTUK ADMIN
  // =====================================================
  const AdminView = () => {
    const { data, isLoading, isError } = useQuery({
      queryKey: ["dashboard"],
      queryFn: dashboardService.getAll,
    });

    const weeklyAttendance = data?.weeklyAttendance?.data || [];
    const startDate = data?.weeklyAttendance?.startDate;
    const endDate = data?.weeklyAttendance?.endDate;
    const activityLogs = data?.activityLogs || [];

    console.log("dashboard data", data);

    // === LOADING & ERROR STATE ===
    if (isLoading)
      return (
        <div className="text-center py-20 text-slate-400 animate-pulse">
          Memuat data dashboard...
        </div>
      );

    if (isError)
      return (
        <div className="text-center py-20 text-red-400">
          Gagal memuat data dashboard.
        </div>
      );

    // === KONVERSI DATA CHART ===
    const chartData = weeklyAttendance.map((d) => ({
      name: d.day,
      Kehadiran: d.present,
    }));

    return (
      <motion.div
        className="mt-10 space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* === HEADER INFO MINGGUAN === */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-cyan-400" size={22} />
              <h3 className="text-lg font-semibold text-slate-100">
                Ringkasan Kehadiran Minggu Ini
              </h3>
            </div>
            <p className="text-sm text-slate-400">
              Periode:{" "}
              <span className="text-cyan-300 font-medium">
                {startDate} - {endDate}
              </span>
            </p>
          </div>

          {/* === GRAFIK ABSENSI MINGGUAN === */}
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                }}
              />
              <Line
                type="monotone"
                dataKey="Kehadiran"
                stroke="#22d3ee"
                strokeWidth={2}
                dot={{ fill: "#22d3ee" }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex justify-around mt-6 text-center">
            <div>
              <p className="text-sm text-slate-400">Total Hari</p>
              <p className="text-xl text-cyan-300 font-semibold">
                {weeklyAttendance.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Hadir</p>
              <p className="text-xl text-green-400 font-semibold">
                {weeklyAttendance.filter((d) => d.present > 0).length}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Persentase</p>
              <p className="text-xl text-amber-400 font-semibold">
                {(
                  (weeklyAttendance.filter((d) => d.present > 0).length /
                    weeklyAttendance.length) *
                  100
                ).toFixed(0)}
                %
              </p>
            </div>
          </div>
        </div>

        {/* === ACTIVITY LOGS === */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="text-emerald-400" size={22} />
            <h3 className="text-lg font-semibold text-slate-100">
              Aktivitas Terbaru
            </h3>
          </div>

          {activityLogs.length === 0 ? (
            <p className="text-slate-400 text-sm italic">
              Belum ada aktivitas tercatat.
            </p>
          ) : (
            <div className="space-y-4 relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-700"></div>
              {activityLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="relative pl-10 flex items-start gap-3 group"
                >
                  <div className="absolute left-3 top-2 w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform"></div>
                  <div>
                    <p className="text-slate-100 font-medium">{log.activity}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === STATISTIK TAMBAHAN === */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <Clock className="text-cyan-400" size={22} />,
              label: "Minggu Dimulai",
              value: startDate,
            },
            {
              icon: <TrendingUp className="text-green-400" size={22} />,
              label: "Minggu Berakhir",
              value: endDate,
            },
            {
              icon: <Activity className="text-amber-400" size={22} />,
              label: "Total Hari Absensi",
              value: weeklyAttendance.length,
            },
            {
              icon: <ListChecks className="text-blue-400" size={22} />,
              label: "Hari Hadir",
              value: weeklyAttendance.filter((d) => d.present > 0).length,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 text-center hover:bg-slate-800/80 transition-all duration-300"
            >
              <div className="flex justify-center mb-2">{item.icon}</div>
              <p className="text-slate-400 text-sm">{item.label}</p>
              <p className="text-xl font-semibold text-cyan-300">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // =====================================================
  // ✅ LAYOUT UTAMA
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
              Lihat status absensi, shift, dan Pelatihan Anda hari ini.
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

        {/* VIEW BERDASARKAN ROLE */}
        {user.role === "admin" ? <AdminView /> : <UserView />}
      </motion.div>
    </MainLayout>
  );
};

export default Dashboard;
