import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="relative bg-transparent text-white py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="grid md:grid-cols-3 gap-10 border-b border-slate-800 pb-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">
              {t("company")}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-5">
              {t("description")}
            </p>
            <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-2 w-fit">
              <img
                src="/logo1.png"
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-yellow-400 font-semibold">
                {t("company")}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">
              {t("navigation_title")}
            </h4>
            <ul className="space-y-3 text-gray-400">
              {[
                { label: t("navigation_links.home"), href: "#home" },
                { label: t("navigation_links.programs"), href: "#programs" },
                { label: t("navigation_links.news"), href: "#news" },
                { label: t("navigation_links.about"), href: "#about" },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-400/60 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">
              {t("contact_title")}
            </h4>
            <div className="text-gray-400 space-y-3">
              <p className="flex items-center gap-2 hover:text-yellow-400 transition">
                <Mail size={16} className="text-yellow-400" />{" "}
                {t("contact.email")}
              </p>
              <p className="flex items-center gap-2 hover:text-yellow-400 transition">
                <Phone size={16} className="text-yellow-400" />{" "}
                {t("contact.phone")}
              </p>
              <p className="flex items-center gap-2 hover:text-yellow-400 transition">
                <MapPin size={16} className="text-yellow-400" />{" "}
                {t("contact.address")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-500">
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
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <i className={`ri-${social}-fill text-xl`} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
