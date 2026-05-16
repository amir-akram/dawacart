"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/shared/SearchBar";
import FooterNav from "@/components/shared/FooterNav";
import { FiBell, FiShoppingCart, FiArrowRight } from "react-icons/fi";

const categories = [
  { id: 1, title: "Most Ordered",           subtitle: "Top picks daily",        src: "/mock.png", accent: "from-rose-500/80"    },
  { id: 2, title: "Best Deals",             subtitle: "Save up to 60%",          src: "/mock.png", accent: "from-orange-500/80"  },
  { id: 3, title: "Elderly Care",           subtitle: "Curated for seniors",     src: "/mock.png", accent: "from-blue-500/80"    },
  { id: 4, title: "Vitamins & Supplements", subtitle: "Boost your health",       src: "/mock.png", accent: "from-green-500/80"   },
  { id: 5, title: "Baby Care",              subtitle: "Gentle & safe",           src: "/mock.png", accent: "from-pink-500/80"    },
  { id: 6, title: "Personal Care",          subtitle: "Feel your best",          src: "/mock.png", accent: "from-purple-500/80"  },
];

function CategoryCard({ title, subtitle, src }: { title: string; subtitle: string; src: string }) {
  return (
    <button className="group relative w-full overflow-hidden rounded-3xl shadow-sm active:scale-[0.97] transition-all duration-200 hover:shadow-md
      aspect-[1/1] sm:aspect-square lg:aspect-[16/9]">
      {/* Image fills card */}
      <Image src={src} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />

      {/* Subtle dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Gradient bottom panel — bottom 28% */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{ height: "28%", background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)" }}
      />

      {/* Text at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-3">
        <p className="text-white text-sm font-bold leading-tight drop-shadow-sm">{title}</p>
        <p className="text-white/70 text-[10px] font-medium mt-0.5 hidden sm:block">{subtitle}</p>
      </div>

      {/* Arrow hint on hover — desktop */}
      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <FiArrowRight className="w-3.5 h-3.5 text-white" />
      </div>
    </button>
  );
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Categories</h1>
            <p className="text-xs text-gray-400 font-medium">{categories.length} categories</p>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Notifications" className="relative p-2 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors">
              <FiBell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <Link href="/cart" className="relative p-2 rounded-xl bg-red-500 hover:bg-red-600 transition-colors block">
              <FiShoppingCart className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-red-500 text-[10px] font-bold rounded-full flex items-center justify-center border border-red-100 shadow-sm">3</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto">
        <SearchBar />

        {/*
          Mobile  : 2 cols, tall portrait tiles (3/4 aspect) — fills screen beautifully
          sm–md   : 2 cols, square tiles
          lg+     : 3 cols, wide landscape tiles (16/9)
        */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 px-4 pb-28">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} title={cat.title} subtitle={cat.subtitle} src={cat.src} />
          ))}
        </div>
      </div>

      <FooterNav />
    </div>
  );
}