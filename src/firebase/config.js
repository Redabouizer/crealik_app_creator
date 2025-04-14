// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuA4bHiX5LNkHuAgwu8lkEh0BZntbASvs",
  authDomain: "crealik-33ea4.firebaseapp.com",
  databaseURL: "https://crealik-33ea4-default-rtdb.firebaseio.com",
  projectId: "crealik-33ea4",
  storageBucket: "crealik-33ea4.firebasestorage.app",
  messagingSenderId: "282666934568",
  appId: "1:282666934568:web:41bb5ca30af19c2bb8f01d",
  measurementId: "G-XZHDBE41DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (conditionally for client-side only)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;