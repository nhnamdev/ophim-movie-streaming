# 🎬 Ophim Movie - Netflix-Style Streaming Platform

> Modern movie streaming website with horizontal scroll layout, powered by Ophim API

**Repository Name:** `ophim-movie-streaming`  
**Description:** ⚡ Netflix-style movie streaming platform built with React + Vite. Features horizontal scroll, responsive design, and Ophim API integration. Perfect for Vercel deployment.

---

Website xem phim trực tuyến với giao diện Netflix hiện đại, scroll ngang mượt mà, responsive hoàn toàn, sử dụng API từ ophim1.com.

## ✨ Tính năng

- 🏠 Trang chủ với phim nổi bật và xu hướng
- 🔍 Tìm kiếm phim theo tên
- 📂 Phân loại theo thể loại, quốc gia, năm phát hành
- 🎥 Chi tiết phim với thông tin đầy đủ
- 📱 Responsive design - hoạt động tốt trên mọi thiết bị
- ⚡ Tối ưu hiệu suất với Vite

## 🚀 Deploy lên Vercel

### Cách 1: Deploy từ GitHub

1. Push code lên GitHub repository
2. Truy cập [Vercel](https://vercel.com)
3. Click "Import Project"
4. Chọn repository của bạn
5. Vercel sẽ tự động detect Vite và deploy

### Cách 2: Deploy bằng Vercel CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login vào Vercel
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

## 💻 Chạy local

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite** - Build Tool
- **React Router DOM** - Routing
- **Axios** - HTTP Client
- **CSS3** - Styling với CSS Variables, Flexbox, Grid

## 📁 Cấu trúc thư mục

```
ophim/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── styles/         # CSS files
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── vercel.json         # Vercel configuration
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## 🎨 Design Features

- Dark theme với màu sắc hiện đại
- Glassmorphism effects
- Smooth animations và transitions
- Hover effects cho cards
- Responsive grid layout
- Custom scrollbar

## 📝 Lưu ý

- Website sử dụng API miễn phí từ ophim1.com
- Không cần API key hoặc authentication
- Image CDN: img.ophim.live

## 📄 License

MIT License - Feel free to use for your own projects!

---

Made with ❤️ by GitHub Copilot
