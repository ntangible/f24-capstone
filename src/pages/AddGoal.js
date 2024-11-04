// src/pages/AddGoal.js
import { useState } from "react";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import AppBarComponent from "../components/Appbar";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddGoal = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const { currentUser } = useAuth();
  const { addUserGoal } = useFirestore();

  // Potentially add expected or intended completion date specified by user
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    term: "long",
    priority: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const goalData = {
        name: formData.name,
        amount: Number(formData.amount),
        term: formData.term,
        priority: formData.priority,
      };

      await addUserGoal(currentUser.uid, goalData);

      setFormData({
        name: "",
        amount: "",
        term: "long",
        priority: "",
      });
      navigate(-1);
    } catch (e) {
      console.error("Error adding goal: ", e);
    }
  };

  return (
    <Box>
      <AppBarComponent onMenuClick={toggleDrawer} />
      <Sidebar open={isDrawerOpen} onClose={toggleDrawer} />
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#1a1c2c",
            color: "#79c2c2",
          }}
        >
          <div style={{ width: "320px", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Add a New Goal
            </h1>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Goal Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  fontSize: "16px",
                  outline: "none",
                }}
                required
              />
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  fontSize: "16px",
                  outline: "none",
                }}
                required
              />
              <label
                style={{
                  fontWeight: "bold",
                  color: "#79c2c2",
                  textAlign: "left",
                  fontSize: "14px",
                }}
              >
                Choose a goal length:
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleInputChange}
                  style={{
                    marginLeft: "5px",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "none",
                    fontSize: "14px",
                    outline: "none",
                  }}
                >
                  <option value="long">Long Term</option>
                  <option value="short">Short Term</option>
                </select>
              </label>
              <label
                style={{
                  fontWeight: "bold",
                  color: "#79c2c2",
                  textAlign: "left",
                  fontSize: "14px",
                }}
              >
                Priority (Between 1 and 3):
                <input
                  type="range"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  min="1"
                  max="3"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                  }}
                />
              </label>
              <button
                type="submit"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#4bb9b9",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add Goal
              </button>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AddGoal;
