"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiTrash2, FiShoppingBag, FiTag } from "react-icons/fi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const initialCartItems = [
  { id: 1, name: "Dolo 500mg",    brand: "Protein Based", price: 120, originalPrice: 240, qty: 1, tag: "50% OFF"   , image: "/med1.png"   },
  { id: 2, name: "Telmisartan 40mg", brand: "Sun Pharma",    price: 85,  originalPrice: 110, qty: 2, tag: null         , image: "/med2.png" },
  { id: 3, name: "clocip antifungal powder",   brand: "Cipla",         price: 45,  originalPrice: 60,  qty: 1, tag: "BESTSELLER" , image: "/med4.png" },
];

type CartItem = (typeof initialCartItems)[0];

function CartItemRow({
  item,
  onQtyChange,
  onRemove,
}: {
  item: CartItem;
  onQtyChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="flex gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 hover:shadow-md hover:border-red-100 transition-all">
      {/* Product image */}
      <div className="relative rounded-xl flex-shrink-0 flex items-center justify-center w-30 aspect-square overflow-hidden">
        {item.tag && (
          <span className={`absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10 ${
            item.tag === "BESTSELLER" ? "bg-amber-100 text-amber-700" : "bg-red-500 text-white"
          }`}>{item.tag}</span>
        )}
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{item.brand}</p>
        <p className="text-sm font-bold text-gray-800 leading-snug truncate mt-0.5">{item.name}</p>

        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-sm font-bold text-red-500">₹{item.price}</span>
          <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
            {Math.round((1 - item.price / item.originalPrice) * 100)}% off
          </span>
        </div>

        {/* Qty + Remove */}
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1 border border-gray-100">
            <button
              onClick={() => onQtyChange(item.id, -1)}
              className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <AiOutlineMinus className="w-3 h-3" />
            </button>
            <span className="text-sm font-bold text-gray-800 min-w-[20px] text-center">{item.qty}</span>
            <button
              onClick={() => onQtyChange(item.id, +1)}
              className="w-6 h-6 rounded-lg bg-red-500 shadow-sm flex items-center justify-center text-white hover:bg-red-600 transition-colors"
            >
              <AiOutlinePlus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 transition-colors"
          >
            <FiTrash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderSummaryPanel({ subtotal, savings, delivery, total }: {
  subtotal: number; savings: number; delivery: number; total: number;
}) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-2.5">
      <p className="text-sm font-bold text-gray-800 mb-3">Order Summary</p>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Subtotal</span>
        <span className="font-semibold text-gray-800">₹{subtotal}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-green-600">Savings</span>
        <span className="font-semibold text-green-600">−₹{savings}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Delivery</span>
        <span className={`font-semibold ${delivery === 0 ? "text-green-600" : "text-gray-800"}`}>
          {delivery === 0 ? "FREE" : `₹${delivery}`}
        </span>
      </div>
      <div className="border-t border-gray-100 pt-2.5 flex justify-between">
        <span className="text-sm font-bold text-gray-900">Total Payable</span>
        <span className="text-base font-bold text-red-500">₹{total}</span>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [items, setItems] = useState(initialCartItems);

  const handleQtyChange = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const savings  = items.reduce((sum, i) => sum + (i.originalPrice - i.price) * i.qty, 0);
  const delivery = subtotal > 200 ? 0 : 40;
  const total    = subtotal + delivery;
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3 w-full max-w-7xl mx-auto">
          <Link href="/" className="p-2 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors">
            <FiArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">My Cart</h1>
            <p className="text-xs text-gray-400 font-medium">
              {totalQty} item{totalQty !== 1 ? "s" : ""}
            </p>
          </div>
          {/* Total chip on desktop */}
          {items.length > 0 && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full">
              ₹{total} total
            </span>
          )}
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 pt-4 pb-36">
        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <FiShoppingBag className="w-8 h-8 text-red-300" />
            </div>
            <p className="text-base font-bold text-gray-700">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-1">Add items to get started.</p>
            <Link href="/" className="mt-6 px-6 py-3 rounded-2xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          /* Desktop: two-column; Mobile: single column */
          <div className="lg:grid lg:grid-cols-5 lg:gap-6 lg:items-start">

            {/* Left — item list */}
            <div className="lg:col-span-3 space-y-3">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                />
              ))}

              {/* Free delivery nudge */}
              {delivery > 0 && (
                <div className="rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700 font-medium flex items-center gap-2">
                  <span className="text-base">🚚</span>
                  Add <span className="font-bold">₹{200 - subtotal}</span> more for FREE delivery
                </div>
              )}

              {/* Coupon row */}
              <button className="w-full flex items-center gap-3 bg-white rounded-2xl border border-dashed border-red-200 px-4 py-3 hover:bg-red-50/40 transition-colors">
                <div className="p-1.5 rounded-lg bg-red-50">
                  <FiTag className="w-4 h-4 text-red-500" />
                </div>
                <span className="flex-1 text-sm font-semibold text-gray-700 text-left">Apply Coupon</span>
                <span className="text-xs text-red-500 font-bold">Add</span>
              </button>

              {/* Order summary — mobile only (below items) */}
              <div className="lg:hidden">
                <OrderSummaryPanel subtotal={subtotal} savings={savings} delivery={delivery} total={total} />
              </div>
            </div>

            {/* Right — sticky summary + CTA on desktop */}
            <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-20 space-y-3">
              <OrderSummaryPanel subtotal={subtotal} savings={savings} delivery={delivery} total={total} />
              <Link
                href="/checkout"
                className="flex w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold shadow-lg shadow-red-200 hover:shadow-red-300 active:scale-[0.98] transition-all items-center justify-center gap-2"
              >
                Proceed to Checkout →
              </Link>
            </div>

          </div>
        )}
      </div>

      {/* Mobile floating CTA */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-40 lg:hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-400 font-medium">Total payable</p>
              <p className="text-base font-bold text-red-500">₹{total}</p>
            </div>
            <Link
              href="/checkout"
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold shadow-md shadow-red-200 active:scale-[0.98] transition-all text-center"
            >
              Proceed to Checkout →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}