// src/pages/ViewGoals.js
import React, { useEffect, useState } from "react";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";

const ViewGoals = () => {
  const [goals, setGoals] = useState([]);
  const { getUserGoals } = useFirestore();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserGoals = async () => {
      if (currentUser) {
        try {
          const goalArr = await getUserGoals(currentUser.uid, "all");
          if (goalArr) setGoals(goalArr);
        } catch (e) {
          // ADD AN ALERT TOAST
          alert("Failed to fetch user goals");
          console.log(e);
        }
      }
    };
    fetchUserGoals();
  }, [currentUser, getUserGoals]);

  const cardStyle = {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "18px",
    width: "250px",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "10px",
  };

  return (
    <div style={{ display: "flex", minHeight: "100%" }}>
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#1a1c2c" }}>
        <h1
          style={{
            color: "#79c2c2",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Your Goals
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {goals.length !== 0 ? (
            goals.map((goal, index) => (
              <div key={index} style={cardStyle}>
                {goal.name}
                <div
                  style={{
                    fontWeight: "normal",
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                >
                  Saved: {goal.saved}
                  <br />
                  Target: ${goal.amount}
                  <br />
                  Term: {goal.term}
                </div>
              </div>
            ))
          ) : (
            <h2>You have no goals created yet</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewGoals;
