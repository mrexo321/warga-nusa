import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Trash2, X, FileText } from "lucide-react";
import MainLayout from "../../../layouts/MainLayout";
import { courseService } from "../../../services/courseService";
import environment from "../../../config/environment";

// === SCHEMA ===
const courseSchema = z.object({
  name: z.string().min(3),
  code: z.string().min(2),
  description: z.string().min(10),
  thumbnail: z.any().optional(),
});

type CourseValues = z.infer<typeof courseSchema>;

const materialSchema = z.object({
  file: z.any().optional(),
});

type MaterialValues = z.infer<typeof materialSchema>;

// === SCHEMA MEETING ===
const meetingSchema = z
  .object({
    title: z.string().min(3, "Judul wajib diisi"),
    mode: z.enum(["offline", "online"], {
      errorMap: () => ({ message: "Pilih mode pertemuan" }),
    }),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    start_at: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.mode === "offline") {
        return data.latitude && data.longitude;
      }
      return true;
    },
    {
      message: "Latitude dan Longitude wajib diisi untuk mode offline",
      path: ["latitude"],
    }
  );

type MeetingValues = z.infer<typeof meetingSchema>;

// === KOMPONEN DROPZONE ===
const Dropzone = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const { setValue, watch } = useFormContext<MaterialValues>();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setValue("file", files, { shouldValidate: true });
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragActive(true);
      }}
      onDragLeave={() => setIsDragActive(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
      className={`border-2 border-dashed rounded-xl py-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
        isDragActive
          ? "border-blue-400 bg-blue-500/10 scale-[1.02] shadow-lg shadow-blue-500/30"
          : "border-blue-400/40 hover:border-blue-400 hover:bg-blue-500/5"
      }`}
    >
      <FileText
        size={40}
        className={`mb-2 transition-colors duration-300 ${
          isDragActive ? "text-blue-400" : "text-blue-300"
        }`}
      />
      <p className="text-slate-300 text-sm">
        {isDragActive
          ? "Lepaskan untuk mengunggah file 📂"
          : "Seret & jatuhkan file di sini atau klik untuk memilih"}
      </p>
      <p className="text-xs text-slate-500 mt-1">
        Format: PDF, DOCX, PPTX, ZIP
      </p>

      <input
        id="fileInput"
        type="file"
        name="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) {
            setValue("file", e.target.files, { shouldValidate: true });
          }
        }}
      />

      {watch("file")?.[0] && (
        <div className="mt-4 text-center">
          <p className="text-slate-300 text-sm">
            File dipilih:{" "}
            <span className="text-blue-400 font-medium">
              {watch("file")[0].name}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

// === HALAMAN UTAMA ===
const CourseFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // === FORM KURSUS ===
  const { register, handleSubmit, reset } = useForm<CourseValues>({
    resolver: zodResolver(courseSchema),
  });

  const { data: course } = useSuspenseQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getById(id!),
  });

  console.log("course", course);

  useEffect(() => {
    if (course) {
      reset({
        name: course.name,
        code: course.code,
        description: course.description,
      });
    }
  }, [course, reset]);

  const saveCourse = useMutation({
    mutationFn: (formData: FormData) =>
      isEdit
        ? courseService.update(id!, formData)
        : courseService.create(formData),
    onSuccess: () => {
      toast.success(isEdit ? "Kursus diperbarui" : "Kursus ditambahkan");
      if (!isEdit) navigate("/courses");
    },
  });

  // === FORM MEETING ===
  const {
    register: registerMeeting,
    handleSubmit: handleSubmitMeeting,
    reset: resetMeetingForm,
    watch,
  } = useForm<MeetingValues>({
    resolver: zodResolver(meetingSchema),
  });

  const mode = watch("mode");

  // === Auto get location when offline ===
  useEffect(() => {
    if (mode === "offline" && navigator.geolocation) {
      toast.info("Mengambil lokasi... Mohon tunggu");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resetMeetingForm((prev) => ({
            ...prev,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          }));
          toast.success("Koordinat berhasil didapatkan otomatis!");
        },
        (error) => {
          console.error(error);
          toast.error("Gagal mendapatkan lokasi. Pastikan izin lokasi aktif.");
        }
      );
    }
  }, [mode, resetMeetingForm]);

  const addMeeting = useMutation({
    mutationFn: (payload: MeetingValues) =>
      courseService.createCourseMeeting(id!, payload),
    onSuccess: () => {
      toast.success("Pertemuan berhasil ditambahkan");
      setShowAddMeeting(false);
      resetMeetingForm();
    },
  });

  const onSubmitMeeting = (values: MeetingValues) => {
    const payload = {
      title: values.title,
      mode: values.mode,
      latitude: values.mode === "offline" ? values.latitude ?? "" : "",
      longitude: values.mode === "offline" ? values.longitude ?? "" : "",
      start_at: values.start_at,
    };
    addMeeting.mutate(payload);
  };

  // === FORM MATERIAL ===
  const materialForm = useForm<MaterialValues>({
    resolver: zodResolver(materialSchema),
  });

  const { handleSubmit: handleSubmitMaterial, reset: resetMaterialForm } =
    materialForm;

  const addMaterial = useMutation({
    mutationFn: (formData: FormData) =>
      courseService.addCourseMaterials(id!, formData),
    onSuccess: () => {
      toast.success("File materi berhasil diunggah");
      resetMaterialForm();
      setShowAddMaterial(false);
    },
  });

  const onSubmitMaterial = (values: MaterialValues) => {
    if (!values.file?.[0]) {
      toast.error("File wajib diunggah");
      return;
    }
    const formData = new FormData();
    formData.append("file", values.file[0]);
    addMaterial.mutate(formData);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6 text-slate-200">
        <h1 className="text-2xl font-bold">
          {isEdit ? "Edit Pelatihan" : "Tambah Kursus"}
        </h1>

        {/* === FORM KURSUS === */}
        <form
          onSubmit={handleSubmit((values) => {
            const formData = new FormData();

            // Jika sedang edit
            if (isEdit) {
              formData.append("name", values.name);
              formData.append("code", values.code);
              formData.append("description", values.description);

              // Jika thumbnail diubah, baru tambahkan
              if (values.thumbnail && values.thumbnail[0]) {
                formData.append("thumbnail", values.thumbnail[0]);
              }
            } else {
              // Jika tambah baru
              Object.entries(values).forEach(([key, val]) => {
                if (val instanceof FileList && val.length > 0) {
                  formData.append(key, val[0]);
                } else if (val) {
                  formData.append(key, val as any);
                }
              });
            }

            saveCourse.mutate(formData);
          })}
          className="bg-slate-800/40 p-6 rounded-lg space-y-4 border border-slate-700"
        >
          <div>
            <label className="block text-sm mb-1">Nama Kursus</label>
            <input
              {...register("name")}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Kode Kursus</label>
            <input
              {...register("code")}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Deskripsi</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0 file:text-sm file:font-semibold
      file:bg-amber-500 file:text-slate-900 hover:file:bg-amber-400"
            />

            {/* === Preview Sebelum (gambar lama) === */}
            {isEdit && course?.thumbnail && (
              <div className="mt-3">
                <p className="text-xs text-slate-400 mb-1">
                  Thumbnail saat ini:
                </p>
                <img
                  src={`${environment.IMAGE_URL}${course.thumbnail}`}
                  alt="Current thumbnail"
                  className="w-40 h-24 object-cover rounded-md border border-slate-700 shadow-sm"
                />
              </div>
            )}

            {/* === Preview Sesudah (gambar baru dipilih) === */}
            {preview && (
              <div className="mt-3">
                <p className="text-xs text-slate-400 mb-1">Thumbnail baru:</p>
                <img
                  src={preview}
                  alt="Preview thumbnail"
                  className="w-40 h-24 object-cover rounded-md border border-blue-500 shadow-md"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-slate-900 py-2 rounded-md font-semibold hover:bg-amber-400 transition"
          >
            {isEdit ? "Simpan Perubahan" : "Tambah Kursus"}
          </button>
        </form>

        {/* === MEETING === */}
        {isEdit && (
          <div className="bg-slate-800/40 p-6 rounded-lg border border-slate-700 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-amber-400">
                Daftar Pertemuan
              </h2>
              <button
                onClick={() => setShowAddMeeting((p) => !p)}
                className="flex items-center space-x-2 text-sm bg-amber-500 text-slate-900 px-3 py-1 rounded-md hover:bg-amber-400"
              >
                {showAddMeeting ? <X size={14} /> : <Plus size={14} />}
                <span>{showAddMeeting ? "Batal" : "Tambah Pertemuan"}</span>
              </button>
            </div>

            {showAddMeeting && (
              <form
                onSubmit={handleSubmitMeeting(onSubmitMeeting)}
                className="bg-slate-900/60 border border-slate-700 rounded-md p-4 space-y-3"
              >
                <input
                  type="text"
                  {...registerMeeting("title")}
                  placeholder="Judul pertemuan"
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
                  required
                />

                {/* Mode Select */}
                <select
                  {...registerMeeting("mode")}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200"
                  required
                >
                  <option value="">Pilih mode</option>
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                </select>

                {/* Latitude & Longitude otomatis saat offline */}
                {mode === "offline" && (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      {...registerMeeting("latitude")}
                      placeholder="Latitude (otomatis)"
                      readOnly
                      className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 opacity-80 cursor-not-allowed"
                    />
                    <input
                      type="text"
                      {...registerMeeting("longitude")}
                      placeholder="Longitude (otomatis)"
                      readOnly
                      className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 opacity-80 cursor-not-allowed"
                    />
                  </div>
                )}

                {/* <input
                  type="datetime-local"
                  {...registerMeeting("start_at")}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
                /> */}

                <button className="w-full bg-amber-500 text-slate-900 py-2 rounded-md font-semibold hover:bg-amber-400 transition">
                  Simpan Pertemuan
                </button>
              </form>
            )}

            {course.courseMeeting?.length === 0 ? (
              <p className="text-slate-400 text-sm italic">
                Belum ada pertemuan ditambahkan.
              </p>
            ) : (
              <ul className="space-y-2">
                {course.courseMeeting.map((m: any) => (
                  <li
                    key={m.id}
                    className="flex justify-between items-center bg-slate-900/60 px-4 py-2 rounded-md border border-slate-700"
                  >
                    <div>
                      <p className="font-medium text-white">{m.title}</p>
                      <p className="text-xs text-slate-400">
                        {m.start_at
                          ? new Date(m.start_at).toLocaleString("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Belum dijadwalkan"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* === MATERI === */}
        {isEdit && (
          <div className="bg-slate-800/40 p-6 rounded-lg border border-slate-700 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-400">
                File Materi Global
              </h2>
              <button
                onClick={() => setShowAddMaterial((p) => !p)}
                className="flex items-center space-x-2 text-sm bg-blue-500 text-slate-900 px-3 py-1 rounded-md hover:bg-blue-400"
              >
                {showAddMaterial ? <X size={14} /> : <Plus size={14} />}
                <span>{showAddMaterial ? "Batal" : "Tambah File"}</span>
              </button>
            </div>

            {showAddMaterial && (
              <FormProvider {...materialForm}>
                <form
                  onSubmit={handleSubmitMaterial(onSubmitMaterial)}
                  className="bg-slate-900/60 border border-slate-700 rounded-md p-6 space-y-4"
                >
                  <Dropzone />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-slate-900 py-2 rounded-md font-semibold hover:bg-blue-400 transition"
                  >
                    Upload File
                  </button>
                </form>
              </FormProvider>
            )}

            {course.courseMaterial?.length === 0 ? (
              <p className="text-slate-400 text-sm italic">
                Belum ada file materi diunggah.
              </p>
            ) : (
              <ul className="space-y-2">
                {course.courseMaterial.map((mat: any) => (
                  <li
                    key={mat.id}
                    className="flex justify-between items-center bg-slate-900/60 px-4 py-2 rounded-md border border-slate-700"
                  >
                    <a
                      href={`${environment.IMAGE_URL}${mat.file}`}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-300 hover:text-blue-200"
                    >
                      <FileText size={16} /> {mat.fileName}
                    </a>
                    <button
                      onClick={() =>
                        confirm("Yakin hapus file ini?") &&
                        courseService.deleteCourseMaterial(id, mat.id)
                      }
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CourseFormPage;
