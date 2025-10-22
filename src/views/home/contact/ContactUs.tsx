import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import HomeLayout, { ThemeContext } from "../../../layouts/HomeLayout";
import { useTranslation } from "react-i18next";

const fadeIn = (direction = "up", delay = 0) => ({
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
});

const ContactUs = () => {
  const { t } = useTranslation("contact");
  const { isDark } = useContext(ThemeContext);

  return (
    <HomeLayout>
      <section className="relative min-h-screen pt-24 pb-32 overflow-hidden transition-colors duration-700">
        {/* Efek cahaya background */}
        <div className="absolute inset-0 pointer-events-none">
          {isDark ? (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[400px] bg-yellow-400/10 blur-3xl opacity-40" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-500/10 blur-2xl opacity-30" />
            </>
          ) : (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[400px] bg-yellow-300/20 blur-3xl opacity-50" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-400/10 blur-2xl opacity-40" />
            </>
          )}
        </div>

        {/* Judul Halaman */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          className="relative text-center max-w-4xl mx-auto px-6"
        >
          <h1
            className={`text-4xl text-white md:text-6xl font-extrabold mb-5 ${
              isDark ? "" : "text-yellow-600"
            }`}
          >
            {t("title")}
          </h1>
          <p className={`text-lg md:text-xl leading-relaxed`}>
            {t("description")}
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
            <h2
              className={`text-3xl font-bold mb-6 ${
                isDark ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              {t("contactInfo")}
            </h2>

            <div className="space-y-6">
              {/* Alamat */}
              <div
                className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/60 border-yellow-400/10 hover:border-yellow-400/40"
                    : "bg-white border-yellow-300/40 hover:border-yellow-500/50 shadow-lg"
                }`}
              >
                <MapPin
                  className={isDark ? "text-yellow-400" : "text-yellow-600"}
                  size={24}
                />
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      isDark ? "text-yellow-400" : "text-yellow-600"
                    }`}
                  >
                    {t("addressLabel")}
                  </h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                    {t("addressValue")}
                  </p>
                </div>
              </div>

              {/* Telepon */}
              <div
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/60 border-yellow-400/10 hover:border-yellow-400/40"
                    : "bg-white border-yellow-300/40 hover:border-yellow-500/50 shadow-lg"
                }`}
              >
                <Phone
                  className={isDark ? "text-yellow-400" : "text-yellow-600"}
                  size={24}
                />
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      isDark ? "text-yellow-400" : "text-yellow-600"
                    }`}
                  >
                    {t("phoneLabel")}
                  </h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                    {t("phoneValue")}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/60 border-yellow-400/10 hover:border-yellow-400/40"
                    : "bg-white border-yellow-300/40 hover:border-yellow-500/50 shadow-lg"
                }`}
              >
                <Mail
                  className={isDark ? "text-yellow-400" : "text-yellow-600"}
                  size={24}
                />
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      isDark ? "text-yellow-400" : "text-yellow-600"
                    }`}
                  >
                    {t("emailLabel")}
                  </h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                    {t("emailValue")}
                  </p>
                </div>
              </div>
            </div>

            {/* Frame Lokasi Google Map */}
            <motion.div
              variants={fadeIn("up", 0.4)}
              whileInView="show"
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden border mt-10 shadow-lg ${
                isDark
                  ? "border-yellow-400/10"
                  : "border-yellow-300/40 bg-white"
              }`}
            >
              <iframe
                title="Lokasi Kami"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3027606133677!2d106.99213407593087!3d-6.222765993768189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b7eebaa8891%3A0x2e9a2fa9b92e314!2sKedung%20Waringin%2C%20Bekasi!5e0!3m2!1sid!2sid!4v1697099918231!5m2!1sid!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
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
            className={`rounded-2xl p-8 shadow-xl space-y-6 backdrop-blur-md transition-all duration-500 ${
              isDark
                ? "bg-slate-900/60 border border-yellow-400/10"
                : "bg-white border border-yellow-300/40"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              {t("formTitle")}
            </h2>

            {/* Input */}
            <div>
              <label
                className={`block text-sm mb-2 ${
                  isDark ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {t("nameLabel")}
              </label>
              <input
                type="text"
                placeholder={t("namePlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
                  isDark
                    ? "bg-slate-800/80 border-slate-700 text-gray-200 focus:ring-yellow-400/40"
                    : "bg-white border-yellow-200 text-gray-800 focus:ring-yellow-500/30"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm mb-2 ${
                  isDark ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
                  isDark
                    ? "bg-slate-800/80 border-slate-700 text-gray-200 focus:ring-yellow-400/40"
                    : "bg-white border-yellow-200 text-gray-800 focus:ring-yellow-500/30"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm mb-2 ${
                  isDark ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {t("messageLabel")}
              </label>
              <textarea
                rows={4}
                placeholder={t("messagePlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
                  isDark
                    ? "bg-slate-800/80 border-slate-700 text-gray-200 focus:ring-yellow-400/40"
                    : "bg-white border-yellow-200 text-gray-800 focus:ring-yellow-500/30"
                }`}
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full font-semibold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition ${
                isDark
                  ? "bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                  : "bg-gradient-to-r from-yellow-300 to-yellow-500 text-white hover:shadow-[0_0_15px_rgba(250,204,21,0.5)]"
              }`}
            >
              <Send size={18} />
              {t("submit")}
            </motion.button>
          </motion.form>
        </div>
      </section>
    </HomeLayout>
  );
};

export default ContactUs;
