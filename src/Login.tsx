import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogin, loginSchema } from "./types/auth";
import { setUserData } from "./store/userSlice";
import { authService } from "./services/authService";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react"; // ⬅️ Tambahkan ikon panah

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: ILogin) => await authService.login(data),
    onSuccess: (response) => {
      const userData = {
        userId: response.data.userId,
        name: response.data.name,
        username: response.data.username,
        role: response.data.role,
        token: response.data.token,
      };
      dispatch(setUserData(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login berhasil 🎉");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Username atau password salah!");
    },
  });

  const onSubmit = (data: ILogin) => loginMutation.mutate(data);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden
      bg-gradient-to-b from-[#0d1117] via-[#0a0e14] to-[#05070a] text-white"
    >
      {/* 🔹 Tombol Kembali */}
      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full
        bg-[#0d1117]/70 border border-yellow-400/20 backdrop-blur-md text-yellow-400
        hover:bg-yellow-400 hover:text-black hover:shadow-yellow-400/50 transition-all"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Kembali</span>
      </motion.button>

      {/* Efek bintang halus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Cahaya lembut di tengah */}
      <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/10 blur-[160px] rounded-full"></div>

      {/* Card login */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md bg-[#0d1117]/80 border border-yellow-400/10
        backdrop-blur-xl rounded-2xl shadow-2xl p-8 z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-yellow-400 tracking-wide mb-2"
          >
            WajraSena
          </motion.h1>
          <p className="text-gray-400 text-sm">Masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-300 font-medium">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              placeholder="Masukkan username"
              className={`w-full px-4 py-3 bg-[#0a0e14]/60 border rounded-lg
              text-white placeholder-gray-500 focus:outline-none
              focus:ring-2 focus:ring-yellow-400/40 transition-all
              ${
                errors.username
                  ? "border-red-500 focus:ring-red-400/40"
                  : "border-yellow-400/20"
              }`}
            />
            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-300 font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Masukkan password"
              className={`w-full px-4 py-3 bg-[#0a0e14]/60 border rounded-lg
              text-white placeholder-gray-500 focus:outline-none
              focus:ring-2 focus:ring-yellow-400/40 transition-all
              ${
                errors.password
                  ? "border-red-500 focus:ring-red-400/40"
                  : "border-yellow-400/20"
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Tombol Login */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loginMutation.isPending}
            className={`w-full py-3 px-4 font-semibold rounded-lg
            bg-gradient-to-r from-yellow-400 to-amber-500 text-black
            hover:from-yellow-300 hover:to-amber-400 transition-all
            shadow-lg hover:shadow-yellow-400/30
            ${
              loginMutation.isPending
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            {loginMutation.isPending ? "Memproses..." : "Masuk"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
