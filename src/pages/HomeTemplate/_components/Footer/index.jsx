import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-800/80 relative overflow-hidden">
      {/* Vệt sáng trang trí ở góc Footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Cột 1: Thông tin thương hiệu */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600">
              <img
                src="/logo.png"
                className="h-9 w-9 rounded-full object-cover bg-slate-900"
                alt="Logo"
              />
            </div>
            <span className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              DIGITAL MOVIE
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Hệ thống đặt vé xem phim trực tuyến nhanh chóng, tiện lợi với trải nghiệm điện ảnh chân thực và vô vàn ưu đãi cập nhật liên tục.
          </p>

          <div className="text-xs space-y-2 pt-1 text-slate-300">
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <strong>Hotline:</strong> <span className="text-slate-400">1900 1234 (8:00 - 22:00)</span>
            </p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <strong>Email:</strong> <span className="text-slate-400">support@digitalmovie.vn</span>
            </p>
          </div>
        </div>

        {/* Cột 2: Khám phá */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-1 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Khám Phá
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs">
            {["Phim Đang Chiếu", "Phim Sắp Chiếu", "Lịch Chiếu Toàn Quốc", "Hệ Thống Rạp", "Khuyến Mãi & Ưu Đãi"].map((item, index) => (
              <li key={index}>
                <a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Quy định & Hỗ trợ */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-1 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Quy Định & Hỗ Trợ
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs">
            {["Điều Khoản Sử Dụng", "Chính Sách Bảo Mật", "Chính Sách Thanh Toán", "Câu Hỏi Thường Gặp (FAQ)", "Liên Hệ Quảng Cáo"].map((item, index) => (
              <li key={index}>
                <a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 4: Tải App */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-1 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Trải Nghiệm App
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Tải ứng dụng DIGITAL MOVIE để đặt vé mọi lúc, mọi nơi:
          </p>

          <div className="flex flex-col gap-3">
            {/* App Store Button */}
            <button className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-800/80 py-2.5 px-4 rounded-xl text-xs flex items-center gap-3 transition-all duration-300 group shadow-md">
              <svg className="w-6 h-6 fill-current text-slate-200 group-hover:text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.83 1.46-.62.72-1.16 1.88-1.01 3 .09 0 2.16-.54 2.85-1.36z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-slate-400">Download on the</div>
                <div className="font-bold text-slate-100 text-xs">App Store</div>
              </div>
            </button>

            {/* Google Play Button */}
            <button className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-800/80 py-2.5 px-4 rounded-xl text-xs flex items-center gap-3 transition-all duration-300 group shadow-md">
              <svg className="w-5 h-5 fill-current text-slate-200 group-hover:text-white" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.34 0 .65.11.91.31l12.5 8.5c.57.39.71 1.17.32 1.74-.1.14-.22.26-.36.35l-12.5 8.5c-.26.18-.57.28-.91.28-.83 0-1.5-.67-1.5-1.5z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-slate-400">Get it on</div>
                <div className="font-bold text-slate-100 text-xs">Google Play</div>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Dòng Copyright & Mạng xã hội */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 DIGITAL MOVIE. Tất cả các quyền được bảo lưu.</p>

        <div className="flex gap-6">
          {["Facebook", "Instagram", "Youtube", "TikTok"].map((social, idx) => (
            <a
              key={idx}
              href="#"
              className="hover:text-indigo-400 transition-colors duration-200 font-medium"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}