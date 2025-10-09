import React from "react";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center bg-black overflow-hidden border-b border-yellow-400">
      {/* Background pattern (opsional, biar elegan) */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />

      {/* Konten utama */}
      <div className="relative z-10 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-wide">
          Wajrasena Garda Nusantara
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
          Media Pelatihan dan Pengembangan SDM Keamanan Berbasis Teknologi.
          <br />
          Membangun profesionalisme dengan dedikasi dan disiplin tinggi.
        </p>

        {/* Tombol CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" className="shadow-md">
            Lihat Program
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black shadow-md"
          >
            Tentang Kami
          </Button>
        </div>

        {/* Logo / Ikon di bawah teks */}
        <div className="mt-12 flex justify-center">
          <div className="bg-yellow-400/10 p-6 rounded-2xl border border-yellow-400/30">
            <img
              src="/logo1.png"
              alt="Logo Wajrasena"
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Efek dekoratif bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default Hero;
