---
description: Deploy the application to production
---

# Deployment Guide

## Issues Fixed for Mobile Blank Screen

1. ✅ Removed `output: "standalone"` from next.config.js (was causing deployment issues)
2. ✅ Added viewport metadata for proper mobile rendering
3. ✅ Replaced blank loading state with visible skeleton
4. ✅ Added Firebase Storage to allowed image domains
5. ✅ Updated Firebase hosting configuration

## Prerequisites

Make sure your environment variables are set in your deployment platform:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Set environment variables in Vercel dashboard

### Option 2: Firebase Hosting (Static)

**Note:** This requires static export which may not support all Next.js features.

1. Update next.config.js to add static export:

```javascript
output: 'export',
```

2. Build and deploy:

```bash
npm run build
firebase deploy --only hosting
```

### Option 3: Firebase Hosting + Cloud Functions

For full Next.js support with Firebase:

1. Install Firebase Functions:

```bash
npm install -g firebase-tools
firebase init functions
```

2. Follow the Next.js on Firebase guide

## Testing Mobile Issues

After deployment:

1. Test on actual mobile device
2. Check browser console for errors (use remote debugging)
3. Verify all environment variables are set
4. Check Network tab for failed requests
5. Test with slow 3G to simulate poor connections

## Common Mobile Issues

- **Blank screen**: Usually environment variables not set in production
- **White flash**: Hydration mismatch or missing loading states
- **Layout issues**: Missing viewport meta tag
- **Images not loading**: Check CORS and image optimization settings
