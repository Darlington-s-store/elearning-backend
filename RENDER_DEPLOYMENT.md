# Deploying Backend to Render

## Quick Setup

1. **Push your code to GitHub** (already done ✅)

2. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Darlington-s-store/elearning-backend`

3. **Configure the Web Service**
   - **Name**: `elearning-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Plan**: Free (or paid for better performance)

4. **Add Environment Variables**
   Click "Advanced" and add these:
   
   ```
   NODE_ENV=production
   DATABASE_URL=<your_postgresql_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PAYSTACK_SECRET_KEY=<your_paystack_key>
   FRONTEND_URL=<your_frontend_vercel_url>
   ```

5. **Database Setup** (if using Render PostgreSQL)
   - Click "New +" → "PostgreSQL"
   - Name: `elearning-db`
   - Plan: Free
   - Copy the "Internal Database URL" and use it as `DATABASE_URL`

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy
   - Your backend will be available at: `https://elearning-backend.onrender.com`

## After Deployment

1. **Update Frontend API URL**
   - In your frontend `.env` file:
     ```
     VITE_API_URL=https://elearning-backend.onrender.com/api
     ```

2. **Run Database Migrations**
   - Go to Render dashboard → your service → "Shell"
   - Run: `node scripts/fix_subscriptions_schema.js`

3. **Test the API**
   - Visit: `https://your-backend.onrender.com/api/health`
   - Should return: `{"status":"ok"}`

## Important Notes

- ⚠️ **Free tier sleeps after 15 min of inactivity** - first request will be slow
- ✅ **SSL/HTTPS is automatic** on Render
- ✅ **Auto-deploys on git push** to main branch
- 💡 **Upgrade to paid plan** for always-on service

## Troubleshooting

**If deployment fails:**
1. Check build logs in Render dashboard
2. Verify all environment variables are set
3. Ensure `package.json` has correct start script
4. Check database connection string is correct

**If API returns errors:**
1. Check application logs in Render dashboard
2. Verify DATABASE_URL is accessible
3. Run database setup scripts via Shell
