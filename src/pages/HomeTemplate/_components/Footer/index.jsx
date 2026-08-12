import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Cột 1: Thông tin thương hiệu */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-red-600 tracking-wider">
            DIGITAL MOVIE
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Hệ thống đặt vé xem phim trực tuyến nhanh chóng, tiện lợi với trải nghiệm điện ảnh chân thực và ưu đãi cập nhật liên tục.
          </p>
          <div className="text-xs text-gray-400 space-y-1">
            <p><strong className="text-gray-200">Hotline:</strong> 1900 1234 (8:00 - 22:00)</p>
            <p><strong className="text-gray-200">Email:</strong> support@digitalmovie.vn</p>
          </div>
        </div>

        {/* Cột 2: Khám phá / Lịch chiếu */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 uppercase border-b-2 border-red-600 pb-1 inline-block">
            Khám Phá
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500 transition-colors">Phim Đang Chiếu</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Phim Sắp Chiếu</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Lịch Chiếu Toàn Quốc</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Hệ Thống Rạp</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Khuyến Mãi & Ưu Đãi</a></li>
          </ul>
        </div>

        {/* Cột 3: Quy định & Điều khoản */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 uppercase border-b-2 border-red-600 pb-1 inline-block">
            Quy Định & Hỗ Trợ
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500 transition-colors">Điều Khoản Sử Dụng</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Chính Sách Bảo Mật</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Chính Sách Thanh Toán</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Câu Hỏi Thường Gặp (FAQ)</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Liên Hệ Quảng Cáo</a></li>
          </ul>
        </div>

        {/* Cột 4: Tải App & Kết nối */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 uppercase border-b-2 border-red-600 pb-1 inline-block">
            Trải Nghiệm App
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            Tải ứng dụng DIGITAL MOVIE để đặt vé mọi lúc, mọi nơi:
          </p>
          <div className="flex flex-col gap-2">
            <button className="bg-gray-800 border border-gray-700 hover:border-red-500 py-2 px-4 rounded text-xs flex items-center gap-3 transition">
              <span className="text-xl">🍏</span>
              <div className="text-left">
                <div className="text-[10px] text-gray-400">Download on the</div>
                <div className="font-semibold text-white">App Store</div>
              </div>
            </button>
            <button className="bg-gray-800 border border-gray-700 hover:border-red-500 py-2 px-4 rounded text-xs flex items-center gap-3 transition">
              <span className="text-xl">🤖</span>
              <div className="text-left">
                <div className="text-[10px] text-gray-400">Get it on</div>
                <div className="font-semibold text-white">Google Play</div>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Dòng Copyright & Mạng xã hội */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 DIGITAL MOVIE. Tất cả các quyền được bảo lưu.</p>

        <div className="flex gap-4">
          <a href="#" className="hover:text-red-500 transition-colors">Facebook</a>
          <a href="#" className="hover:text-red-500 transition-colors">Instagram</a>
          <a href="#" className="hover:text-red-500 transition-colors">Youtube</a>
          <a href="#" className="hover:text-red-500 transition-colors">TikTok</a>
        </div>
      </div>
    </footer>
  );
}