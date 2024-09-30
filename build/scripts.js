// scripts.js

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOkCPrXHcIkhCrBSOvsRofrUTeAfSfP5E",
    authDomain: "centsible-50947.firebaseapp.com",
    projectId: "centsible-50947",
    storageBucket: "centsible-50947.appspot.com",
    messagingSenderId: "152703971919",
    appId: "1:152703971919:web:658f3cd181eccde73ab03a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Use Firebase Auth emulator if running on localhost
if (window.location.hostname === "localhost" ||  window.location.hostname === "127.0.0.1") {
    auth.useEmulator("http://localhost:9099");
}

// Form elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

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
        auth.createUserWithEmailAndPassword(email, password)
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

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Logged in successfully');
            // Redirect to home/dashboard page if needed
        })
        .catch((error) => {
            alert(error.message);
        });
});
