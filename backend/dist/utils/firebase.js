"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
dotenv_1.default.config();
const admin = __importStar(require("firebase-admin"));
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
    }
    catch (err) {
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
    }
    catch (err) {
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
        }
        else {
            admin.initializeApp({
                databaseURL
            });
            initialized = true;
            console.log(`Firebase Admin RTDB initialized automatically. Database URL: ${databaseURL}`);
        }
    }
    catch (err) {
        console.warn('Firebase Admin auto-initialization fallback (no credentials configured yet)');
    }
}
exports.db = admin.database();
