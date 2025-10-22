import React, { useState, useEffect, createContext, useMemo } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

const HomeLayout = ({ children }: any) => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // ✅ Partikel dibuat 1x saja (tidak re-render setiap kali layout berubah)
  const particles = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 4,
    }));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen flex flex-col overflow-hidden relative transition-colors duration-700 ease-in-out ${
          theme === "dark"
            ? "bg-gradient-to-br from-[#000000] via-[#0b0b0b] to-[#1a1a1a] text-white"
            : "bg-gradient-to-br from-[#ffffff] via-[#f9f9f9] to-[#f1f1f1] text-[#1a1a1a]"
        }`}
      >
        <Header />

        <main
          className={`flex-1 relative z-10 border-t border-yellow-400/10 transition-colors duration-700 ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] text-[#f5f5f5]"
              : "bg-gradient-to-br from-[#fdfdfd] via-[#f6f6f6] to-[#ededed] text-[#111111]"
          }`}
        >
          {/* 🌕 Efek Cahaya */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] transition-opacity duration-700 will-change-transform`}
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(250, 204, 21, 0.08)"
                    : "rgba(250, 204, 21, 0.25)",
              }}
            />
            <div
              className={`absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full blur-[80px] transition-opacity duration-700 will-change-transform`}
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(250, 204, 21, 0.05)"
                    : "rgba(250, 204, 21, 0.15)",
              }}
            />
          </div>

          {/* Konten */}
          <div className="relative z-10">
            {children}
            <Footer />
          </div>
        </main>

        {/* ✨ Partikel ringan */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className={`absolute rounded-full ${
                theme === "dark" ? "bg-yellow-400/20" : "bg-yellow-400/40"
              }`}
              style={{
                width: p.size,
                height: p.size,
                top: p.top,
                left: p.left,
                animation: `float ${p.duration}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(-10px); opacity: 1; }
          }
        `}</style>
      </div>
    </ThemeContext.Provider>
  );
};

export default HomeLayout;
