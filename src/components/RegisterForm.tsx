import React from "react";

const RegisterForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-black"></div>

      {/* Registration Card */}
      <div className="relative w-full max-w-md bg-slate-800/80 backdrop-blur-sm border border-slate-700 shadow-2xl rounded-lg">
        <div className="p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-3 rounded-lg shadow-lg">
                {/* Shield Icon SVG */}
                <svg
                  className="w-8 h-8 text-slate-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.4 7 14.8 8.6 14.8 10V11.2C15.2 11.2 15.7 11.7 15.7 12.2V16.7C15.7 17.2 15.2 17.7 14.8 17.7H9.2C8.7 17.7 8.2 17.2 8.2 16.7V12.2C8.2 11.7 8.7 11.2 9.2 11.2V10C9.2 8.6 10.6 7 12 7ZM12 8.2C11.2 8.2 10.5 8.9 10.5 9.7V11.2H13.5V9.7C13.5 8.9 12.8 8.2 12 8.2Z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">WargaNusa</h1>
            <h2 className="text-lg text-slate-300 font-medium">
              Daftar Akun Baru
            </h2>
          </div>

          {/* Registration Form */}
          <div className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-slate-300 text-sm font-medium"
              >
                Nama Lengkap
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-all duration-200"
                placeholder=""
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-slate-300 text-sm font-medium"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-all duration-200"
                placeholder=""
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-slate-300 text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-all duration-200"
                placeholder=""
              />
            </div>

            {/* Register Button */}
            <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-amber-500/25 focus:outline-none focus:ring-2 focus:ring-amber-400/50">
              Daftar
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-slate-400 text-sm">
              Sudah punya akun?{" "}
              <span className="text-amber-400 hover:text-amber-300 font-medium transition-colors underline-offset-4 hover:underline cursor-pointer">
                Masuk di sini
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Brand Attribution */}
      <div className="absolute bottom-4 right-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-slate-300">
          Made with Emergent
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
