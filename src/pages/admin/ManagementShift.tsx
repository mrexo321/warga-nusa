import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Plus, Clock, Edit, Trash2, Search, X } from "lucide-react";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { shiftService } from "../../services/shiftService";

const ManagementShift = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
  });

  const queryClient = useQueryClient();

  // 🔹 Ambil semua shift
  const { data: shifts } = useSuspenseQuery({
    queryKey: ["shifts"],
    queryFn: shiftService.getAll,
  });

  // 🔹 Tambah shift
  const createShiftMutation = useMutation({
    mutationFn: shiftService.createShift,
    onSuccess: () => {
      queryClient.invalidateQueries(["shifts"]);
      closeModal();
    },
  });

  // 🔹 Update shift
  const updateShiftMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      shiftService.updateShift(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["shifts"]);
      closeModal();
    },
  });

  // 🔹 Delete shift
  const deleteShiftMutation = useMutation({
    mutationFn: (id: number) => shiftService.deleteShift(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["shifts"]);
    },
  });

  const filteredShifts = shifts.filter((shift) =>
    shift.name.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (editMode = false, shift = null) => {
    setIsEditMode(editMode);
    setIsModalOpen(true);

    if (editMode && shift) {
      setForm({
        name: shift.name,
        checkIn: shift.checkIn,
        checkOut: shift.checkOut,
      });
      setCurrentId(shift.id);
    } else {
      setForm({ name: "", checkIn: "", checkOut: "" });
      setCurrentId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({ name: "", checkIn: "", checkOut: "" });
    setIsEditMode(false);
    setCurrentId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.checkIn || !form.checkOut)
      return alert("Semua field wajib diisi!");

    if (isEditMode && currentId) {
      updateShiftMutation.mutate({ id: currentId, data: form });
    } else {
      createShiftMutation.mutate(form);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus shift ini?")) {
      deleteShiftMutation.mutate(id);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <h1 className="text-2xl font-bold text-cyan-400">Manajemen Shift</h1>

          <button
            onClick={() => openModal(false)}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
          >
            <Plus size={18} />
            <span>Tambah Shift</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari shift..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-700/50">
          <table className="w-[700px] md:w-full text-sm text-slate-300">
            <thead>
              <tr className="bg-slate-800/70 text-slate-200 uppercase text-xs tracking-wider">
                <th className="px-6 py-3 text-left">Nama Shift</th>
                <th className="px-6 py-3 text-left">Jam</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map((shift) => (
                <tr
                  key={shift.id}
                  className="border-t border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-3 font-medium whitespace-nowrap">
                    {shift.name}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-amber-400" />
                      <span>
                        {shift.checkIn} - {shift.checkOut}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center space-x-2 whitespace-nowrap">
                    <button
                      className="p-2 rounded-lg bg-slate-700/50 hover:bg-cyan-500/20 transition"
                      onClick={() => openModal(true, shift)}
                    >
                      <Edit size={16} className="text-cyan-400" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 transition"
                      onClick={() => handleDelete(shift.id)}
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredShifts.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-slate-500 italic"
                  >
                    Tidak ada shift ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500 text-center md:hidden mt-2">
          Geser tabel ke kanan untuk melihat detail &raquo;
        </p>

        {/* Modal Tambah/Edit Shift */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 w-full max-w-md rounded-xl p-6 shadow-lg relative border border-slate-700">
              <button
                className="absolute top-3 right-3 text-slate-400 hover:text-red-400"
                onClick={closeModal}
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold text-cyan-400 mb-4">
                {isEditMode ? "Edit Shift" : "Tambah Shift"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">
                    Nama Shift
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">
                    Check In
                  </label>
                  <input
                    type="time"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={form.checkIn}
                    onChange={(e) =>
                      setForm({ ...form, checkIn: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">
                    Check Out
                  </label>
                  <input
                    type="time"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={form.checkOut}
                    onChange={(e) =>
                      setForm({ ...form, checkOut: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={
                    createShiftMutation.isPending ||
                    updateShiftMutation.isPending
                  }
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold py-2 rounded-lg mt-2 hover:scale-[1.02] transition disabled:opacity-50"
                >
                  {isEditMode
                    ? updateShiftMutation.isPending
                      ? "Menyimpan..."
                      : "Simpan Perubahan"
                    : createShiftMutation.isPending
                    ? "Menyimpan..."
                    : "Simpan Shift"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ManagementShift;
