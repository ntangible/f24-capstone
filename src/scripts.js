import './styles.css';

// scripts.js
import { initializeApp } from "firebase/app";
import { signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator, onAuthStateChanged } from "firebase/auth";

// Firebase configuration
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDOkCPrXHcIkhCrBSOvsRofrUTeAfSfP5E",
    authDomain: "centsible-50947.firebaseapp.com",
    projectId: "centsible-50947",
    storageBucket: "centsible-50947.appspot.com",
    messagingSenderId: "152703971919",
    appId: "1:152703971919:web:658f3cd181eccde73ab03a"
});

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

// Form elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loggedIn = document.getElementById('logged-in');

// Toggle from login to registration form
document.getElementById('show-register').addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

// Register button event listener
document.getElementById('register-button').addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert('Account created successfully');
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            })
            .catch((error) => {
                alert(error.message);
            });
    } else {
        alert("Passwords do not match");
    }
});

// Login button event listener
document.getElementById('login-button').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('Logged in successfully');
            // Redirect to home/dashboard page if needed
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Listen for User login states
const listenAuthState = async() => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(user);
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';
            loggedIn.style.display = 'block';
            document.getElementById('lblmsg').innerHTML = `
            You have signed in as ${user.email} at ${user.metadata.lastSignInTime}
            `
        }
        else {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            loggedIn.style.display = 'none';
        }
    })
};

// Logout button event listener
document.getElementById('logout-button').addEventListener('click', async () => {
    await signOut(auth);
    alert(`You have signed out`);
});

listenAuthState();