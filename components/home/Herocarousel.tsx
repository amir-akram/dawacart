"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    id: 1,
    src: "/bann0.png",
    alt: "Dawacart Offer",

    content: (
      <div className="absolute left-[25%] bottom-[16%] text-right">
        <button className="cursor-pointer mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-xs sm:text-base font-semibold transition uppercase tracking-wide">
          Claim Now
        </button>
      </div>
    ),
  },

  {
    id: 2,
    src: "/ban1.png",
    alt: "First Order Offer",

    content: (
      <div className="absolute right-[7%] top-1/2 -translate-y-1/2 max-w-[38%]">
        
        <h2 className="text-black text-2xl sm:text-5xl font-black leading-tight mt-8">
          FIRST ORDER?
        </h2>

        <p className="text-black text-sm sm:text-xl font-medium uppercase">
          Use coupon code
        </p>

        <div className="inline-block mt-3 bg-black text-yellow-500 px-5 py-2 rounded-xl text-lg sm:text-2xl font-black tracking-wider">
          DAWA50
        </div>
      </div>
    ),
  },

  {
    id: 3,
    src: "/ban2.png",
    alt: "24x7 Delivery",

    content: (
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 text-right">
        <p className="text-white/80 text-sm sm:text-lg font-medium">
          Fastest Medicine Delivery 
        </p>

        <h2 className="text-orange-600 text-2xl sm:text-5xl font-black leading-tight">
          IN PRAYAGRAJ
        </h2>

        <p className="text-white/80 text-lg sm:text-3xl font-bold">
          24×7 Available
        </p>

        <button className="mt-5 bg-yellow-500 text-black hover:bg-white hover:text-black px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold transition">
          Order Medicines
        </button>
      </div>
    ),
  },

  {
    id: 4,
    src: "/bann3.png",
    alt: "Download App",

    content: (
      <div className="absolute left-[6%] top-[50%] -translate-y-1/2 w-[52%] sm:w-auto sm:max-w-[40%]">

        <h2 className="text-sky-950 text-2xl sm:text-5xl font-black leading-[0.95] mt-1">
          DOWNLOAD
          <br />
          DAWACART APP
        </h2>

        <p className="text-sky-900 text-xs sm:text-lg mt-2 leading-[0.95]">
          Dawacart is better on the app.
        </p>

        <div className="flex gap-2 mt-5">
          <button className="bg-black text-white px-2.5 py-1.25 rounded-full text-xs sm:text-base font-semibold">
            Download App
          </button>

          <button className="bg-white text-black px-2.5 py-1.25 rounded-full text-xs sm:text-base font-semibold border border-black/10">
            Order Now
          </button>
        </div>
      </div>
    ),
  },
];

export default function HeroCarousel() {
  const autoplayRef = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplayRef.current]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <section className="pt-2 pb-4 px-4">
      <div
        className="overflow-hidden rounded-2xl w-full"
        ref={emblaRef}
      >
        <div className="flex">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0 aspect-[16/7] sm:aspect-[21/7] lg:aspect-[32/9]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={slide.id === 1}
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 z-10">
                {slide.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-5 bg-red-500"
                : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}