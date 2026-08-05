# 🚀 VERCEL CLI COMMANDS FOR YOUR PROJECT

## 1️⃣ INSTALL VERCEL CLI

```bash
npm install -g vercel
```

Or with yarn:
```bash
yarn global add vercel
```

Or with pnpm:
```bash
pnpm add -g vercel
```

---

## 2️⃣ LOGIN TO VERCEL

```bash
vercel login
```

This will open a browser window to authenticate with your Vercel account.

---

## 3️⃣ LINK YOUR PROJECT TO VERCEL

```bash
vercel link
```

This will:
- Ask if you want to create a new project
- Ask for project name
- Ask for scope (your account or team)
- Create `.vercel/project.json` with project ID

---

## 4️⃣ DEPLOY YOUR PROJECT

### Option A: Deploy to Production
```bash
vercel --prod
```

### Option B: Deploy Preview (test)
```bash
vercel
```

### Option C: Force Redeploy
```bash
vercel --prod --force
```

---

## 5️⃣ VIEW DEPLOYMENT LOGS

```bash
vercel logs
```

To see specific deployment:
```bash
vercel logs <deployment-url>
```

---

## 6️⃣ CHECK PROJECT STATUS

```bash
vercel status
```

Shows current deployment status and URL.

---

## 7️⃣ LIST ALL DEPLOYMENTS

```bash
vercel list
```

---

## 8️⃣ REMOVE A DEPLOYMENT

```bash
vercel remove <deployment-url>
```

---

## 9️⃣ VIEW PROJECT INFO

```bash
vercel projects list
```

---

## 🔟 CONFIGURE ENVIRONMENT VARIABLES

### Set via CLI
```bash
vercel env add <VARIABLE_NAME>
```

### List all variables
```bash
vercel env list
```

### Pull environment to local .env
```bash
vercel env pull
```

---

## ⚡ QUICK START - COMPLETE FLOW

### First time deployment:
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Link your project
vercel link

# 4. Deploy to production
vercel --prod
```

### Subsequent deployments:
```bash
# After making changes, just push to GitHub
git push origin main

# Vercel will auto-deploy from GitHub webhook

# OR manually deploy:
vercel --prod
```

---

## 📊 USEFUL COMMAND COMBINATIONS

### Full deployment workflow:
```bash
# Build and test locally
npm run build

# Commit changes
git add -A
git commit -m "Update: description"
git push origin main

# Vercel auto-deploys from GitHub
# OR manually trigger:
vercel --prod
```

### Check if deployment succeeded:
```bash
vercel status
```

### View live logs:
```bash
vercel logs --follow
```

### Redeploy specific commit:
```bash
# From GitHub:
# 1. Go to Vercel Dashboard
# 2. Find the deployment
# 3. Click "Redeploy"

# OR via CLI:
vercel --prod --force
```

---

## 🔧 VERCEL.JSON CONFIGURATION

Your current `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".",
  "framework": "other",
  "installCommand": "npm install"
}
```

To modify via CLI:
```bash
# Update via dashboard settings, or edit vercel.json and push
vercel env add KEY=VALUE
```

---

## 📈 MONITORING & DEBUGGING

### View real-time logs:
```bash
vercel logs --follow
```

### View function logs:
```bash
vercel logs --function api
```

### Check deployment status:
```bash
vercel status
```

### View project analytics:
```bash
# Via dashboard only:
# https://vercel.com/dashboard/wariguard-ai/analytics
```

---

## 🆘 TROUBLESHOOTING COMMANDS

### Clear local cache:
```bash
vercel system prune
```

### Show project configuration:
```bash
vercel projects list --json
```

### Test build locally:
```bash
npm run build
```

### Verify vercel.json:
```bash
# Just check if JSON is valid
node -e "require('./vercel.json')"
```

---

## 📋 YOUR PROJECT SPECIFIC COMMANDS

### Deploy your wariguard-ai project:
```bash
# Navigate to project
cd c:\Users\Admin\OneDrive\Desktop\Varitho\wariguard-ai

# Deploy to production
vercel --prod

# OR just preview
vercel
```

### After making changes:
```bash
cd c:\Users\Admin\OneDrive\Desktop\Varitho\wariguard-ai

# Build locally to verify
npm run build

# Commit and push to GitHub
git add -A
git commit -m "Your commit message"
git push origin main

# Vercel auto-deploys via GitHub webhook
# OR manually:
vercel --prod
```

---

## ✅ VERIFICATION AFTER DEPLOYMENT

After running `vercel --prod`, verify:

```bash
# Check status
vercel status

# Should show:
# ✓ Deployment ready
# ✓ URL: https://wariguard-ai.vercel.app
# ✓ Status: Ready
```

Visit the URL and verify:
- ✓ Page loads without errors
- ✓ No white screen
- ✓ React app renders
- ✓ Navigation works
- ✓ Console has no MIME type errors

---

## 🎯 SUMMARY

**Quick Deploy:**
```bash
vercel --prod
```

**Check Status:**
```bash
vercel status
```

**View Logs:**
```bash
vercel logs
```

**Auto-Deploy (recommended):**
```bash
git push origin main
# Vercel auto-deploys via GitHub webhook
```

---

## 📞 MORE INFO

Official Vercel CLI docs:
https://vercel.com/docs/cli

Your Vercel Dashboard:
https://vercel.com/dashboard/wariguard-ai
