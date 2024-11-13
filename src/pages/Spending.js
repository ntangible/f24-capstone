// src/pages/Spending.js
import React, { useEffect, useState } from "react";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Spending.css";

const Spending = () => {
  const [expenseData, setExpenseData] = useState([]);
  const { getUncatExpense } = useFirestore();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserExpenses = async () => {
      if (currentUser) {
        try {
          const expenseArr = await getUncatExpense(currentUser.uid, "all");
          if (expenseArr) setExpenseData(expenseArr);
        } catch (e) {
          // ADD AN ALERT TOAST
          alert("Failed to fetch user expenses");
          console.log(e);
        }
      }
    };
    fetchUserExpenses();
  }, [currentUser, getUncatExpense]);

  return (
    <div className="spending-container">
      <div className="spending-content">
        <h1 className="spending-heading">Track Your Spending</h1>
        <div className="spending-cards">
          {expenseData.length !== 0 ? (
            expenseData.map((item, index) => (
              <div key={index} className="spending-card">
                <p className="spending-description">{item.name}</p>
                <p className="spending-amount">{item.amount}</p>
              </div>
            ))
          ) : (
            <h2>No expenses yet</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spending;
