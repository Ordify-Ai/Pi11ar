#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('🔧 Setting up environment variables...\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  {
    name: 'apiKey',
    question: 'Enter your Firebase API Key: ',
    required: true
  },
  {
    name: 'authDomain',
    question: 'Enter your Firebase Auth Domain: ',
    required: true
  },
  {
    name: 'projectId',
    question: 'Enter your Firebase Project ID: ',
    required: true
  },
  {
    name: 'storageBucket',
    question: 'Enter your Firebase Storage Bucket: ',
    required: true
  },
  {
    name: 'messagingSenderId',
    question: 'Enter your Firebase Messaging Sender ID: ',
    required: true
  },
  {
    name: 'appId',
    question: 'Enter your Firebase App ID: ',
    required: true
  },
  {
    name: 'useEmulator',
    question: 'Use Firebase emulators in development? (y/n): ',
    required: false,
    default: 'y'
  }
];

const answers = {};

function askQuestion(index) {
  if (index >= questions.length) {
    createEnvFile();
    return;
  }

  const question = questions[index];
  rl.question(question.question, (answer) => {
    if (question.required && !answer.trim()) {
      console.log('❌ This field is required');
      askQuestion(index);
      return;
    }

    if (question.name === 'useEmulator') {
      answers[question.name] = answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes' ? 'true' : 'false';
    } else {
      answers[question.name] = answer.trim();
    }

    askQuestion(index + 1);
  });
}

function createEnvFile() {
  const envContent = `# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=${answers.apiKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${answers.authDomain}
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${answers.projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${answers.storageBucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${answers.messagingSenderId}
NEXT_PUBLIC_FIREBASE_APP_ID=${answers.appId}

# Development settings
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=${answers.useEmulator}
`;

  const envPath = path.join(process.cwd(), '.env.local');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Environment variables configured successfully!');
    console.log('📁 Created .env.local file');
    
    console.log('\nNext steps:');
    console.log('1. Run "npm run dev" to start the development server');
    if (answers.useEmulator === 'true') {
      console.log('2. Run "npm run dev:firebase" to start Firebase emulators');
      console.log('3. Run "npm run dev:all" to start both Next.js and Firebase emulators');
    }
  } catch (error) {
    console.error('❌ Failed to create .env.local file:', error.message);
  }

  rl.close();
}

askQuestion(0); 