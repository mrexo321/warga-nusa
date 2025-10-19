import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { userService } from "../../services/userService";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ✅ Schema terpisah
const createUserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const updateUserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
});

type CreateUserForm = z.infer<typeof createUserSchema>;
type UpdateUserForm = z.infer<typeof updateUserSchema>;

const ManagementUser = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // ✅ Fetch user list
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  // ✅ Tambah user
  const createUser = useMutation({
    mutationFn: async (data: CreateUserForm) => await userService.create(data),
    onSuccess: () => {
      toast.success("Pengguna berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      setIsOpen(false);
    },
    onError: () => toast.error("Gagal menambahkan pengguna."),
  });

  // ✅ Update user
  const updateUser = useMutation({
    mutationFn: async (payload: { id: number; name: string; email: string }) =>
      await userService.update(payload.id, {
        name: payload.name,
        email: payload.email,
      }),
    onSuccess: () => {
      toast.success("Pengguna berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      setEditingUser(null);
      setIsOpen(false);
    },
    onError: () => toast.error("Gagal memperbarui pengguna."),
  });

  // ✅ Hapus user
  const deleteUser = useMutation({
    mutationFn: async (id: number) => await userService.delete(id),
    onSuccess: () => {
      toast.success("Pengguna berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Gagal menghapus pengguna."),
  });

  // ✅ Hook form dinamis tergantung mode
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(editingUser ? updateUserSchema : createUserSchema),
  });

  // ✅ Filter pencarian
  const filteredUsers = users.filter(
    (u: any) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Saat klik edit
  const handleEdit = (user: any) => {
    setEditingUser(user);
    reset({
      name: user.name,
      email: user.email,
    });
    setIsOpen(true);
  };

  // ✅ Saat submit form
  const onSubmit = (data: any) => {
    if (editingUser) {
      updateUser.mutate({
        id: editingUser.id,
        name: data.name,
        email: data.email,
      });
    } else {
      createUser.mutate(data);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 text-slate-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold text-cyan-400">
            Manajemen Pengguna
          </h1>
          <button
            onClick={() => {
              setIsOpen(true);
              setEditingUser(null);
              reset();
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
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
                <th className="px-6 py-3 text-left">Nama</th>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user: any) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-3 font-medium">{user.name}</td>
                    <td className="px-6 py-3">{user.username}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-cyan-500/20 transition"
                      >
                        <Edit size={16} className="text-cyan-400" />
                      </button>
                      <button
                        onClick={() => deleteUser.mutate(user.id)}
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
                    {isLoading
                      ? "Memuat data pengguna..."
                      : isError
                      ? "Gagal memuat data"
                      : "Tidak ada pengguna ditemukan"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah/Edit */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/60"
            >
              <motion.div
                initial={{ scale: 0.9, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/70 border border-cyan-400/30 rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.2)] p-6 w-full max-w-md backdrop-blur-xl"
              >
                <h2 className="text-2xl font-bold text-cyan-400 mb-5 flex items-center gap-2">
                  {editingUser ? <Edit size={22} /> : <Plus size={22} />}
                  {editingUser ? "Edit Pengguna" : "Tambah Pengguna"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Nama */}
                  <div>
                    <label className="block mb-1 text-sm text-slate-300 font-medium">
                      Nama
                    </label>
                    <input
                      {...register("name")}
                      placeholder="Masukkan nama lengkap"
                      className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-400/60 focus:outline-none placeholder-slate-500 transition-all"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Username & Password hanya saat tambah */}
                  {!editingUser && (
                    <>
                      <div>
                        <label className="block mb-1 text-sm text-slate-300 font-medium">
                          Username
                        </label>
                        <input
                          {...register("username")}
                          placeholder="Masukkan username"
                          className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-400/60 focus:outline-none placeholder-slate-500 transition-all"
                        />
                        {errors.username && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.username.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-1 text-sm text-slate-300 font-medium">
                          Password
                        </label>
                        <input
                          {...register("password")}
                          type="password"
                          placeholder="Masukkan password"
                          className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-400/60 focus:outline-none placeholder-slate-500 transition-all"
                        />
                        {errors.password && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Email */}
                  <div>
                    <label className="block mb-1 text-sm text-slate-300 font-medium">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Masukkan email"
                      className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-400/60 focus:outline-none placeholder-slate-500 transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Tombol */}
                  <div className="flex justify-end space-x-3 pt-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsOpen(false);
                        setEditingUser(null);
                      }}
                      className="px-4 py-2 bg-slate-700/60 text-slate-300 rounded-lg border border-slate-600 hover:bg-slate-600/60 transition"
                    >
                      Batal
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={createUser.isPending || updateUser.isPending}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition disabled:opacity-60"
                    >
                      {editingUser
                        ? updateUser.isPending
                          ? "Menyimpan..."
                          : "Update"
                        : createUser.isPending
                        ? "Menyimpan..."
                        : "Simpan"}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default ManagementUser;
