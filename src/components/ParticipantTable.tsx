import { useState } from "react";

const ParticipantTable = ({ data }) => {
  console.log(data);

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "Andi Pratama",
      email: "andi@example.com",
      status: "Aktif",
      hadir: false,
    },
    {
      id: 2,
      name: "Bunga Sari",
      email: "bunga@example.com",
      status: "Aktif",
      hadir: false,
    },
    {
      id: 3,
      name: "Cahyo Nugroho",
      email: "cahyo@example.com",
      status: "Pending",
      hadir: false,
    },
    {
      id: 4,
      name: "Dewi Anggraini",
      email: "dewi@example.com",
      status: "Aktif",
      hadir: false,
    },
    {
      id: 5,
      name: "Eka Putra",
      email: "eka@example.com",
      status: "Aktif",
      hadir: false,
    },
    {
      id: 6,
      name: "Fajar Hidayat",
      email: "fajar@example.com",
      status: "Pending",
      hadir: false,
    },
    {
      id: 7,
      name: "Gina Rahayu",
      email: "gina@example.com",
      status: "Aktif",
      hadir: false,
    },
    {
      id: 8,
      name: "Hendra Saputra",
      email: "hendra@example.com",
      status: "Aktif",
      hadir: false,
    },
  ]);

  const toggleHadir = (id) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hadir: !p.hadir } : p))
    );
  };

  return (
    <div className="overflow-x-auto max-h-80 overflow-y-auto custom-scrollbar">
      <table className="min-w-full text-sm text-slate-300 border border-slate-700/60 rounded-xl overflow-hidden">
        <thead className="bg-slate-900/60 text-slate-200 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left">Nama</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Hadir</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr
              key={p.id}
              className="border-t border-slate-700/50 hover:bg-slate-800/50 transition"
            >
              <td className="px-4 py-3 font-medium text-slate-100">{p.name}</td>
              <td className="px-4 py-3 text-slate-400">{p.email}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-medium ${
                    p.status === "Aktif"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={p.hadir}
                  onChange={() => toggleHadir(p.id)}
                  className="w-5 h-5 accent-sky-500 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantTable;
