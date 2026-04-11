// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const apiKey = (process.env.EXPO_PUBLIC_API_KEY || "").replace(/"/g, "");

const authDomain = (process.env.EXPO_PUBLIC_AUTH_DOMAIN || "").replace(
  /"/g,
  "",
);
const projectId = (process.env.EXPO_PUBLIC_PROJECT_ID || "").replace(/"/g, "");
const storageBucket = (process.env.EXPO_PUBLIC_STORAGE_BUCKET || "").replace(
  /"/g,
  "",
);
const messagingSenderId = (
  process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID || ""
).trim();
const appId = (process.env.EXPO_PUBLIC_APP_ID || "").replace(/"/g, "");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
