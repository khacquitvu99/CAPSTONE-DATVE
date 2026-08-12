import ListMovie from "../ListMovie";
import { useEffect } from "react";
import { initCarousels } from "flowbite"; // Hoặc gọi window.initCarousels() nếu dùng CDN

  export default function Home() {
    useEffect(() => {
      // Kích hoạt Flowbite quét lại tất cả các Carousel có trên trang
      if (typeof window !== "undefined") {
        initCarousels(); // kích hoạt Carousel
      }
    }, []);
    return (
      <div>
        <section>
          <div id="custom-controls-gallery" className="relative w-full" data-carousel="slide">
            {/* Carousel wrapper */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {/* Item 1 */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="/img1.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
              </div>
              {/* Item 2 */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                <img src="/img2.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"/>
              </div>
              {/* Item 3 */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="/img3.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
              </div>
              {/* Item 4 */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="/img4.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
              </div>
              {/* Item 5 */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="/img5.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"/>
              </div>
            </div>
            <div className="flex justify-center items-center pt-4">
              <button type="button" className="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="text-body hover:text-heading group-focus:text-heading">
                  <svg className="rtl:rotate-180 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12l4-4m-4 4 4 4" /></svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button type="button" className="flex justify-center items-center h-full cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="text-body hover:text-heading group-focus:text-heading">
                  <svg className="rtl:rotate-180 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" /></svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
          </div>
        </section>
        <section>
          <ListMovie />
        </section>
        <section>
          <hr />
          <h1 className="">cac su kien dang dien ra</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <img src="/h1.jfif" className="w-full h-auto rounded-lg shadow" />
            <img src="/h2.jfif" className="w-full h-auto rounded-lg shadow" />
            <img src="/h3.jfif" className="w-full h-auto rounded-lg shadow" />
            <img src="/h4.jfif" className="w-full h-auto rounded-lg shadow" />
            <img src="/h5.jfif" className="w-full h-auto rounded-lg shadow" />
            <img src="/h6.jfif" className="w-full h-auto rounded-lg shadow" />
            <img src="/h7.jfif" className="w-full h-auto rounded-lg shadow" />
          </div>
          {/* Render các sự kiện ở đây */}
        </section>
      </div>
    );
  }
