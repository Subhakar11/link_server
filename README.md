# 📌 Link Saver + Auto-Summary

A full-stack web application for saving links, generating AI summaries using [Jina AI](https://jina.ai), and managing bookmarks with authentication.

---

## 🚀 Features

### Core
- **User Authentication**
  - Email/password signup & login
  - Passwords hashed with bcrypt
  - Optional Google OAuth (planned)
- **Bookmark Management**
  - Save URLs with title & favicon
  - Auto-generate summaries via Jina AI API
  - List, view, and delete bookmarks

### Optional Enhancements
- Tag filtering
- Dark mode
- Drag & drop bookmark reordering

---

## 🛠 Tech Stack

### Frontend
- [React 18](https://reactjs.org/) (Vite)
- [React Router v6](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/) (MongoDB ORM)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [axios](https://axios-http.com/)

### Database
- [MongoDB Atlas](https://www.mongodb.com/atlas)

### AI Summaries
- [Jina AI Reader API](https://jina.ai/reader/)

---

## 📂 Project Structure

link-saver/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── db.js
│ │ ├── models/
│ │ │ └── Bookmark.js
│ │ │ └── User.js
│ │ ├── routes/
│ │ │ ├── authRoutes.js
│ │ │ └── bookmarkRoutes.js
│ │ ├── utils/
│ │ │ └── jinaClient.js
│ │ └── server.js
│ ├── .env
│ ├── package.json
│ └── README.md
│
└── frontend/
├── src/
│ ├── components/
│ │ ├── BookmarkForm.jsx
│ │ ├── BookmarkList.jsx
│ │ └── Navbar.jsx
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── Home.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── vite.config.js
├── package.json
└── README.md

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/link-saver.git
cd link-saver
cd backend
npm install

Create .env file:

PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JINA_ENDPOINT=https://r.jina.ai/
JINA_API_KEY=your_jina_api_key

npm start

cd ../frontend
npm install
npm run dev