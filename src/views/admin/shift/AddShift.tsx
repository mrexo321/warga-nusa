import React, { useState, useMemo, useRef } from "react";
import MainLayout from "../../../layouts/MainLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shiftService } from "../../../services/shiftService";
import { userService } from "../../../services/userService";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  UserPlus,
  X,
  Loader2,
  Users,
  Search,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";

const AddShift = () => {
  const queryClient = useQueryClient();

  const [selectedShift, setSelectedShift] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const calendarRef = useRef<any>(null);

  // Fetch data
  const { data: shifts, isLoading: loadingShifts } = useQuery({
    queryKey: ["shifts"],
    queryFn: shiftService.getAll,
  });

  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  const { data: userShiftData, isLoading: loadingUserShifts } = useQuery({
    queryKey: ["user-shifts", currentYear, currentMonth],
    queryFn: () => shiftService.getUserShift(currentYear, currentMonth),
  });

  // Assign shift
  const applyShiftMutation = useMutation({
    mutationFn: (payload: { userId: string; shiftId: string; date: string }) =>
      shiftService.applyShift(payload),
    onSuccess: () => {
      toast.success("Shift berhasil ditugaskan!");
      queryClient.invalidateQueries({
        queryKey: ["user-shifts", currentYear, currentMonth],
      });
      setSelectedUserId(null);
      setSearch("");
    },
    onError: () => {
      toast.error("Gagal menugaskan shift!");
    },
  });

  // Sudah ditugaskan
  const assignedUsers = useMemo(() => {
    if (!userShiftData?.data?.schedules || !selectedDate) return [];
    return userShiftData.data.schedules
      .filter((s: any) => s.dailyShifts[selectedDate] !== null)
      .map((s: any) => ({
        name: s.name,
        shiftName: s.dailyShifts[selectedDate]?.name,
      }));
  }, [userShiftData, selectedDate]);

  // User belum punya shift
  const availableUsers = useMemo(() => {
    if (!users) return [];
    const assignedNames = assignedUsers.map((a) => a.name);
    return users.filter(
      (u: any) =>
        !assignedNames.includes(u.name) &&
        u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, assignedUsers, search]);

  const openAssignModal = (date: string) => {
    setSelectedDate(date);
    setSearch("");
    setSelectedUserId(null);
    setShowModal(true);
  };

  const handleAssignShift = () => {
    if (!selectedUserId || !selectedShift) {
      toast.warning("Pilih shift dan user terlebih dahulu!");
      return;
    }
    applyShiftMutation.mutate({
      userId: selectedUserId,
      shiftId: selectedShift,
      date: selectedDate,
    });
  };

  // Generate events
  const events =
    userShiftData?.data?.schedules?.flatMap((schedule: any) => {
      const { name: userName, dailyShifts } = schedule;
      return Object.entries(dailyShifts)
        .filter(([_, shift]: any) => shift !== null)
        .map(([date, shift]: any) => ({
          title: `${userName} - ${shift.name}`,
          start: date,
          extendedProps: { userName, shiftName: shift.name },
          backgroundColor: "rgba(245, 158, 11, 0.85)",
          borderColor: "transparent",
          textColor: "#fff",
        }));
    }) || [];

  // Hover tooltip
  const handleMouseEnter = (date: string, e: any) => {
    const rect = e.target.getBoundingClientRect();
    setHoverDate(date);
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };
  const handleMouseLeave = () => {
    setHoverDate(null);
  };

  const handleDatesSet = (info: any) => {
    const date = info.view.currentStart;
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth() + 1);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between items-center bg-slate-900/60 border border-slate-700 rounded-xl p-4 backdrop-blur-md shadow-lg"
        >
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarDays className="text-amber-400" />
            Kalender Shift Personel
          </h1>
        </motion.div>

        {/* Pilih Shift */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700 rounded-xl p-5 shadow-lg"
        >
          <label className="block text-slate-300 font-medium mb-2">
            Pilih Shift
          </label>
          {loadingShifts ? (
            <div className="flex items-center gap-2 text-slate-400">
              <Loader2 className="animate-spin" size={18} />
              <span>Memuat shift...</span>
            </div>
          ) : (
            <select
              className="w-full bg-slate-950/80 border border-slate-700 text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
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
        </motion.div>

        {/* Kalender */}
        {selectedShift && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 shadow-xl relative"
          >
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              selectable
              dateClick={(info) => openAssignModal(info.dateStr)}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek",
              }}
              datesSet={handleDatesSet}
              titleFormat={{ year: "numeric", month: "long" }}
              eventContent={(arg) => (
                <div className="flex items-center gap-1 text-xs bg-amber-500/20 px-2 py-1 rounded-md backdrop-blur-sm">
                  <Users size={12} className="text-amber-300" />
                  <span className="truncate">{arg.event.title}</span>
                </div>
              )}
              dayCellDidMount={(arg) => {
                arg.el.onmouseenter = (e) => handleMouseEnter(arg.dateStr, e);
                arg.el.onmouseleave = handleMouseLeave;
                arg.el.classList.add(
                  "hover:bg-amber-500/10",
                  "transition",
                  "cursor-pointer",
                  "rounded-lg"
                );
              }}
              height="auto"
              dayMaxEvents={3}
            />

            {/* Tooltip popup */}
            <AnimatePresence>
              {hoverDate && tooltipPos && (
                <motion.div
                  className="fixed z-50 bg-slate-900/95 border border-slate-700 rounded-xl p-4 text-sm shadow-2xl text-slate-200 backdrop-blur-md w-64"
                  style={{
                    top: tooltipPos.y,
                    left: tooltipPos.x,
                    transform: "translate(-50%, -100%)",
                  }}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  <p className="font-semibold text-amber-400 mb-2 text-center">
                    {new Date(hoverDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  <ul className="space-y-1 max-h-40 overflow-y-auto">
                    {userShiftData?.data?.schedules
                      ?.filter((s: any) => s.dailyShifts[hoverDate])
                      .map((s: any, i: number) => (
                        <li
                          key={i}
                          className="flex justify-between items-center bg-slate-800/60 px-3 py-1.5 rounded-md text-xs border border-slate-700"
                        >
                          <span>{s.name}</span>
                          <span className="text-amber-400 font-medium">
                            {s.dailyShifts[hoverDate]?.name}
                          </span>
                        </li>
                      ))}
                    {!userShiftData?.data?.schedules?.some(
                      (s: any) => s.dailyShifts[hoverDate]
                    ) && (
                      <p className="text-center text-slate-500 italic text-xs">
                        Tidak ada personel
                      </p>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-slate-900/95 border border-slate-700 rounded-2xl p-8 w-full max-w-4xl relative shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <button
                  className="absolute top-4 right-4 text-slate-400 hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <X size={24} />
                </button>

                {/* Kiri: Sudah ditugaskan */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <UserCheck className="text-emerald-400" size={18} />
                    Sudah Ditugaskan
                  </h3>
                  {assignedUsers.length > 0 ? (
                    <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
                      {assignedUsers.map((a, i) => (
                        <li
                          key={i}
                          className="flex justify-between items-center bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-lg text-slate-300 text-sm"
                        >
                          <span>{a.name}</span>
                          <span className="text-amber-400 font-medium">
                            {a.shiftName}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 text-sm italic">
                      Belum ada personel ditugaskan di tanggal ini.
                    </p>
                  )}
                </div>

                {/* Kanan: Cari & Assign */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <UserPlus className="text-amber-400" size={18} />
                    Tambah Personel -{" "}
                    {new Date(selectedDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>

                  <div className="relative mb-4">
                    <Search
                      className="absolute left-3 top-2.5 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Cari personel..."
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {loadingUsers ? (
                      <div className="flex justify-center py-6">
                        <Loader2
                          className="animate-spin text-slate-400"
                          size={22}
                        />
                      </div>
                    ) : availableUsers.length ? (
                      availableUsers.map((user: any) => (
                        <motion.button
                          key={user.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedUserId(user.id)}
                          className={`w-full flex justify-between items-center px-4 py-2 border rounded-lg text-left text-slate-200 transition ${
                            selectedUserId === user.id
                              ? "bg-amber-600/30 border-amber-500"
                              : "bg-slate-800/70 hover:bg-slate-700/70 border-slate-700"
                          }`}
                        >
                          <span>{user.name}</span>
                          {selectedUserId === user.id && (
                            <CheckCircle2
                              size={16}
                              className="text-amber-400"
                            />
                          )}
                        </motion.button>
                      ))
                    ) : (
                      <p className="text-center text-slate-400 text-sm py-3">
                        Tidak ada personel tersedia
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={handleAssignShift}
                      disabled={applyShiftMutation.isPending}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      {applyShiftMutation.isPending && (
                        <Loader2 className="animate-spin" size={16} />
                      )}
                      Assign Shift
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default AddShift;
