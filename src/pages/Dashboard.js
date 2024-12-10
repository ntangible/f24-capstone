// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";
import DashboardCard from "../components/DashboardCard";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { getExpenses, getUserGoals, getIncome } = useFirestore();
  const [recentPurchase, setRecentPurchase] = useState(
    "No recent purchases found."
  );
  const [goals, setGoals] = useState("No goals currently set.");
  const [income, setIncome] = useState("No income reported");

  // Fetch expense data from database
  useEffect(() => {
    const fetchRecentExpense = async () => {
      if (currentUser) {
        try {
          const expense = await getExpenses(currentUser.uid);
          if (expense)
            setRecentPurchase(
              `Last spent: $${expense[0].amount} for ${expense[0].name} on ${expense[0].date}.`
            );
        } catch (e) {
          // ADD AN ALERT TOAST
          alert("Failed to fetch recent purchase: ", e);
        }
      }
    };
    fetchRecentExpense();
  }, [currentUser, getExpenses]);

  // Fetch user goal from database
  useEffect(() => {
    const fetchUserGoals = async () => {
      if (currentUser) {
        try {
          const goalArr = await getUserGoals(currentUser.uid);
          if (goalArr)
            setGoals(`$${goalArr[0].amount} for ${goalArr[0].name}.`);
        } catch (e) {
          // ADD AN ALERT TOAST
          alert("Failed to fetch user goals: ", e);
        }
      }
    };
    fetchUserGoals();
  }, [currentUser, getUserGoals]);

  useEffect(() => {
    const fetchUserIncome = async () => {
      if (currentUser) {
        try {
          const currIncome = await getIncome(currentUser.uid);
          if (currIncome)
            setIncome(
              `$${currIncome[0].amount} from ${currIncome[0].source} on ${currIncome[0].date}`
            );
        } catch (e) {
          // ADD AN ALERT TOAST
          alert("Failed to fetch user income: ", e);
        }
      }
    };
    fetchUserIncome();
  }, [currentUser, getIncome]);

  const cardData = [
    {
      title: "Add a purchase",
      detail: `${recentPurchase}`,
      link: "/add-purchase",
    },
    {
      title: "View your goals",
      detail: `${goals}`,
      link: "/goals",
    },
    {
      title: "Track your spending",
      detail: "",
      link: "/spendings",
      isChart: true, // Special marker for the chart card
    },
    {
      title: "Add a paycheck",
      detail: `${income}`,
      link: "/income",
    },
    {
      title: "Edit your profile",
      detail: "",
      link: "/profile",
      isEarnings: true, // Special marker for the earnings card
    },
  ];

  return (
    <Box>
      <div className="dashboard-container">
        <div className="main-content">
          <h1 className="heading">Dashboard</h1>
          <div className="cards">
            {cardData.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
