import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import StatsCard from "./StatsCard";

const About = () => {
  const stats = [
    {
      number: "15+",
      label: "Tahun Pengalaman",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      number: "10K+",
      label: "Lulusan",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      number: "500+",
      label: "Klien",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      number: "50+",
      label: "Instruktur",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-transparent text-white py-24 overflow-hidden"
    >
      {/* Intro Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow">
          Tentang <span className="text-white">WargaNusa</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          <span className="font-semibold text-yellow-400">
            Wajrasena Garda Nusantara (WargaNusa)
          </span>{" "}
          adalah lembaga profesional yang berfokus pada{" "}
          <span className="text-yellow-500 font-bold">
            pelatihan & jasa keamanan
          </span>{" "}
          di Indonesia. Dengan pengalaman lebih dari{" "}
          <span className="text-yellow-500 font-bold">15 tahun</span>, kami
          telah mencetak ribuan anggota satpam disiplin dan siap menghadapi
          tantangan dunia nyata.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-gray-800/70 border border-yellow-400/20 rounded-2xl shadow-lg hover:shadow-yellow-400/20 backdrop-blur-sm transition-all"
          >
            <StatsCard
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="relative rounded-3xl overflow-hidden shadow-2xl max-w-6xl mx-auto group"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src="https://images.unsplash.com/photo-1526406915894-6c5e3b8c7c5d?auto=format&fit=crop&w=1600&q=80"
          alt="Pelatihan Security"
          className="w-full object-cover h-[450px] md:h-[550px] transform group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <motion.div
          className="absolute bottom-0 left-0 p-8 md:p-14 text-left text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-3 text-yellow-400 drop-shadow-lg">
            Pelatihan Security Profesional
          </h3>
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
            Kami membekali peserta dengan kemampuan teknis, kedisiplinan tinggi,
            dan integritas yang menjadi dasar utama seorang anggota keamanan
            profesional.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-7 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-md hover:bg-yellow-300 transition inline-flex items-center gap-2"
          >
            Lihat Program Pelatihan
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
