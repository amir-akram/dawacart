"use client";

import Image from "next/image";

const companies = [
  { id: 1, name: "Cipla",      src: "/cipla.png"    },
  { id: 2, name: "Mankind",    src: "/mankind.png"  },
  { id: 3, name: "Dr Reddy",   src: "/drreddy.png"  },
  { id: 4, name: "Cetaphil",   src: "/cetaphil.png" },
  { id: 5, name: "Sun Pharma", src: "/mankind.png"  },
  { id: 6, name: "Biocon",     src: "/cipla.png"    },
];

export default function TopCompanies() {
  return (
    <section className="pt-4 pb-3 px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-800">Top Companies</h2>
        <button className="text-xs font-semibold text-red-500">See more</button>
      </div>

      {/*
        Mobile  : 4 items in a single scrollable row (original feel)
        sm–md   : wrap into a 4-col grid
        lg+     : 6-col grid, all visible, no scroll
      */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none sm:grid sm:grid-cols-4 lg:grid-cols-6 sm:overflow-visible">
        {companies.map((company) => (
          <button
            key={company.id}
            aria-label={company.name}
            className="relative flex-shrink-0 w-[22vw] sm:w-auto rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-red-300 transition-colors"
            style={{ aspectRatio: "4 / 3" }}
          >
            <Image
              src={company.src}
              alt={company.name}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </section>
  );
}