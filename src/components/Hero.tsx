import React from "react";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1750068382387-3e4708c998a8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxzZWN1cml0eSUyMHRyYWluaW5nfGVufDB8fHx8MTc1Nzc0ODA4MHww&ixlib=rb-4.1.0&q=85')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Wajrasena Garda
          <br />
          <span className="text-yellow-400">Nusantara</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 leading-relaxed">
          Pelatihan keamanan profesional dengan standar internasional.
          <br />
          Membangun SDM keamanan yang kompeten dan terpercaya.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" className="shadow-lg">
            Lihat Pelatihan →
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black shadow-lg"
          >
            Tentang Kami
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
