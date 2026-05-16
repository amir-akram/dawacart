"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft, FiMapPin, FiChevronRight, FiCheck, FiTag, FiShield } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

const cartItems = [
  { id: 1, name: "Dolo 500mg",    brand: "Protein Based", price: 120, originalPrice: 240, qty: 1 , image: "/med1.png" },
  { id: 2, name: "Telmisartan 40mg", brand: "Sun Pharma",    price: 85,  originalPrice: 110, qty: 2 , image: "/med2.png" },
  { id: 3, name: "Clocip antifungal powder",   brand: "Cipla",         price: 45,  originalPrice: 60,  qty: 1 , image: "/med4.png" },
];

const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
const delivery = 40;
const discount = 30;
const total    = subtotal + delivery - discount;

const paymentOptions = [
  { id: "upi",  label: "UPI / Wallet",       sub: "PhonePe, GPay, Paytm",    icon: "⚡" },
  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", icon: "💳" },
  { id: "cod",  label: "Cash on Delivery",    sub: "Pay when you receive",    icon: "🏠" },
] as const;

type PaymentId = (typeof paymentOptions)[number]["id"];

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentId>("upi");

  return (
    <div className="min-h-screen bg-gray-50 w-full">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3 w-full max-w-7xl mx-auto">
          <Link href="/cart" className="p-2 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors">
            <FiChevronLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">Checkout</h1>
            <p className="text-xs text-gray-400 font-medium">{cartItems.length} items</p>
          </div>
          {/* Secure badge */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
            <FiShield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Secure</span>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 pt-4 pb-36">
        <div className="lg:grid lg:grid-cols-5 lg:gap-6 lg:items-start">

          {/* ── LEFT column ── */}
          <div className="lg:col-span-3 space-y-4">

            {/* Delivery Address */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-800">Delivery Address</h2>
                <button className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">Change</button>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-red-50 flex-shrink-0 mt-0.5">
                  <FiMapPin className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-800">Aamir Khan</p>
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Home</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Lane 2, petrol pump, Near Naaz hospital,<br />Kasari Masari, Prayagraj – 211016
                  </p>
                  <p className="text-xs font-semibold text-gray-600 mt-1">+91 98765 43210</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-800">Order Items</h2>
                <Link href="/cart" className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">Edit</Link>
              </div>
              <div className="space-y-3 divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pt-3 first:pt-0">
                    <div className="relative w-12 h-12 rounded-xl  border border-gray-100 flex-shrink-0 overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover p-1.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.brand} · Qty {item.qty}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-gray-900">₹{item.price * item.qty}</p>
                      {item.originalPrice > item.price && (
                        <p className="text-xs text-gray-400 line-through">₹{item.originalPrice * item.qty}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <button className="w-full flex items-center gap-3 bg-white rounded-2xl border border-dashed border-red-200 px-4 py-3.5 hover:bg-red-50/40 transition-colors">
              <div className="p-1.5 rounded-lg bg-red-50 flex-shrink-0">
                <FiTag className="w-4 h-4 text-red-500" />
              </div>
              <span className="flex-1 text-sm font-semibold text-gray-700 text-left">Apply Coupon</span>
              <span className="text-xs text-red-500 font-bold">Add</span>
              <FiChevronRight className="w-4 h-4 text-red-300" />
            </button>

            {/* Payment Method */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
              <h2 className="text-sm font-bold text-gray-800 mb-3">Payment Method</h2>
              <div className="space-y-2.5">
                {paymentOptions.map(({ id, label, sub, icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPayment(id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                      selectedPayment === id
                        ? "border-red-400 bg-red-50"
                        : "border-gray-100 bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedPayment === id ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`}>
                      {selectedPayment === id && <FiCheck className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "🔒", label: "100% Secure" },
                { icon: "↩️", label: "Easy Returns" },
                { icon: "✅", label: "Genuine Meds" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 bg-white rounded-2xl border border-gray-100 py-3 px-2">
                  <span className="text-lg">{icon}</span>
                  <span className="text-[10px] font-semibold text-gray-500 text-center">{label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT column — sticky price card ── */}
          <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-20">
            <PriceCard total={total} subtotal={subtotal} delivery={delivery} discount={discount} />
          </div>

        </div>

        {/* Price card — mobile (above floating button) */}
        <div className="lg:hidden mt-4">
          <PriceCard total={total} subtotal={subtotal} delivery={delivery} discount={discount} />
        </div>
      </div>

      {/* Mobile floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-white border-t border-gray-100 z-40 lg:hidden">
        <div className="max-w-7xl mx-auto">
          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold shadow-lg shadow-red-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            Place Order · ₹{total}
          </button>
        </div>
      </div>

    </div>
  );
}

function PriceCard({ total, subtotal, delivery, discount }: {
  total: number; subtotal: number; delivery: number; discount: number;
}) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
      <h2 className="text-sm font-bold text-gray-800 mb-3">Price Details</h2>
      <div className="space-y-2.5">
        {[
          { label: "Subtotal",         value: `₹${subtotal}`,  cls: "text-gray-700"  },
          { label: "Delivery Charges", value: `₹${delivery}`,  cls: "text-gray-700"  },
          { label: "Discount Applied", value: `-₹${discount}`, cls: "text-green-600" },
        ].map(({ label, value, cls }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{label}</span>
            <span className={`text-sm font-semibold ${cls}`}>{value}</span>
          </div>
        ))}
        <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">Total Payable</span>
          <span className="text-base font-bold text-red-500">₹{total}</span>
        </div>
      </div>

      {/* Savings callout */}
      <div className="mt-3 rounded-xl bg-green-50 border border-green-100 px-3 py-2.5 flex items-center gap-2">
        <AiFillStar className="w-4 h-4 text-green-500 flex-shrink-0" />
        <p className="text-xs font-semibold text-green-700">
          You save <span className="font-bold">₹{discount}</span> on this order!
        </p>
      </div>

      {/* Desktop CTA */}
      <button className="hidden lg:flex mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold shadow-lg shadow-red-200 hover:shadow-red-300 active:scale-[0.98] transition-all items-center justify-center gap-2">
        Place Order · ₹{total}
      </button>

      <p className="text-center text-[10px] text-gray-400 mt-2.5 font-medium">
        By placing the order you agree to our Terms of Service
      </p>
    </div>
  );
}