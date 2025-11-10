import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import MainLayout from "../../../layouts/MainLayout";
import {
  Clock,
  Star,
  PlayCircle,
  User,
  QrCode,
  X,
  Clipboard,
  FileText,
} from "lucide-react";
import { courseService } from "../../../services/courseService";
import environment from "../../../config/environment";
import ParticipantTable from "../../../components/ParticipantTable";

const PreviewCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: course } = useSuspenseQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getById(id!),
  });

  const [selectedMeeting, setselectedMeeting] = useState(
    course.courseMeeting?.[0] || null
  );

  // State untuk popup QR
  const [qrPreview, setQrPreview] = useState<string | null>(null);

  const attendances =
    course.courseMeeting.find((m) => m.id === selectedMeeting?.id)
      ?.attendances || [];

  console.log(selectedMeeting);

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

          {/* === BLOCK CARD PESERTA DENGAN CHECKBOX HADIR === */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 shadow-lg mt-8">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-3 mb-4 flex items-center gap-2">
              <User className="text-sky-400" />
              List Peserta
            </h2>
            {/* <ParticipantTable data={course.courseMeeting} /> */}

            {/* Participant Table  */}
            <div className="overflow-x-auto max-h-80 overflow-y-auto custom-scrollbar">
              <table className="min-w-full text-sm text-slate-300 border border-slate-700/60 rounded-xl overflow-hidden">
                <thead className="bg-slate-900/60 text-slate-200 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left">Nama</th>
                    <th className="px-4 py-3 text-left">Waktu</th>
                    <th className="px-4 py-3 text-center">Hadir</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMeeting.attendances.map((attendant, key) => (
                    <tr className="border-t border-slate-700/50 hover:bg-slate-800/50 transition">
                      <td className="px-4 py-3 font-medium text-slate-100">
                        {attendant.user.name}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-medium`}
                        >
                          {attendant.user.attendAt
                            ? attendant.user.attendAt
                            : "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <label className="inline-flex items-center justify-center">
                          <input
                            type="checkbox"
                            disabled
                            checked={attendant.status === "present"}
                            className="appearance-none w-5 h-5 border-2 rounded-md cursor-not-allowed transition-all duration-300
        checked:bg-green-500 checked:border-green-500 border-gray-400"
                          />
                          {attendant.status === "present" && (
                            <svg
                              className="absolute w-3 h-3 text-white pointer-events-none"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Materi yang sedang dibuka */}
          {selectedMeeting && (
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 shadow-lg space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-3 mb-4 flex items-center gap-2">
                  <PlayCircle className="text-blue-400" />
                  {selectedMeeting.title}
                </h2>
                <p className="text-slate-300 mb-4">
                  Jadwal:{" "}
                  <span className="text-slate-400">
                    {new Date(selectedMeeting.startAt).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                </p>

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
              {/* Daftar User yang sudah absen
              <div className="bg-slate-900/40 border border-slate-700/40 rounded-xl p-5">
                <h3 className="text-base font-semibold text-white border-b border-slate-700/50 pb-2 mb-4 flex items-center gap-2">
                  <User className="text-emerald-400" />
                  Daftar Peserta Hadir
                </h3>

                {attendances.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border border-slate-700/50 rounded-lg overflow-hidden">
                      <thead className="bg-slate-800/70 text-slate-300 text-sm">
                        <tr>
                          <th className="px-4 py-2 text-left border-b border-slate-700/50">
                            Nama
                          </th>
                          <th className="px-4 py-2 text-left border-b border-slate-700/50">
                            Attend At
                          </th>
                          <th className="px-4 py-2 text-left border-b border-slate-700/50">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendances.map((att) => (
                          <tr
                            key={att.id}
                            className="text-slate-200 text-sm hover:bg-slate-800/40 transition"
                          >
                            <td className="px-4 py-2 border-b border-slate-800">
                              {att.user?.name ||
                                att.user?.username ||
                                "Tidak diketahui"}
                            </td>
                            <td className="px-4 py-2 border-b border-slate-800">
                              {new Date(att.attendAt).toLocaleString("id-ID", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="px-4 py-2 border-b border-slate-800">
                              <span className="px-3 py-1 rounded-md text-xs font-medium bg-emerald-500/20 text-emerald-400">
                                Hadir
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-center py-4">
                    Belum ada peserta yang absen di materi ini.
                  </p>
                )}
              </div> */}
            </div>
          )}
        </div>

        {/* === SIDEBAR (MATERI + QR) === */}
        <div className="flex flex-col h-full space-y-4">
          {/* Daftar Materi */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 shadow-lg flex-1 flex flex-col max-h-[400px]">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-3 mb-4">
              Daftar Materi
            </h2>

            <div className="overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800 hover:scrollbar-thumb-slate-600">
              {course.courseMeeting.map((meet) => (
                <div
                  key={meet.id}
                  onClick={() => setselectedMeeting(meet)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedMeeting?.id === meet.id
                      ? "border-blue-500 bg-blue-500/20"
                      : "border-slate-700 hover:bg-slate-700/40"
                  }`}
                >
                  <p
                    className={`font-medium text-sm ${
                      selectedMeeting?.id === meet.id
                        ? "text-blue-300"
                        : "text-slate-200"
                    }`}
                  >
                    {meet.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(meet.startAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Deskripsi */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-2 mb-3">
              Deskripsi Kursus
            </h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {course.description}
            </p>
          </div>
          {/* QR Code Absensi */}
          {selectedMeeting?.qrCodeDataUrl && (
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/60 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-emerald-500/10 to-transparent blur-3xl" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3 justify-center">
                  <QrCode className="text-emerald-400" size={22} />
                  <h3 className="text-white font-semibold text-lg">
                    QR Absensi
                  </h3>
                </div>
                <p className="text-slate-400 text-xs mb-4 max-w-[200px]">
                  Klik gambar untuk memperbesar dan scan QR ini untuk absensi.
                </p>

                <div
                  onClick={() => setQrPreview(selectedMeeting.qrCodeDataUrl)}
                  className="bg-slate-900/70 p-4 rounded-2xl border border-slate-700/60 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <img
                    src={selectedMeeting.qrCodeDataUrl}
                    alt="QR Absensi"
                    className="w-44 h-44 object-contain"
                  />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  ID Pertemuan: {selectedMeeting.id}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tombol Navigasi */}
      <div className="flex justify-start gap-3 p-8">
        <button
          onClick={() => navigate("/courses")}
          className="cursor-pointer px-6 py-3 bg-sky-300 text-sky-800 font-semibold rounded-xl shadow-md hover:bg-sky-400 transition-all duration-200"
        >
          Kembali
        </button>
      </div>

      {/* === MODAL PREVIEW QR === */}
      {qrPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn">
          {/* Overlay Close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setQrPreview(null)}
          ></div>

          {/* MODAL CONTAINER */}
          <div className="relative w-[92%] max-w-lg rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-[0_0_60px_-10px_rgba(0,255,200,0.25)] overflow-hidden animate-popUp">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.25),transparent_70%)] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.2),transparent_80%)] blur-2xl" />

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setQrPreview(null)}
              className="absolute top-5 right-5 z-20 text-slate-400 hover:text-white transition-transform hover:scale-110"
            >
              <X size={28} />
            </button>

            {/* CONTENT */}
            <div className="relative z-10 p-10 flex flex-col items-center text-center">
              {/* Title */}
              <h3 className="text-white font-semibold text-2xl mb-2 flex items-center gap-2 drop-shadow-lg">
                <QrCode className="text-emerald-400" size={26} />
                QR Absensi Pertemuan
              </h3>
              <p className="text-slate-400 text-sm mb-8 max-w-sm">
                Scan QR atau masukkan kode absen di bawah untuk mencatat
                kehadiran Anda.
              </p>

              {/* QR Image */}
              <div className="relative bg-slate-900/70 p-6 rounded-2xl border border-slate-700/70 shadow-[0_0_35px_-5px_rgba(0,255,200,0.3)] group transition-transform duration-300 hover:scale-[1.05] hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.5)]">
                <img
                  src={qrPreview}
                  alt="QR Preview"
                  className="w-72 h-72 object-contain rounded-xl transition-transform duration-500 group-hover:rotate-[1deg]"
                />
              </div>

              {/* === Kode Pertemuan (Besar & Elegan) === */}
              <div className="relative mt-8 w-full max-w-sm bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 border border-emerald-400/30 rounded-2xl py-4 shadow-[0_0_25px_-8px_rgba(0,255,200,0.4)] hover:border-emerald-400/60 transition">
                <span className="block text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 tracking-widest font-mono select-all">
                  {selectedMeeting.code || "KODE_TIDAK_TERSEDIA"}
                </span>

                {/* Tombol salin */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMeeting.code || "");
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition"
                  title="Salin kode"
                >
                  <Clipboard size={22} />
                </button>
              </div>

              {/* Info */}
              <p className="text-slate-500 text-xs mt-3">
                Klik ikon salin untuk menyalin kode absen.
              </p>

              {/* Tombol Tutup */}
              <button
                onClick={() => setQrPreview(null)}
                className="mt-10 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl hover:opacity-95 transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default PreviewCourse;
