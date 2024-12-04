import { db } from "../firebase";
import {
  arrayUnion,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  // eslint-disable-next-line
  DocumentSnapshot,
} from "firebase/firestore";
import { createContext, useContext } from "react";

const FirestoreContext = createContext();

export const useFirestore = () => useContext(FirestoreContext);

export const FirestoreProvider = ({ children }) => {
  /**
   * Create a document indexed by UserID with user's email and a creation timestamp
   * @param {String} id - User ID
   * @param {String} email - User Email
   */
  const createUser = async (id, email) => {
    try {
      await setDoc(doc(db, "users", id), {
        email: email,
        created: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding user document: ", e);
      throw e;
    }
  };

  /**
   * Update fields of user document
   * @param {String} id - User ID
   * @param {*} userData - Object that stores user data
   * userData = {
   *  name: <String>,
   *  username: <String>,
   *  dob: <String>,
   * }
   */
  const updateUser = async (id, userData) => {
    try {
      await updateDoc(doc(db, "users", id), userData);
    } catch (e) {
      console.error("Error updating user document: ", e);
      throw e;
    }
  };

  /**
   * Returns document containing user data
   * @param {String} id - User ID
   * @returns {Promise<DocumentSnapshot | null>}
   */
  const getUserData = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such user document.");
        return null;
      }
    } catch (e) {
      console.error("Error retrieving user data: ", e);
      throw e;
    }
  };

  /**
   * Appends income data to user document
   * @param {String} id - User ID
   * @param {*} incomeData - Object that stores each income data
   * incomeData = {
   *  source: <Source of income>,
   *  amount: <Amount of income>,
   *  date: <Date added>,
   *  frequency: <Frequency of income>,
   *  active: <Flag to enable or disable income>,
   * }
   */
  const addIncome = async (id, incomeData) => {
    try {
      incomeData.active = true;
      await updateDoc(doc(db, "users", id), {
        income: arrayUnion(incomeData),
      });
    } catch (e) {
      console.error("Error adding income data: ", e);
      throw e;
    }
  };

  /**
   * Gets income from user document
   * @param {String} id - User ID
   * @param {*} num - Number of elements to return (default 1, "all" for all)
   * @returns {Promise<Array | null>} - Returns array of objects containing income data
   */
  const getIncome = async (id, num = 1) => {
    try {
      const docSnap = await getDoc(doc(db, "users", id));

      if (docSnap.exists()) {
        if (!docSnap.data().income || docSnap.data().income.length === 0)
          return null;

        if (num === "all") return docSnap.data().income;

        return docSnap.data().income.slice(0, num);
      } else {
        console.log("No such user document.");
        return null;
      }
    } catch (e) {
      console.error("Error retrieving user data: ", e);
      throw e;
    }
  };

  /**
   * Append expense data to the expense document of user
   * @param {String} id - User ID
   * @param {*} expenseData - Object that stores each expense
   * expenseData = {
   *  name: <Name of the expense>,
   *  amount: <Cost of the expense>,
   *  merchant: <Merchant name>,
   *  category: <Category of the expense>,
   *  date: <User set data of purchase>,
   * }
   * @returns
   */
  const addExpenses = async (id, expenseData) => {
    try {
      let docRef = doc(db, "users", id, "expenses", "expenses");
      await setDoc(
        docRef,
        { expenses: arrayUnion(expenseData) },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding expense data: ", e);
      throw e;
    }
  };

  /**
   * Gets expenses from document
   * @param {String} id - User ID
   * @param {int} num - Number of expenses to return (default: 1, 0 returns all)
   * @param {String} category - Category of expenses to return
   * @returns {Promise<Array | null>}
   */
  const getExpenses = async (id, num = 1, category = "") => {
    try {
      const document = await getDoc(
        doc(db, "users", id, "expenses", "expenses")
      );
      if (document.exists()) {
        const expensesArr = document.data().expenses;

        if (category) {
          expensesArr = expensesArr.filter(
            (expense) =>
              expense.category.toLowerCase() === category.toLocaleLowerCase()
          );
        }

        if (num === 0) return expensesArr;

        return expensesArr.slice(0, num);
      }
      return null;
    } catch (e) {
      console.error("Error getting expense: ", e);
      throw e;
    }
  };

  /**
   * Appends user goal to user document
   * @param {String} id - User ID
   * @param {*} userGoal
   * userGoal = {
   *  name: <Name of goal>,
   *  amount: <Amount to save for>,
   *  time: <Deadline for goal>,
   *  progress: <Current amount saved for goal>,
   * }
   */
  const addUserGoal = async (id, userGoal) => {
    try {
      await updateDoc(doc(db, "users", id), {
        goals: arrayUnion(userGoal),
      });
    } catch (e) {
      console.error("Error adding new goal: ", e);
      throw e;
    }
  };

  /**
   * Gets user goals from user doument
   * [Optional] Show highest priority goals first or just by order they are stored
   * @param {String} id - User ID
   * @param {*} num - Number of user goals to return (default: 1, "all" returns all)
   * @returns {Promise<Array | null>}
   */
  const getUserGoals = async (id, num = 1) => {
    try {
      const docSnap = await getDoc(doc(db, "users", id));

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (!userData.goals || userData.goals.length === 0) return null;

        if (num === "all") return userData.goals;

        return userData.goals.slice(0, num);
      } else {
        console.log("No such user document.");
        return null;
      }
    } catch (e) {
      console.error("Error retrieving user goals: ", e);
      throw e;
    }
  };

  const value = {
    createUser,
    updateUser,
    addIncome,
    getIncome,
    addExpenses,
    getExpenses,
    getUserData,
    addUserGoal,
    getUserGoals,
  };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
};
