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
      <div className="min-h-screen bg-black text-white pt-16 pb-20 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-10">
          Program Wajrasena Garda Nusantara
        </h1>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {programs.map((p, i) => (
            <div
              key={i}
              className="bg-slate-900/80 border border-yellow-400/20 rounded-xl shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                  {p.title}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default HomeProgram;
