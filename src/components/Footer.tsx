import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../layouts/HomeLayout";

const Footer = () => {
  const { t } = useTranslation("footer");
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <footer
      className={`relative py-24 overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-transparent text-white" : "bg-transparent text-slate-900"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div
          className={`grid md:grid-cols-3 gap-10 border-b pb-10 transition-colors duration-700 ${
            isDark ? "border-slate-800" : "border-slate-300"
          }`}
        >
          {/* Company Info */}
          <div>
            <h3
              className={`text-2xl font-bold mb-4 transition-colors duration-700 ${
                isDark ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              {t("company")}
            </h3>
            <p
              className={`leading-relaxed mb-5 transition-colors duration-700 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              {t("description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className={`text-lg font-semibold mb-4 transition-colors duration-700 ${
                isDark ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              {t("navigation_title")}
            </h4>
            <ul
              className={`space-y-3 transition-colors duration-700 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              {[
                { label: t("navigation_links.home"), href: "#home" },
                { label: t("navigation_links.programs"), href: "#programs" },
                { label: t("navigation_links.news"), href: "#news" },
                { label: t("navigation_links.about"), href: "#about" },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-2 group transition-all duration-300 ${
                      isDark ? "hover:text-yellow-400" : "hover:text-yellow-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full scale-0 group-hover:scale-100 transition-transform ${
                        isDark ? "bg-yellow-400/60" : "bg-yellow-600/60"
                      }`}
                    ></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`text-lg font-semibold mb-4 transition-colors duration-700 ${
                isDark ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              {t("contact_title")}
            </h4>
            <div
              className={`space-y-3 transition-colors duration-700 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              <p
                className={`flex items-center gap-2 transition-all duration-300 ${
                  isDark ? "hover:text-yellow-400" : "hover:text-yellow-600"
                }`}
              >
                <Mail
                  size={16}
                  className={isDark ? "text-yellow-400" : "text-yellow-600"}
                />{" "}
                {t("contact.email")}
              </p>
              <p
                className={`flex items-center gap-2 transition-all duration-300 ${
                  isDark ? "hover:text-yellow-400" : "hover:text-yellow-600"
                }`}
              >
                <Phone
                  size={16}
                  className={isDark ? "text-yellow-400" : "text-yellow-600"}
                />{" "}
                {t("contact.phone")}
              </p>
              <p
                className={`flex items-center gap-2 transition-all duration-300 ${
                  isDark ? "hover:text-yellow-400" : "hover:text-yellow-600"
                }`}
              >
                <MapPin
                  size={16}
                  className={isDark ? "text-yellow-400" : "text-yellow-600"}
                />{" "}
                {t("contact.address")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center mt-8 text-sm transition-colors duration-700 ${
            isDark ? "text-gray-500" : "text-slate-500"
          }`}
        >
          <p>
            {t("copyright", {
              year: new Date().getFullYear(),
              company: t("company"),
            })}
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {["facebook", "twitter", "instagram"].map((social, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1 }}
                className={`transition-all duration-300 ${
                  isDark
                    ? "text-gray-400 hover:text-yellow-400"
                    : "text-slate-500 hover:text-yellow-600"
                }`}
              >
                <i className={`ri-${social}-fill text-xl`} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Partikel Cahaya */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full transition-colors duration-700 ${
              isDark ? "bg-yellow-400/30" : "bg-yellow-500/30"
            }`}
            style={{
              width: Math.random() * 5 + 4,
              height: Math.random() * 5 + 4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
