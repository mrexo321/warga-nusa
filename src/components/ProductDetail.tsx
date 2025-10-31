import React from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Star, ArrowRight } from "lucide-react";
import HomeLayout from "../layouts/HomeLayout";

const products = [
  {
    id: 1,
    name: "EduLearn Platform",
    image: "https://images.unsplash.com/photo-1581092334457-1a9e27bfb31b",
    desc: "Platform pembelajaran digital modern untuk lembaga pendidikan dan pelatihan.",
    longDesc:
      "EduLearn adalah platform pembelajaran digital yang dirancang untuk mempermudah institusi pendidikan dalam mengelola kelas daring, tugas, hingga sertifikat. Kami percaya bahwa teknologi harus membuat pembelajaran menjadi lebih efektif, bukan rumit. Dengan tampilan yang sederhana dan fitur lengkap, EduLearn menjadi solusi all-in-one untuk dunia pendidikan modern.",
    features: [
      "Kelas virtual interaktif dengan video dan chat",
      "Dashboard analitik kemajuan siswa",
      "Manajemen kurikulum otomatis",
      "Integrasi Zoom & Google Meet",
      "Sertifikat digital otomatis",
    ],
    tech: ["React", "Node.js", "Tailwind", "PostgreSQL", "Socket.io"],
    showcase: [
      "https://images.unsplash.com/photo-1584697964194-541e068a0be8",
      "https://images.unsplash.com/photo-1611078489935-c7e8b7c07d6b",
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437c1",
    ],
    testimonial:
      "EduLearn mempermudah kami menjalankan program pembelajaran online. Dashboard-nya intuitif dan mudah dipahami bahkan oleh dosen yang awam teknologi.",
    user: "— Dr. Rina, Universitas Terbuka",
    cta: "#",
  },
  {
    id: 2,
    name: "HealthTrack App",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    desc: "Aplikasi monitoring kesehatan dengan kecerdasan buatan.",
    longDesc:
      "HealthTrack membantu pengguna memantau aktivitas, nutrisi, dan kesehatan tubuh dengan integrasi smartwatch. Ditenagai AI untuk memberikan rekomendasi harian yang sesuai kebutuhan tubuh Anda.",
    features: [
      "AI Health Assistant personal",
      "Pelacakan aktivitas & nutrisi otomatis",
      "Integrasi smartwatch",
      "Pengingat hidrasi & istirahat",
    ],
    tech: ["Flutter", "Firebase", "TensorFlow Lite"],
    showcase: [
      "https://images.unsplash.com/photo-1603791452906-bbb58b8de1e0",
      "https://images.unsplash.com/photo-1588776814546-ec7d2cddbb75",
    ],
    testimonial:
      "Saya bisa pantau kebugaran dengan mudah, dan HealthTrack memberi saran pola makan yang sesuai dengan kondisi saya.",
    user: "— Dimas, pengguna HealthTrack sejak 2023",
    cta: "#",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <HomeLayout>
        <div className="text-center text-white py-40">
          <h2 className="text-3xl font-bold">Produk tidak ditemukan</h2>
          <Link to="/products" className="text-slate-300 underline mt-4 block">
            Kembali ke Daftar Produk
          </Link>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center bg-transparent text-center text-white overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto mb-6">
            {product.desc}
          </p>
          <a
            href={product.cta}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
          >
            Coba Sekarang <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-slate-900 text-slate-100 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Tentang Produk</h2>
          <p className="text-slate-400 leading-relaxed text-lg mb-10">
            {product.longDesc}
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-slate-800 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-white text-center mb-12">
            Fitur Unggulan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((f, i) => (
              <div
                key={i}
                className="bg-slate-900/80 p-6 rounded-2xl text-white shadow-md hover:shadow-lg transition"
              >
                <CheckCircle className="text-indigo-500 mb-3" size={28} />
                <p className="text-lg">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH SECTION */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-white mb-8">
            Teknologi yang Digunakan
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {product.tech.map((t, i) => (
              <span
                key={i}
                className="bg-indigo-600/20 text-indigo-300 border border-indigo-600/40 px-4 py-2 rounded-full text-sm font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section className="bg-slate-800 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-white text-center mb-12">
            Tampilan Produk
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.showcase.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`showcase-${i}`}
                className="rounded-2xl object-cover h-64 w-full shadow-lg hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="bg-gradient-to-b from-slate-900 to-black py-24 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <Star className="mx-auto mb-4 text-yellow-400" size={40} />
          <p className="italic text-xl mb-4">“{product.testimonial}”</p>
          <p className="text-slate-400">{product.user}</p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-indigo-700 py-20 text-center text-white">
        <h2 className="text-4xl font-semibold mb-6">
          Siap menggunakan {product.name}?
        </h2>
        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
          Bergabunglah bersama ratusan pengguna lainnya dan nikmati kemudahan
          yang ditawarkan {product.name}.
        </p>
        <a
          href={product.cta}
          className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-100 transition"
        >
          Coba Sekarang <ArrowRight className="w-5 h-5" />
        </a>
        <div className="mt-10">
          <Link
            to="/products"
            className="text-indigo-200 hover:underline text-sm block mt-6"
          >
            ← Kembali ke semua produk
          </Link>
        </div>
      </section>
    </HomeLayout>
  );
};

export default ProductDetail;
