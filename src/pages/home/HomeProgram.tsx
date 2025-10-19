import React from "react";
import HomeLayout from "../../layouts/HomeLayout";

const HomeProgram = () => {
  const programs = [
    {
      title: "Pelatihan Dasar Keamanan",
      desc: "Pelatihan untuk membentuk dasar kedisiplinan, tanggung jawab, dan profesionalitas anggota.",
      img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Program Bela Negara",
      desc: "Menanamkan nilai-nilai cinta tanah air dan semangat nasionalisme melalui kegiatan bela negara.",
      img: "https://images.unsplash.com/photo-1596995804697-16db9b3eae3a?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Pelatihan Kepemimpinan",
      desc: "Program intensif untuk mencetak calon pemimpin yang tangguh dan berintegritas.",
      img: "https://images.unsplash.com/photo-1581092588429-5c8d30f90b6d?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <HomeLayout>
      <section className="min-h-screen bg-black text-white pt-24 pb-20 px-6 relative overflow-hidden">
        {/* Background pattern halus */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />

        {/* Header section */}
        <div className="relative text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400 mb-4">
            Program{" "}
            <span className="text-white">Wajrasena Garda Nusantara</span>
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Berbagai program pelatihan dirancang untuk meningkatkan
            kedisiplinan, profesionalitas, serta rasa cinta tanah air bagi
            seluruh anggota.
          </p>
        </div>

        {/* Program Cards */}
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
          {programs.map((p, i) => (
            <div
              key={i}
              className="group relative bg-slate-900/70 border border-yellow-400/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gambar dengan overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Konten */}
              <div className="relative p-6">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-3 group-hover:text-yellow-300 transition">
                  {p.title}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {p.desc}
                </p>
                <button className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-400 hover:text-black transition-all">
                  Lihat Detail →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </HomeLayout>
  );
};

export default HomeProgram;
