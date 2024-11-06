import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Logged in successfully');
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    };

    const handleRegister = async () => {
        if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
            alert('Password must be at least 8 characters long, include an uppercase letter, and a number.');
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Account created successfully');
            setIsRegister(false);
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to Centsible!</h1>
            <div style={styles.formContainer}>
                <input
                    type='email'
                    placeholder='E-mail'
                    style={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    style={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isRegister ? (
                    <>
                        <button style={styles.button} onClick={handleRegister}>Register</button>
                        <button style={styles.altButton} onClick={() => setIsRegister(false)}>Back to Login</button>
                    </>
                ) : (
                    <>
                        <button style={styles.button} onClick={handleLogin}>Login</button>
                        <button style={styles.altButton} onClick={() => setIsRegister(true)}>Register</button>
                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1c1e22',
        color: '#a1f4dc',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2em',
        fontWeight: 'bold',
        marginBottom: '1em',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        padding: '2em',
        backgroundColor: '#24272b',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    },
    input: {
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: 'none',
        fontSize: '1em',
    },
    button: {
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: 'none',
        fontSize: '1em',
        cursor: 'pointer',
        backgroundColor: '#3fbf8b',
        color: 'white',
    },
    altButton: {
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: 'none',
        fontSize: '1em',
        cursor: 'pointer',
        backgroundColor: '#3fbf8b',
        color: 'white',
    },
};

export default Login;
