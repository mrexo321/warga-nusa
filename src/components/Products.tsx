import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

const products = [
  {
    id: 1,
    name: "EduLearn Platform",
    image: "https://images.unsplash.com/photo-1581092334457-1a9e27bfb31b",
    shortDesc: "Platform e-learning interaktif dengan sistem kelas online.",
  },
  {
    id: 2,
    name: "HealthTrack App",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    shortDesc: "Aplikasi monitoring kesehatan harian berbasis AI.",
  },
  {
    id: 3,
    name: "ShopEase",
    image: "https://images.unsplash.com/photo-1515169067865-5387ec356754",
    shortDesc: "Website e-commerce dengan sistem rekomendasi pintar.",
  },
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-20 bg-transparent text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Produk & Portofolio Kami</h2>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate(`/product/${item.id}`)}
              className="cursor-pointer bg-slate-800/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-slate-700/50 transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-slate-400 text-sm">{item.shortDesc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
