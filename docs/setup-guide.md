# Firebase Setup Guide

This guide will walk you through setting up Firebase for your Next.js + Firebase template project.

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **Firebase CLI** (`npm install -g firebase-tools`)
3. **Google Account** (for Firebase Console access)

## Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```bash
firebase login
```

This will open your browser to authenticate with your Google account.

## Step 3: Create a Firebase Project

### Option A: Using Firebase Console (Recommended for beginners)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "my-nextjs-app")
4. Choose whether to enable Google Analytics (recommended)
5. Click "Create project"
6. Wait for the project to be created

### Option B: Using Firebase CLI

```bash
firebase projects:create my-nextjs-app
```

## Step 4: Add a Web App to Your Firebase Project

1. In your Firebase project console, click the web app icon (</>)
2. Enter an app nickname (e.g., "web-app")
3. Choose whether to set up Firebase Hosting (you can skip this for now)
4. Click "Register app"
5. Copy the configuration object - you'll need this for the next step

## Step 5: Configure Your Template

### Option A: Automated Setup (Recommended)

```bash
npm run setup:firebase
```

This script will:
- Prompt for your Firebase project ID
- Update `.firebaserc` with your project ID
- Create a `.env.local` template
- Initialize Firebase project
- Setup Firestore and Hosting

### Option B: Manual Setup

1. **Update `.firebaserc`**
   ```json
   {
     "projects": {
       "default": "your-project-id"
     }
   }
   ```

2. **Create `.env.local`**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   
   # Development settings
   NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
   ```

3. **Initialize Firebase in your project**
   ```bash
   firebase use your-project-id
   ```

### Option C: Using This Template's Firebase Project (For Testing)

If you want to use the template's Firebase project for testing:

```bash
firebase use template-1ba82
```

**Note**: This will use the template's Firebase project. For production, create your own Firebase project.

## Step 6: Enable Firebase Services

### Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (you can update security rules later)
4. Select a location for your database
5. Click "Done"

### Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable the authentication methods you want to use:
   - **Email/Password**: Click "Email/Password" and enable it
   - **Google**: Click "Google" and configure OAuth consent screen
   - **Other providers**: Enable as needed

### Hosting (Optional)

1. In Firebase Console, go to "Hosting"
2. Click "Get started"
3. Follow the setup wizard

## Step 7: Configure Security Rules

### Firestore Rules

Update `firestore.rules` with appropriate security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Or allow public read access
    // match /{document=**} {
    //   allow read: if true;
    //   allow write: if request.auth != null;
    // }
  }
}
```

### Deploy Rules

```bash
firebase deploy --only firestore:rules
```

## Step 8: Test Your Setup

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Start Firebase emulators** (in another terminal)
   ```bash
   npm run dev:firebase
   ```

3. **Visit your app**
   - Next.js app: http://localhost:3000
   - Firebase Emulator UI: http://localhost:4001

## Step 9: Deploy to Production

### Build the Application

```bash
npm run build
```

### Deploy to Firebase Hosting

```bash
npm run firebase:deploy
```

Or deploy only hosting:

```bash
npm run firebase:deploy:hosting
```

## Troubleshooting

### Common Issues

1. **"Firebase CLI is not installed"**
   ```bash
   npm install -g firebase-tools
   ```

2. **"You are not logged in to Firebase"**
   ```bash
   firebase login
   ```

3. **"Project not found"**
   - Make sure you're using the correct project ID
   - Check that you have access to the project
   - Verify the project exists in Firebase Console

4. **"Permission denied"**
   - Make sure you're logged in with the correct Google account
   - Check that you have the necessary permissions for the project

5. **Environment variables not working**
   - Make sure `.env.local` is in the root directory
   - Restart your development server after adding environment variables
   - Check that variable names start with `NEXT_PUBLIC_` for client-side access

### Getting Help

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase CLI Documentation](https://firebase.google.com/docs/cli)

## Next Steps

After setting up Firebase, you can:

1. **Add more authentication providers** (Google, Facebook, etc.)
2. **Configure Firestore indexes** for better query performance
3. **Set up Firebase Functions** for server-side logic
4. **Configure Firebase Storage** for file uploads
5. **Set up Firebase Analytics** for user tracking
6. **Configure custom domains** for hosting

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use appropriate Firestore security rules**
3. **Enable Firebase App Check** for production
4. **Regularly review Firebase usage and costs**
5. **Set up Firebase monitoring and alerts**

## Cost Optimization

1. **Use Firebase emulators** for development
2. **Monitor Firestore usage** and optimize queries
3. **Set up Firebase usage alerts**
4. **Use appropriate Firebase plans** for your needs

---

For more detailed information, refer to the [Firebase Documentation](https://firebase.google.com/docs). 