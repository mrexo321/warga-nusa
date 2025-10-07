import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogin, loginSchema } from "./types/auth";
import { setUserData } from "./store/userSlice";
import { authService } from "./services/authService";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Setup form + validasi Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ React Query mutation
  const loginMutation = useMutation({
    mutationFn: async (data: ILogin) => await authService.login(data),
    onSuccess: (response) => {
      const userData = {
        // id: response.data.id,
        userId: response.data.userId,
        role: response.data.role,
        token: response.data.token,
      };

      dispatch(setUserData(userData));
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Login berhasil 🎉");
      console.log("response", response.data);

      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Username atau password salah!");
    },
  });

  // ✅ Form submit handler
  const onSubmit = (data: ILogin) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-black"></div>

      <div className="relative w-full max-w-md bg-slate-800/80 backdrop-blur-sm border border-slate-700 shadow-2xl rounded-lg">
        {/* <Link to="/" className="p-2 text-amber-500 text-lg cursor-pointer">
          Kembali
        </Link> */}

        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">WargaNusa</h1>
            <div className="flex justify-center ">
              <svg
                className="w-16 h-16 bg-transparent text-slate-900 "
                fill="oklch(85.2% 0.199 91.936)"
                viewBox="0 0 24 24"
              >
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.4 7 14.8 8.6 14.8 10V11.2C15.2 11.2 15.7 11.7 15.7 12.2V16.7C15.7 17.2 15.2 17.7 14.8 17.7H9.2C8.7 17.7 8.2 17.2 8.2 16.7V12.2C8.2 11.7 8.7 11.2 9.2 11.2V10C9.2 8.6 10.6 7 12 7ZM12 8.2C11.2 8.2 10.5 8.9 10.5 9.7V11.2H13.5V9.7C13.5 8.9 12.8 8.2 12 8.2Z" />
              </svg>
            </div>
            <h2 className="text-lg text-slate-300 font-medium">
              Masuk ke Akun
            </h2>
          </div>

          <div className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-slate-300 text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                className={`w-full px-4 py-3 bg-slate-700/50 border ${
                  errors.username ? "border-red-500" : "border-slate-600"
                } rounded-lg text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-all duration-200`}
              />
              {errors.username && (
                <p className="text-red-400 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-slate-300 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className={`w-full px-4 py-3 bg-slate-700/50 border ${
                  errors.password ? "border-red-500" : "border-slate-600"
                } rounded-lg text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-all duration-200`}
              />
              {errors.password && (
                <p className="text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className={`w-full ${
                loginMutation.isPending
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
              } text-slate-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200`}
            >
              {loginMutation.isPending ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
