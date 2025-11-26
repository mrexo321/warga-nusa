import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { patrolService } from "../../../services/patrolService";

const UserPatrol = () => {
  const scannerRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [selfieOpen, setSelfieOpen] = useState(false);

  const [qrText, setQrText] = useState("");
  const [manualCode, setManualCode] = useState("");

  const [details, setDetails] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [location, setLocation] = useState({
    lat: null as number | null,
    lng: null as number | null,
  });

  // ============================================================
  // 🔥 FIX: Fungsi untuk menghentikan SEMUA kamera yang aktif
  // ============================================================
  const stopAllCameraTracks = () => {
    // Stop QR scanner video stream
    const qrVideo: HTMLVideoElement | null = document.querySelector(
      "#qr-reader__scan_region video"
    );
    if (qrVideo?.srcObject) {
      (qrVideo.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      qrVideo.srcObject = null;
    }

    // Stop selfie stream
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  // ================= QR READER =================
  useEffect(() => {
    if (!cameraOpen || scannerRef.current) return;

    // Clean existing
    stopAllCameraTracks();

    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 220, height: 220 },
      aspectRatio: 1,
      videoConstraints: { facingMode: "environment" },
    });

    scanner.render(
      async (decoded) => {
        toast.success("QR terdeteksi");
        setQrText(decoded);

        await stopQRScanner();
        getLocation();
      },
      () => {}
    );

    scannerRef.current = scanner;

    return () => stopQRScanner();
  }, [cameraOpen]);

  const stopQRScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear();
      } catch (_) {}
      scannerRef.current = null;
    }

    stopAllCameraTracks();
    setCameraOpen(false);
  };

  // ================= SELFIE CAMERA EFFECT =================
  useEffect(() => {
    const openCamera = async () => {
      if (!selfieOpen || !videoRef.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });

        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      } catch (err) {
        toast.error("Kamera gagal dibuka");
        console.error(err);
      }
    };

    openCamera();
  }, [selfieOpen]);

  // ================= SELFIE CAMERA =================
  const startSelfie = async () => {
    await stopQRScanner();
    setSelfieOpen(true);
  };

  const stopSelfie = () => {
    stopAllCameraTracks();
    setSelfieOpen(false);
  };

  const captureSelfie = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;
      setPhoto(new File([blob], "selfie.jpg", { type: "image/jpeg" }));
      toast.success("Selfie tersimpan");
      stopSelfie();
    });
  };

  // ================= GPS =================
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => toast.error("Lokasi gagal didapatkan")
    );
  };

  // ================= SUBMIT =================
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (fd: FormData) => patrolService.scan(fd),
    onSuccess: () => {
      toast.success("Patrol terkirim");
      resetForm();
    },
    onError: () => toast.error("Gagal mengirim patrol"),
  });

  const handleSubmit = async () => {
    if (!qrText && !manualCode) return toast.error("Kode belum diisi");
    if (!photo) return toast.error("Selfie belum ada");
    if (!location.lat) return toast.error("Lokasi tidak valid");

    const fd = new FormData();
    fd.append("code", qrText || manualCode.trim());
    fd.append("latitude", String(location.lat));
    fd.append("longitude", String(location.lng));
    fd.append("details", details);
    fd.append("image", photo);

    await mutateAsync(fd);
  };

  const resetForm = () => {
    setQrText("");
    setManualCode("");
    setDetails("");
    setPhoto(null);
    setLocation({ lat: null, lng: null });
    stopSelfie();
  };

  // ====================================================================
  // UI / UX BARU — lebih rapi, mobile friendly, modern
  // ====================================================================
  return (
    <MainLayout>
      <div className="p-4 text-white space-y-5 max-w-md mx-auto">
        <h1 className="text-xl font-bold">🚨 Patrol Scanner</h1>

        {/* QR & Manual Code */}
        {!qrText && (
          <div className="bg-gray-900/70 p-4 border border-gray-700 rounded-xl shadow-md space-y-4">
            {!cameraOpen ? (
              <button
                onClick={() => setCameraOpen(true)}
                className="w-full py-3 bg-indigo-600 rounded-xl text-base font-medium"
              >
                📷 Scan QR Lokasi
              </button>
            ) : (
              <div className="space-y-3 flex flex-col items-center">
                <div
                  id="qr-reader"
                  className="rounded-xl overflow-hidden w-[260px] h-[260px] bg-black"
                />

                <button
                  onClick={stopQRScanner}
                  className="w-full py-3 bg-red-600 rounded-xl text-base"
                >
                  ❌ Tutup Scanner
                </button>
              </div>
            )}

            <div className="relative flex items-center">
              <span className="flex-1 h-px bg-gray-600"></span>
              <span className="px-3 text-gray-400 text-xs">atau</span>
              <span className="flex-1 h-px bg-gray-600"></span>
            </div>

            <input
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="Masukkan kode lokasi (tanpa spasi)"
              className="w-full py-2.5 px-3 rounded-lg bg-gray-800 border border-gray-700 text-sm"
            />

            <button
              disabled={!manualCode}
              className="w-full py-3 bg-blue-600 rounded-xl text-base disabled:bg-gray-700"
              onClick={() => {
                setQrText(manualCode);
                getLocation();
                toast.success("Kode manual digunakan");
              }}
            >
              Gunakan Kode
            </button>
          </div>
        )}

        {/* FORM DETAIL */}
        {qrText && (
          <div className="bg-gray-900/70 p-4 border border-gray-700 rounded-xl shadow-md space-y-4">
            <div>
              <p className="text-emerald-400 font-semibold text-sm">
                Titik Terbaca
              </p>
              <div className="mt-1 inline-block bg-emerald-700/40 border border-emerald-500 px-3 py-1 text-sm rounded-lg font-mono">
                {qrText}
              </div>
            </div>

            <div className="text-sm space-y-1">
              <p>📍 Lat: {location.lat ?? "Memuat..."}</p>
              <p>📍 Lng: {location.lng ?? "Memuat..."}</p>
              <button
                onClick={getLocation}
                className="mt-2 py-1.5 px-4 bg-indigo-600 rounded-md text-xs"
              >
                Refresh GPS
              </button>
            </div>

            {!photo && (
              <button
                onClick={startSelfie}
                className="w-full py-3 bg-yellow-600 rounded-xl text-base font-medium"
              >
                🤳 Ambil Foto Selfie
              </button>
            )}

            {photo && (
              <div className="space-y-2">
                <img
                  src={URL.createObjectURL(photo)}
                  className="rounded-lg border shadow max-h-[260px] w-full object-cover"
                />
                <button
                  className="bg-red-600 w-full py-2 rounded-xl"
                  onClick={() => setPhoto(null)}
                >
                  Ulangi Foto
                </button>
              </div>
            )}

            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Detail lokasi..."
              className="w-full p-3 text-sm rounded-lg bg-gray-800 border border-gray-700"
            />

            <button
              disabled={isPending}
              onClick={handleSubmit}
              className="w-full py-3 bg-green-600 rounded-xl text-base font-semibold disabled:bg-gray-700"
            >
              {isPending ? "Mengirim..." : "🚨 Submit Patroli"}
            </button>
          </div>
        )}

        {/* SELFIE MODAL */}
        {selfieOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
            <div className="bg-gray-900 rounded-2xl p-4 flex flex-col items-center gap-3 border border-gray-700 shadow-lg">
              <video
                ref={videoRef}
                className="w-[280px] h-[350px] bg-black rounded-xl object-cover"
              />

              <div className="flex gap-3 mt-2">
                <button
                  onClick={captureSelfie}
                  className="bg-emerald-500 px-4 py-2 rounded-xl"
                >
                  📸 Ambil
                </button>

                <button
                  onClick={stopSelfie}
                  className="bg-red-600 px-4 py-2 rounded-xl"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </MainLayout>
  );
};

export default UserPatrol;
