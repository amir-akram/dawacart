"use client";

import Image from "next/image";
import Link from "next/link";
import { FiBell, FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">

        {/* Left: Avatar + Greeting */}
        <Link href="/profile" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-red-500 ring-offset-1 flex-shrink-0 group-hover:ring-red-600 transition-all">
            <Image
              src="/dp.png"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="text-xs text-gray-400 font-medium">welcome</p>
            <p className="text-sm font-bold text-gray-800 group-hover:text-red-500 transition-colors">
              Hello, Amir!
            </p>
          </div>
        </Link>

        {/* Center: Brand name — only on lg+ */}
        <Link
          href="/"
          className="hidden lg:block text-lg font-black tracking-tight text-gray-900 hover:text-red-500 transition-colors absolute left-1/2 -translate-x-1/2"
        >
          DAWA<span className="text-red-500">CART</span>
        </Link>

        {/* Right: Icons */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="relative p-2 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors"
          >
            <FiBell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative p-2 rounded-xl bg-red-500 hover:bg-red-600 transition-colors block"
          >
            <FiShoppingCart className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-red-500 text-[10px] font-bold rounded-full flex items-center justify-center border border-red-100 shadow-sm">
              3
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}