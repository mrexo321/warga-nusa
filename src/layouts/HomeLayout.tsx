import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useMemo,
  memo,
} from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

const LightParticles = memo(({ theme }: { theme: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numParticles = 10;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 2,
      dy: Math.random() * 0.3 + 0.2,
      alpha: Math.random() * 0.5 + 0.3,
    }));

    const color =
      theme === "dark"
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
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
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

  const bgGradient = useMemo(
    () =>
      theme === "dark"
        ? "bg-gradient-to-br from-[#000000] via-[#0b0b0b] to-[#1a1a1a] text-white"
        : "bg-gradient-to-br from-[#ffffff] via-[#f9f9f9] to-[#f1f1f1] text-[#1a1a1a]",
    [theme]
  );

  const mainGradient = useMemo(
    () =>
      theme === "dark"
        ? "bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]"
        : "bg-gradient-to-br from-[#fdfdfd] via-[#f6f6f6] to-[#ededed]",
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen flex flex-col overflow-hidden relative ${bgGradient}`}
      >
        <Header />

        <main className={`flex-1 relative z-10 border-t border-yellow-400/10`}>
          {/* 🌕 Efek Cahaya GPU-friendly */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${
                theme === "dark"
                  ? "rgba(250, 204, 21, 0.05)"
                  : "rgba(250, 204, 21, 0.15)"
              } 0%, transparent 60%)`,
            }}
          />

          {/* ✨ Partikel */}
          <LightParticles theme={theme} />

          {/* Konten halaman */}
          <div
            className={`relative z-10 ${mainGradient} transition-colors duration-500`}
          >
            {children}
            <Footer />
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

export default memo(HomeLayout);
