import React, { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { courseService } from "../../../services/courseService";
import MainLayout from "../../../layouts/MainLayout";

// 🧠 Slate imports
import {
  createEditor,
  Editor,
  Transforms,
  Text,
  Descendant,
  Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { withHistory } from "slate-history";

// 🔹 Schema Zod (tanpa kategori)
const courseSchema = z.object({
  code: z.string().min(1, "Kode kursus wajib diisi"),
  name: z.string().min(1, "Nama kursus wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  thumbnail: z.instanceof(File).optional(),
});

type CourseForm = z.infer<typeof courseSchema>;

// 🔹 Serialize Slate content
const serialize = (value: Descendant[]) =>
  value
    .map((n) => (n as any).children?.map((c: any) => c.text).join(" "))
    .join("\n");

// 🧱 Custom element renderer
const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case "heading-one":
      return (
        <h1 {...attributes} className="text-xl font-bold mb-2">
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 {...attributes} className="text-lg font-semibold mb-1">
          {children}
        </h2>
      );
    case "bulleted-list":
      return (
        <ul {...attributes} className="list-disc ml-6">
          {children}
        </ul>
      );
    case "numbered-list":
      return (
        <ol {...attributes} className="list-decimal ml-6">
          {children}
        </ol>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

// 🧱 Custom leaf renderer (bold, italic, underline)
const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>;
};

// 🔧 Helpers
const isMarkActive = (editor: any, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: any, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
};

const isBlockActive = (editor: any, format: string) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );
  return !!match;
};

const toggleBlock = (editor: any, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = ["numbered-list", "bulleted-list"].includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ["numbered-list", "bulleted-list"].includes(n.type),
    split: true,
  });

  const newType = isActive ? "paragraph" : isList ? "list-item" : format;
  Transforms.setNodes(editor, { type: newType });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// 🎛️ Toolbar Button Component
const ToolbarButton = ({
  format,
  icon,
  type = "mark",
}: {
  format: string;
  icon: string;
  type?: "mark" | "block";
}) => {
  const editor = useSlate();
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        if (type === "mark") toggleMark(editor, format);
        else toggleBlock(editor, format);
      }}
      className="px-2 py-1 text-sm bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
    >
      {icon}
    </button>
  );
};

const AddCourse = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
    },
  });

  // 🔹 Upload gambar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnail", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Mutasi API
  const createMutation = useMutation({
    mutationFn: async (data: CourseForm) => {
      const formData = new FormData();
      formData.append("code", data.code);
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
      return courseService.create(formData);
    },
    onSuccess: () => {
      toast.success("Kursus berhasil ditambahkan!");
      navigate("/courses");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Gagal menambahkan kursus");
    },
  });

  const onSubmit = (data: CourseForm) => createMutation.mutate(data);

  return (
    <MainLayout>
      <div className="p-6 space-y-8 text-slate-200">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          <h1 className="text-2xl font-bold tracking-wide text-white">
            ✨ Tambah Kursus Baru
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl shadow-lg shadow-black/30 p-6 space-y-6"
        >
          {/* Thumbnail */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Thumbnail Kursus
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="w-36 h-36 flex items-center justify-center border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-amber-400/70 hover:bg-slate-800/30 transition-all">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center text-slate-500 text-sm">
                    <Upload size={28} className="mb-1 text-amber-400" />
                    <span>Upload</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <div className="text-sm text-slate-400">
                <p>• Format: JPG, PNG</p>
                <p>• Maksimal ukuran: 2MB</p>
              </div>
            </div>
          </div>

          {/* Kode Kursus */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Kode Kursus
            </label>
            <input
              type="text"
              placeholder="Contoh: SEC-101"
              {...register("code")}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none"
            />
            {errors.code && (
              <p className="text-red-400 text-sm mt-1">{errors.code.message}</p>
            )}
          </div>

          {/* Nama Kursus */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Nama Kursus
            </label>
            <input
              type="text"
              placeholder="Masukkan nama kursus"
              {...register("name")}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* 🧠 Deskripsi (Slate Editor) */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Deskripsi
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => {
                const editor = useMemo(
                  () => withHistory(withReact(createEditor())),
                  []
                );
                const initialValue: Descendant[] = useMemo(
                  () => [
                    {
                      type: "paragraph",
                      children: [{ text: field.value || "" }],
                    },
                  ],
                  []
                );

                return (
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200">
                    <Slate
                      editor={editor}
                      initialValue={initialValue}
                      onChange={(val) => field.onChange(serialize(val))}
                    >
                      {/* Toolbar */}
                      <div className="flex flex-wrap gap-2 mb-2 border-b border-slate-700 pb-2">
                        <ToolbarButton format="bold" icon="B" />
                        <ToolbarButton format="italic" icon="I" />
                        <ToolbarButton format="underline" icon="U" />
                        <ToolbarButton
                          format="heading-one"
                          icon="H1"
                          type="block"
                        />
                        <ToolbarButton
                          format="heading-two"
                          icon="H2"
                          type="block"
                        />
                        <ToolbarButton
                          format="bulleted-list"
                          icon="• List"
                          type="block"
                        />
                        <ToolbarButton
                          format="numbered-list"
                          icon="1. List"
                          type="block"
                        />
                      </div>

                      <Editable
                        placeholder="Tulis deskripsi kursus..."
                        className="min-h-[150px] outline-none leading-relaxed"
                        renderElement={(props) => <Element {...props} />}
                        renderLeaf={(props) => <Leaf {...props} />}
                      />
                    </Slate>
                  </div>
                );
              }}
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Tombol Simpan */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex items-center gap-2 bg-amber-500 text-slate-900 font-semibold px-6 py-2 rounded-lg hover:bg-amber-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Menyimpan...
                </>
              ) : (
                "Simpan Kursus"
              )}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddCourse;
