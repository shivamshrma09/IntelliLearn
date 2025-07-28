@echo off
echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Committing changes...
git commit -m "Initial commit of IntelliLearn project"

echo Setting up remote repository...
git remote add origin https://github.com/yourusername/intellilearn.git

echo Pushing to GitHub...
git push -u origin master

echo Done!