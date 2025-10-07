import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Plus, Image, Trash2, Search } from "lucide-react";

const ManagementGallery = () => {
  const [search, setSearch] = useState("");

  const galleries = [
    {
      id: 1,
      title: "Kegiatan Pelatihan Keamanan",
      image:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&q=80",
    },
    {
      id: 2,
      title: "Simulasi Evakuasi Darurat",
      image:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&q=80",
    },
    {
      id: 3,
      title: "Upacara Pembukaan Pelatihan",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=80",
    },
  ];

  const filteredGallery = galleries.filter((g) =>
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-6 text-slate-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold">Manajemen Galeri</h1>

          <button className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200">
            <Plus size={18} />
            <span>Tambah Gambar</span>
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
            placeholder="Cari gambar..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.length > 0 ? (
            filteredGallery.map((item) => (
              <div
                key={item.id}
                className="relative bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-all"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover opacity-90 hover:opacity-100 transition"
                />
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-slate-100">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-slate-700/60 rounded-lg hover:bg-red-500/20 transition">
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 italic col-span-full py-10">
              Tidak ada gambar ditemukan
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagementGallery;
