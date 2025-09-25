'# TaskFlow Setup Guide' \
'' \
'Complete installation and setup instructions for the TaskFlow task management application.' \
'' \
'## 📋 Table of Contents' \
'- [Prerequisites](#-prerequisites)' \
'- [Quick Start](#-quick-start)' \
'- [Installation Methods](#-installation-methods)' \
'- [Development Setup](#-development-setup)' \
'- [Deployment](#-deployment)' \
'- [Troubleshooting](#-troubleshooting)' \
'- [Support](#-support)' \
'- [Verification Checklist](#-verification-checklist)' \
'- [Next Steps](#-next-steps)' \
'' \
'## 🔧 Prerequisites' \
'' \
'**Required**' \
'- Web Browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+' \
'- Git: 2.20+' \
'- (Optional) Text Editor: VS Code / Sublime / etc.' \
'' \
'**Optional**' \
'- Node.js 18+ (for local static server)' \
'- VS Code “Live Server” extension' \
'- GitHub account access to the team repo' \
'' \
'---' \
'' \
'## 🚀 Quick Start' \
'' \
'### Method 1 — Download and Run (beginners)' \
'1. Download ZIP from GitHub → Extract.' \
'2. Open `index.html` in your browser (double-click or drag & drop).' \
'' \
'### Method 2 — Git Clone (recommended)' \
'\`\`\`bash' \
'git clone https://github.com/thomas-more-devops/taskflow-2-dsps3.git' \
'cd taskflow-2-dsps3' \
'' \
'# Open index.html' \
'# macOS' \
'open index.html' \
'# Windows' \
'start index.html' \
'# Linux' \
'xdg-open index.html' \
'\`\`\`' \
'' \
'---' \
'' \
'## 🛠️ Installation Methods' \
'' \
'### For Course Work (GitHub Classroom / team repo)' \
'\`\`\`bash' \
'git clone https://github.com/thomas-more-devops/taskflow-2-dsps3.git' \
'cd taskflow-2-dsps3' \
'\`\`\`' \
'> Everyone on the team should clone **the same repo**.' \
'' \
'### For Contributors' \
'\`\`\`bash' \
'git clone https://github.com/thomas-more-devops/taskflow-2-dsps3.git' \
'cd taskflow-2-dsps3' \
'git switch -c feature/<your-feature>' \
'\`\`\`' \
'' \
'Optional local server (any of these):' \
'\`\`\`bash' \
'npx serve .' \
'# or' \
'npx http-server -p 3000' \
'' \
'# VS Code Live Server' \
'# (Right-click index.html → "Open with Live Server")' \
'\`\`\`' \
'' \
'---' \
'' \
'## 💻 Development Setup' \
'' \
'### VS Code (recommended)' \
'Install extensions:' \
'- Live Server' \
'- GitLens' \
'- Prettier' \
'- HTML CSS Support' \
'- JavaScript (ES6+) snippets' \
'' \
'Open and run:' \
'\`\`\`bash' \
'code taskflow-2-dsps3' \
'\`\`\`' \
'- Right-click `index.html` → **Open with Live Server**' \
'- App opens at something like `http://127.0.0.1:5500/`' \
'' \
'### Browser DevTools' \
'- Open DevTools (F12 / Ctrl+Shift+I / Cmd+Opt+I)' \
'- Useful tabs: **Console**, **Elements**, **Network**, **Application** (check `localStorage`)' \
'' \
'---' \
'' \
'## 🚀 Deployment' \
'' \
'### GitHub Pages (project site)' \
'1. Push to `main`:' \
'   \`\`\`bash' \
'   git add .' \
'   git commit -m "chore: initial setup"' \
'   git push origin main' \
'   \`\`\`' \
'2. Repo **Settings → Pages**' \
'   - **Source**: “Deploy from a branch”' \
'   - **Branch**: `main` (root) → Save' \
'3. Your site: `https://<your-username-or-org>.github.io/taskflow-2-dsps3/`' \
'   (Give it a couple of minutes on first publish.)' \
'' \
'**Alternatives**' \
'- **Netlify**: drag-and-drop the folder at netlify.com' \
'- **Vercel**: `npm i -g vercel` then `vercel` in the project directory' \
'- **Local dev servers**:' \
'\`\`\`bash' \
'python -m http.server 8000' \
'npx serve .' \
'\`\`\`' \
'' \
'---' \
'' \
'## 🔧 Troubleshooting' \
'' \
'**App doesn’t load / blank page**' \
'- Check Console for JS errors.' \
'- Verify file layout (actual repo layout is):' \
'  \`\`\`' \
'  .' \
'  ├─ index.html' \
'  ├─ styles/        # e.g., styles.css' \
'  └─ scripts/       # e.g., app.js' \
'  \`\`\`' \
'- Make sure the paths in `index.html` match. For example:' \
'  \`\`\`html' \
'  <link rel="stylesheet" href="styles/styles.css">' \
'  <script src="scripts/app.js" defer></script>' \
'  \`\`\`' \
'  > If your CSS/JS filenames differ, update these paths accordingly.' \
'- Hard refresh: Ctrl+F5 (Win) / Cmd+Shift+R (Mac).' \
'' \
'**Styles not loading**' \
'- Confirm the CSS file exists in `styles/`.' \
'- Check for 404s in **Network** tab.' \
'- Clear cache or use a local server (avoids `file://` CORS quirks).' \
'' \
'**Tasks don’t persist**' \
'- Ensure JavaScript and `localStorage` are enabled.' \
'- Try in a normal (non-private) window.' \
'- Check Console for storage errors.' \
'' \
'**Git push/auth problems**' \
'\`\`\`bash' \
'git config --global user.name "Your Name"' \
'git config --global user.email "you@example.com"' \
'git remote -v' \
'\`\`\`' \
'Use a GitHub Personal Access Token if prompted for a password.' \
'' \
'**GitHub Pages not updating**' \
'- Wait 2–5 minutes; then hard refresh.' \
'- Check **Settings → Pages** is enabled.' \
'- Ensure `index.html` is at the repo root.' \
'- For 404s, confirm the site URL path includes the repo name.' \
'' \
'---' \
'' \
'## 🆘 Support' \
'' \
'- Ask during lab/instructor hours or in the course forum.' \
'- Useful docs: Git, GitHub Docs, MDN Web Docs.' \
'- When asking for help, include: what you tried, exact errors, OS + browser, and screenshots if possible.' \
'' \
'---' \
'' \
'## ✅ Verification Checklist' \
'' \
'- [ ] `index.html` opens with no errors' \
'- [ ] Header and UI render correctly' \
'- [ ] Add / edit / delete / complete tasks works' \
'- [ ] Tasks persist after refresh (if `localStorage` is used)' \
'- [ ] No console errors' \
'- [ ] Mobile layout is responsive' \
'- [ ] GitHub Pages (if enabled) serves the site' \
'' \
'---' \
'' \
'## 🎯 Next Steps' \
'' \
'- Read `index.html`, `styles/…`, `scripts/…` to understand structure.' \
'- Create a feature branch and start small changes:' \
'  \`\`\`bash' \
'  git switch -c feature/<your-change>' \
'  \`\`\`' \
'- Commit and open a PR for review.' \