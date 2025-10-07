import React from "react";
import HomeLayout from "../../layouts/HomeLayout";

const HomeNews = () => {
  const news = [
    {
      title: "Kegiatan Pelatihan Angkatan Baru 2025",
      date: "5 Oktober 2025",
      img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1000&q=80",
      desc: "Pelatihan ini diikuti oleh lebih dari 100 peserta dari berbagai daerah di Indonesia.",
    },
    {
      title: "Wajrasena Berpartisipasi dalam Kegiatan Nasional",
      date: "28 September 2025",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80",
      desc: "Kegiatan tersebut bertujuan memperkuat semangat bela negara dan sinergi antar organisasi.",
    },
  ];

  return (
    <HomeLayout>
      <div className="min-h-screen bg-black text-white pt-16 pb-20 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-10">
          Berita Terbaru
        </h1>

        <div className="max-w-5xl mx-auto space-y-10">
          {news.map((item, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center bg-slate-900/80 border border-yellow-400/20 rounded-xl shadow-lg overflow-hidden hover:shadow-yellow-400/20 transition-all"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full md:w-1/3 h-56 object-cover"
              />
              <div className="p-6 md:w-2/3">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-400 mb-3">{item.date}</p>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
    </HomeLayout>
  );
};

export default HomeNews;
