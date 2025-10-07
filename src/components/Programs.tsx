import React from "react";
import Section from "./Section";

const ProgramCard = ({ title, description, icon, duration, level }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-yellow-400">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 text-center leading-relaxed">
        {description}
      </p>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Durasi:</span>
          <span className="font-medium text-gray-700">{duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Level:</span>
          <span className="font-medium text-gray-700">{level}</span>
        </div>
      </div>

      <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded transition-colors">
        Daftar Sekarang
      </button>
    </div>
  );
};

const Programs = () => {
  const programs = [
    {
      title: "Basic Security Training",
      description:
        "Pelatihan dasar keamanan untuk pemula dengan materi fundamental security dan protokol keselamatan.",
      duration: "2 Minggu",
      level: "Pemula",
      icon: (
        <svg
          className="w-12 h-12 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Advanced Security Management",
      description:
        "Program lanjutan untuk supervisor dan manajer keamanan dengan fokus pada leadership dan manajemen tim.",
      duration: "4 Minggu",
      level: "Menengah",
      icon: (
        <svg
          className="w-12 h-12 text-yellow-500"
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
      title: "Cyber Security Fundamentals",
      description:
        "Pelatihan keamanan siber untuk era digital dengan materi terkini tentang ancaman cyber dan proteksi data.",
      duration: "3 Minggu",
      level: "Menengah",
      icon: (
        <svg
          className="w-12 h-12 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "VIP Protection Training",
      description:
        "Pelatihan khusus untuk close protection dan pengamanan VIP dengan standar internasional.",
      duration: "6 Minggu",
      level: "Lanjutan",
      icon: (
        <svg
          className="w-12 h-12 text-yellow-500"
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
    {
      title: "Emergency Response Training",
      description:
        "Pelatihan tanggap darurat dan crisis management untuk situasi emergency di berbagai lingkungan.",
      duration: "3 Minggu",
      level: "Menengah",
      icon: (
        <svg
          className="w-12 h-12 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    {
      title: "Corporate Security Training",
      description:
        "Pelatihan keamanan korporat dengan fokus pada asset protection dan business continuity.",
      duration: "4 Minggu",
      level: "Lanjutan",
      icon: (
        <svg
          className="w-12 h-12 text-yellow-500"
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
  ];

  return (
    <Section id="programs">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Program Pelatihan
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Pilih program pelatihan yang sesuai dengan kebutuhan dan level
          kemampuan Anda
        </p>
      </div>

      {/* Programs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            title={program.title}
            description={program.description}
            duration={program.duration}
            level={program.level}
            icon={program.icon}
          />
        ))}
      </div>
    </Section>
  );
};

export default Programs;
