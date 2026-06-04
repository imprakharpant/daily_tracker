import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

import * as admin from 'firebase-admin';

let initialized = false;
let databaseURL = process.env.FIREBASE_DATABASE_URL || undefined;

// 1. Try to load from serviceAccountKey.json if it exists in the backend root
const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
if (fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    
    // Fallback guess of databaseURL if not configured in env
    if (!databaseURL && serviceAccount.project_id) {
      databaseURL = `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com/`;
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL
    });
    initialized = true;
    console.log(`Firebase Admin RTDB initialized using serviceAccountKey.json. Database URL: ${databaseURL}`);
  } catch (err) {
    console.error('Error loading serviceAccountKey.json:', err);
  }
}

// 2. Try loading from individual env variables
if (!initialized && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    
    if (!databaseURL) {
      databaseURL = `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com/`;
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
      databaseURL
    });
    initialized = true;
    console.log(`Firebase Admin RTDB initialized using env variables. Database URL: ${databaseURL}`);
  } catch (err) {
    console.error('Error initializing Firebase using env variables:', err);
  }
}

// 3. Fallback to default credentials or environment-based auto-detection
if (!initialized) {
  try {
    if (process.env.FIREBASE_DATABASE_EMULATOR_HOST) {
      const projectId = process.env.FIREBASE_PROJECT_ID || 'lumina-local-dev';
      databaseURL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}?ns=${projectId}`;
      admin.initializeApp({
        projectId,
        databaseURL
      });
      initialized = true;
      console.log('Firebase Admin RTDB initialized for Emulator');
    } else {
      admin.initializeApp({
        databaseURL
      });
      initialized = true;
      console.log(`Firebase Admin RTDB initialized automatically. Database URL: ${databaseURL}`);
    }
  } catch (err) {
    console.warn('Firebase Admin auto-initialization fallback (no credentials configured yet)');
  }
}

export const db = admin.database();
export type Database = admin.database.Database;
