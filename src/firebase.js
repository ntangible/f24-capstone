// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "f24-capstone.firebaseapp.com",
  projectId: "f24-capstone",
  storageBucket: "f24-capstone.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

export const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);