import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Target, Award, ArrowRight } from "lucide-react";
import HomeLayout from "../../../layouts/HomeLayout";

const fadeIn = (direction = "up", delay = 0) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay },
    },
  };
  return variants;
};

const HomeAbout = () => {
  return (
    <HomeLayout>
      <section
        className="relative min-h-screen text-white pt-24 pb-32 overflow-hidden
        bg-transparent"
      >
        {/* Efek cahaya halus di background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-yellow-500/10 to-transparent blur-2xl opacity-20" />
        </div>

        {/* Hero Section */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          className="relative max-w-6xl mx-auto text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-5 tracking-wide drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">
            Tentang Kami
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Kami adalah lembaga pelatihan profesional yang berfokus pada
            pengembangan kemampuan, kedisiplinan, dan profesionalitas calon{" "}
            <span className="text-yellow-400 font-semibold">
              Satpam Indonesia
            </span>{" "}
            agar siap menghadapi tantangan keamanan modern.
          </p>

          <motion.img
            src="https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80"
            alt="Satpam Training"
            className="mt-10 rounded-3xl shadow-[0_0_40px_rgba(255,215,0,0.05)] border border-yellow-400/10 mx-auto object-cover w-full max-w-4xl h-[350px] md:h-[450px]"
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>

        {/* Visi & Misi */}
        <div className="max-w-6xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-12">
          <motion.div
            variants={fadeIn("right", 0.2)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Visi Kami
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Menjadi lembaga pelatihan satpam terdepan di Indonesia yang mampu
              mencetak personel keamanan berintegritas tinggi, disiplin, dan
              profesional dalam melindungi masyarakat serta aset bangsa.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.2)}
            whileInView="show"
            initial="hidden"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">Misi</h2>
            <ul className="space-y-3 text-gray-300">
              {[
                "Menyelenggarakan pelatihan berkualitas sesuai standar nasional.",
                "Membentuk karakter tangguh, berdisiplin, dan bertanggung jawab.",
                "Menanamkan nilai cinta tanah air dan bela negara.",
                "Mengembangkan kemampuan teknis dan kepemimpinan satpam.",
              ].map((misi, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-yellow-400">✅</span>
                  {misi}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="max-w-6xl mx-auto px-6 mt-28">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">
            Nilai-Nilai Utama Kami
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck size={40} />,
                title: "Disiplin",
                desc: "Menegakkan kedisiplinan sebagai fondasi utama profesionalitas.",
              },
              {
                icon: <Users size={40} />,
                title: "Solidaritas",
                desc: "Menumbuhkan rasa kebersamaan dan tanggung jawab sosial.",
              },
              {
                icon: <Target size={40} />,
                title: "Dedikasi",
                desc: "Mengabdi sepenuh hati untuk keamanan dan ketertiban masyarakat.",
              },
              {
                icon: <Award size={40} />,
                title: "Integritas",
                desc: "Menjunjung tinggi kejujuran dan etika dalam setiap tindakan.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-gradient-to-b from-slate-900/60 to-slate-800/50
                border border-yellow-400/10 rounded-2xl p-6 text-center shadow-lg
                hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Instruktur Section */}
        <div className="max-w-6xl mx-auto px-6 mt-28">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">
            Tim Pelatih & Instruktur
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Sertu (Purn) Budi Santoso",
                role: "Instruktur Utama",
                img: "https://images.unsplash.com/photo-1590080875830-1e3c1b4c8f83?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "Aiptu (Purn) Dwi Hartono",
                role: "Pelatih Lapangan",
                img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "Sersan Mayor Rudi Pratama",
                role: "Koordinator Program",
                img: "https://images.unsplash.com/photo-1596995804697-16db9b3eae3a?auto=format&fit=crop&w=600&q=80",
              },
            ].map((person, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-b from-slate-900/60 to-slate-800/50 border border-yellow-400/10 rounded-2xl overflow-hidden shadow-lg hover:border-yellow-400/30 transition"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-yellow-400">
                    {person.name}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">{person.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-28 text-center
          bg-gradient-to-r from-yellow-400/10 via-yellow-400/5 to-transparent
          border border-yellow-400/20 rounded-2xl p-10 shadow-[0_0_30px_rgba(255,215,0,0.05)] backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">
            Siap Menjadi Satpam Profesional?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Bergabunglah bersama kami dan jadilah bagian dari garda terdepan
            penjaga keamanan bangsa. Kami siap melatih Anda menuju
            profesionalitas sejati.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition inline-flex items-center gap-2"
          >
            Daftar Sekarang
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>
    </HomeLayout>
  );
};

export default HomeAbout;
