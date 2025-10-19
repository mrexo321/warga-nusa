import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { useSuspenseQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import environment from "../config/environment";
import { BookOpen, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const ProgramCard = ({ id, name, description, thumbnail, category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-zinc-900/80 via-slate-900/90 to-black/90 rounded-2xl shadow-lg hover:shadow-yellow-400/30 border border-slate-800/70 overflow-hidden group transition-all duration-500 hover:-translate-y-2"
    >
      {/* Gambar Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={environment.IMAGE_URL + thumbnail}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Konten */}
      <div className="p-6 text-slate-200">
        <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2 group-hover:text-yellow-400 transition-colors duration-300">
          <BookOpen size={18} className="text-yellow-400" /> {name}
        </h3>
        <p className="text-slate-400 text-sm mb-5 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Tag size={14} className="text-yellow-400" />
            <span>{category}</span>
          </div>
          <Link
            to={`/homeprogram/${id}`}
            className="relative overflow-hidden bg-yellow-500 text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-yellow-400/40"
          >
            <span className="relative z-10">Lihat Detail</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Programs = () => {
  const { data: courses } = useSuspenseQuery({
    queryKey: ["programs"],
    queryFn: courseService.getAll,
  });

  return (
    <section
      id="programs"
      className="relative bg-transparent text-white py-24 overflow-hidden"
    >
      {/* Cahaya Ambient */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-500/10 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-400/10 blur-[120px]" />
      </div> */}

      {/* Header */}
      <div className="relative text-center mb-16 z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3 tracking-wide"
        >
          Program Pelatihan
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Tingkatkan kompetensi dan profesionalisme Anda melalui{" "}
          <span className="text-yellow-400 font-semibold">
            program unggulan
          </span>{" "}
          yang kami sediakan.
        </motion.p>
      </div>

      {/* Grid Card */}
      <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-10 z-10">
        {courses.map((course, index) => (
          <ProgramCard key={index} index={index} {...course} />
        ))}
      </div>

      {/* Tombol */}
      <div className="text-center mt-16 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="relative bg-yellow-500 text-black font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-yellow-400/40 overflow-hidden group transition-all"
        >
          <span className="relative z-10">Lihat Semua Program</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
        </motion.button>
      </div>

      {/* Partikel Cahaya */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-yellow-400/30 rounded-full"
            style={{
              width: Math.random() * 6 + 4,
              height: Math.random() * 6 + 4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Programs;
