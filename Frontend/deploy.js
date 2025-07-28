const { execSync } = require('child_process');

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Install missing PostCSS dependencies
console.log('Installing PostCSS dependencies...');
execSync('npm install caniuse-lite autoprefixer postcss --save-dev', { stdio: 'inherit' });

// Build the project
console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

// Deploy using GitHub Pages
console.log('Installing gh-pages...');
execSync('npm install gh-pages --save-dev', { stdio: 'inherit' });

console.log('Deploying to GitHub Pages...');
execSync('npx gh-pages -d dist', { stdio: 'inherit' });

console.log('Deployment complete!');