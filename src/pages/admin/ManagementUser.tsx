import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { userService } from "../../services/userService";

// ✅ Schema validasi Zod
const userSchema = z.object({
  role_id: z.string().min(1, "Role wajib dipilih"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
});

type UserForm = z.infer<typeof userSchema>;

const ManagementUser = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  // 🔹 Data role dummy
  const roles = [
    { id: "0199b90c-75c0-7826-94b0-0b8f45bec03f", name: "admin" },
    { id: "0199bae7-df0e-7c06-a769-2ef7c4d4d80c", name: "user" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  // 🔹 Ambil semua user saat load
  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch {
      toast.error("Gagal memuat data pengguna.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Tambah user
  const onSubmit = async (data: UserForm) => {
    try {
      const formData = new FormData();
      formData.append("role_id", data.role_id);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", "123"); // default password

      await userService.create(formData);
      toast.success("Pengguna berhasil ditambahkan!");
      reset();
      setIsOpen(false);
      fetchUsers();
    } catch {
      toast.error("Gagal menambahkan pengguna.");
    }
  };

  // 🔹 Hapus user
  const handleDelete = async (id: number) => {
    try {
      await userService.delete(id);
      toast.success("Pengguna berhasil dihapus!");
      fetchUsers();
    } catch {
      toast.error("Gagal menghapus pengguna.");
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 text-slate-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
          >
            <Plus size={18} />
            <span>Tambah Pengguna</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari pengguna..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-300 border border-slate-700/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-800/70 text-slate-200 uppercase text-xs tracking-wider">
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-3 font-medium">{user.username}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">
                      {roles.find((r) => r.id === user.role_id)?.name || "-"}
                    </td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button className="p-2 rounded-lg bg-slate-700/50 hover:bg-cyan-500/20 transition">
                        <Edit size={16} className="text-cyan-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 transition"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-slate-500 italic"
                  >
                    Tidak ada pengguna ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah User */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md space-y-4">
              <h2 className="text-xl font-semibold text-slate-100">
                Tambah Pengguna
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Role */}
                <div>
                  <label className="block mb-1 text-sm text-slate-300">
                    Role
                  </label>
                  <select
                    {...register("role_id")}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="">Pilih Role</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  {errors.role_id && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.role_id.message}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label className="block mb-1 text-sm text-slate-300">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    placeholder="Masukkan username"
                  />
                  {errors.username && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 text-sm text-slate-300">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    placeholder="Masukkan email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Tombol */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:scale-105 transition"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ManagementUser;
