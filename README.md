# 🚀 MyTodo Fullstack App

Aplikasi manajemen tugas (Todo List) berbasis **Fullstack Web Application** yang dibangun menggunakan arsitektur modern. Project ini dirancang untuk mendemonstrasikan implementasi autentikasi, keamanan API, serta operasi CRUD yang lengkap.

---

## ✨ Features

- 🔐 **Authentication System**
- 🛡️ **JWT-Based Security**
- ✅ **Full CRUD Todo Management**
- 🔄 **Status Toggle (Complete / Incomplete)**
- 📌 **Auto Sorting Todos**
- 📱 **Responsive UI**

---

## 🧰 Tech Stack

- **Frontend:** React.js, Vite, Axios, Tailwind CSS.
- **Backend:** Node.js, Express.js.
- **Database:** PostgreSQL.
- **Tools:** Git, Postman (untuk testing API).

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/attayaghalin/mytodo.git
cd mytodo
```

### 2️⃣ Backend Setup

1. Masuk ke folder backend: 
```bash 
cd backend 
```

2. Install dependencies: 
```bash
npm install
```

3. Buat file *.env* dan masukkan konfigurasi berikut:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:admin@localhost:5432/mytodo_db
JWT_SECRET=your_super_secret_key
```

4. Jalankan server:
```bash
node server.js
```

### 3️⃣ Frontend Setup

1. Masuk ke folder frontend: 
```bash 
cd frontend 
```

2. Install dependencies: 
```bash
npm install
```

3. Jalankan aplikasi React:
```bash
npm run dev
```

4. Buka aplikasi di browser: _http://localhost:5173_

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/register | Register user baru |
| POST   | /api/auth/login    | Login user & mendapatkan token |
| GET    | /api/todos         | Mengambil semua todo user |
| POST   | /api/todos         | Membuat todo baru |
| PATCH  | /api/todos/toggle/:id | Toggle status todo |
| PATCH  | /api/todos/edit/:id   | Edit isi todo |
| DELETE | /api/todos/:id     | Hapus todo |

---

## 📸 Screenshots

![Login Page](./screenshots/login.png)
![Register Page](./screenshots/register.png)
![Main Page](./screenshots/main.png)

**Dibuat oleh Attaya Ghalin Fadilah 🚀** 