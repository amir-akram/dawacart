"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/shared/SearchBar";
import FooterNav from "@/components/shared/FooterNav";
import { FiBell, FiShoppingCart, FiArrowRight } from "react-icons/fi";

const categories = [
  { id: 1, title: "Most Ordered",           subtitle: "Top picks daily",        src: "/cat/mos.png", accent: "from-rose-500/80"    },
  { id: 2, title: "Best Deals",             subtitle: "Save up to 60%",          src: "/cat/bes.png", accent: "from-orange-500/80"  },
  { id: 3, title: "Baby Care",              subtitle: "Gentle & safe",           src: "/cat/bab.png", accent: "from-pink-500/80"    },
  { id: 4, title: "Personal Care",          subtitle: "Feel your best",          src: "/cat/per.png", accent: "from-purple-500/80"  },
  { id: 5, title: "Elderly Care",           subtitle: "Curated for seniors",     src: "/cat/eld.png", accent: "from-blue-500/80"    },
  { id: 6, title: "Vitamins & Supplements", subtitle: "Boost your health",       src: "/cat/vit.png", accent: "from-green-500/80"   },
];

function CategoryCard({
  title,
  subtitle,
  src,
}: {
  title: string;
  subtitle: string;
  src: string;
}) {
  return (
    <button
      className="
        group relative w-full overflow-hidden rounded-[28px]
        bg-white
        transition-all duration-300
        active:scale-[0.985]
        hover:-translate-y-1

        /* Soft 3D shadow */
        shadow-[0_10px_30px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)]

        /* Stronger hover depth */
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.16),0_8px_18px_rgba(0,0,0,0.10)]

        aspect-[1/1]
        sm:aspect-square
        lg:aspect-[16/9]
      "
    >
      {/* Image */}
      <Image
        src={src}
        alt={title}
        fill
        className="
        p-2
          object-cover
          transition-transform duration-500
          group-hover:scale-105
        "
      />

      {/* Soft glossy top highlight */}
      <div
        className="
          absolute inset-x-0 top-0 h-24
          bg-gradient-to-b from-white/30 to-transparent
          pointer-events-none
        "
      />

      {/* Bottom text container */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          px-4 py-4
          
          bg-gradient-to-t from-black/20 to-transparent
          
        "
      >
        <p className="text-transparent bg-linear-to-t from-black to-black/30 bg-clip-text text-xs sm:text-base font-semibold tracking-tight drop-shadow-md">
          {title}
        </p>
      </div>

      {/* Floating arrow */}
      <div
        className="
          absolute top-3 right-3
          w-8 h-8 rounded-full
          bg-white/80
          backdrop-blur-md
          flex items-center justify-center

          opacity-0 translate-y-1
          group-hover:opacity-100
          group-hover:translate-y-0

          transition-all duration-300

          shadow-lg
        "
      >
        <FiArrowRight className="w-4 h-4 text-gray-800" />
      </div>

      {/* Inner border for premium depth */}
      <div
        className="
          absolute inset-0 rounded-[28px]
          ring-1 ring-black/5
          pointer-events-none
        "
      />
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 px-4 pb-28 pt-4 border-t border-gray-100 ">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} title={cat.title} subtitle={cat.subtitle} src={cat.src} />
          ))}
        </div>
      </div>

      <FooterNav />
    </div>
  );
}