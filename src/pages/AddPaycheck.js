// src/pages/AddPaycheck.js
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AppBarComponent from "../components/Appbar";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";

const AddPaycheck = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const { currentUser } = useAuth();
  const { addIncome } = useFirestore();

  // In future add frequency of occurance
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
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
      const incomeData = {
        name: formData.source,
        amount: Number(formData.amount),
        date: formData.date,
      };

      console.log(incomeData);
      await addIncome(currentUser.uid, incomeData);

      setFormData({
        source: "",
        amount: "",
        date: "",
      });

      navigate(-1);
    } catch (e) {
      console.error("Error adding income: ", e);
    }
  };

  return (
    <Box>
      <AppBarComponent onMenuClick={toggleDrawer} />
      <Sidebar open={isDrawerOpen} onClose={toggleDrawer} />
      <div style={{ display: "flex" }}>
        <Sidebar />
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
              Add a New Paycheck
            </h1>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Paycheck Source"
                name="source"
                value={formData.source}
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
              <input
                type="date"
                placeholder="Date Received"
                name="date"
                value={formData.date}
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
                Add Paycheck
              </button>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AddPaycheck;
