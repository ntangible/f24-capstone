// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDYsuyzbMhbwctNdJJ6BT995yBWYDiXVUM",
    authDomain: "f24-capstone.firebaseapp.com",
    projectId: "f24-capstone",
    storageBucket: "f24-capstone.appspot.com",
    messagingSenderId: "348374123614",
    appId: "1:348374123614:web:1d1566a71fcc1403d8e0cf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);