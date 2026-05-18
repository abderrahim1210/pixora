# 📸 PIXORA - Professional Photography Platform

<p align="center">
  <img src="./www.pixora/public/outils/pngs/logo_dark.png" alt="Pixora Logo" width="300"/>
</p>

<p align="center">
  <strong>Full-stack Project: A modern management and sharing system for professional photographers.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadlogoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/Laravel%20Herd-111827?style=for-the-badge&logo=laravel&logoColor=FF2D20" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/Notyf-2F3542?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
  <img src="https://img.shields.io/badge/Intervention%20Image-FF2D20?style=for-the-badge&logo=php&logoColor=white" />
  <img src="https://img.shields.io/badge/Laravel%20Sanctum-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

---

## 📝 About the Project
**Pixora** is a modern web solution designed for photographers to showcase professional portfolios. The project is built on a decoupled architecture separating the **Client (React)** from the **Server (Laravel API)**, ensuring high performance, scalability, and security.

### ✨ Key Features:
* **Dynamic Profiles:** Comprehensive management of photographer data (Bio, Portfolio, Stats).
* **Follow System:** Real-time social interaction using **Optimistic UI updates**.
* **Smart Gallery:** Instant photo filtering by category without page reloads.
* **Clean Architecture:** API logic decoupled from UI components (Service Layer).

---

## 🏗️ Technical Architecture
- **Frontend:** React.js, SCSS (7-1 Pattern), Axios, Vite.
- **Backend:** Laravel 12, RESTful API, Laravel Sanctum (Auth).
- **Database:** MySQL (Eloquent ORM).

---

## 🚀 Installation and Launch

To clone and run this project locally, follow these steps:

### 1. Backend Setup (Laravel)
~~~bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
~~~

### 2. Frontend Setup (React)
~~~bash
cd frontend
npm install
npm run dev
~~~

---

## 🌐 Security & CORS
The project is configured to handle **Cross-Origin Resource Sharing (CORS)** securely, allowing seamless communication between the client and the API using XSRF tokens and credentials.

---

## 👨‍💻 Developer
* **Name:** Abderrahim
* **Role:** Full Stack Developer
* **GitHub:** [abderrahim1210](https://github.com/abderrahim1210)

---
<p align="center">Pixora project developed by Abderrahim.</p>