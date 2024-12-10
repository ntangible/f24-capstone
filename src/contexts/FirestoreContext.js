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
import { v1 as uuidv1 } from "uuid";

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
   *  id: <ID of data>,
   *  source: <Source of income>,
   *  amount: <Amount of income>,
   *  date: <Date added>,
   *  frequency: <Frequency of income>,
   *  active: <Flag to enable or disable income>,
   * }
   */
  const addIncome = async (id, incomeData) => {
    try {
      incomeData.id = uuidv1();
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
   * Update a single user income entry by locating it in user document, replacing it,
   * and updating the entire array in user document.
   * @param {String} userId - User ID
   * @param {String} incomeId - UUID of income item
   * @param {*} updatedIncome - Object that stores updated income data
   */
  const updateIncome = async (userId, incomeId, updatedIncome) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const incomeData = docSnap.data().income;

        const index = incomeData.findIndex(
          (arrItem) => arrItem.id === incomeId
        );
        incomeData[index] = { ...incomeData[index], ...updatedIncome };

        await updateDoc(docRef, { income: incomeData });
      }
    } catch (e) {
      console.error("Error updating income: ", e);
    }
  };

  /**
   * Append expense data to the expense document of user
   * @param {String} id - User ID
   * @param {*} expenseData - Object that stores each expense
   * expenseData = {
   *  id: <ID of expense data>,
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
      expenseData.id = uuidv1();
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
   * Update a single expense item by locating it in user expense document,
   * replacing it, and then updating the document
   * @param {String} userId - User ID
   * @param {String} expenseId - UUID of expense item
   * @param {*} updatedExpense - Object that stores data for updated expense
   */
  const updateExpense = async (userId, expenseId, updatedExpense) => {
    try {
      const docRef = doc(db, "users", userId, "expenses", "expenses");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const expensesArr = docSnap.data().expenses;

        const index = expensesArr.findIndex(
          (arrItem) => arrItem.id === expenseId
        );
        expensesArr[index] = { ...expensesArr[index], ...updatedExpense };

        await updateDoc(docRef, { expenses: expensesArr });
      }
    } catch (e) {
      console.error("Error updating expense data: ", e);
    }
  };

  /**
   * Appends user goal to user document
   * @param {String} id - User ID
   * @param {*} userGoal
   * userGoal = {
   *  id: <ID of user goal>,
   *  name: <Name of goal>,
   *  amount: <Amount to save for>,
   *  time: <Deadline for goal>,
   *  progress: <Current amount saved for goal>,
   * }
   */
  const addUserGoal = async (id, userGoal) => {
    try {
      userGoal.id = uuidv1();
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
   * @param {Number} num - Number of user goals to return (default: 1, 0 returns all)
   * @returns {Promise<Array | null>}
   */
  const getUserGoals = async (id, num = 1) => {
    try {
      const docSnap = await getDoc(doc(db, "users", id));

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (!userData.goals || userData.goals.length === 0) return null;

        if (num === 0) return userData.goals;

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

  /**
   * Update a single user goal entry by locating it in user document, replacing it,
   * and updating the entire array in document.
   * @param {String} userId
   * @param {String} goalId
   * @param {*} updatedGoal
   */
  const updateUserGoal = async (userId, goalId, updatedGoal) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const goalsArr = docSnap.data().goals;
        const index = goalsArr.findIndex((arrItem) => arrItem.id === goalId);
        goalsArr[index] = { ...goalsArr[index], ...updatedGoal };

        await updateDoc(docRef, { goals: goalsArr });
      }
    } catch (e) {
      console.error("Error editing user goal: ", e);
    }
  };

  const value = {
    createUser,
    updateUser,
    addIncome,
    getIncome,
    updateIncome,
    addExpenses,
    getExpenses,
    updateExpense,
    getUserData,
    addUserGoal,
    getUserGoals,
    updateUserGoal,
  };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
};
