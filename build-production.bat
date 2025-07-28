@echo off
echo 🚀 Building IntelliLearn for Production...

echo.
echo 📦 Installing Backend Dependencies...
cd Backend
call npm install --production
cd ..

echo.
echo 🎨 Building Frontend...
cd Frontend
call npm install
call npm run build
cd ..

echo.
echo ✅ Production build completed!
echo 📁 Frontend build files are in: Frontend/dist/
echo 🚀 Backend is ready for deployment

pause