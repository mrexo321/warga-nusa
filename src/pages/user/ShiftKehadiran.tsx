import React, { useState, useRef, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { User, Camera, X, RefreshCcw, MapPin } from "lucide-react";
import Webcam from "react-webcam";
import { attendanceService } from "../../services/attendanceService";
import { toast } from "sonner";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { shiftService } from "../../services/shiftService";

const ShiftKehadiran = () => {
  const user = useSelector((state: RootState) => state.user);
  const today = new Date().toISOString().split("T")[0];
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const webcamRef = useRef<Webcam>(null);

  // Absensi
  const { mutate: markAttendance, isPending } = useMutation({
    mutationFn: async (imageBase64: string) => {
      const blob = await fetch(imageBase64).then((res) => res.blob());
      const file = new File([blob], "attendance.jpg", { type: "image/jpeg" });
      return await attendanceService.markAttendance(file);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Absensi berhasil dikirim!");
      setPhoto(null);
      setLocation(null);
      setIsCameraOpen(false);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal mengirim absensi.");
    },
  });

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhoto(imageSrc);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            setLocation({ lat, lng });

            // Reverse geocoding pakai Nominatim
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

              toast.success(`Lokasi terdeteksi: ${cityName}`);
              setLocation({ lat, lng, city: cityName });
            } catch (error) {
              toast.error("Gagal mendapatkan nama kota.");
              console.error(error);
            }
          },
          (err) => toast.error("Gagal mengambil lokasi: " + err.message)
        );
      }
    } else toast.error("Gagal mengambil foto.");
  };

  const handleSubmitAttendance = () => {
    if (!photo) return toast.error("Silakan ambil foto terlebih dahulu.");
    markAttendance(photo);
  };

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

  const userEvents = useMemo(() => {
    const schedules = userShiftData?.data?.schedules;
    if (!schedules) return [];
    return Object.entries(schedules.dailyShifts || {})
      .filter(([_, shift]) => shift !== null)
      .map(([date, shift]: [string, any]) => ({
        title: shift.name,
        start: date,
        allDay: true,
        backgroundColor: "#3b82f6",
        borderColor: "#1e3a8a",
        textColor: "#fff",
      }));
  }, [userShiftData]);

  const handleDatesSet = (info: any) => {
    const date = info.view.currentStart;
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth() + 1);
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
            <span>Absen {attendanceData[0]?.checkIn ? "Keluar" : "Masuk"}</span>
          </button>
        </div>

        {/* Kalender Shift */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Jadwal Shift Saya
          </h3>
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 shadow-inner">
            {loadingShifts ? (
              <p className="text-slate-400 text-center py-6">
                Memuat jadwal...
              </p>
            ) : (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={userEvents}
                height="auto"
                datesSet={handleDatesSet}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,dayGridWeek",
                }}
                dayCellClassNames={(arg) => {
                  const day = arg.date.getDay();
                  const isToday =
                    arg.date.toDateString() === new Date().toDateString();
                  return [
                    isToday ? "bg-blue-600/30 border border-blue-500" : "",
                    day === 0 || day === 6 ? "bg-slate-800/40" : "",
                  ];
                }}
                eventContent={(arg) => (
                  <div className="flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-2 py-1 rounded-lg shadow-sm cursor-pointer hover:scale-105 transition-all duration-150">
                    <span className="truncate text-xs font-semibold">
                      {arg.event.title}
                    </span>
                  </div>
                )}
              />
            )}
          </div>
        </div>

        {/* Modal Kamera */}
        {isCameraOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 p-6 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center space-y-4 relative transition-all duration-300">
              <button
                onClick={() => setIsCameraOpen(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-200"
              >
                <X size={22} />
              </button>

              <h2 className="text-white font-semibold text-lg">
                Ambil Foto Absensi
              </h2>

              {!photo ? (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-xl border border-slate-700 w-full shadow-lg"
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
                  className="rounded-xl border border-slate-700 w-full shadow-lg object-cover"
                />
              )}

              {location && (
                <div className="text-slate-300 text-xs flex items-center gap-1">
                  <MapPin size={14} className="text-cyan-400" />
                  <span>
                    {location.city
                      ? location.city
                      : `${location.lat.toFixed(4)}, ${location.lng.toFixed(
                          4
                        )}`}
                  </span>
                </div>
              )}

              <div className="flex w-full gap-3">
                {!photo ? (
                  <button
                    onClick={capturePhoto}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium shadow-lg"
                  >
                    Ambil Foto
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setPhoto(null)}
                      className="flex-1 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium flex items-center justify-center gap-1"
                    >
                      <RefreshCcw size={16} /> Ulangi
                    </button>
                    <button
                      onClick={handleSubmitAttendance}
                      disabled={isPending}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium shadow-lg disabled:bg-gray-500"
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
