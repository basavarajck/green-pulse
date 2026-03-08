# Vercel Deployment Fix - 500 Error Resolution

## Issue
The serverless function was crashing with a 500 error due to file system operations that are not supported in Vercel's read-only environment.

## Root Causes Fixed

### 1. **Logger Writing to File System** ❌
- Winston logger was trying to write log files to `logs/` directory
- Vercel serverless functions have read-only file systems (except `/tmp`)
- **Fix**: Console-only logging in serverless environments

### 2. **File Upload Directory Creation** ❌  
- `teamUpload.js` was trying to create directories with `fs.mkdirSync`
- **Fix**: Use `/tmp` directory on Vercel, wrapped in try-catch

### 3. **File Deletion Operations** ❌
- Team member controller was deleting files with `fs.unlinkSync`
- **Fix**: Wrapped in try-catch to prevent crashes

## Files Modified

1. ✅ `server/src/config/logger.js` - Disabled file logging in serverless
2. ✅ `server/src/config/teamUpload.js` - Use `/tmp` on Vercel
3. ✅ `server/src/controllers/teamMembersController.js` - Safe file deletion

## Deployment Steps

### Backend Deployment (API Server)

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   Go to your project → Settings → Environment Variables and add:
   
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your-secure-jwt-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   API_URL=https://your-backend-api.vercel.app
   CLIENT_URL=https://your-frontend-app.vercel.app
   NODE_ENV=production
   ```

   **Important:** Set ALL variables for all environments (Production, Preview, Development)

### Frontend Deployment

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Set environment variable in Vercel Dashboard:**
   ```
   VITE_API_URL=https://your-backend-api.vercel.app
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

## Verification Steps

1. **Check Backend Health:**
   ```bash
   curl https://your-backend-api.vercel.app/health
   ```
   
   Should return:
   ```json
   {
     "uptime": 123.45,
     "message": "OK",
     "timestamp": 1234567890,
     "mongoStatus": "connected",
     "environment": "production"
   }
   ```

2. **Check API Root:**
   ```bash
   curl https://your-backend-api.vercel.app/
   ```

3. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the deployment → Functions tab
   - Check for any error logs

## Important Limitations & Recommendations

### ⚠️ File Uploads on Vercel

**Current State:**
- File uploads work but are stored in `/tmp`
- Files in `/tmp` are **ephemeral** (deleted after function finishes)
- **Not suitable for production**

**Recommended Solutions:**

#### Option 1: Cloudinary (Recommended)
```bash
npm install cloudinary multer-storage-cloudinary
```

**Benefits:**
- Free tier: 25 GB storage, 25 GB bandwidth
- Built-in image transformations
- CDN delivery
- Easy integration

#### Option 2: Vercel Blob
```bash
npm install @vercel/blob
```

**Benefits:**
- Native Vercel integration
- Simple API
- Automatic CDN

#### Option 3: AWS S3
```bash
npm install @aws-sdk/client-s3 multer-s3
```

**Benefits:**
- Industry standard
- Flexible pricing
- High reliability

### 📋 Quick Cloudinary Setup

1. **Sign up:** https://cloudinary.com
2. **Install packages:**
   ```bash
   npm install cloudinary multer-storage-cloudinary
   ```

3. **Update `teamUpload.js`:**
   ```javascript
   const cloudinary = require('cloudinary').v2;
   const { CloudinaryStorage } = require('multer-storage-cloudinary');

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });

   const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
       folder: 'team',
       allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
       transformation: [{ width: 500, height: 500, crop: 'limit' }]
     }
   });
   ```

4. **Add env vars to Vercel:**
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## Common Issues

### Issue: Still getting 500 errors
**Solution:** Check Vercel function logs for specific errors. Most common:
- Missing environment variables
- MongoDB connection timeout
- CORS issues

### Issue: OAuth not working
**Solution:** 
- Verify callback URLs in Google/GitHub console
- Ensure `API_URL` matches your Vercel backend URL
- Check that `CLIENT_URL` matches your frontend URL

### Issue: CORS errors
**Solution:** Add your frontend domain to the CORS whitelist in `app.js`

### Issue: MongoDB connection timing out
**Solution:**
- Check if your IP is whitelisted in MongoDB Atlas (use 0.0.0.0/0 for all IPs)
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas cluster status

## Monitoring

1. **Vercel Analytics:** Enable in project settings
2. **MongoDB Atlas Metrics:** Monitor connections and queries
3. **Custom Logging:** All logs go to Vercel function logs (accessible in dashboard)

## Next Steps

1. ✅ Deploy backend with fixes
2. ✅ Verify health endpoint
3. ✅ Test authentication flow
4. ⚠️ **Migrate file uploads to cloud storage (High Priority)**
5. 📊 Set up monitoring and alerts
6. 🔒 Review security settings

## Need Help?

If you're still experiencing issues:
1. Check Vercel function logs (Dashboard → Project → Functions → Logs)
2. Verify all environment variables are set correctly
3. Test each endpoint individually
4. Check MongoDB Atlas network access settings

---

**Last Updated:** March 8, 2026
**Status:** ✅ Immediate crashes fixed | ⚠️ File uploads need migration
