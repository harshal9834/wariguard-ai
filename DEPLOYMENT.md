# Vercel Deployment Guide

## Prerequisites
- Vercel Account (https://vercel.com)
- GitHub Repository (this code pushed to GitHub)
- Node.js 18+ and npm

## Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Configure project settings (auto-detected for React/Vite)
5. Click "Deploy"

### Step 3: Configure Environment Variables
1. In Vercel Dashboard, go to your project
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `VITE_API_URL` - Your backend API URL
   - `VITE_APP_URL` - Your Vercel app URL
   - `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key (if needed)
   - Any other variables from `.env.example`

### Step 4: Verify Build Settings
The following should be auto-configured:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/client`
- **Node Version**: 18.x or later

## Features Configured for Vercel

✅ **Optimized Build Configuration**
- Terser minification
- Code splitting with vendor bundles
- Target: ES2020

✅ **Vercel-Specific Settings**
- Max function duration: 60 seconds
- Client-side routing with rewrites to index.html
- Optimized `.vercelignore` for faster deployments

✅ **Performance Optimizations**
- Automatic image optimization
- Gzip compression
- Caching headers

## Local Testing Before Deployment

### Build Locally
```bash
npm run build
npm run preview
```

This simulates the production environment locally.

## Troubleshooting

### Build Fails with "Missing script"
- Ensure you're in the project root directory
- Run `npm install` to install dependencies

### 404 Errors on Client Routes
- The `vercel.json` rewrites all routes to `index.html` for SPA routing
- This is already configured

### Environment Variables Not Loading
- Verify variables are set in Vercel Dashboard
- Use `VITE_` prefix for client-side variables (accessible in browser)
- Use other prefixes for server-side variables
- Rebuild after adding/modifying variables

### Performance Issues
- Check Vercel Analytics for slow endpoints
- Review bundle size: `npm run build` and check `dist/client`
- Consider lazy loading components

## Monitoring & Maintenance

### Enable Analytics
1. Go to Vercel Dashboard → Project Settings
2. Enable Web Analytics
3. Monitor performance metrics

### Set Up Alerts
- Configure notifications for failed deployments
- Set up error tracking with integrations (Sentry, etc.)

### Regular Updates
```bash
npm update
npm audit fix
```

## Rollback
If you need to revert to a previous deployment:
1. Go to Vercel Dashboard → Deployments
2. Find the previous successful deployment
3. Click the three dots → "Promote to Production"

## Support
- Vercel Docs: https://vercel.com/docs
- TanStack Start Docs: https://tanstack.com/start/latest
- React Docs: https://react.dev
