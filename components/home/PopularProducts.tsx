"use client";

import Image from "next/image";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt, AiFillStar } from "react-icons/ai";

const products = [
  { id: 1, name: "Paracetamol 500mg",   brand: "Dolo", price: 120, originalPrice: 240, rating: 4.5, reviews: 128, tag: "50% OFF" , image: "/med1.png" },
  { id: 2, name: "Telmisartan 40mg", brand: "mankind",    price: 85,  originalPrice: 110, rating: 4.3, reviews: 94,  tag: null   , image: "/med2.png" },
  { id: 3, name: "Himalaya Koflet-SF",   brand: "Cipla",         price: 45,  originalPrice: 60,  rating: 4.7, reviews: 312, tag: "BESTSELLER" , image: "/med3.png" },
  { id: 4, name: "Clocip anti-fungal powder",    brand: "Biocon",        price: 199, originalPrice: 250, rating: 4.2, reviews: 67,  tag: "NEW"        , image: "/med4.png" },
];

export function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [wished, setWished] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-red-100 transition-all">
      {/* 1:1 Image Area */}
      <div className="relative aspect-square flex items-center justify-center">
        {/* Tag */}
        {product.tag && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 ${
            product.tag === "BESTSELLER" ? "bg-amber-100 text-amber-700"
            : product.tag === "NEW"      ? "bg-green-100 text-green-700"
                                         : "bg-red-500 text-white"
          }`}>
            {product.tag}
          </span>
        )}

        {/* Wishlist */}
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setWished(!wished)}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:scale-110 transition-transform z-10"
        >
          {wished
            ? <AiFillHeart    className="w-4 h-4 text-red-500" />
            : <AiOutlineHeart className="w-4 h-4 text-gray-400" />}
        </button>

        {/* Share */}
        <button
          aria-label="Share product"
          className="absolute top-10.5 right-2 p-1.5 rounded-full bg-white shadow-sm hover:scale-110 transition-transform z-10"
        >
          <AiOutlineShareAlt className="w-4 h-4 text-gray-400" />
        </button>

        <Image src={product.image} alt={product.name} fill className="object-cover p-4" />
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-bold text-gray-800 leading-snug truncate">{product.name}</p>

        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-red-500">₹{product.price}</span>
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <AiFillStar className="w-3 h-3 text-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PopularProducts() {
  return (
    <section className="bg-white pt-4 pb-4 w-full">
      <div className="flex items-center justify-between px-4 mb-3 max-w-7xl mx-auto">
        <h2 className="text-base font-bold text-gray-800">Popular Products</h2>
        <button className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">
          See more
        </button>
      </div>

      {/* Responsive grid: 2 cols mobile → 3 md → 4 lg → 5 xl */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-4 max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}