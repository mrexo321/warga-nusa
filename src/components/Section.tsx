import React from "react";
import clsx from "clsx";

const Section = ({
  children,
  className = "",
  background = "dark",
  padding = "default",
  overlay = true, // aktifkan efek cahaya lembut default
}) => {
  // Tema warna agar 100% selaras dengan Hero
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    yellow: "bg-yellow-50",

    // Tema gelap elegan (sama seperti Hero)
    dark: "bg-gradient-to-b from-black via-neutral-900 to-zinc-950",
    darker: "bg-gradient-to-b from-neutral-900 via-zinc-950 to-black",
  };

  const paddings = {
    small: "py-8 lg:py-12",
    default: "py-12 lg:py-16",
    large: "py-16 lg:py-24",
  };

  // Jika background berupa custom class Tailwind
  const isCustomBackground = background.includes(" ");

  return (
    <section
      className={clsx(
        "relative w-full overflow-hidden",
        paddings[padding],
        isCustomBackground ? background : backgrounds[background],
        className
      )}
    >
      {/* 🌟 Efek cahaya dekoratif (selaras dengan Hero) */}
      {overlay && (
        <>
          {/* Cahaya besar lembut di atas */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[180px] pointer-events-none" />
          {/* Cahaya kecil di bawah kanan */}
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />
          {/* Gradasi radial halus */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.05)_0%,transparent_70%)] pointer-events-none" />
        </>
      )}

      {/* ✨ Kontainer isi konten */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>

      {/* 🔆 Partikel halus (mirip Hero tapi redup) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-yellow-400/15 rounded-full"
            style={{
              width: Math.random() * 5 + 2,
              height: Math.random() * 5 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${i} ${
                Math.random() * 6 + 4
              }s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Animasi partikel */}
      <style jsx>{`
        ${[...Array(10)]
          .map(
            (_, i) => `
            @keyframes float-${i} {
              0%, 100% { transform: translateY(0); opacity: 0.3; }
              50% { transform: translateY(-8px); opacity: 1; }
            }
          `
          )
          .join("\n")}
      `}</style>
    </section>
  );
};

export default Section;
