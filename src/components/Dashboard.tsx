import React from "react";
import MainLayout from "../layouts/MainLayout";
import { User, ShieldCheck, Newspaper, Clock } from "lucide-react";

const Dashboard = () => {
  // Data dummy
  const user = {
    name: "Maulana Ikhsan",
    role: "Admin",
    email: "ikhsan@example.com",
    totalCourses: 8,
    totalSecurity: 24,
    totalNews: 6,
    shifts: {
      pagi: 10,
      siang: 8,
      malam: 5,
    },
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
        {/* ======= PROFILE SECTION ======= */}
        <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/40 border border-blue-700/50 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg shadow-blue-900/40">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500/20 p-3 sm:p-4 rounded-full flex-shrink-0">
              <User className="text-cyan-400" size={32} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                {user.name}
              </h2>
              <p className="text-slate-300 text-sm break-all">{user.email}</p>
              <span className="inline-block mt-2 bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* ======= DASHBOARD CARDS ======= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Total Pelatihan */}
          <div className="bg-gradient-to-br from-green-500/20 to-green-900/20 border border-green-700/40 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-green-800/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Total Pelatihan
              </h3>
              <ShieldCheck className="text-green-400" size={26} />
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-green-400 mt-4">
              {user.totalCourses}
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Jumlah pelatihan aktif yang sedang diikuti.
            </p>
          </div>

          {/* Card 2: Data Umum */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-900/20 border border-blue-700/40 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-blue-800/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Data Umum
              </h3>
              <Newspaper className="text-blue-400" size={26} />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-slate-300 text-sm">
                Jumlah Security:{" "}
                <span className="text-blue-400 font-semibold">
                  {user.totalSecurity}
                </span>
              </p>
              <p className="text-slate-300 text-sm">
                Jumlah Berita:{" "}
                <span className="text-blue-400 font-semibold">
                  {user.totalNews}
                </span>
              </p>
            </div>
          </div>

          {/* Card 3: Total Shift */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-900/20 border border-yellow-700/40 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-yellow-800/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Total Shift
              </h3>
              <Clock className="text-yellow-400" size={26} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {Object.entries(user.shifts).map(([label, value]) => (
                <div
                  key={label}
                  className="bg-yellow-800/40 rounded-lg py-3 flex flex-col"
                >
                  <p className="text-yellow-400 font-bold text-lg">{value}</p>
                  <p className="text-slate-400 text-xs mt-1 capitalize">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
