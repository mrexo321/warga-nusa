import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white px-6">
      {/* Icon */}
      <div className="flex flex-col items-center">
        <div className="bg-blue-600/20 p-6 rounded-full border border-blue-400/50 shadow-lg mb-6 animate-bounce">
          <AlertTriangle size={60} className="text-blue-400" />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-extrabold text-blue-400 tracking-wider drop-shadow-lg">
          404
        </h1>
        <h2 className="text-2xl font-semibold mt-2 text-slate-200">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-slate-400 mt-2 text-center max-w-md">
          Maaf, halaman yang kamu cari mungkin telah dihapus, diganti, atau
          tidak tersedia untuk sementara waktu.
        </p>

        {/* Button */}
        <button
          onClick={handleBack}
          className="mt-8 flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-cyan-400/30 transition-all duration-300"
        >
          <ArrowLeftCircle size={20} />
          <span>Kembali ke Halaman Sebelumnya</span>
        </button>
      </div>

      {/* Decorative background effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyan-400/10 blur-3xl rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default NotFound;
