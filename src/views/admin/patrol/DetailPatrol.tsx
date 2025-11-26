import React, { useState, useEffect } from "react";
import MainLayout from "../../../layouts/MainLayout";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { ArrowLeft, MapIcon, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { patrolService } from "../../../services/patrolService";
import { useForm } from "react-hook-form";
import L from "leaflet";

const DetailPatrol = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState<any | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);

  const [clickPoint, setClickPoint] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { register, handleSubmit, reset } = useForm<{ name: string }>();

  // fetch detail patrol
  const { data: patrol, isLoading } = useQuery({
    queryKey: ["detail-patrol"],
    queryFn: () => patrolService.getById(id!),
  });

  /** === Ambil lokasi GPS user === */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.warn("Tidak bisa ambil lokasi:", err);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  /** === Icon Lokasi User (warna biru) === */
  const userIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
  });

  /** === Handler Tambah Titik === */
  const mutation = useMutation({
    mutationFn: (payload: {
      name: string;
      latitude: number;
      longitude: number;
    }) => patrolService.addRoute(id!, payload),
    onSuccess: () => {
      reset();
      setClickPoint(null);
      queryClient.invalidateQueries(["detail-patrol"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: {
      patrolRouteId: string;
      name: string;
      latitude: number;
      longitude: number;
    }) =>
      patrolService.updateRoute(id!, payload.patrolRouteId, {
        name: payload.name,
        latitude: payload.latitude,
        longitude: payload.longitude,
      }),
    onSuccess: () => {
      setEditing(null);
      queryClient.invalidateQueries(["detail-patrol"]);
    },
  });

  const onSubmit = (data: { name: string }) => {
    if (!clickPoint) return;

    mutation.mutate({
      name: data.name,
      latitude: clickPoint.lat,
      longitude: clickPoint.lng,
    });
  };

  /** === Component untuk menangkap klik map === */
  function MapClickCapture() {
    useMapEvents({
      click(e) {
        setClickPoint({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      },
    });
    return null;
  }

  return (
    <MainLayout>
      <div className="rounded-xl p-6">
        <button
          onClick={() => navigate(`/patrol`)}
          className="flex items-center gap-2 mb-4 text-gray-300"
        >
          <ArrowLeft size={16} /> Kembali
        </button>

        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <MapIcon size={18} /> Detail Route:
        </h2>

        {/* === MAP === */}
        <div className="h-80 rounded-lg overflow-hidden mb-5">
          <MapContainer
            center={[-6.6, 106.8]}
            zoom={14}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <MapClickCapture />

            {/* === Marker Lokasi User === */}
            {currentLocation && (
              <Marker
                position={[currentLocation.lat, currentLocation.lng]}
                icon={userIcon}
              >
                <Popup>
                  <b>Lokasi Saya</b> <br />
                  Lat: {currentLocation.lat} <br />
                  Lng: {currentLocation.lng}
                </Popup>
              </Marker>
            )}

            {/* === Marker Data Backend === */}
            {!isLoading &&
              patrol?.patrolRoutes?.length > 0 &&
              patrol.patrolRoutes.map((item: any) => (
                <Marker
                  key={item.id}
                  position={[item.latitude, item.longitude]}
                >
                  <Popup>
                    <div className="text-sm space-y-1">
                      <p>
                        <b>{item.name}</b>
                      </p>
                      <p className="font-mono">
                        Lat: {item.latitude}
                        <br />
                        Lng: {item.longitude}
                      </p>
                      <p>
                        Kode: <b>{item.code}</b>
                      </p>

                      {item.qrCodeDataUrl && (
                        <img
                          src={item.qrCodeDataUrl}
                          className="w-24 h-24 object-contain mt-2"
                          alt={`qr-${item.name}`}
                        />
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* Marker klik user */}
            {clickPoint && (
              <Marker position={[clickPoint.lat, clickPoint.lng]}>
                <Popup>Titik baru — silakan isi form di bawah</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {/* FORM ADD ROUTE */}
        {clickPoint && (
          <div className="border rounded-lg p-4 mb-4 bg-gray-800/60 backdrop-blur">
            <h4 className="text-md font-semibold mb-2">
              Tambah Titik Koordinat
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              Lat: {clickPoint.lat} | Lng: {clickPoint.lng}
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Nama Titik"
                {...register("name", { required: true })}
                className="bg-gray-700 px-3 py-2 rounded-lg"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-lg"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setClickPoint(null)}
                  className="px-4 py-2 bg-gray-500 rounded-lg"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* === LIST TITIK KOORDINAT === */}
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <MapPin size={16} /> Daftar Titik Koordinat
        </h3>

        {!isLoading && patrol?.patrolRoutes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patrol.patrolRoutes.map((item: any) => (
              <div
                key={item.id}
                className="p-4 border border-gray-700 rounded-lg bg-gray-800/40"
              >
                {/* MODE NORMAL */}
                {!editing || editing.id !== item.id ? (
                  <>
                    <h4 className="text-md font-semibold mb-2">{item.name}</h4>
                    <p className="text-sm text-gray-300 font-mono">
                      📌 {item.latitude}, {item.longitude}
                    </p>
                    <p className="text-sm text-gray-300">
                      🔢 Code: <b>{item.code}</b>
                    </p>

                    {/* QR */}
                    {item.qrCodeDataUrl && (
                      <img
                        src={item.qrCodeDataUrl}
                        alt={`qr-${item.name}`}
                        className="w-24 h-24 mt-3 cursor-pointer border border-gray-600 rounded"
                        onClick={() => setQrPreview(item.qrCodeDataUrl)}
                      />
                    )}

                    <button
                      onClick={() => setEditing(item)}
                      className="mt-3 px-3 py-1 bg-yellow-600 rounded"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <EditRouteForm
                    item={item}
                    onCancel={() => setEditing(null)}
                    onSave={(values: any) => {
                      updateMutation.mutate({
                        patrolRouteId: item.id,
                        ...values,
                      });
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">Belum ada titik.</p>
        )}
      </div>

      {qrPreview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-[9999]">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg relative">
            <img
              src={qrPreview}
              alt="qr-preview"
              className="w-[300px] h-[300px] object-contain"
            />

            <button
              onClick={() => setQrPreview(null)}
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

const EditRouteForm = ({
  item,
  onCancel,
  onSave,
}: {
  item: any;
  onCancel: () => void;
  onSave: (data: any) => void;
}) => {
  const [name, setName] = useState(item.name);
  const [lat, setLat] = useState(item.latitude);
  const [lng, setLng] = useState(item.longitude);

  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-gray-700 px-3 py-1 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="bg-gray-700 px-3 py-1 rounded"
        value={lat}
        type="number"
        step="0.000001"
        onChange={(e) => setLat(parseFloat(e.target.value))}
      />

      <input
        className="bg-gray-700 px-3 py-1 rounded"
        value={lng}
        type="number"
        step="0.000001"
        onChange={(e) => setLng(parseFloat(e.target.value))}
      />

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onSave({ name, latitude: lat, longitude: lng })}
          className="px-3 py-1 bg-blue-600 rounded"
        >
          Update
        </button>
        <button onClick={onCancel} className="px-3 py-1 bg-gray-500 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DetailPatrol;
