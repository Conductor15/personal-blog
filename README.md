# Personal Blog – Fullstack

Một **personal blog fullstack** dùng để chia sẻ bài viết, suy nghĩ cá nhân và quản lý nội dung thông qua trang admin. Project được xây dựng theo hướng **thực tế – dễ mở rộng – deploy được ngay**.

---

##  Tính năng chính

### Người dùng (Client)

* Xem danh sách bài viết
* Xem chi tiết bài viết
* Tìm kiếm theo tiêu đề hoặc nội dung bài viết
* Filter bài viết theo danh mục
* Donate cho writer
* Giao diện responsive (desktop / mobile)

### Admin

* Đăng nhập / xác thực
* CRUD bài viết, danh mục (Create / Read / Update / Delete)
* Soạn thảo nội dung bằng rich text
* Ẩn / hiện bài viết (draft – publish)
* Chỉnh sửa thông tin chung Blog
* Upload ảnh trước khi add vào database

### Hệ thống

* Phân tách Frontend & Backend
* RESTful API
* Bảo mật bằng JWT
* Deploy cloud (Vercel / Render)

---

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Axios

### Backend

* Node.js
* Express
* JWT Authentication

### Database

* MonggoDB

### DevOps

* Vercel (Frontend)
* Render (Backend)

---

## Cài đặt & chạy local

### 1. Clone repository

```bash
git clone https://github.com/Conductor15/personal-blog.git
cd personal-blog
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Tạo file `.env`:

```env
PORT=...
MONGO_URL =...
JWT_SECRET=...
JWT_EXPIRE=...
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại: `http://localhost:8080`

---

## Authentication Flow

1. Admin đăng nhập
2. Backend trả về `access_token`
3. Token được lưu (cookie / localStorage)
4. Mỗi request admin gửi kèm token trong header

---

## Deploy

### Frontend (Vercel)

* Connect GitHub repository
* Set environment variables
* Auto deploy khi push main

### Backend (Render)

* Create Web Service
* Add environment variables
* Start command: `npm start`

