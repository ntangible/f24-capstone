import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFirestore } from "../contexts/FirestoreContext";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const { createUser } = useFirestore();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      // ALERT NOTIFICATION
      alert(
        "Password must be at least 8 characters long, include an uppercase letter, and a number."
      );
      return;
    } else if (password !== confirmPassword) {
      // ALERT NOTIFICATION
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredentials = await signup(email, password);
      await createUser(userCredentials.user.uid, userCredentials.user.email);
      alert("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
      // ALERT NOTIFICATION
      alert("Registration failed: ", error);
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: ", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Centsible!</h1>
      <div style={styles.formContainer}>
        <input
          type="email"
          placeholder="E-mail"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegister ? (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              style={styles.input}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button style={styles.button} onClick={handleRegister}>
              Register
            </button>
            <button
              style={styles.altButton}
              onClick={() => setIsRegister(false)}
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <button style={styles.button} onClick={handleLogin}>
              Login
            </button>
            <button
              style={styles.altButton}
              onClick={() => setIsRegister(true)}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1c1e22",
    color: "#a1f4dc",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2em",
    fontWeight: "bold",
    marginBottom: "1em",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "2em",
    backgroundColor: "#24272b",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
    fontSize: "1em",
  },
  button: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
    fontSize: "1em",
    cursor: "pointer",
    backgroundColor: "#3fbf8b",
    color: "white",
  },
  altButton: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
    fontSize: "1em",
    cursor: "pointer",
    backgroundColor: "#3fbf8b",
    color: "white",
  },
};

export default Login;
