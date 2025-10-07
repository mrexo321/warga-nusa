import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Plus, Clock, Users, Edit, Trash2, Search } from "lucide-react";

const ManagementShift = () => {
  const [search, setSearch] = useState("");

  // Contoh data shift
  const shifts = [
    {
      id: 1,
      name: "Shift Pagi",
      start: "07:00",
      end: "15:00",
      members: 8,
      status: "Aktif",
    },
    {
      id: 2,
      name: "Shift Siang",
      start: "15:00",
      end: "23:00",
      members: 6,
      status: "Aktif",
    },
    {
      id: 3,
      name: "Shift Malam",
      start: "23:00",
      end: "07:00",
      members: 5,
      status: "Tidak Aktif",
    },
  ];

  const filteredShifts = shifts.filter((shift) =>
    shift.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold text-white">Manajemen Shift</h1>

          <button className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200">
            <Plus size={18} />
            <span>Tambah Shift</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari shift..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-300 border border-slate-700/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-800/70 text-slate-200 uppercase text-xs tracking-wider">
                <th className="px-6 py-3 text-left">Nama Shift</th>
                <th className="px-6 py-3 text-left">Jam</th>
                <th className="px-6 py-3 text-left">Jumlah Personel</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map((shift) => (
                <tr
                  key={shift.id}
                  className="border-t border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-3 font-medium">{shift.name}</td>

                  <td className="px-6 py-3 flex items-center space-x-2">
                    <Clock size={14} className="text-amber-400" />
                    <span>
                      {shift.start} - {shift.end}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-medium">
                    <div className="flex items-center space-x-2">
                      <Users size={14} className="text-cyan-400" />
                      {shift.members}
                    </div>
                  </td>

                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        shift.status === "Aktif"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {shift.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center space-x-2">
                    <button className="p-2 rounded-lg bg-slate-700/50 hover:bg-cyan-500/20 transition">
                      <Edit size={16} className="text-cyan-400" />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 transition">
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredShifts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-slate-500 italic"
                  >
                    Tidak ada shift ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagementShift;
