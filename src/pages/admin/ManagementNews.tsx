import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Plus, Edit3, Trash2, Search, CalendarDays, User } from "lucide-react";

const ManagementNews = () => {
  const [search, setSearch] = useState("");

  const newsList = [
    {
      id: 1,
      title: "Pelatihan Keamanan Tahap II Resmi Dibuka",
      author: "Admin",
      date: "02 Oktober 2025",
      status: "Dipublikasikan",
    },
    {
      id: 2,
      title: "Simulasi Tanggap Darurat di Kantor Pusat",
      author: "Budi Santoso",
      date: "28 September 2025",
      status: "Draft",
    },
    {
      id: 3,
      title: "Kegiatan Sosialisasi Peraturan Baru",
      author: "Rizal Hakim",
      date: "25 September 2025",
      status: "Dipublikasikan",
    },
  ];

  const filteredNews = newsList.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-6 text-slate-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold">Manajemen Berita</h1>

          <button className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200">
            <Plus size={18} />
            <span>Tambah Berita</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari berita..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-700/50 rounded-lg shadow-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-800/70 text-slate-200 uppercase text-xs tracking-wider">
                <th className="px-6 py-3 text-left">Judul</th>
                <th className="px-6 py-3 text-left">Penulis</th>
                <th className="px-6 py-3 text-left">Tanggal</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.length > 0 ? (
                filteredNews.map((news) => (
                  <tr
                    key={news.id}
                    className="border-t border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-3 font-medium">{news.title}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center space-x-2">
                        <User size={14} className="text-cyan-400" />
                        <span>{news.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 flex items-center space-x-2">
                      <CalendarDays size={14} className="text-amber-400" />
                      <span>{news.date}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          news.status === "Dipublikasikan"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-slate-500/20 text-slate-300"
                        }`}
                      >
                        {news.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button className="p-2 rounded-lg bg-slate-700/50 hover:bg-cyan-500/20 transition">
                        <Edit3 size={16} className="text-cyan-400" />
                      </button>
                      <button className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 transition">
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-6 text-center text-slate-500 italic"
                  >
                    Tidak ada berita ditemukan
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

export default ManagementNews;
