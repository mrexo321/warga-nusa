import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const ManagementUser = () => {
  const [search, setSearch] = useState("");

  // Contoh data user dummy
  const users = [
    {
      id: 1,
      name: "Budi Santoso",
      email: "budi@warganusa.id",
      role: "Admin",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Rina Putri",
      email: "rina@warganusa.id",
      role: "User",
      status: "Tidak Aktif",
    },
    {
      id: 3,
      name: "Agus Pratama",
      email: "agus@warganusa.id",
      role: "User",
      status: "Aktif",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Manajemen Pengguna
          </h1>

          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200">
            <Plus size={18} />
            <span>Tambah Pengguna</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari pengguna..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-300 border border-slate-700/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-800/70 text-slate-200 uppercase text-xs tracking-wider">
                <th className="px-6 py-3 text-left">Nama</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-3 font-medium">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Aktif"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.status}
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
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-slate-500 italic"
                  >
                    Tidak ada pengguna ditemukan
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

export default ManagementUser;
