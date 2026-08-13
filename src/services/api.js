import axios from "axios";

const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use((config) => {
  // 1. Luôn gán TokenCybersoft
  config.headers['TokenCybersoft'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5NCIsIkhldEhhblN0cmluZyI6IjEzLzAxLzIwMjciLCJIZXRIYW5UaW1lIjoiMTc5OTc5ODQwMDAwMCIsIm5iZiI6MTc3MjY0MzYwMCwiZXhwIjoxNzk5OTQ2MDAwfQ.fXnFWdTzELVYga9S7pakEljJsvLiA3qz1XvvVCzlxkI";

  // 2. Lấy accessToken từ localStorage (hoặc Redux Store)
  const userLogin = localStorage.getItem('USER_LOGIN')
    ? JSON.parse(localStorage.getItem('USER_LOGIN'))
    : null;
  const accessToken = userLogin?.accessToken;

  // 3. CHỈ GỬI Authorization NẾU CÓ TOKEN TỒN TẠI
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    // Nếu chưa đăng nhập, xóa header này đi để không bị gửi "Bearer undefined"
    delete config.headers['Authorization'];
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
