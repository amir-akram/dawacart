"use client";

import Image from "next/image";
import Link from "next/link";
import { FiBell, FiShoppingCart, FiChevronRight, FiMapPin, FiPhone, FiMail, FiShield, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import FooterNav from "@/components/shared/FooterNav";

const menuItems = [
  { icon: FiMapPin,     label: "Saved Addresses",    href: "/profile/addresses" },
  { icon: FiPhone,      label: "Contact Us",          href: "/profile/contact"   },
  { icon: FiMail,       label: "Email Preferences",   href: "/profile/email"     },
  { icon: FiShield,     label: "Privacy & Security",  href: "/profile/privacy"   },
  { icon: FiHelpCircle, label: "Help & FAQ",           href: "/profile/help"      },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white w-full">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Profile</h1>
            <p className="text-xs text-gray-400 font-medium">Manage your account</p>
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

      <div className="w-full max-w-7xl mx-auto px-4 pb-28 pt-4">
        {/* On desktop: two-column layout */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">

          {/* Left col — profile card + stats */}
          <div className="lg:col-span-1 space-y-3">
            {/* Profile Card */}
            <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-4 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-red-100 flex-shrink-0">
                <Image src="/dp.png" alt="Profile" fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-gray-900 truncate">Aamir Khan</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">aamir.khan@email.com</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <AiFillStar className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-semibold text-gray-600">Premium Member</span>
                  <span className="ml-1 text-[10px] font-bold bg-red-50 text-red-500 px-1.5 py-0.5 rounded-full">PRO</span>
                </div>
              </div>
              <button className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-1.5 rounded-xl hover:bg-red-100 transition-colors flex-shrink-0">
                Edit
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Orders",   value: "24" },
                { label: "Wishlist", value: "12" },
                { label: "Reviews",  value: "8"  },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-gray-100 shadow-sm bg-white py-3 px-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right col — menu + sign out */}
          <div className="lg:col-span-2 space-y-3 mt-3 lg:mt-0">
            <div className="rounded-2xl border border-gray-100 shadow-sm bg-white overflow-hidden divide-y divide-gray-50">
              {menuItems.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 rounded-xl bg-red-50 flex-shrink-0">
                    <Icon className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-gray-800">{label}</span>
                  <FiChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </Link>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-100 text-red-500 text-sm font-bold hover:bg-red-50 transition-colors">
              <FiLogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <FooterNav />
    </div>
  );
}