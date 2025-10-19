import React, { useState, useRef } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  User,
  Calendar,
  Clock,
  CheckCircle,
  Eye,
  Pen,
  Camera,
  X,
} from "lucide-react";
import Webcam from "react-webcam";
import { attendanceService } from "../../services/attendanceService";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const ShiftKehadiran = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const webcamRef = useRef<Webcam>(null);

  // ✅ useMutation untuk absensi
  const { mutate: markAttendance, isPending } = useMutation({
    mutationFn: async (imageBase64: string) => {
      // Convert Base64 → Blob → File
      const blob = await fetch(imageBase64).then((res) => res.blob());
      const file = new File([blob], "attendance.jpg", { type: "image/jpeg" });
      return await attendanceService.markAttendance(file);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Absensi berhasil dikirim!");
      setPhoto(null);
      setLocation(null);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal mengirim absensi.");
    },
  });

  // 🔹 Data Dummy
  const shifts = [
    { hari: "Senin", shift: "Pagi", jam: "07:00 - 15:00" },
    { hari: "Selasa", shift: "Siang", jam: "15:00 - 23:00" },
    { hari: "Rabu", shift: "Malam", jam: "23:00 - 07:00" },
    { hari: "Kamis", shift: "Pagi", jam: "07:00 - 15:00" },
    { hari: "Jumat", shift: "Siang", jam: "15:00 - 23:00" },
  ];

  const rekap = [
    {
      label: "Hadir",
      value: 18,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
    },
    {
      label: "Izin",
      value: 2,
      icon: Calendar,
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
    },
    {
      label: "Sakit",
      value: 1,
      icon: Clock,
      color: "text-red-400",
      bg: "bg-red-500/20",
    },
  ];

  // 🔹 Ambil lokasi user
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => toast.error("Gagal mengambil lokasi: " + err.message)
      );
    } else toast.error("Geolocation tidak didukung di browser ini.");
  };

  // 🔹 Ambil foto dari webcam
  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhoto(imageSrc);
      setIsCameraOpen(false);
      getLocation();
    } else toast.error("Gagal mengambil foto.");
  };

  // 🔹 Kirim absensi
  const handleSubmitAttendance = () => {
    if (!photo) return toast.error("Silakan ambil foto terlebih dahulu.");
    markAttendance(photo);
  };

  return (
    <MainLayout>
      <div className="p-4 md:p-8 space-y-8">
        {/* Header Profil */}
        <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/40 border border-blue-700/50 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-lg shadow-blue-900/40">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500/20 p-3 md:p-4 rounded-full">
              <User className="text-cyan-400" size={32} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-white">
                {user.name || "Nama Pengguna"}
              </h2>
              <p className="text-slate-300 text-sm">Petugas</p>
              <span className="inline-block mt-2 bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium">
                {user.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCameraOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center justify-center space-x-2 hover:scale-[1.03] transition-all duration-200 w-full md:w-auto"
          >
            <Camera size={18} />
            <span>Absen Sekarang</span>
          </button>
        </div>

        {/* Rekap Kehadiran */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Rekap Kehadiran
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rekap.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-5 border border-slate-700/50 bg-slate-800/40 shadow-md flex items-center justify-between hover:scale-[1.02] transition-transform duration-200"
              >
                <div>
                  <h4 className="text-slate-400 text-sm">{item.label}</h4>
                  <p className="text-2xl font-bold text-white mt-1">
                    {item.value}
                  </p>
                </div>
                <div className={`${item.bg} p-3 rounded-full`}>
                  <item.icon className={item.color} size={26} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jadwal Shift */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Jadwal Shift Mingguan
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-700/50">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-blue-900/60 to-indigo-900/40 text-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Hari</th>
                  <th className="px-4 py-3 text-left font-semibold">Shift</th>
                  <th className="px-4 py-3 text-left font-semibold">Jam</th>
                  <th className="px-4 py-3 text-left font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((s, i) => (
                  <tr
                    key={i}
                    className={`${
                      i % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/10"
                    } hover:bg-slate-700/30 transition`}
                  >
                    <td className="px-4 py-3 text-slate-300">{s.hari}</td>
                    <td className="px-4 py-3 text-slate-300">{s.shift}</td>
                    <td className="px-4 py-3 text-slate-300">{s.jam}</td>
                    <td className="px-4 py-3 text-slate-300 flex space-x-3 items-center">
                      <Eye className="cursor-pointer w-4 h-4" />
                      <Pen className="cursor-pointer w-4 h-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Kamera */}
        {isCameraOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <div className="bg-slate-900 p-5 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col items-center space-y-4 relative">
              <button
                onClick={() => setIsCameraOpen(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-200"
              >
                <X size={20} />
              </button>

              <h2 className="text-white font-semibold text-lg">
                Ambil Foto Absensi
              </h2>

              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-xl border border-slate-700 w-full"
                videoConstraints={{
                  facingMode: "user",
                  width: 350,
                  height: 250,
                }}
              />

              <button
                onClick={capturePhoto}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium"
              >
                Ambil Foto
              </button>
            </div>
          </div>
        )}

        {/* Preview Foto & Lokasi */}
        {photo && (
          <div className="mt-8 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6">
            <img
              src={photo}
              alt="Absen"
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg border border-slate-600"
            />
            <div className="text-slate-300 text-sm sm:text-base flex-1">
              <p className="font-medium">Koordinat Lokasi:</p>
              {location ? (
                <p className="mt-1">
                  Latitude: {location.lat.toFixed(6)}, Longitude:{" "}
                  {location.lng.toFixed(6)}
                </p>
              ) : (
                <p className="mt-1 text-slate-500">Lokasi belum diambil.</p>
              )}

              <button
                onClick={handleSubmitAttendance}
                disabled={isPending}
                className="mt-4 w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium disabled:bg-gray-500"
              >
                {isPending ? "Mengirim..." : "Kirim Absensi"}
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ShiftKehadiran;
