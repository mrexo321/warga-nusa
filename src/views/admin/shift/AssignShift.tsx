import React, { useState, useMemo } from "react";
import MainLayout from "../../../layouts/MainLayout";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { shiftService } from "../../../services/shiftService";
import { userService } from "../../../services/userService";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  CheckCircle2,
  Trash2,
  Search,
} from "lucide-react";
import { toast } from "sonner";

const AssignShift = () => {
  const queryClient = useQueryClient();

  const [selectedShift, setSelectedShift] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedAssignedIds, setSelectedAssignedIds] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // Fetch data
  const { data: shifts, isLoading: loadingShifts } = useQuery({
    queryKey: ["shifts"],
    queryFn: shiftService.getAll,
  });

  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  const { data: userShiftData } = useSuspenseQuery({
    queryKey: ["user-shifts", currentYear, currentMonth],
    queryFn: () => shiftService.getUserShift(currentYear, currentMonth),
  });

  // Mutations
  const applyShiftMutation = useMutation({
    mutationFn: (payload: { userId: string; shiftId: string; date: string }) =>
      shiftService.applyShift(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-shifts", currentYear, currentMonth],
      });
    },
  });

  const unassignShiftMutation = useMutation({
    mutationFn: (payload: { userId: string; date: string }) =>
      shiftService.unassignShift(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-shifts", currentYear, currentMonth],
      });
    },
  });

  // Generate tanggal
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  const dateList = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  });

  const getAssignedUsers = (date: string) => {
    if (!userShiftData?.data?.schedules) return [];
    return userShiftData.data.schedules
      .filter((s: any) => s.dailyShifts[date] !== null)
      .map((s: any) => ({
        id: s.userId,
        name: s.name,
        shiftName: s.dailyShifts[date]?.name,
      }));
  };

  const availableUsers = useMemo(() => {
    if (!users || !selectedDate) return [];
    const assignedNames = getAssignedUsers(selectedDate).map((a) => a.name);
    return users.filter(
      (u: any) =>
        !assignedNames.includes(u.name) &&
        u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, selectedDate, search, userShiftData]);

  const openAssignModal = (date: string) => {
    setSelectedDate(date);
    setSearch("");
    setSelectedUsers([]);
    setSelectedAssignedIds([]);
    setShowModal(true);
  };

  const handleAssignShift = async () => {
    if (!selectedUsers.length || !selectedShift) {
      toast.warning("Pilih shift dan minimal satu user!");
      return;
    }
    await Promise.all(
      selectedUsers.map((userId) =>
        applyShiftMutation.mutateAsync({
          userId,
          shiftId: selectedShift,
          date: selectedDate,
        })
      )
    );
    toast.success(`${selectedUsers.length} personel berhasil ditugaskan!`);
    setSelectedUsers([]);
  };

  const handleUnassignSelected = async () => {
    if (!selectedAssignedIds.length) {
      toast.warning("Pilih minimal satu personel untuk dihapus!");
      return;
    }
    await Promise.all(
      selectedAssignedIds.map((userId) =>
        unassignShiftMutation.mutateAsync({ userId, date: selectedDate })
      )
    );
    toast.success(`${selectedAssignedIds.length} personel dihapus!`);
    setSelectedAssignedIds([]);
  };

  // Navigasi bulan
  const changeMonth = (delta: number) => {
    const newMonth = currentMonth + delta;
    if (newMonth < 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const monthName = new Date(currentYear, currentMonth - 1).toLocaleString(
    "id-ID",
    { month: "long", year: "numeric" }
  );

  return (
    <MainLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white flex items-center gap-2">
            <CalendarDays className="text-amber-400" />
            Penjadwalan Shift
          </h1>
        </div>

        {/* Pilih Shift */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <label className="block text-slate-300 mb-2 text-sm font-medium">
            Pilih Shift
          </label>
          {loadingShifts ? (
            <div className="flex items-center gap-2 text-slate-400">
              <Loader2 className="animate-spin" size={18} />
              <span>Memuat shift...</span>
            </div>
          ) : (
            <select
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
            >
              <option value="">-- Pilih shift --</option>
              {shifts?.map((shift: any) => (
                <option key={shift.id} value={shift.id}>
                  {shift.name} ({shift.start} - {shift.end})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Kalender */}
        {selectedShift && (
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-lg hover:bg-slate-700"
              >
                <ChevronLeft className="text-slate-300" />
              </button>
              <h2 className="text-white font-semibold">{monthName}</h2>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 rounded-lg hover:bg-slate-700"
              >
                <ChevronRight className="text-slate-300" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400 mb-2 hidden sm:grid">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={i}></div>
              ))}
              {dateList.map((date) => {
                const assigned = getAssignedUsers(date);
                return (
                  <button
                    key={date}
                    onClick={() => openAssignModal(date)}
                    className={`rounded-xl shadow-sm border transition-all flex flex-col items-center justify-center p-2 sm:p-3 ${
                      assigned.length
                        ? "border-amber-400 bg-gradient-to-br from-slate-800 to-slate-700"
                        : "border-slate-700 bg-slate-900 hover:bg-slate-800"
                    }`}
                  >
                    <div className="font-bold text-white text-sm sm:text-base">
                      {new Date(date).getDate()}
                    </div>
                    <div className="text-[10px] sm:text-xs text-amber-400 mt-0.5">
                      {assigned.length ? `${assigned.length} org` : "kosong"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODAL kiri-kanan */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 text-slate-100 flex flex-col sm:flex-row">
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-3 border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm">
              <h2 className="font-semibold">
                {new Date(selectedDate).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X className="text-slate-400" />
              </button>
            </div>

            {/* Kiri: Sudah Ditugaskan */}
            <div className="flex-1 mt-14 p-4 border-r border-slate-700 overflow-y-auto">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-emerald-400">
                  Sudah Ditugaskan
                </h3>
                {selectedAssignedIds.length > 0 && (
                  <button
                    onClick={handleUnassignSelected}
                    className="text-red-400 text-sm font-medium hover:text-red-500"
                  >
                    Hapus Terpilih
                  </button>
                )}
              </div>

              {getAssignedUsers(selectedDate).length ? (
                getAssignedUsers(selectedDate).map((a) => (
                  <label
                    key={a.id}
                    className={`flex justify-between items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-2 cursor-pointer ${
                      selectedAssignedIds.includes(a.id)
                        ? "border-red-400 bg-red-500/10"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedAssignedIds.includes(a.id)}
                        onChange={(e) => {
                          if (e.target.checked)
                            setSelectedAssignedIds([
                              ...selectedAssignedIds,
                              a.id,
                            ]);
                          else
                            setSelectedAssignedIds(
                              selectedAssignedIds.filter((id) => id !== a.id)
                            );
                        }}
                        className="accent-red-500"
                      />
                      <div>
                        <p>{a.name}</p>
                        <p className="text-amber-400 text-xs">{a.shiftName}</p>
                      </div>
                    </div>
                  </label>
                ))
              ) : (
                <p className="text-slate-500 text-sm italic">
                  Belum ada personel ditugaskan.
                </p>
              )}
            </div>

            {/* Kanan: Tambah Personel */}
            <div className="flex-1 mt-14 p-4 flex flex-col">
              <h3 className="text-sm font-semibold text-amber-400 mb-3">
                Tambah Personel
              </h3>
              <div className="relative mb-3">
                <Search
                  size={16}
                  className="absolute left-3 top-2.5 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Cari nama..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {loadingUsers ? (
                  <div className="text-center py-4">
                    <Loader2 className="animate-spin mx-auto text-slate-400" />
                  </div>
                ) : availableUsers.length ? (
                  availableUsers.map((user: any) => (
                    <label
                      key={user.id}
                      className={`flex justify-between items-center px-4 py-2 rounded-lg border text-sm cursor-pointer ${
                        selectedUsers.includes(user.id)
                          ? "bg-amber-600/30 border-amber-500"
                          : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked)
                              setSelectedUsers([...selectedUsers, user.id]);
                            else
                              setSelectedUsers(
                                selectedUsers.filter((id) => id !== user.id)
                              );
                          }}
                          className="accent-amber-500"
                        />
                        <span>{user.name}</span>
                      </div>
                      {selectedUsers.includes(user.id) && (
                        <CheckCircle2
                          size={16}
                          className="text-amber-400 flex-shrink-0"
                        />
                      )}
                    </label>
                  ))
                ) : (
                  <p className="text-center text-slate-500 text-sm">
                    Tidak ada personel tersedia.
                  </p>
                )}
              </div>

              {/* Tombol */}
              <div className="mt-4 border-t border-slate-700 pt-3">
                <button
                  onClick={handleAssignShift}
                  disabled={applyShiftMutation.isPending}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  {applyShiftMutation.isPending && (
                    <Loader2 className="animate-spin" size={18} />
                  )}
                  Simpan Penugasan ({selectedUsers.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AssignShift;
