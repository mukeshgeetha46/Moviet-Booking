import React, { useState } from "react";

interface Slide {
  img: string;
}

const slides: Slide[] = [
  { img: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1744877848242_revplaycard1240x300.jpg" },
  { img: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1744877848242_revplaycard1240x300.jpg" },
  { img: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1754637122572_megandesktop.jpg" },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);

  const prevSlide = (): void =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = (): void =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={slides[current].img}
        alt="banner"
        className="w-full h-[300px] object-cover"
      />
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  );
};

export default HeroSlider;
