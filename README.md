# IntelliLearn — AI-Assisted Learning Platform

IntelliLearn is a full-stack web application delivering an engaging, AI-powered learning experience with spaced-repetition flashcards, semantic search, and real-time collaboration. Copy and paste this README into your repository and update placeholders as needed.

## 🚀 Live Demo

- Frontend: http://localhost:5173  
- Backend: http://localhost:5000  

## 📋 Overview

IntelliLearn enables learners to:
- Generate intelligent flashcard decks from notes
- Perform semantic searches across course materials
- Track progress with adaptive, Bloom-taxonomy tagging
- Collaborate in real time via integrated quizzes

## ✨ Key Features

**🎴 Intelligent Flashcards**  
- AI-generated Q&A pairs  
- Spaced-repetition scheduling  
- Bloom taxonomy tagging  

**🔍 Semantic Search**  
- Embed notes with OpenAI embeddings  
- Fast, full-text and vector search  
- Retrieval-Augmented Generation (RAG)

**📡 Real-Time Collaboration**  
- Live quizzes with Socket.IO  
- Peer discussion rooms  
- Progress syncing across devices

**📊 Analytics Dashboard**  
- Learner progress metrics  
- Top-performing decks  
- Usage trends and insights  

## 🏗️ Technology Stack

**Backend**  
- Node.js + Express  
- PostgreSQL + Prisma + pgvector  
- OpenAI API & LangChain  
- JWT Authentication  
- GitHub Actions CI/CD  

**Frontend**  
- Vue 3 + Vite  
- Tailwind CSS  
- Pinia for state management  
- Vite Plugin PWA  

## 🛠️ Installation & Setup

### Prerequisites

- Node.js v18+ & npm v9+  
- PostgreSQL ≥15  
- OpenAI API key  

### Backend
cd Backend
npm install




### Frontend




## 📡 API Endpoints

| Method | Endpoint                   | Description                                       | Auth |
|--------|----------------------------|---------------------------------------------------|------|
| POST   | /api/auth/register         | Create new user                                   | ❌   |
| POST   | /api/auth/login            | Obtain JWT & refresh cookie                       | ❌   |
| GET    | /api/users/me              | Get current user profile                          | ✅   |
| POST   | /api/flashcards            | Bulk create flashcards from text                  | ✅   |
| GET    | /api/search                | Semantic search across notes                      | ✅   |
| GET    | /api/lessons/:id           | Retrieve lesson details                           | ✅   |

## 🎯 Usage Guide

### For Learners

1. **Register & Login**  
2. **Upload Notes / Text**  
3. **Generate Flashcards**  
4. **Study with Spaced Repetition**  
5. **Review Analytics Dashboard**  

### For Instructors

1. **Add Course Materials**  
2. **Create Quiz Sessions**  
3. **Monitor Learner Progress**  
4. **Export Performance Reports**  

## 🔒 Security Features

- **JWT Authentication** with HTTP-only refresh cookies  
- **Input Validation & Sanitization**  
- **Role-based Access Control** for instructors vs. learners  
- **Secure CORS Configuration**

## 🖼️ Screenshots

Create an `images/` folder at the repo root and add your PNG/JPG files. Then include:


## 🚀 Deployment

### Frontend (Vercel)
cd Frontend
npm run build



### Backend (Railway / Render)

- Link your GitHub repo  
- Set environment variables (`DATABASE_URL`, `OPENAI_API_KEY`, `JWT_SECRET`)  
- Deploy via one-click button

## 🤝 Contributing

1. Fork the repo  
2. Create feature branch: `git checkout -b feature/YourFeature`  
3. Commit changes: `git commit -m "Add YourFeature"`  
4. Push & open PR  
5. Ensure lint, tests, and type checks pass via `npm run prepush`

## 📝 License

MIT License © 2025 Shivam Sharma  
See [LICENSE](./LICENSE) for full text.

