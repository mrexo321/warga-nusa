import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomeLayout = ({ children }: any) => {
  return (
    <div
      className="min-h-screen flex flex-col text-white overflow-hidden relative
      bg-gradient-to-br from-[#000000] via-[#0b0b0b] to-[#1a1a1a]"
    >
      {/* Header */}
      <Header />

      {/* Main Section — di sinilah tema globalnya */}
      <main
        className="flex-1 relative z-10
        bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]
        text-[#f5f5f5] border-t border-yellow-400/10"
      >
        {/* Cahaya latar lembut di belakang seluruh konten */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cahaya atas */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[160px]" />
          {/* Cahaya bawah */}
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[100px]" />
        </div>

        {/* Isi konten */}
        <div className="relative z-10">
          {children}
          <Footer />
        </div>
      </main>

      {/* Footer */}

      {/* Efek bintang lembut di seluruh halaman */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Partikel bercahaya lembut */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-yellow-400/20 rounded-full"
            style={{
              width: Math.random() * 6 + 3,
              height: Math.random() * 6 + 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 4}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Animasi floating */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HomeLayout;
