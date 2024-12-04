import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useContext, useEffect, createContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  /**
   * User signup function
   * @param {*} email - Email provided to signup
   * @param {*} password - Password provided to signup
   * @returns - UserCredential object
   */
  const signup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * User login function
   * @param {*} email - Email of user account
   * @param {*} password - Password of user account
   * @returns - UserCredential object
   */
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * Logout function
   */
  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
