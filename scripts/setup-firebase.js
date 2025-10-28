#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Firebase for your project...\n');

// Check if Firebase CLI is installed
try {
  execSync('firebase --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Firebase CLI is not installed. Please install it first:');
  console.log('npm install -g firebase-tools');
  console.log('Then run: firebase login');
  process.exit(1);
}

// Check if user is logged in
try {
  execSync('firebase projects:list', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ You are not logged in to Firebase. Please run:');
  console.log('firebase login');
  process.exit(1);
}

// Get project ID from user
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your Firebase project ID: ', (projectId) => {
  if (!projectId.trim()) {
    console.error('❌ Project ID is required');
    rl.close();
    process.exit(1);
  }

  // Update .firebaserc
  const firebasercPath = path.join(process.cwd(), '.firebaserc');
  const firebaserc = {
    projects: {
      default: projectId
    }
  };

  fs.writeFileSync(firebasercPath, JSON.stringify(firebaserc, null, 2));
  console.log('✅ Updated .firebaserc with project ID:', projectId);

  // Create .env.local template
  const envTemplate = `# Firebase Configuration
# Replace these values with your Firebase project configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${projectId}.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${projectId}.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Development settings
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
`;

  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ Created .env.local template');
    console.log('⚠️  Please update .env.local with your actual Firebase configuration values');
  } else {
    console.log('⚠️  .env.local already exists. Please update it manually with your Firebase configuration');
  }

  // Initialize Firebase project
  try {
    console.log('\n🔧 Initializing Firebase project...');
    execSync(`firebase use ${projectId}`, { stdio: 'inherit' });
    console.log('✅ Firebase project initialized');
  } catch (error) {
    console.error('❌ Failed to initialize Firebase project:', error.message);
  }

  // Setup Firestore
  try {
    console.log('\n📊 Setting up Firestore...');
    execSync('firebase firestore:indexes', { stdio: 'inherit' });
    execSync('firebase firestore:rules', { stdio: 'inherit' });
    console.log('✅ Firestore setup complete');
  } catch (error) {
    console.error('❌ Failed to setup Firestore:', error.message);
  }

  // Setup Hosting
  try {
    console.log('\n🌐 Setting up Hosting...');
    execSync('firebase hosting:channel:deploy preview', { stdio: 'inherit' });
    console.log('✅ Hosting setup complete');
  } catch (error) {
    console.error('❌ Failed to setup Hosting:', error.message);
  }

  console.log('\n🎉 Firebase setup complete!');
  console.log('\nNext steps:');
  console.log('1. Update .env.local with your Firebase configuration values');
  console.log('2. Run "npm run dev" to start the development server');
  console.log('3. Run "npm run dev:firebase" to start Firebase emulators');
  console.log('4. Run "npm run dev:all" to start both Next.js and Firebase emulators');

  rl.close();
}); 