import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  Plus,
  Eye,
  ArrowLeft,
  MapPin,
  Camera,
  Map as MapIcon,
} from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// === Custom marker icon ===
const patrolIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const Patrol = () => {
  const [routes, setRoutes] = useState([
    { id: 1, name: "Route A", coordinates: [] },
    { id: 2, name: "Route B", coordinates: [] },
  ]);

  const [view, setView] = useState("list"); // list | detail | add | scan
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [newRouteName, setNewRouteName] = useState("");
  const [scannedData, setScannedData] = useState("");
  const scannerRef = useRef(null);

  // === TAMBAH ROUTE BARU ===
  const handleAddRoute = () => {
    if (!newRouteName.trim()) return alert("Nama route wajib diisi!");
    const newRoute = {
      id: Date.now(),
      name: newRouteName.trim(),
      coordinates: [],
    };
    setRoutes([...routes, newRoute]);
    setNewRouteName("");
    setView("list");
  };

  // === LIHAT DETAIL ROUTE ===
  const handleViewDetail = (route) => {
    setSelectedRoute(route);
    setView("detail");
  };

  // === TAMBAH TITIK KOORDINAT DARI MAP ===
  const handleAddCoordinateFromMap = (lat, long) => {
    const updatedRoute = {
      ...selectedRoute,
      coordinates: [
        ...selectedRoute.coordinates,
        {
          id: Date.now(),
          lat,
          long,
          scanned: false,
        },
      ],
    };
    setRoutes((prev) =>
      prev.map((r) => (r.id === selectedRoute.id ? updatedRoute : r))
    );
    setSelectedRoute(updatedRoute);
  };

  // === COMPONENT: MAP UNTUK TAMBAH TITIK ===
  const ClickMap = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (
          window.confirm(
            `Tambah titik baru di lokasi ini?\nLat: ${lat.toFixed(
              5
            )}, Lng: ${lng.toFixed(5)}`
          )
        ) {
          handleAddCoordinateFromMap(lat, lng);
        }
      },
    });
    return null;
  };

  // === HANDLE SCAN QR ===
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
          handleRecordScan(decodedText);
        },
        (error) => console.warn("QR error:", error)
      );

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [view]);

  // === RECORD SETELAH SCAN ===
  const handleRecordScan = (url) => {
    const parts = url.split("/");
    const routeId = parseInt(parts[parts.length - 2]);
    const coordId = parseInt(parts[parts.length - 1]);

    setRoutes((prev) =>
      prev.map((r) => {
        if (r.id === routeId) {
          return {
            ...r,
            coordinates: r.coordinates.map((c) =>
              c.id === coordId ? { ...c, scanned: true } : c
            ),
          };
        }
        return r;
      })
    );

    alert(`✅ Scan berhasil! Route ${routeId}, Titik ${coordId}`);
    setView("list");
  };

  return (
    <MainLayout>
      <div className="text-white p-6">
        {/* === HALAMAN LIST ROUTE === */}
        {view === "list" && (
          <>
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-xl font-semibold">Daftar Route Patroli</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setView("scan")}
                  className="bg-emerald-600 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Camera size={16} /> Scan QR
                </button>
                <button
                  onClick={() => setView("add")}
                  className="bg-sky-600 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus size={16} /> Tambah Route
                </button>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              {routes.length === 0 ? (
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
                    {routes.map((r) => (
                      <tr
                        key={r.id}
                        className="border-b border-slate-700 hover:bg-slate-700/30"
                      >
                        <td className="py-2">{r.name}</td>
                        <td className="py-2 text-center">
                          {r.coordinates.length}
                        </td>
                        <td className="py-2 text-center">
                          <button
                            onClick={() => handleViewDetail(r)}
                            className="bg-emerald-600 px-3 py-1 rounded flex items-center gap-1 text-sm mx-auto"
                          >
                            <Eye size={14} /> Detail
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

        {/* === HALAMAN TAMBAH ROUTE === */}
        {view === "add" && (
          <div className="bg-slate-800 rounded-xl p-6">
            <button
              onClick={() => setView("list")}
              className="flex items-center gap-2 mb-4 text-gray-300"
            >
              <ArrowLeft size={16} /> Kembali
            </button>
            <h2 className="text-lg font-semibold mb-4">Tambah Route Baru</h2>

            <input
              type="text"
              placeholder="Nama Route"
              value={newRouteName}
              onChange={(e) => setNewRouteName(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 text-white mb-3"
            />
            <button
              onClick={handleAddRoute}
              className="bg-sky-600 px-4 py-2 rounded-lg"
            >
              Simpan Route
            </button>
          </div>
        )}

        {/* === HALAMAN DETAIL ROUTE (DENGAN MAP) === */}
        {view === "detail" && selectedRoute && (
          <div className="bg-slate-800 rounded-xl p-6">
            <button
              onClick={() => setView("list")}
              className="flex items-center gap-2 mb-4 text-gray-300"
            >
              <ArrowLeft size={16} /> Kembali
            </button>

            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <MapIcon size={18} /> Detail Route: {selectedRoute.name}
            </h2>

            {/* === MAP AREA === */}
            <div className="h-80 rounded-lg overflow-hidden mb-5">
              <MapContainer
                center={[-6.6, 106.8]} // Bogor default
                zoom={14}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap"
                />
                <ClickMap />
                {selectedRoute.coordinates.map((c) => (
                  <Marker
                    key={c.id}
                    position={[c.lat, c.long]}
                    icon={patrolIcon}
                  >
                    <Popup>
                      <b>Titik ID:</b> {c.id}
                      <br />
                      Lat: {c.lat.toFixed(5)}, Lng: {c.long.toFixed(5)}
                      <br />
                      Status:{" "}
                      {c.scanned ? (
                        <span className="text-emerald-400">Sudah Scan</span>
                      ) : (
                        <span className="text-yellow-400">Belum Scan</span>
                      )}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* === LIST KOORDINAT === */}
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MapPin size={16} /> Daftar Titik Koordinat
            </h3>
            {selectedRoute.coordinates.length === 0 ? (
              <p className="text-gray-400">
                Belum ada titik. Klik di map untuk menambah.
              </p>
            ) : (
              <div className="space-y-6">
                {selectedRoute.coordinates.map((c) => {
                  // === Dummy data peserta yang sudah scan ===
                  const dummyScans = [
                    {
                      id: 1,
                      name: "Satrio Prabowo",
                      time: "2025-11-10 08:32",
                      status: "Sukses",
                    },
                    {
                      id: 2,
                      name: "Agus Rahman",
                      time: "2025-11-10 09:14",
                      status: "Sukses",
                    },
                    {
                      id: 3,
                      name: "Rina Kartika",
                      time: "2025-11-10 09:45",
                      status: "Gagal",
                    },
                  ];

                  return (
                    <div
                      key={c.id}
                      className="bg-slate-700/50 border border-slate-600 rounded-xl p-4"
                    >
                      {/* Info Titik */}
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-sky-400">
                          📍 Titik ID: {c.id}
                        </p>
                        {c.scanned ? (
                          <span className="px-3 py-1 bg-emerald-600/30 text-emerald-400 rounded-full text-sm">
                            Sudah Scan
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-600/30 text-yellow-400 rounded-full text-sm">
                            Belum Scan
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-300 mb-2">
                        Lat: {c.lat}, Long: {c.long}
                      </p>
                      <div className="bg-slate-800 p-2 rounded text-xs mb-3">
                        QR URL:{" "}
                        <span className="text-sky-400">
                          Nanti diisi sama Image QR disini hehe
                        </span>
                      </div>

                      {/* === Daftar Petugas === */}
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold text-gray-200 mb-2">
                          Riwayat Scan:
                        </h4>

                        {dummyScans.length === 0 ? (
                          <p className="text-gray-400 text-sm">
                            Belum ada petugas yang scan titik ini.
                          </p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                              <thead>
                                <tr className="border-b border-slate-600 text-gray-400">
                                  <th className="py-2">Nama Petugas</th>
                                  <th className="py-2">Waktu Scan</th>
                                  <th className="py-2 text-center">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {dummyScans.map((s) => (
                                  <tr
                                    key={s.id}
                                    className="border-b border-slate-700 hover:bg-slate-700/50"
                                  >
                                    <td className="py-2">{s.name}</td>
                                    <td className="py-2">{s.time}</td>
                                    <td className="py-2 text-center">
                                      {s.status === "Sukses" ? (
                                        <span className="bg-emerald-600/30 text-emerald-400 px-3 py-1 rounded-full text-xs">
                                          ✅ Sukses
                                        </span>
                                      ) : (
                                        <span className="bg-rose-600/30 text-rose-400 px-3 py-1 rounded-full text-xs">
                                          ❌ Gagal
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* === HALAMAN SCAN QR === */}
        {view === "scan" && (
          <div className="bg-slate-800 rounded-xl p-6">
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
                ✅ Data Terbaca: {scannedData}
              </p>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Patrol;
