@echo off
echo 🚀 Deploying IntelliLearn to Production...

echo.
echo 📦 Building Frontend...
cd Frontend
call npm run build

echo.
echo 🌐 Deploying to Netlify...
call npx netlify-cli deploy --prod --dir=dist

echo.
echo ✅ Deployment completed!
echo 🔗 Your app is now live!

pause