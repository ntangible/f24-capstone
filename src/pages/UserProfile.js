// src/pages/UserProfile.js
import { useState } from "react";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";
import { Box } from "@mui/material";

const UserProfile = () => {
  const { updateUser } = useFirestore();
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Updated Information:", { name, username, dob });
    const userData = {
      name: name,
      username: username,
      dob: dob,
    };

    try {
      await updateUser(currentUser.user.uid, userData);
    } catch (e) {
      // ADD AN ALERT TOAST
      console.error("Error updating user info, ", e);
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
          <div style={{ width: "300px", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              User Profile Settings
            </h1>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  fontSize: "16px",
                  outline: "none",
                }}
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  fontSize: "16px",
                  outline: "none",
                }}
              />
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  fontSize: "16px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                onClick={handleSubmit}
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
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default UserProfile;
