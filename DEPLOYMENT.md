# 🚀 Deployment Guide - Cafe Aroma

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Cafe Aroma"
   git branch -M main
   git remote add origin https://github.com/yourusername/cafe-aroma.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Add environment variable:
     - Name: `VITE_GEMINI_API_KEY`
     - Value: Your Gemini API key
   - Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variable**
   ```bash
   vercel env add VITE_GEMINI_API_KEY
   ```
   Paste your Gemini API key when prompted.

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🔑 Environment Variables Setup

### For Vercel:
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add: `VITE_GEMINI_API_KEY` = `your-api-key`
4. Redeploy if already deployed

### Get Your Gemini API Key:
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Create a new API key
4. Copy and save it securely

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables configured
- [ ] `.env.local` added to `.gitignore` (already done)
- [ ] Custom images in `/public` folder
- [ ] Code pushed to GitHub
- [ ] Gemini API key obtained

## 🧪 Test Your Build Locally

Before deploying, test the production build:

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

Visit `http://localhost:4173` to test.

## 🌐 Custom Domain (Optional)

### Add Custom Domain on Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run build checks before deployment

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors: `npm run build`

### Environment Variables Not Working
- Ensure variable name starts with `VITE_`
- Redeploy after adding variables
- Check variable is set in correct environment (Production/Preview)

### 404 on Routes
- Verify `vercel.json` has rewrites configuration (already configured)
- Check React Router is properly set up

### AI Barista Not Working
- Verify `VITE_GEMINI_API_KEY` is set correctly
- Check API key is valid and has quota
- Check browser console for errors

## 📊 Monitoring

After deployment, monitor:
- **Analytics**: Vercel Analytics (enable in project settings)
- **Performance**: Vercel Speed Insights
- **Errors**: Check browser console and Vercel logs

## 🔒 Security Notes

- Never commit `.env.local` to GitHub
- Use Vercel's environment variables for secrets
- Rotate API keys periodically
- Monitor API usage to prevent quota exhaustion

## 📱 Post-Deployment

After successful deployment:
1. Test all pages and features
2. Test AI Barista functionality
3. Test shopping cart and checkout
4. Test on mobile devices
5. Share your live URL! 🎉

---

**Your Cafe Aroma is ready to serve the world! ☕✨**
