import { useTranslation } from "react-i18next";
import { useContext, useEffect, useRef, memo } from "react";
import { ThemeContext } from "../layouts/HomeLayout";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation("footer");
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Partikel Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const numParticles = 8;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 3,
      dy: Math.random() * 0.3 + 0.2,
      alpha: Math.random() * 0.5 + 0.3,
    }));

    // gunakan warna partikel sesuai theme layout
    const color = isDark
      ? "rgba(250, 204, 21, 0.25)"
      : "rgba(250, 204, 21, 0.45)";

    let animationFrame: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.closePath();
        p.y -= p.dy;
        if (p.y < -10) p.y = height + 10;
      }
      animationFrame = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  // gunakan background main layout
  const bgMainGradient = isDark
    ? "bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]"
    : "bg-gradient-to-br from-[#fdfdfd] via-[#f6f6f6] to-[#ededed]";

  return (
    <footer className="relative py-24 overflow-hidden transition-colors duration-700 text-slate-900 bg-transparent">
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
              <p className="flex items-center gap-2">
                <Mail
                  size={16}
                  className={isDark ? "text-yellow-400" : "text-yellow-600"}
                />
                {t("contact.email")}
              </p>
              <p className="flex items-center gap-2">
                <Phone
                  size={16}
                  className={isDark ? "text-yellow-400" : "text-yellow-600"}
                />
                {t("contact.phone")}
              </p>
              <p className="flex items-center gap-2">
                <MapPin
                  size={32}
                  className={isDark ? "text-yellow-400" : "text-yellow-600"}
                />
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
        </div>
      </div>

      {/* ✨ Canvas Partikel */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />
    </footer>
  );
};

export default memo(Footer);
