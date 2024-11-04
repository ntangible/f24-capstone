// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYsuyzbMhbwctNdJJ6BT995yBWYDiXVUM",
  authDomain: "f24-capstone.firebaseapp.com",
  projectId: "f24-capstone",
  storageBucket: "f24-capstone.firebasestorage.app",
  messagingSenderId: "348374123614",
  appId: "1:348374123614:web:1d1566a71fcc1403d8e0cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

export const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);