import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import {
  getAnalytics,
  isSupported as isAnalyticsSupported,
} from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (Object.values(firebaseConfig).some((v) => !v)) {
  throw new Error(
    "❌ Missing Firebase configuration. Please check your environment variables.",
  );
}

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

// Exported as a function to ensure lazy loading and optional usage
const initAnalytics = async () => {
  try {
    const supported = await isAnalyticsSupported();
    if (supported) {
      const analytics = getAnalytics(app);
      console.log("📊 Analytics initialized");
      return analytics;
    } else {
      console.warn("⚠️ Analytics not supported in this environment.");
      return null;
    }
  } catch (error) {
    console.error("❌ Failed to initialize analytics:", error);
    return null;
  }
};

export { app, auth, initAnalytics };
