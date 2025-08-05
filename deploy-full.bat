@echo off
echo 🚀 Deploying Full IntelliLearn Stack...

echo.
echo 📦 Building Frontend...
cd Frontend
call npm run build
cd ..

echo.
echo 🌐 Frontend Deployment Options:
echo 1. Vercel: https://vercel.com/new
echo    - Import repo: shivamshrma09/IntelliLearn
echo    - Root Directory: Frontend
echo    - Framework: Vite
echo.
echo 2. Netlify: https://app.netlify.com/start
echo    - Base directory: Frontend
echo    - Build command: npm run build
echo    - Publish directory: Frontend/dist

echo.
echo 🔧 Backend Deployment Options:
echo 1. Railway: https://railway.app/new
echo    - Import repo: shivamshrma09/IntelliLearn
echo    - Root Directory: Backend
echo    - Start Command: npm start
echo.
echo 2. Render: https://render.com/deploy
echo    - Import repo: shivamshrma09/IntelliLearn
echo    - Root Directory: Backend
echo    - Build Command: npm install
echo    - Start Command: npm start

echo.
echo ✅ Deployment files ready!
echo 📁 Frontend build: Frontend/dist/
echo 📁 Backend configs: Backend/railway.json, Backend/render.yaml

pause