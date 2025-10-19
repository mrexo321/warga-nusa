import React, { useState } from "react";
import { PlusCircle, Trash2, Upload } from "lucide-react";
import MainLayout from "../../../layouts/MainLayout";

const CourseDetailMaterials = () => {
  const [materials, setMaterials] = useState([
    { id: Date.now(), title: "", file: null },
  ]);

  const handleAddMaterial = () => {
    setMaterials([
      ...materials,
      { id: Date.now() + Math.random(), title: "", file: null },
    ]);
  };

  const handleRemoveMaterial = (id: number) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  const handleChange = (id: number, field: string, value: any) => {
    setMaterials(
      materials.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data materi:", materials);
    alert("Materi berhasil disimpan (dummy)");
  };

  return (
    <MainLayout>
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />
      <h1 className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-3">
        📚 Tambah Materi Course
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {materials.map((material, index) => (
          <div
            key={material.id}
            className="p-6 rounded-xl bg-slate-700/40 border border-slate-600/60 relative"
          >
            <div className="absolute top-3 right-3">
              {materials.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMaterial(material.id)}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Judul Materi #{index + 1}
                </label>
                <input
                  type="text"
                  value={material.title}
                  onChange={(e) =>
                    handleChange(material.id, "title", e.target.value)
                  }
                  placeholder="Masukkan judul materi"
                  className="w-full bg-slate-800/80 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Upload File
                </label>
                <label
                  htmlFor={`file-${material.id}`}
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-500 rounded-xl cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 transition"
                >
                  <Upload className="w-8 h-8 mb-2 text-sky-400" />
                  <p className="text-sm text-slate-400">
                    {material.file
                      ? (material.file as File).name
                      : "Klik untuk pilih file"}
                  </p>
                  <input
                    id={`file-${material.id}`}
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleChange(material.id, "file", e.target.files?.[0])
                    }
                    required
                  />
                </label>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center pt-6 border-t border-slate-700">
          <button
            type="button"
            onClick={handleAddMaterial}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg shadow transition"
          >
            <PlusCircle size={18} /> Tambah Materi
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg shadow transition"
          >
            Simpan Semua Materi
          </button>
        </div>
      </form>
    </MainLayout>
  );
};

export default CourseDetailMaterials;
