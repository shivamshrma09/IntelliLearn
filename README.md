# IntelliLearn — AI-Assisted Learning Platform

IntelliLearn is a full-stack web application delivering an engaging, AI-powered learning experience through spaced-repetition flashcards, semantic search, and real-time collaboration. This README is copy-paste ready for your repository—simply add screenshots in the designated section.

---

## 🚀 Live Demo

- **Frontend:** http://localhost:5173  
- **Backend:** http://localhost:5000  

- **Figma UI (Design Source):** [Figma Link](https://www.dropbox.com/scl/fi/7o6h79nkm1irmqd9omcy0/banani-ui-export.zip?rlkey=66p1umdyw5pqveu40ylhfnyb2&st=aia2i2zz&dl=0)
- **Demo Video:** [Watch Here](https://www.dropbox.com/scl/fi/kimdshla6gqactlhitpe5/IntelliLearn-AI-Powered-Learning-Platform-Google-Chrome-2025-07-23-13-35-54.mp4?rlkey=beoqtdgs3opxln1sqgezdui39&st=1xt4q8oa&dl=0)

---

## 📋 Overview

IntelliLearn reimagines competitive exam preparation, using AI to deliver:

- Smart flashcard generation from uploaded notes
- Rapid semantic search across learning content
- Adaptive tracking with Bloom-taxonomy-based tagging
- Real-time collaborative quizzes and discussions

---

## ✨ Key Features

### 🎴 Intelligent Flashcards
- Automatic Q&A pair generation by AI
- Spaced-repetition scheduling for long-term memory
- Bloom taxonomy tagging for cognitive tracking

### 🔍 Semantic Search
- Material embedding with OpenAI/LangChain tech
- Fast, retrieval-augmented generation (RAG)
- Vector and full-text search for quick context access

### 📡 Real-Time Collaboration
- Live quizzes with Socket.IO
- Peer discussion rooms
- Progress always synced across devices

### 📊 Analytics Dashboard
- Visualize learner progress, top decks, learning trends
- Actionable recommendations for improvement

---

## 🏗️ Technology Stack

| Category   | Technologies                                             |
|------------|---------------------------------------------------------|
| Backend    | Node.js, Express, PostgreSQL, Prisma, pgvector, JWT     |
| AI & RAG   | OpenAI API, LangChain                                   |
| Frontend   | Vue 3, Vite, Tailwind CSS, Pinia, Vite Plugin PWA       |
| DevOps     | GitHub Actions CI/CD                                    |

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js v18+ & npm v9+
- PostgreSQL ≥15
- OpenAI API key

### Backend

```
cd Backend
npm install

# Configure environment variables in .env:
# DATABASE_URL=
# OPENAI_API_KEY=
# JWT_SECRET=

npm run dev
```

### Frontend

```
cd Frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint            | Description                                     | Auth |
|--------|---------------------|-------------------------------------------------|------|
| POST   | /api/auth/register  | Create new user                                 | ❌   |
| POST   | /api/auth/login     | Obtain JWT & refresh cookie                     | ❌   |
| GET    | /api/users/me       | Get current user profile                        | ✅   |
| POST   | /api/flashcards     | Bulk create flashcards from uploaded notes/text | ✅   |
| GET    | /api/search         | Semantic search across user notes               | ✅   |
| GET    | /api/lessons/:id    | Retrieve lesson details                         | ✅   |

---



## 🧭 Website Flow

1. 🏠 User lands on Dashboard: Choose Login or Signup
   
<img width="1902" height="911" alt="Screenshot 2025-07-23 150941" src="https://github.com/user-attachments/assets/8837a459-849d-492a-8415-71d808eea2c6" />


---

2. 🙋 Existing Student Login  

<img width="1903" height="908" alt="Screenshot 2025-07-23 143707" src="https://github.com/user-attachments/assets/3eac408e-10ac-4d5f-a2b3-3d2e2b09c54f" />

3. 👤 New Student Registration 

<img width="1892" height="910" alt="Screenshot 2025-07-23 143722" src="https://github.com/user-attachments/assets/e042b295-30dd-492c-853a-8006687817a0" />


---

4. 🚑 Dashboard - Mybatch whole process 
<img width="1912" height="905" alt="Screenshot 2025-07-23 151222" src="https://github.com/user-attachments/assets/505a2bf1-5714-4827-925f-4d2228d8e03b" />
<img width="1900" height="911" alt="Screenshot 2025-07-23 143521" src="https://github.com/user-attachments/assets/c625444d-8f90-4523-b906-714221d8b954" />
<img width="1916" height="911" alt="Screenshot 2025-07-23 143303" src="https://github.com/user-attachments/assets/9ac36f2f-f6ff-4c3e-a826-e411503c5c41" />
<img width="1889" height="904" alt="Screenshot 2025-07-23 143324" src="https://github.com/user-attachments/assets/c83be5ef-5072-44ab-99a9-62f088df6876" />
<img width="1893" height="912" alt="Screenshot 2025-07-23 143414" src="https://github.com/user-attachments/assets/75cd8a4c-ab67-42c2-8a26-45501440da3a" />
<img width="1914" height="912" alt="Screenshot 2025-07-23 143353" src="https://github.com/user-attachments/assets/fdd9d562-d1fa-4836-8d1e-e49f0dbd8264" />
<img width="1910" height="905" alt="Screenshot 2025-07-23 143457" src="https://github.com/user-attachments/assets/f6c4b059-b68d-4f9d-877e-51644d40a498" />
<img width="1917" height="907" alt="Screenshot 2025-07-23 143434" src="https://github.com/user-attachments/assets/529e2729-a175-4c85-9fbe-e79fd50557a2" />

5. 🚑 Dashboard - library whole process
   <img width="3600" height="4770" alt="LibraryDashboard (2)" src="https://github.com/user-attachments/assets/fd58139c-e6d2-472a-9c30-1c81bfe8fbf2" />


7. 🚑 Dashboard - opportunities whole process
   <img width="3600" height="5574" alt="OpportunitiesHub" src="https://github.com/user-attachments/assets/9a324062-6d3a-44be-bc75-9453468e5f92" />

8. 🚑 Dashboard - opportunities whole process
   ![Uploading OpportunitiesHub.png…]()

9. 🚑 Dashboard - setting whole process
   
   <img width="1878" height="898" alt="Screenshot 2025-07-23 153024" src="https://github.com/user-attachments/assets/e4d5caed-02e4-4c1c-9d47-cab7cabda4d6" />














---

## 🎯 Usage Guide

### For Learners

1. Register & log in
2. Upload notes or learning materials
3. Auto-generate flashcards with one click
4. Practice with spaced-repetition
5. Review analytics on progress dashboard

### For Instructors

1. Add course content/materials
2. Create and host live quiz sessions
3. Monitor students’ learning metrics
4. Export reports for offline analysis

---

## 🔒 Security Features

- JWT authentication with secure, HTTP-only refresh cookies
- Input validation and sanitization at all levels
- Role-based access: instructor or learner
- Secure CORS configuration

---

## 🖼️ Screenshots

To add your screenshots:
- Create an `images/` folder in your repo root
- Upload PNG/JPG files of dashboards, features, and interaction flows
- Reference them in this section using Markdown:
  ```
  ![Dashboard Screenshot
  
  ```

---

## 🚀 Deployment

### Frontend (Vercel)
```
cd Frontend
npm run build
# Deploy 'dist' to Vercel
```

### Backend (Railway / Render)

- Link your GitHub repository
- Set environment variables:
  - `DATABASE_URL`
  - `OPENAI_API_KEY`
  - `JWT_SECRET`
- Deploy via one-click button/CI

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch:  
   `git checkout -b feature/YourFeature`
3. Commit changes:  
   `git commit -m "Add YourFeature"`
4. Push to your fork & open a Pull Request
5. Make sure lint, tests, and type checks pass:  
   `npm run prepush`

---

## 📝 License

MIT License © 2025 Shivam Sharma  
See [LICENSE](./LICENSE) for details.

---

## 📈 Business Model & Growth

- Subscription tiers: Basic, Pro (unlimited AI, analytics), Premium (with personal coaching)
- Free trial or freemium onboarding to drive adoption
- Referral & loyalty rewards, plus educator/influencer partnerships

---

## 🏆 Vision

IntelliLearn aims to set a new standard for intelligent, effective, and humane digital learning—helping every student achieve their academic and personal best.


*Add screenshots to your `images/` folder to showcase IntelliLearn’s interface and workflows!*
```
