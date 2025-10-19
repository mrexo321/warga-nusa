import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Briefcase, Users } from "lucide-react";
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

const ClientAndPorto = () => {
  const clients = [
    {
      name: "PT Garda Nusantara",
      logo: "https://via.placeholder.com/120x60?text=Garda",
    },
    {
      name: "Bank Mandiri",
      logo: "https://via.placeholder.com/120x60?text=Mandiri",
    },
    {
      name: "Pertamina",
      logo: "https://via.placeholder.com/120x60?text=Pertamina",
    },
    { name: "PLN", logo: "https://via.placeholder.com/120x60?text=PLN" },
    {
      name: "Telkom Indonesia",
      logo: "https://via.placeholder.com/120x60?text=Telkom",
    },
    {
      name: "Angkasa Pura",
      logo: "https://via.placeholder.com/120x60?text=AP1",
    },
  ];

  const portfolios = [
    {
      title: "Pelatihan Satpam Bank Nasional",
      desc: "Program pelatihan keamanan profesional untuk bank besar di Jakarta.",
      img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Sistem Keamanan Kawasan Industri",
      desc: "Implementasi manajemen keamanan di area pabrik dan pergudangan.",
      img: "https://images.unsplash.com/photo-1629909613983-6a68fca9564e?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Pelatihan Satpam Event Nasional",
      desc: "Kerja sama dalam penyediaan personel keamanan untuk acara berskala besar.",
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <HomeLayout>
      <section className="relative min-h-screen text-white pt-24 pb-32 overflow-hidden bg-transparent">
        {/* Background efek cahaya */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-yellow-500/10 to-transparent blur-2xl opacity-20" />
        </div>

        {/* Judul Halaman */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          className="relative max-w-6xl mx-auto text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-5 drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">
            Klien & Portofolio
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Kami dipercaya oleh berbagai perusahaan dan institusi terkemuka
            untuk menyediakan pelatihan dan layanan keamanan profesional di
            seluruh Indonesia.
          </p>
        </motion.div>

        {/* Daftar Klien */}
        <div className="max-w-6xl mx-auto mt-20 px-6">
          <motion.h2
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-bold text-yellow-400 text-center mb-12"
          >
            Klien Kami
          </motion.h2>

          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 justify-items-center"
          >
            {clients.map((client, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="p-4 bg-slate-900/60 border border-yellow-400/10 rounded-xl backdrop-blur-md shadow-md hover:border-yellow-400/40 transition-all duration-300 flex flex-col items-center justify-center"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-24 h-12 object-contain opacity-80 hover:opacity-100 transition"
                />
                <p className="text-xs mt-2 text-gray-400 text-center">
                  {client.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Portofolio Section */}
        <div className="max-w-6xl mx-auto mt-28 px-6">
          <motion.h2
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-bold text-yellow-400 text-center mb-12"
          >
            Portofolio Proyek Kami
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {portfolios.map((porto, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="relative group overflow-hidden rounded-2xl border border-yellow-400/10 shadow-lg hover:border-yellow-400/30 transition"
              >
                <img
                  src={porto.img}
                  alt={porto.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay teks */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-yellow-400">
                    {porto.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">{porto.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-28 text-center bg-gradient-to-r from-yellow-400/10 via-yellow-400/5 to-transparent border border-yellow-400/20 rounded-2xl p-10 shadow-[0_0_30px_rgba(255,215,0,0.05)] backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Ingin Bekerja Sama Dengan Kami?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Kami siap memberikan solusi keamanan terbaik dan pelatihan
            profesional sesuai kebutuhan perusahaan Anda.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition inline-flex items-center gap-2"
          >
            Hubungi Kami <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>
    </HomeLayout>
  );
};

export default ClientAndPorto;
