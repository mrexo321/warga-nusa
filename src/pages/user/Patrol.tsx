import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import MainLayout from "../../layouts/MainLayout";
import {
  ArrowLeft,
  Plus,
  Camera,
  Eye,
  Map as MapIcon,
  MapPin,
} from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "leaflet/dist/leaflet.css";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { patrolService } from "../../services/patrolService";
import { useNavigate } from "react-router-dom";

// Icon untuk map
const patrolIcon = L.icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Patrol = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // === VIEW STATE ===
  const [view, setView] = useState("list"); // list | add | scan
  const [newRouteName, setNewRouteName] = useState("");
  const [scannedData, setScannedData] = useState("");
  const scannerRef = useRef(null);

  // === GET LIST ===
  const { data: patrols, isLoading: isLoadingPatrols } = useQuery({
    queryKey: ["patrols"],
    queryFn: patrolService.getAll,
  });

  // === CREATE PATROL ===
  const createMutation = useMutation({
    mutationFn: (payload: { name: string }) => patrolService.create(payload),
    onSuccess: () => {
      toast.success("Route berhasil ditambahkan!");
      setNewRouteName("");
      setView("list");
      queryClient.invalidateQueries(["patrols"]);
    },
    onError: () => toast.error("Gagal menambahkan route"),
  });

  const handleAddRoute = () => {
    if (!newRouteName.trim()) {
      return toast.error("Nama route wajib diisi!");
    }

    createMutation.mutate({
      name: newRouteName.trim(),
    });
  };

  // === DELETE PATROL ===
  const deleteMutation = useMutation({
    mutationFn: (patrolId: string) => patrolService.deletePatrol(patrolId),
    onSuccess: () => {
      toast.success("Patrol berhasil dihapus");
      queryClient.invalidateQueries(["patrols"]);
    },
    onError: () => toast.error("Gagal menghapus patrol"),
  });

  const handleDelete = (patrolId: string) => {
    if (!window.confirm("Yakin ingin menghapus patrol ini?")) return;
    deleteMutation.mutate(patrolId);
  };

  // === DETAIL ===
  const handleViewDetail = (routeId: string) => {
    navigate(`/patrol/${routeId}/detail`);
  };

  // === QR SCANNER ===
  useEffect(() => {
    if (view === "scan") {
      const scanner = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: 250,
      });

      scanner.render(
        (decodedText) => {
          setScannedData(decodedText);
          scanner.clear();
          toast.success("Scan berhasil!");
          setView("list");
        },
        (error) => console.warn(error)
      );

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [view]);

  return (
    <MainLayout>
      <div className="text-white p-6">
        {/* ==== LIST ROUTE ==== */}
        {view === "list" && (
          <>
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-xl font-semibold">Daftar Route Patroli</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setView("add")}
                  className="px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus size={16} /> Tambah Route
                </button>
              </div>
            </div>

            <div className="rounded-xl p-4">
              {isLoadingPatrols ? (
                <p className="text-gray-400">Loading...</p>
              ) : !patrols || patrols.length === 0 ? (
                <p className="text-gray-400">Belum ada route patroli</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="py-2">Nama Route</th>
                      <th className="py-2 text-center">Jumlah Titik</th>
                      <th className="py-2 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patrols.map((patrol: any) => (
                      <tr key={patrol.id}>
                        <td className="py-2">{patrol.name}</td>
                        <td className="py-2 text-center">{patrol.routes}</td>
                        <td className="py-2 flex gap-2 justify-center">
                          <button
                            onClick={() => handleViewDetail(patrol.id)}
                            className="px-3 py-1 rounded flex items-center gap-1 text-sm"
                          >
                            <Eye size={14} /> Detail
                          </button>

                          <button
                            onClick={() => handleDelete(patrol.id)}
                            className="px-3 py-1 rounded text-sm bg-red-600 cursor-pointer"
                          >
                            🗑 Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ==== ADD ROUTE ==== */}
        {view === "add" && (
          <div className="rounded-xl p-6">
            <button
              onClick={() => setView("list")}
              className="flex items-center gap-2 mb-4 text-gray-300"
            >
              <ArrowLeft size={16} /> Kembali
            </button>

            <h2 className="text-lg font-semibold mb-4">Tambah Route Baru</h2>

            <input
              type="text"
              placeholder="Nama Route (ex: Patroli Pagi)"
              value={newRouteName}
              onChange={(e) => setNewRouteName(e.target.value)}
              className="w-full p-2 rounded text-white mb-3"
            />

            <button
              onClick={handleAddRoute}
              className="px-4 py-2 rounded-lg"
              disabled={createMutation.isLoading}
            >
              {createMutation.isLoading ? "Menyimpan..." : "Simpan Route"}
            </button>
          </div>
        )}

        {/* ==== SCAN ==== */}
        {view === "scan" && (
          <div className="rounded-xl p-6">
            <button
              onClick={() => setView("list")}
              className="flex items-center gap-2 mb-4 text-gray-300"
            >
              <ArrowLeft size={16} /> Kembali
            </button>

            <h2 className="text-lg font-semibold mb-3">
              Scan QR Titik Patroli
            </h2>

            <div id="qr-reader" className="w-full max-w-sm mx-auto" />

            {scannedData && (
              <p className="mt-4 text-emerald-400">
                Data Terbaca: {scannedData}
              </p>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Patrol;
