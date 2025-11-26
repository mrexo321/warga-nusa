import React, { useState, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { patrolService } from "../../services/patrolService";
import { ChevronDown, ChevronUp, MapPin, User, Camera } from "lucide-react";
import environment from "../../config/environment";

const TaskReport = () => {
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { data: logsPatrols, isLoading } = useQuery({
    queryKey: ["patrol-report"],
    queryFn: () => patrolService.log(),
  });

  // === GROUPING LOGS BY ROUTE ===
  const groupedLogs = useMemo(() => {
    if (!logsPatrols) return {};

    return logsPatrols.reduce((acc: any, log: any) => {
      const id = log.patrolRouteId;
      if (!acc[id]) acc[id] = [];
      acc[id].push(log);
      return acc;
    }, {});
  }, [logsPatrols]);

  // === TOGGLE ROW ===
  const toggleRow = (id: string) => {
    setOpenRow(openRow === id ? null : id);
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">Laporan Patroli</h2>

        {isLoading ? (
          <p className="text-gray-300">Loading...</p>
        ) : Object.keys(groupedLogs).length > 0 ? (
          <div className="bg-gray-800/40 border border-gray-700 rounded-xl overflow-hidden shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-5 py-3 text-gray-300">#</th>
                  <th className="px-5 py-3 text-gray-300">Nama Patroli</th>
                  <th className="px-5 py-3 text-gray-300">Lokasi Titik</th>
                  <th className="px-5 py-3 text-gray-300">Total Laporan</th>
                  <th className="px-5 py-3 text-gray-300 text-center">
                    Detail
                  </th>
                </tr>
              </thead>

              <tbody>
                {Object.keys(groupedLogs).map(
                  (routeId: string, index: number) => {
                    const logs = groupedLogs[routeId];
                    const first = logs[0];

                    return (
                      <>
                        {/* === TABLE ROW === */}
                        <tr
                          key={routeId}
                          className="border-b border-gray-700 cursor-pointer hover:bg-gray-700/30 transition"
                          onClick={() => toggleRow(routeId)}
                        >
                          <td className="px-5 py-4 text-gray-200">
                            {index + 1}
                          </td>
                          <td className="px-5 py-4 text-gray-200 font-medium">
                            {first.patrolRoute?.patrol?.name}
                          </td>
                          <td className="px-5 py-4 text-gray-400 text-sm font-mono">
                            {first.patrolRoute?.longitude},{" "}
                            {first.patrolRoute?.latitude}
                          </td>
                          <td className="px-5 py-4 text-gray-200 font-semibold">
                            {logs.length}
                          </td>
                          <td className="px-5 py-4 text-center">
                            {openRow === routeId ? (
                              <ChevronUp className="inline text-sky-400" />
                            ) : (
                              <ChevronDown className="inline text-sky-400" />
                            )}
                          </td>
                        </tr>

                        {/* === EXPANDED DETAIL === */}
                        {openRow === routeId && (
                          <tr className="bg-gray-900/40">
                            <td colSpan={5} className="px-6 py-5">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {logs.map((item: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="bg-gray-800/60 border border-gray-700 rounded-xl p-4"
                                  >
                                    {/* FOTO */}
                                    <div className="w-full h-40 rounded-lg overflow-hidden mb-3 relative">
                                      <img
                                        src={environment.IMAGE_URL + item.image}
                                        alt="patrol"
                                        className="w-full h-full object-cover"
                                      />
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setPreview(
                                            environment.IMAGE_URL + item.image
                                          );
                                        }}
                                        className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-white text-xs flex items-center gap-1"
                                      >
                                        <Camera size={14} /> Zoom
                                      </button>
                                    </div>

                                    {/* DETAIL */}
                                    <div className="space-y-2">
                                      <div className="text-sm text-gray-300 flex items-center gap-2">
                                        <User
                                          size={16}
                                          className="text-sky-400"
                                        />
                                        Petugas: <b>{item.user?.name}</b>
                                      </div>

                                      <p className="text-xs font-mono text-gray-400">
                                        📍 Lokasi Scan: <br />
                                        Lat: {item.longitude}, Lng:{" "}
                                        {item.latitude}
                                      </p>

                                      <div className="mt-3 text-gray-200">
                                        <p className="text-sm font-semibold mb-1">
                                          Catatan:
                                        </p>
                                        <p className="text-sm bg-gray-700/60 p-2 rounded-lg">
                                          {item.details}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-300">Belum ada laporan.</p>
        )}
      </div>

      {/* === MODAL PREVIEW IMAGE === */}
      {preview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-[9999]">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg relative">
            <img
              src={preview}
              alt="preview"
              className="w-[350px] h-[350px] object-contain"
            />
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 px-3 py-1 bg-red-600 rounded text-white"
            >
              X
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default TaskReport;
