import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Imgslider({ heroImages = [] }) {
  const [index, setIndex] = useState(0);
  const total = heroImages.length;

  if (total === 0) return null;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[420px] overflow-hidden rounded-xl">
      {/* SLIDE TRACK */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {heroImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Hero"
            draggable={false}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* LEFT */}
      <button
        onClick={prev}
        className="
    hidden sm:flex
    absolute left-3 top-1/2 -translate-y-1/2
    bg-black/40 hover:bg-black/60
    text-white p-2 rounded-full backdrop-blur cursor-pointer
  "
      >
        <ChevronLeft size={20} />
      </button>

      {/* RIGHT */}
      <button
        onClick={next}
        className="
    hidden sm:flex
    absolute right-3 top-1/2 -translate-y-1/2
    bg-black/40 hover:bg-black/60
    text-white p-2 rounded-full backdrop-blur cursor-pointer
  "
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
