"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt, AiFillStar } from "react-icons/ai";
import { FiBell, FiShoppingCart } from "react-icons/fi";

const initialItems = [
  { id: 1, name: "Covid-19 Vaccine",    brand: "Protein Based", price: 120, originalPrice: 240, rating: 4.5, reviews: 128, tag: "50% OFF"  , image: "/med1.png" },
  { id: 2, name: "Vitamin D3 Capsules", brand: "Sun Pharma",    price: 85,  originalPrice: 110, rating: 4.3, reviews: 94,  tag: null         , image: "/med2.png" },
  { id: 3, name: "Paracetamol 500mg",   brand: "Cipla",         price: 45,  originalPrice: 60,  rating: 4.7, reviews: 312, tag: "BESTSELLER" , image: "/med3.png" },
  { id: 4, name: "Omega-3 Fish Oil",    brand: "Biocon",        price: 199, originalPrice: 250, rating: 4.2, reviews: 67,  tag: "NEW"        , image: "/med4.png" },
];

function WishlistCard({ item, onRemove }: { item: (typeof initialItems)[0]; onRemove: (id: number) => void }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-red-100 transition-all">
      <div className="relative aspect-square flex items-center justify-center">
        {item.tag && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 ${
            item.tag === "BESTSELLER" ? "bg-amber-100 text-amber-700"
            : item.tag === "NEW"     ? "bg-green-100 text-green-700"
                                     : "bg-red-500 text-white"
          }`}>{item.tag}</span>
        )}
        <button onClick={() => onRemove(item.id)} className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:scale-110 transition-transform z-10">
          <AiFillHeart className="w-4 h-4 text-red-500" />
        </button>
        <button className="absolute top-10.5 right-2 p-1.5 rounded-full bg-white shadow-sm hover:scale-110 transition-transform z-10">
          <AiOutlineShareAlt className="w-4 h-4 text-gray-400" />
        </button>
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="p-3">
        <p className="text-sm font-bold text-gray-800 leading-snug truncate">{item.name}</p>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-red-500">₹{item.price}</span>
            <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <AiFillStar className="w-3 h-3 text-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{item.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const [items, setItems] = useState(initialItems);
  const handleRemove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Navbar-style header with bell + cart */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Wishlist</h1>
            <p className="text-xs text-gray-400 font-medium">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors">
              <FiBell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <Link href="/cart" className="relative p-2 rounded-xl bg-red-500 hover:bg-red-600 transition-colors block">
              <FiShoppingCart className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-red-500 text-[10px] font-bold rounded-full flex items-center justify-center border border-red-100 shadow-sm">
                {items.length}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <AiOutlineHeart className="w-8 h-8 text-red-300" />
          </div>
          <p className="text-base font-bold text-gray-700">Your wishlist is empty</p>
          <p className="text-sm text-gray-400 mt-1">Save items you love to find them later.</p>
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-4 pt-4 pb-36">
              {items.map((item) => (
                <WishlistCard key={item.id} item={item} onRemove={handleRemove} />
              ))}
            </div>
          </div>
          {/* Add all to cart — floats above footer nav */}
          <div className="fixed bottom-16 left-0 right-0 px-4 pb-2 z-40">
            <div className="max-w-7xl mx-auto">
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold shadow-md shadow-red-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                <FiShoppingCart className="w-4 h-4" />
                Add All to Cart ({items.length} items)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}