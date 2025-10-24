import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import MainLayout from "../../../layouts/MainLayout";
import {
  Clock,
  Star,
  FileText,
  X,
  Camera,
  Send,
  CheckCircle,
} from "lucide-react";
import { courseService } from "../../../services/courseService";
import { toast } from "sonner";
import environment from "../../../config/environment";
import { Html5Qrcode } from "html5-qrcode";

const DetailCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: course } = useSuspenseQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getById(id!),
  });

  const { data: takenCourse } = useSuspenseQuery({
    queryKey: ["taken-course"],
    queryFn: courseService.getTakenCourse,
  });

  console.log("course", course);

  // ✅ Validasi apakah kursus ini sudah diambil oleh user
  const isCourseTaken = takenCourse?.some((item) => item.id === id);

  const [selectedMeeting, setselectedMeeting] = useState(
    course.courseMeeting?.[0] || null
  );
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [readerId] = useState("qr-reader-container");

  // === Fungsi ambil lokasi pengguna ===
  const getCurrentLocation = (): Promise<{
    latitude: string;
    longitude: string;
  }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Perangkat tidak mendukung geolokasi"));
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString(),
          });
        },
        (err) => reject(err),
        { enableHighAccuracy: true }
      );
    });
  };

  // === MUTATION APPLY COURSE ===
  const applyMutation = useMutation({
    mutationFn: () => courseService.applyCourse(id!),
    onSuccess: () => {
      toast.success("Kursus berhasil di-apply!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Gagal apply kursus");
    },
  });

  // === MUTATION ABSENSI ===
  const attendanceMutation = useMutation({
    mutationFn: (payload: {
      code: string;
      latitude: string;
      longitude: string;
    }) => courseService.submitAttendance(id!, payload),
    onSuccess: () => {
      toast.success("Absensi berhasil!");
      setManualCode("");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Absensi gagal");
    },
  });

  // === SCAN QR ===
  useEffect(() => {
    if (!scanning) return;
    const html5QrCode = new Html5Qrcode(readerId);
    let alreadyScanned = false;

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          if (alreadyScanned) return;
          alreadyScanned = true;

          if (selectedMeeting) {
            try {
              const location = await getCurrentLocation();
              attendanceMutation.mutate({
                code: decodedText,
                latitude: location.latitude,
                longitude: location.longitude,
              });
              setScanning(false);
            } catch (error) {
              toast.error("Gagal mengambil lokasi. Aktifkan izin lokasi.");
              alreadyScanned = false;
            }
          }
        },
        () => {}
      )
      .catch((err) => {
        toast.error("Gagal membuka kamera: " + err);
      });

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, [scanning]);

  // === SUBMIT MANUAL ===
  const handleManualSubmit = async () => {
    if (!manualCode.trim())
      return toast.error("Masukkan kode terlebih dahulu!");
    if (!selectedMeeting)
      return toast.error("Pilih pertemuan terlebih dahulu!");

    try {
      const location = await getCurrentLocation();
      attendanceMutation.mutate({
        code: manualCode.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (error) {
      toast.error("Gagal mengambil lokasi. Aktifkan izin lokasi.");
    }
  };

  return (
    <MainLayout>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* === KONTEN UTAMA === */}
        <div className="lg:col-span-2 space-y-8">
          {/* Banner */}
          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={`${environment.IMAGE_URL + course.thumbnail}`}
              alt={course.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-4 left-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                {course.name}
              </h1>
              <div className="flex items-center text-slate-300 text-sm space-x-4 mt-2">
                <span className="flex items-center">
                  <Clock size={15} className="mr-1 text-amber-400" /> Durasi:{" "}
                  {course.duration || " - "}
                </span>
                <span className="flex items-center">
                  <Star size={15} className="mr-1 text-yellow-400" />{" "}
                  {course.category}
                </span>
              </div>
            </div>
          </div>

          {/* ✅ Tombol Apply Course */}
          {!isCourseTaken ? (
            <div className="flex justify-start">
              <button
                onClick={() => applyMutation.mutate()}
                disabled={applyMutation.isPending}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg
                ${
                  applyMutation.isPending
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:opacity-90"
                }`}
              >
                {applyMutation.isPending ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Applying...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Apply Course
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex justify-start">
              <button
                disabled
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-slate-700 text-slate-400 cursor-not-allowed shadow-lg"
              >
                <CheckCircle size={18} />
                Sudah Diambil
              </button>
            </div>
          )}

          {/* Deskripsi */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-2 mb-3">
              Deskripsi Kursus
            </h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {course.description}
            </p>
          </div>

          {/* Materi */}
          {course.courseMaterial && course.courseMaterial.length > 0 && (
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-3 mb-4 flex items-center gap-2">
                <FileText className="text-emerald-400" />
                Materi Kursus
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.courseMaterial.map((file) => (
                  <div
                    key={file.id}
                    className="group bg-slate-900/40 border border-slate-700/60 hover:border-emerald-500/60 hover:bg-slate-800/60 rounded-xl p-4 flex flex-col justify-between shadow transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500/20 p-3 rounded-lg text-emerald-400">
                        <FileText size={20} />
                      </div>
                      <p className="text-slate-200 text-sm font-medium truncate">
                        {file.fileName}
                      </p>
                    </div>

                    <a
                      href={environment.IMAGE_URL + file.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-center text-sm font-semibold text-emerald-400 border border-emerald-400/40 rounded-lg py-2 hover:bg-emerald-500/20 transition-all duration-200"
                    >
                      Lihat / Unduh
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* === SIDEBAR === */}
        <div className="flex flex-col h-full space-y-4">
          {/* List Pertemuan */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 shadow-lg flex-1 overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-3 mb-4">
              List Pertemuan
            </h2>

            {course.courseMeeting && course.courseMeeting.length > 0 ? (
              <div className="overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800 hover:scrollbar-thumb-slate-600 flex-1">
                {course.courseMeeting.map((meet) => {
                  const now = new Date();
                  const start = new Date(meet.startAt);
                  const end = new Date(meet.endAt);

                  // 🔹 Status: ongoing atau finished
                  const isOngoing = now >= start && now <= end;
                  const isFinished = now > end;

                  return (
                    <div
                      key={meet.id}
                      onClick={() => setselectedMeeting(meet)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer
              ${
                selectedMeeting?.id === meet.id
                  ? "border-rose-400 shadow-lg p-4" // tonjolkan selected
                  : isOngoing
                  ? "border-emerald-500 bg-emerald-500/20"
                  : isFinished
                  ? "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 opacity-50"
                  : "border-slate-700 hover:bg-slate-700/40"
              }`}
                    >
                      <div className="flex justify-between items-center">
                        <p
                          className={`font-medium text-sm ${
                            isOngoing
                              ? "text-emerald-300"
                              : isFinished
                              ? "text-yellow-300"
                              : "text-slate-200"
                          }`}
                        >
                          {meet.title}
                        </p>

                        {/* 🔹 Badge status */}
                        {isOngoing && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-600/30 text-emerald-300">
                            Sedang berlangsung
                          </span>
                        )}
                        {isFinished && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-600/30 text-yellow-300">
                            Selesai
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 mt-1">
                        {start.toLocaleString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        —{" "}
                        {end.toLocaleString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic">
                Belum ada pertemuan untuk kursus ini.
              </p>
            )}
          </div>

          {/* === ABSENSI === */}
          {course.courseMeeting && course.courseMeeting.length > 0 && (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setScanning(true)}
                className="flex-1 bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition"
              >
                <Camera size={20} /> Scan QR untuk Absensi
              </button>

              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 shadow">
                <p className="text-sm text-slate-300 mb-2 font-medium">
                  Atau masukkan kode manual:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg outline-none"
                    placeholder="Masukkan kode absensi..."
                  />
                  <button
                    onClick={handleManualSubmit}
                    disabled={attendanceMutation.isPending}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 rounded-lg font-semibold flex items-center gap-1"
                  >
                    <Send size={16} />
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === MODAL KAMERA === */}
      {scanning && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <button
            onClick={() => setScanning(false)}
            className="absolute top-5 right-5 text-white hover:text-red-400"
          >
            <X size={32} />
          </button>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Arahkan kamera ke QR Absensi
          </h3>
          <div
            id={readerId}
            className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-lg"
          />
        </div>
      )}
    </MainLayout>
  );
};

export default DetailCourse;
