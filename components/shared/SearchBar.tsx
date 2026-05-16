"use client";

import { FiSearch, FiSliders } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="px-4 py-3 bg-white w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        {/* Search Input — grows to fill all available space */}
        <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5">
          <FiSearch className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search medicines, brands..."
            className="flex-1 min-w-0 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            readOnly
          />
        </div>

        {/* Filter — icon only on mobile, icon + label on lg+ */}
        <button
          aria-label="Filter"
          className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md shadow-red-200 hover:shadow-red-300 transition-all active:scale-95 flex-shrink-0"
        >
          <FiSliders className="w-5 h-5" />
          <span className="hidden lg:inline text-sm font-semibold whitespace-nowrap">Filter</span>
        </button>
      </div>
    </div>
  );
}