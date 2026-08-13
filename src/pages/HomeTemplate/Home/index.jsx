import ListMovie from "../ListMovie";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerImages = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ];

  const eventImages = [
    "/h1.jfif",
    "/h2.jfif",
    "/h3.jfif",
    "/h4.jfif",
    "/h5.jfif",
    "/h6.jfif",
    "/h7.jfif",
  ];

  // Tự động chuyển slide sau mỗi 4 giây (Auto Play)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 pb-16">
      
      {/* SECTION 1: HERO CAROUSEL BANNER (KHÔNG MẤT GÓC ẢNH) */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800/80 shadow-2xl shadow-indigo-950/40 group bg-slate-950">
          
          {/* Carousel Wrapper */}
          <div className="relative h-64 sm:h-96 md:h-[480px] overflow-hidden">
            {bannerImages.map((src, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
                  idx === currentIndex
                    ? "opacity-100 z-10 pointer-events-auto"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* 1. Ảnh nền Blur tạo hiệu ứng tràn viền Cinema */}
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                />

                {/* 2. Ảnh chính hiển thị trọn vẹn 100% không cắt góc */}
                <img
                  src={src}
                  alt={`Banner ${idx + 1}`}
                  className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* 3. Lớp phủ Gradient làm dịu phần mép dưới */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Carousel Indicators (Các chấm tròn chuyển slide) */}
          <div className="absolute z-20 flex -translate-x-1/2 bottom-5 left-1/2 space-x-2">
            {bannerImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-7 bg-indigo-500"
                    : "w-2.5 bg-slate-400/50 hover:bg-white"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons (Prev / Next) */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
            <button
              type="button"
              onClick={handlePrev}
              className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-slate-200 hover:text-white backdrop-blur-md border border-slate-700/50 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-slate-200 hover:text-white backdrop-blur-md border border-slate-700/50 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2: LIST MOVIE */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <ListMovie />
      </section>

      {/* SECTION 3: SỰ KIỆN ĐANG DIỄN RA */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-800/80 pb-4">
          <div className="h-7 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
          <h2 className="text-xl md:text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 uppercase">
            Các sự kiện đang diễn ra
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {eventImages.map((src, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
            >
              <div className="absolute top-3 left-3 z-10 bg-indigo-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg backdrop-blur-md shadow-md border border-indigo-400/30">
                Ưu đãi Hot
              </div>

              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={src}
                  alt={`Sự kiện ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="text-xs font-semibold text-indigo-300 bg-indigo-950/90 border border-indigo-700/50 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-md flex items-center gap-1.5">
                  Xem chi tiết
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}