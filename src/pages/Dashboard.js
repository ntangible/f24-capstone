// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AppBarComponent from "../components/Appbar";
import { Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getRecentExpense, getUserGoals } = useFirestore();
  const [recentPurchase, setRecentPurchase] = useState(
    "No recent purchases found."
  );
  const [goals, setGoals] = useState("No goals currently set.");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Fetch expense data from database
  useEffect(() => {
    const fetchRecentExpense = async () => {
      if (currentUser) {
        try {
          const expense = await getRecentExpense(currentUser.uid, "voluntary");
          if (expense)
            setRecentPurchase(
              `Last spent: $${expense.amount} for ${expense.name} on ${expense.date}.`
            );
        } catch (e) {
          // ADD AN ALERT TOAST
          console.error("Failed to fetch recent purchase: ", e);
        }
      }
    };
    fetchRecentExpense();
  }, [currentUser, getRecentExpense]);

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
          console.error("Failed to fetch user goals: ", e);
        }
      }
    };
    fetchUserGoals();
  }, [currentUser, getUserGoals]);

  const cardData = [
    {
      title: "Add a purchase",
      detail: `${recentPurchase}`,
      link: "/purchase",
    },
    {
      title: "View your goals",
      detail: `${goals}`,
      link: "/goals",
    },
    {
      title: "Track your spending",
      detail: "",
      link: "/spending",
      isChart: true, // Special marker for the chart card
    },
    {
      title: "Add a paycheck",
      detail: "",
      link: "/income",
    },
    {
      title: "You have made",
      detail: "$10,000\nsince joining Centsible!",
      isEarnings: true, // Special marker for the earnings card
    },
  ];

  const cardStyle = {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "18px",
    position: "relative",
    width: "250px",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  };

  const arrowStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "20px",
  };

  return (
    <Box>
      <AppBarComponent onMenuClick={toggleDrawer} />
      <Sidebar open={isDrawerOpen} onClose={toggleDrawer} />
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#1a1c2c" }}>
        <h1
          style={{
            color: "#79c2c2",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Dashboard
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {cardData.map((card, index) => (
            <Paper
              key={index}
              style={cardStyle}
              onClick={() => card.link && navigate(card.link)}
            >
              {card.link && <span style={arrowStyle}>→</span>}
              {card.title}
              {card.isChart ? (
                <div
                  style={{
                    fontWeight: "normal",
                    fontSize: "16px",
                    marginTop: "10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "black",
                      margin: "0 auto",
                    }}
                  ></div>
                </div>
              ) : card.isEarnings ? (
                <div style={{ marginTop: "10px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "24px" }}>
                    {card.detail.split("\n")[0]}
                  </div>
                  <div style={{ fontWeight: "normal", fontSize: "16px" }}>
                    {card.detail.split("\n")[1]}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    fontWeight: "normal",
                    fontSize: "16px",
                    marginTop: "10px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {card.detail}
                </div>
              )}
            </Paper>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
