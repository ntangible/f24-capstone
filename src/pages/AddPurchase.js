// src/pages/AddPurchase.js
import { useState } from "react";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddPurchase = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addUncatSpending } = useFirestore();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    merchant: "",
    category: "",
    type: "voluntary",
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
      const expenseData = {
        name: formData.name,
        amount: Number(formData.amount),
        merchant: formData.merchant,
        category: formData.category,
        date: formData.date,
      };

      await addUncatSpending(currentUser.uid, expenseData);

      // Clear form
      setFormData({
        name: "",
        amount: "",
        merchant: "",
        category: "",
        type: "voluntary",
        date: "",
      });

      // Navigate to previous page
      navigate(-1);
    } catch (e) {
      console.error("Error adding purchase: ", e);
    }
  };

  return (
    <Box>
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
              Add a New Purchase
            </h1>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Item Name"
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
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Amount"
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
                type="text"
                name="merchant"
                value={formData.merchant}
                onChange={handleInputChange}
                placeholder="Merchant"
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
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Category"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  fontSize: "16px",
                  outline: "none",
                }}
                required
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  fontSize: "16px",
                  outline: "none",
                }}
              >
                <option value="voluntary">Voluntary</option>
                <option value="necessary">Necessary</option>
              </select>
              <input
                type="date"
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
                Add Purchase
              </button>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AddPurchase;
