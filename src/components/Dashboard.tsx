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
  LogIn,
  LogOut,
  Calendar,
  Sun,
  Cloud,
  CloudSnow,
  CloudRain,
  MapPin,
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
import { attendanceService } from "../services/attendanceService";
import { useNavigate } from "react-router-dom";

// =====================================================
// ⏰ Komponen Jam
// =====================================================
// Ganti seluruh komponen ClockWidget di atas dengan versi ini:
const WeatherWidget = () => {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState<string>("Memuat lokasi...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeather(latitude, longitude);
          fetchLocation(latitude, longitude);
        },
        () => {
          // fallback ke Jakarta jika user tolak lokasi
          fetchWeather(-6.2, 106.816666);
          fetchLocation(-6.2, 106.816666);
        }
      );
    } else {
      fetchWeather(-6.2, 106.816666);
      fetchLocation(-6.2, 106.816666);
    }
  }, []);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
        {
          headers: { "User-Agent": "DashboardApp/1.0" },
        }
      );
      const data = await res.json();
      const timeseries = data.properties.timeseries[0];
      const details = timeseries.data.instant.details;
      const symbol =
        timeseries.data.next_1_hours?.summary?.symbol_code || "clear";

      setWeather({
        temp: details.air_temperature,
        humidity: details.relative_humidity,
        wind: details.wind_speed,
        symbol,
      });
    } catch {
      setError("Gagal memuat cuaca");
    } finally {
      setLoading(false);
    }
  };

  // 🌍 Ambil nama lokasi (tanpa API key)
  const fetchLocation = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await res.json();
      const name =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.state ||
        "Lokasi tidak diketahui";
      setLocation(name);
    } catch {
      setLocation("Tidak diketahui");
    }
  };

  const getIcon = (symbol: string) => {
    if (symbol.includes("rain"))
      return <CloudRain className="text-cyan-400" size={34} />;
    if (symbol.includes("snow"))
      return <CloudSnow className="text-blue-300" size={34} />;
    if (symbol.includes("cloud"))
      return <Cloud className="text-slate-300" size={34} />;
    return <Sun className="text-yellow-300" size={34} />;
  };

  if (loading)
    return (
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 text-cyan-300 text-center">
        Memuat cuaca...
      </div>
    );

  if (error)
    return (
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 text-rose-400 text-center">
        {error}
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-sm bg-gradient-to-br from-slate-900/70 via-slate-800/70 to-slate-900/70 border border-cyan-400/20 px-8 py-5 rounded-2xl shadow-[0_0_18px_rgba(34,211,238,0.25)] flex flex-col items-center justify-center select-none"
    >
      {/* Efek cahaya latar */}
      <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 blur-2xl" />

      <div className="relative z-10 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="text-cyan-400" size={18} />
          <span className="text-base font-medium text-cyan-300 tracking-wide">
            {location}
          </span>
        </div>

        {getIcon(weather.symbol)}

        <p className="text-4xl font-bold text-cyan-300 mt-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
          {Math.round(weather.temp)}°C
        </p>

        <p className="text-sm text-cyan-200/80 mt-1">
          💨 {weather.wind} m/s · 💧 {weather.humidity}%
        </p>
      </div>
    </motion.div>
  );
};

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

    const { data: weekly } = useQuery({
      queryKey: ["weekly"],
      queryFn: attendanceService.weeklyAttendance,
    });

    console.log("Ini Weekly", weekly);

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

    return (
      <motion.div
        className="mt-6 md:mt-10 space-y-6 md:space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* === ALERT BELUM ABSEN === */}
        {todayShift && (
          <div
            onClick={() => navigate("/shift-kehadiran")}
            className="bg-rose-500/20 border border-rose-600 text-rose-300 cursor-pointer p-3 rounded-xl text-sm text-center animate-pulse"
          >
            Kamu belum absen hari ini. Jangan lupa ya 👀
          </div>
        )}

        {/* === STATUS HARI INI === */}
        <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/40 border border-slate-700 rounded-2xl p-4 md:p-6 shadow-lg">
          <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="text-green-400" size={20} />
            Status Kehadiran Hari Ini
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {/* ABSENSI */}
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
                  <LogIn size={12} className="inline mr-1" />
                  CI: {attend.checkIn}
                  {attend.checkOut && (
                    <>
                      {" "}
                      | <LogOut size={12} className="inline mr-1" />
                      CO: {attend.checkOut}
                    </>
                  )}
                </p>
              )}
              <p className="text-[11px] text-slate-500 mt-2">
                {attend?.date ? `Tanggal: ${attend.date}` : ""}
              </p>
            </div>

            {/* SHIFT */}
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
              <p className="text-[11px] text-slate-500 mt-2">
                {todayShift?.date ? `Tanggal: ${todayShift.date}` : ""}
              </p>
            </div>

            {/* PELATIHAN */}
            <div
              onClick={() =>
                courseMeet && navigate(`/course-satpam/detail/${courseMeet.id}`)
              }
              className={`p-4 bg-slate-800/40 border border-slate-700 rounded-xl transition ${
                courseMeet
                  ? "cursor-pointer hover:bg-slate-700/40"
                  : "opacity-70 cursor-not-allowed"
              }`}
            >
              <BookOpen className="text-amber-400 mx-auto mb-2" size={22} />
              <p className="text-slate-400 text-sm">Pelatihan Hari Ini</p>
              <p className="text-lg font-semibold text-cyan-400 line-clamp-1">
                {userStatus.kursus}
              </p>
              {!courseMeet && (
                <p className="text-xs text-slate-500 mt-1">
                  Tidak ada jadwal pelatihan
                </p>
              )}
            </div>
          </div>
        </div>

        {/* === DETAIL DATA HARI INI === */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 md:p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-amber-400" size={20} />
            <h3 className="text-base md:text-lg font-semibold">
              Detail Aktivitas Hari Ini
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm md:text-base">
            {/* SHIFT DETAIL */}
            {todayShift && (
              <div className="p-3 border border-slate-700 rounded-xl bg-slate-900/40">
                <p className="text-slate-400 mb-1">Shift</p>
                <p className="text-slate-200 font-medium uppercase">
                  {todayShift.shift.name}
                </p>
                <p className="text-slate-400 mt-2">Waktu</p>
                <p className="text-slate-200 font-medium">
                  {todayShift.shift.checkIn} - {todayShift.shift.checkOut}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Dibuat: {new Date(todayShift.createdAt).toLocaleString()}
                </p>
              </div>
            )}

            {/* ABSENSI DETAIL */}
            {attend && (
              <div className="p-3 border border-slate-700 rounded-xl bg-slate-900/40">
                <p className="text-slate-400 mb-1">Status Kehadiran</p>
                <p className="text-slate-200 font-medium">
                  {attend.status == "PRESENT" ? "Hadir" : "Tidak Hadir"}
                </p>
                <p className="text-slate-400 mt-2">Waktu Absen</p>
                <p className="text-slate-200 font-medium">
                  {attend.checkIn
                    ? `Check In: ${attend.checkIn}${
                        attend.checkOut
                          ? ` | Check Out: ${attend.checkOut}`
                          : ""
                      }`
                    : "Belum Absen"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Dibuat: {new Date(attend.createdAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* === KEHADIRAN MINGGU INI === */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 md:p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <CalendarCheck className="text-green-400" size={22} />
            <h3 className="text-base md:text-lg font-semibold">
              Kehadiran Mingguan
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-7 gap-3 sm:gap-4 md:gap-5 text-center">
            {weekly?.map((item, index) => {
              const status = item.status;
              const todayIndex = (new Date().getDay() + 6) % 7; // Senin = 0
              const dayNames = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ];
              const currentDayIndex = dayNames.indexOf(item.day);

              // Warna status
              let bgColor = "";
              let textColor = "";
              let symbol = "";

              switch (status) {
                case "PRESENT":
                  bgColor = "bg-green-500/20";
                  textColor = "text-green-400";
                  symbol = "✓";
                  break;
                case "ABSENT":
                  bgColor = "bg-rose-500/20";
                  textColor = "text-rose-400";
                  symbol = "×";
                  break;
                case "UPCOMING":
                  bgColor = "bg-slate-600/20";
                  textColor = "text-slate-400";
                  symbol = "-";
                  break;
                default:
                  bgColor = "bg-slate-700/30";
                  textColor = "text-slate-400";
                  symbol = "?";
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="p-3 sm:p-4 rounded-xl border border-slate-700 bg-slate-900/40 flex flex-col items-center justify-center"
                >
                  <p className="text-[11px] sm:text-xs text-slate-400 mb-1">
                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}
                  </p>

                  <div
                    className={`mx-auto w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full font-bold ${bgColor} ${textColor}`}
                  >
                    {symbol}
                  </div>

                  {currentDayIndex === todayIndex && (
                    <p className="text-[10px] sm:text-[11px] text-cyan-400 mt-1 font-medium">
                      Hari Ini
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
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

    console.log("Activity Log", activityLogs);

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
        className="mt-10 space-y-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* === BAGIAN ATAS: Grafik & Ringkasan === */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* === GRAFIK ABSENSI MINGGUAN === */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900/70 via-slate-800/80 to-slate-900/70 border border-slate-700/60 rounded-2xl p-8 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="text-cyan-400" size={24} />
                <h3 className="text-lg font-semibold text-slate-100">
                  Ringkasan Kehadiran Minggu Ini
                </h3>
              </div>
              <p className="text-sm text-slate-400">
                <span className="text-cyan-300 font-medium">
                  {startDate} – {endDate}
                </span>
              </p>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Kehadiran"
                  stroke="#22d3ee"
                  strokeWidth={2.5}
                  dot={{ fill: "#22d3ee", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 mt-6 text-center">
              {[
                {
                  label: "Total Hari",
                  value: weeklyAttendance.length,
                  color: "text-cyan-300",
                },
                {
                  label: "Total Hadir",
                  value: weeklyAttendance.filter((d) => d.present > 0).length,
                  color: "text-green-400",
                },
                {
                  label: "Persentase",
                  value: `${(
                    (weeklyAttendance.filter((d) => d.present > 0).length /
                      weeklyAttendance.length) *
                    100
                  ).toFixed(0)}%`,
                  color: "text-amber-400",
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <p className="text-slate-400 text-sm">{item.label}</p>
                  <p className={`text-xl font-semibold ${item.color}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* === STATISTIK SAMPING === */}
          <div className="flex flex-col justify-between space-y-4">
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
                className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-4 text-center hover:translate-y-[-3px] hover:border-cyan-400/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300"
              >
                <div className="flex justify-center mb-1">{item.icon}</div>
                <p className="text-slate-400 text-sm">{item.label}</p>
                <p className="text-lg font-semibold text-cyan-300 mt-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* === BAGIAN BAWAH: Aktivitas & Statistik Lain === */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* === AKTIVITAS TERBARU === */}
          <div className="bg-gradient-to-br from-slate-900/70 via-slate-800/80 to-slate-900/70 border border-slate-700/60 rounded-2xl p-8 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <div className="flex items-center gap-3 mb-5">
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
                <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-700"></div>
                {activityLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className="relative pl-10 flex items-start gap-3 group"
                  >
                    <div className="absolute left-4 top-2 w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform"></div>
                    <div>
                      <p className="text-slate-100 font-medium">
                        {log.eventMessage}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(log.eventTimestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* === STATISTIK RINGKASAN TAMBAHAN / INFO KINERJA === */}
          <div className="bg-gradient-to-br from-slate-900/70 via-slate-800/80 to-slate-900/70 border border-slate-700/60 rounded-2xl p-8 shadow-[0_0_15px_rgba(34,211,238,0.1)] flex flex-col justify-center items-center">
            <p className="text-slate-400 text-center mb-3">
              Ringkasan Mingguan
            </p>
            <div className="text-center space-y-3">
              <p className="text-5xl font-bold text-cyan-300">
                {(
                  (weeklyAttendance.filter((d) => d.present > 0).length /
                    weeklyAttendance.length) *
                  100
                ).toFixed(0)}
                %
              </p>
              <p className="text-slate-400">Tingkat Kehadiran</p>
            </div>
          </div>
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
          <WeatherWidget />
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
