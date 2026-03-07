# GitHub OAuth Setup Guide

## Overview
This guide will help you set up GitHub OAuth authentication for your Green Pulse application.

## Step 1: Create a GitHub OAuth App

1. Go to GitHub Settings: https://github.com/settings/developers
2. Click "OAuth Apps" in the left sidebar
3. Click "New OAuth App"
4. Fill in the application details:

### For Development (localhost)
- **Application name**: Green Pulse Development
- **Homepage URL**: `http://localhost:5173`
- **Authorization callback URL**: `http://localhost:4000/auth/github/callback`

### For Production (Vercel)
- **Application name**: Green Pulse Production
- **Homepage URL**: `https://your-frontend-app.vercel.app`
- **Authorization callback URL**: `https://your-backend-api.vercel.app/auth/github/callback`

⚠️ **Important**: You need to create **separate OAuth apps** for development and production!

## Step 2: Get Your Credentials

After creating the OAuth app:
1. Copy the **Client ID**
2. Click "Generate a new client secret" and copy the **Client Secret**
3. Save these credentials securely

## Step 3: Configure Environment Variables

### Local Development (.env file in server folder)
```env
GITHUB_CLIENT_ID=your_dev_github_client_id
GITHUB_CLIENT_SECRET=your_dev_github_client_secret
API_URL=http://localhost:4000
CLIENT_URL=http://localhost:5173
```

### Production (Vercel Environment Variables)
In your Vercel backend project dashboard:
1. Go to Settings → Environment Variables
2. Add these variables:
   ```
   GITHUB_CLIENT_ID=your_prod_github_client_id
   GITHUB_CLIENT_SECRET=your_prod_github_client_secret
   API_URL=https://your-backend-api.vercel.app
   CLIENT_URL=https://your-frontend-app.vercel.app
   ```

## Step 4: Ensure Email Visibility

GitHub OAuth requires access to your email. If you encounter "No email available" errors:

1. Go to GitHub Settings → Emails (https://github.com/settings/emails)
2. Make sure you have at least one verified email address
3. **Uncheck** "Keep my email addresses private" (during development/testing)
4. Or use the "Public email" dropdown to select a public email

## Step 5: Test the Authentication

### Development
1. Start your backend: `cd server && npm run dev`
2. Start your frontend: `cd client && npm run dev`
3. Navigate to `http://localhost:5173/login`
4. Click "GitHub" button
5. Authorize the app on GitHub
6. You should be redirected back and logged in

### Production
1. Deploy both frontend and backend to Vercel
2. Navigate to your production URL
3. Click "Sign in with GitHub"
4. Authorize the app
5. You should be redirected back and logged in

## Common Issues & Solutions

### Issue: "No email available from GitHub"
**Solution**: 
- Verify your email on GitHub
- Make your email public (or at least allow OAuth apps to access it)
- Ensure the `user:email` scope is included in the OAuth request

### Issue: "Redirect URI mismatch"
**Solution**: 
- Make sure the callback URL in your GitHub OAuth App settings exactly matches your `API_URL` + `/auth/github/callback`
- For production: `https://your-backend.vercel.app/auth/github/callback`
- For development: `http://localhost:4000/auth/github/callback`

### Issue: Authentication works in dev but not production
**Solution**: 
- Ensure you created a separate OAuth app for production
- Verify all environment variables are set in Vercel
- Check that API_URL points to your backend (not frontend)
- Check that CLIENT_URL points to your frontend

### Issue: "Invalid client credentials"
**Solution**: 
- Double-check your GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
- Make sure there are no extra spaces in the environment variables
- Verify you're using the correct credentials for the environment (dev vs prod)

## Security Best Practices

1. **Never commit credentials to Git**: Always use `.env` files that are in `.gitignore`
2. **Use different OAuth apps for dev and production**: This prevents credential leakage
3. **Rotate secrets regularly**: Generate new client secrets periodically
4. **Use HTTPS in production**: GitHub OAuth requires HTTPS for production apps
5. **Limit scopes**: Only request the minimum scopes needed (`user:email`)

## Verification Checklist

- [ ] GitHub OAuth App created
- [ ] Client ID and Secret copied
- [ ] Environment variables set (local and/or Vercel)
- [ ] Callback URL matches exactly
- [ ] Email is verified and accessible on GitHub
- [ ] Backend server is running
- [ ] Frontend can reach backend API
- [ ] Login button redirects to GitHub
- [ ] After authorization, redirected back with token

## Need Help?

If you're still experiencing issues:
1. Check the browser console for errors
2. Check the server logs for authentication errors
3. Verify network requests in browser DevTools
4. Ensure all services are running and accessible
