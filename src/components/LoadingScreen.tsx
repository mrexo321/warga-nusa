import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ThemeContext } from "../layouts/HomeLayout";

const LoadingScreen = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-8">
      {/* Lingkaran energi berdenyut */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.6, 1, 0.6] }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-inner ${
          theme === "dark"
            ? "bg-yellow-400/20 ring-2 ring-yellow-400/30"
            : "bg-yellow-300/30 ring-2 ring-yellow-400/40"
        }`}
      >
        <Sparkles
          className={`w-8 h-8 ${
            theme === "dark" ? "text-yellow-400" : "text-yellow-600"
          }`}
        />
        <motion.div
          className={`absolute inset-0 rounded-full ${
            theme === "dark" ? "bg-yellow-400/10" : "bg-yellow-400/20"
          }`}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Text shimmer */}
      <div className="relative overflow-hidden">
        <p
          className={`text-lg font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Memuat pengalaman terbaik untukmu...
        </p>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-shimmer" />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 1.8s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
