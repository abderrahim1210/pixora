# 📸 PIXORA - Plateforme Web pour Photographes

<p align="center">
  <img src="./frontend/public/outils/favicons/favicon.jpg" alt="Pixora Logo" width="300"/>
</p>

<p align="center">
  <strong>Projet Full-stack : Système de gestion et de partage pour photographes professionnels.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

---

## 📝 À propos du projet
**Pixora** est une solution web moderne conçue pour permettre aux photographes de créer un portfolio professionnel. Le projet repose sur une architecture découplée avec un **Frontend (React)** réactif et un **Backend (API Laravel)** robuste, offrant une expérience utilisateur fluide et sécurisée.

### ✨ Fonctionnalités clés :
* **Profils Dynamiques :** Gestion complète des informations des photographes (Bio, Portfolio, Stats).
- **Système de Follow :** Interaction sociale en temps réel avec **Optimistic UI updates**.
* **Galerie Intelligente :** Filtrage dynamique des photos par catégorie sans rechargement.
* **Architecture Propre :** Séparation de la logique API (Service Layer) des composants UI.

---

## 🏗️ Architecture Technique
- **Frontend :** React.js, SCSS (Pattern 7-1), Axios, Vite.
- **Backend :** Laravel 11, REST API, Laravel Sanctum (Auth).
- **Base de données :** MySQL (Eloquent ORM).

---

## 🚀 Installation et Lancement

Pour cloner et lancer ce projet localement, suivez ces étapes :

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

## 🌐 Sécurité & CORS
Le projet est configuré pour gérer le **Cross-Origin Resource Sharing (CORS)** de manière sécurisée, permettant une communication fluide entre le client et l'API via des tokens XSRF.

---

## 👨‍💻 Développeur
* **Nom :** Abderrahim
* **Rôle :** Développeur Full Stack
* **GitHub :** [abderrahim1210](https://github.com/abderrahim1210)

---
<p align="center">Project Pixora réalisé par Abderrahim.</p>