import React, { useState, useRef, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  User,
  Camera,
  X,
  RefreshCcw,
  MapPin,
  CalendarDays,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Webcam from "react-webcam";
import { attendanceService } from "../../services/attendanceService";
import { toast } from "sonner";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { shiftService } from "../../services/shiftService";

const ShiftKehadiran = () => {
  const user = useSelector((state: RootState) => state.user);
  const today = new Date().toISOString().split("T")[0];
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    city?: string;
  } | null>(null);
  const [currentMonth] = useState<number>(new Date().getMonth() + 1);
  const [currentYear] = useState<number>(new Date().getFullYear());
  const webcamRef = useRef<Webcam>(null);

  // === Mutation absensi ===
  const { mutate: markAttendance, isPending } = useMutation({
    mutationFn: async (imageBase64: string) => {
      const blob = await fetch(imageBase64).then((res) => res.blob());
      const file = new File([blob], "attendance.jpg", { type: "image/jpeg" });
      return await attendanceService.markAttendance(file);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Absensi berhasil dikirim!");
      setPhoto(null);
      setIsCameraOpen(false);
      setLocation(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal mengirim absensi.");
    },
  });

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return toast.error("Gagal mengambil foto.");
    setPhoto(imageSrc);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await res.json();
            const cityName =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              "Lokasi tidak diketahui";
            setLocation({ lat, lng, city: cityName });
            toast.success(`Lokasi terdeteksi: ${cityName}`);
          } catch {
            toast.error("Gagal mendapatkan nama kota.");
          }
        },
        (err) => toast.error("Gagal mengambil lokasi: " + err.message)
      );
    }
  };

  const handleSubmitAttendance = () => {
    if (!photo) return toast.error("Silakan ambil foto terlebih dahulu.");
    markAttendance(photo);
  };

  // === Data shift & kehadiran ===
  const { data: userShiftData, isLoading: loadingShifts } = useSuspenseQuery({
    queryKey: ["user-shifts", currentYear, currentMonth],
    queryFn: () => shiftService.getUserShift(currentYear, currentMonth),
  });

  const {
    data: { data: attendanceData },
  } = useSuspenseQuery({
    queryKey: ["attendance-data"],
    queryFn: () => attendanceService.todayAttendance(today),
  });

  const userShifts = useMemo(() => {
    const schedules = userShiftData?.data?.schedules;
    if (!schedules) return [];
    return Object.entries(schedules.dailyShifts || {})
      .filter(([_, shift]) => shift !== null)
      .map(([date, shift]: [string, any]) => ({
        date,
        name: shift.name,
        type: shift.type || "Shift",
      }));
  }, [userShiftData]);

  const todayShift = userShifts.find(
    (s) => new Date(s.date).toDateString() === new Date().toDateString()
  );

  return (
    <MainLayout>
      <div className="px-4 md:px-8 py-6 space-y-6 max-w-3xl mx-auto">
        {/* ===== Header Profil ===== */}
        <div className="bg-gradient-to-br from-sky-900/70 to-slate-900/50 border border-sky-700/40 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="bg-sky-600/20 p-3 rounded-full">
              <User className="text-sky-400" size={28} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {user.name || "Nama Pengguna"}
              </h2>
              <p className="text-slate-300 text-sm capitalize">
                {user.role || "Petugas"}
              </p>
            </div>
          </div>

          {todayShift ? (
            attendanceData[0]?.checkIn && attendanceData[0]?.checkOut ? (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-xl">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-sm font-medium">
                  Kamu sudah absen hari ini ✅
                </span>
              </div>
            ) : (
              <button
                onClick={() => setIsCameraOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-blue-500 text-white font-medium px-4 py-2 rounded-xl shadow hover:scale-105 transition-transform"
              >
                <Camera size={18} className="inline mr-1" />
                {attendanceData[0]?.checkIn ? "Absen Keluar" : "Absen Masuk"}
              </button>
            )
          ) : (
            <p className="text-slate-400 text-sm italic">
              Tidak ada shift hari ini
            </p>
          )}
        </div>

        {/* ===== Ringkasan ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-sm text-slate-400">Total Shift Bulan Ini</p>
            <p className="text-2xl font-semibold text-cyan-400">
              {userShifts.length || 0}
            </p>
          </div>
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-sm text-slate-400">Shift Hari Ini</p>
            <p className="text-base text-sky-300 font-medium">
              {todayShift?.name || "Tidak Ada Shift"}
            </p>
          </div>
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-sm text-slate-400">Lokasi Terakhir</p>
            <p className="text-base text-emerald-300 font-medium truncate">
              {location?.city || "Belum Terdeteksi"}
            </p>
          </div>
        </div>

        {/* ===== Jadwal Shift ===== */}
        <section className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-4 shadow-inner">
          <div className="flex items-center mb-3 gap-2">
            <CalendarDays className="text-sky-400" size={18} />
            <h3 className="text-white font-semibold text-base md:text-lg">
              Jadwal Shift Bulan Ini
            </h3>
          </div>

          {loadingShifts ? (
            <p className="text-slate-400 text-center py-6">Memuat jadwal...</p>
          ) : userShifts.length === 0 ? (
            <p className="text-slate-400 text-center py-6">
              Tidak ada jadwal shift bulan ini.
            </p>
          ) : (
            <div className="divide-y divide-slate-700">
              {userShifts.map((shift, idx) => {
                const d = new Date(shift.date);
                const isToday = d.toDateString() === new Date().toDateString();
                const formattedDate = d.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "2-digit",
                  month: "short",
                });

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-3 px-2 ${
                      isToday
                        ? "bg-sky-700/30 border border-sky-600/40 rounded-xl"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-white font-medium">
                        {formattedDate}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {shift.name}
                      </span>
                    </div>
                    <div
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        shift.name.toLowerCase().includes("malam")
                          ? "bg-indigo-500/20 text-indigo-300"
                          : shift.name.toLowerCase().includes("siang")
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {shift.type || "Shift"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ===== Modal Kamera ===== */}
        {isCameraOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <div className="bg-slate-900/95 p-5 rounded-2xl border border-slate-700/60 shadow-xl w-full max-w-sm text-center relative">
              <button
                onClick={() => setIsCameraOpen(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-100"
              >
                <X size={20} />
              </button>

              <h2 className="text-white text-lg font-semibold mb-3">
                Ambil Foto Absensi
              </h2>

              {!photo ? (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-lg border border-slate-700 w-full mb-3"
                  videoConstraints={{
                    facingMode: "user",
                    width: 400,
                    height: 300,
                  }}
                />
              ) : (
                <img
                  src={photo}
                  alt="Preview"
                  className="rounded-lg border border-slate-700 w-full mb-3 object-cover"
                />
              )}

              <div className="text-slate-400 text-xs flex justify-center items-center gap-1 mb-2">
                <MapPin size={13} className="text-cyan-400" />
                <span>
                  {location
                    ? location.city ||
                      `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
                    : "Menunggu lokasi..."}
                </span>
              </div>

              <div className="flex gap-3 mt-2">
                {!photo ? (
                  <button
                    onClick={capturePhoto}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-blue-500 text-white py-2 rounded-xl font-medium hover:from-sky-600 hover:to-blue-600 transition"
                  >
                    Ambil Foto
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setPhoto(null)}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl flex items-center justify-center gap-1"
                    >
                      <RefreshCcw size={15} /> Ulangi
                    </button>
                    <button
                      onClick={handleSubmitAttendance}
                      disabled={isPending}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-2 rounded-xl font-medium disabled:bg-gray-500"
                    >
                      {isPending ? "Mengirim..." : "Kirim"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ShiftKehadiran;
