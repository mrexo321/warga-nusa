import React from "react";
import Section from "./Section";
import StatsCard from "./StatsCard";

const About = () => {
  const stats = [
    {
      number: "15+",
      label: "Tahun Pengalaman",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-500"
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
          className="w-8 h-8 text-yellow-500"
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
          className="w-8 h-8 text-yellow-500"
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
          className="w-8 h-8 text-yellow-500"
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
    <Section background="gray" id="about">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Tentang WargaNusa
        </h2>
        <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
          <p className="mb-4">
            Wajrasena Garda Nusantara (WargaNusa) adalah perusahaan terdepan
            dalam bidang jasa keamanan dan pelatihan security di Indonesia.
            Dengan pengalaman lebih dari 15 tahun, kami telah menjadi mitra
            terpercaya untuk berbagai institusi dan perusahaan.
          </p>
          <p>
            Komitmen kami adalah menghasilkan tenaga keamanan yang profesional,
            handal, dan memiliki integritas tinggi melalui program pelatihan
            berkualitas dengan standar internasional.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            number={stat.number}
            label={stat.label}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Training Image */}
      <div className="text-center">
        <img
          src="https://images.unsplash.com/photo-1750068382387-3e4708c998a8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxzZWN1cml0eSUyMHRyYWluaW5nfGVufDB8fHx8MTc1Nzc0ODA4MHww&ixlib=rb-4.1.0&q=85"
          alt="Training"
          className="w-full max-w-4xl mx-auto rounded-lg shadow-lg border-4 border-yellow-400"
        />
      </div>
    </Section>
  );
};

export default About;
