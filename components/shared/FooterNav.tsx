"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHomeOutline, IoHome } from "react-icons/io5";
import { BsGrid, BsGridFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";

const navItems = [
  { id: "home",       href: "/",           label: "Home",       IconOutline: IoHomeOutline,  IconFill: IoHome      },
  { id: "categories", href: "/categories", label: "Categories", IconOutline: BsGrid,         IconFill: BsGridFill  },
  { id: "wishlist",   href: "/wishlist",   label: "Wishlist",   IconOutline: AiOutlineHeart, IconFill: AiFillHeart },
  { id: "profile",    href: "/profile",    label: "Profile",    IconOutline: RiUser3Line,    IconFill: RiUser3Fill },
];

export default function FooterNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
      {/* ── Mobile / tablet: icon pill row ── */}
      <div className="flex items-center justify-around px-2 pt-2 pb-safe-or-4
                      [padding-bottom:max(1rem,env(safe-area-inset-bottom))]
                      lg:hidden">
        {navItems.map(({ id, href, label, IconOutline, IconFill }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={id}
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-col items-center gap-1 min-w-[56px] group"
            >
              <div className={`relative p-2 rounded-2xl transition-all duration-200 ${
                isActive ? "bg-red-50" : "hover:bg-gray-50"
              }`}>
                {isActive
                  ? <IconFill className="w-5 h-5 text-red-500" />
                  : <IconOutline className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                }
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Desktop lg+: full-width text nav ── */}
      <div className="hidden lg:flex items-center justify-center gap-1 px-8 py-3 max-w-7xl mx-auto w-full">
        {navItems.map(({ id, href, label }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={id}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-red-50 text-red-500"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}