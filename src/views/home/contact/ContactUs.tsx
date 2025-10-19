import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
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

const ContactUs = () => {
  return (
    <HomeLayout>
      <section className="relative min-h-screen text-white pt-24 pb-32 overflow-hidden bg-transparent">
        {/* Efek cahaya background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[400px] bg-gradient-to-b from-yellow-400/10 to-transparent blur-3xl opacity-40" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-yellow-500/10 to-transparent blur-2xl opacity-30" />
        </div>

        {/* Judul Halaman */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          className="relative text-center max-w-4xl mx-auto px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-5 drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">
            Hubungi Kami
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Kami siap membantu Anda. Silakan hubungi kami untuk informasi lebih
            lanjut mengenai pelatihan, kerja sama, atau konsultasi layanan.
          </p>
        </motion.div>

        {/* Info Kontak + Form */}
        <div className="max-w-6xl mx-auto mt-20 px-6 grid lg:grid-cols-2 gap-10">
          {/* Info Kontak */}
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">
              Informasi Kontak
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                  <MapPin className="text-yellow-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400 text-lg">
                    Alamat
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Jl. Veteran No.45, Kedung Waringin, Bekasi, Jawa Barat
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                  <Phone className="text-yellow-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400 text-lg">
                    Telepon
                  </h3>
                  <p className="text-gray-300 text-sm">(+62) 812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                  <Mail className="text-yellow-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400 text-lg">
                    Email
                  </h3>
                  <p className="text-gray-300 text-sm">
                    info@lembagapelatihan.id
                  </p>
                </div>
              </div>
            </div>

            {/* Frame Lokasi Google Map */}
            <motion.div
              variants={fadeIn("up", 0.4)}
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-yellow-400/10 shadow-lg mt-10"
            >
              <iframe
                title="Lokasi Kami"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3027606133677!2d106.99213407593087!3d-6.222765993768189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b7eebaa8891%3A0x2e9a2fa9b92e314!2sKedung%20Waringin%2C%20Bekasi!5e0!3m2!1sid!2sid!4v1697099918231!5m2!1sid!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* Form Kontak */}
          <motion.form
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onSubmit={(e) => e.preventDefault()}
            className="bg-slate-900/60 border border-yellow-400/10 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6"
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Kirim Pesan
            </h2>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 text-gray-200 placeholder-gray-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 text-gray-200 placeholder-gray-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Pesan Anda
              </label>
              <textarea
                rows={4}
                placeholder="Tulis pesan Anda di sini..."
                className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 text-gray-200 placeholder-gray-500 transition"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 font-semibold py-3 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center justify-center gap-2 transition"
            >
              <Send size={18} />
              Kirim Pesan
            </motion.button>
          </motion.form>
        </div>
      </section>
    </HomeLayout>
  );
};

export default ContactUs;
