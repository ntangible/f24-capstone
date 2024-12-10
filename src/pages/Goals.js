// src/pages/ViewGoals.js
import React, { useEffect, useState } from "react";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";
import EditFormDialog from "../components/EditFormDialog";
import { Paper } from "@mui/material";

const ViewGoals = () => {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getUserGoals, updateUserGoal } = useFirestore();
  const { currentUser } = useAuth();

  const fetchUserGoals = async () => {
    if (currentUser) {
      try {
        const goalArr = await getUserGoals(currentUser.uid, 0);
        if (goalArr) setGoals(goalArr);
      } catch (e) {
        // ADD AN ALERT TOAST
        alert("Failed to fetch user goals");
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchUserGoals();
  }, []);

  const handleCardClick = (goal) => {
    setSelectedGoal(goal);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedGoal(null);
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = async (updatedGoal) => {
    try {
      await updateUserGoal(currentUser.uid, updatedGoal.id, updatedGoal);

      fetchUserGoals();
    } catch (e) {
      alert("Failed to update goal");
      console.log(e);
    }
    handleDialogClose();
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
            goals.map((goal) => (
              <Paper
                key={goal.id}
                elevation={3}
                sx={{
                  backgroundColor: "#f1ede3",
                  color: "#003c40",
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
                  margin: "10px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleCardClick(goal)}
              >
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
                  <br />
                  Priority: {goal.priority}
                </div>
              </Paper>
            ))
          ) : (
            <h2 style={{ color: "#79c2c2" }}>You have no goals created yet</h2>
          )}
        </div>
      </div>

      {selectedGoal && (
        <EditFormDialog
          open={isDialogOpen}
          handleClose={handleDialogClose}
          itemData={selectedGoal}
          handleSubmit={handleDialogSubmit}
        />
      )}
    </div>
  );
};

export default ViewGoals;
