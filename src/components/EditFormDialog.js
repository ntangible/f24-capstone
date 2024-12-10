import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Slider,
  Box,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

const EditFormDialog = ({ open, handleClose, itemData, handleSubmit }) => {
  const [formValues, setFormValues] = useState({ ...itemData });
  const [fieldError, setFieldError] = useState({});
  const [disableSave, setDisableSave] = useState(false);

  const validateInput = (key, value) => {
    if (key.toLowerCase() === "amount") {
      if (isNaN(value) || value.trim() === "") {
        setDisableSave(true);
        return { error: true, message: "Value must be a number." };
      }
    }
    setDisableSave(false);
    return { error: false, message: "" };
  };

  const handleInputChange = (key, value) => {
    const validationError = validateInput(key, value);

    setFieldError((prevErrors) => ({
      ...prevErrors,
      [key]: validationError,
    }));

    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  // Submit updated form values
  const handleFormSubmit = () => {
    handleSubmit(formValues);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#f1ede3",
          borderRadius: "10px",
          color: "#003c40",
          fontWeight: "bold",
        },
      }}
    >
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        {Object.keys(formValues)
          .filter(function (val) {
            if (val.toLowerCase() === "id") return false;
            return true;
          })
          .map((key) => {
            if (key.toLowerCase() === "term")
              return (
                <TextField
                  key={key}
                  select
                  label="TERM"
                  value={formValues[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                >
                  <MenuItem value="short">SHORT</MenuItem>
                  <MenuItem value="long">LONG</MenuItem>
                </TextField>
              );
            else if (key.toLowerCase() === "priority")
              return (
                <Box key={key}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel shrink>PRIORITY</InputLabel>
                    <Slider
                      value={Number(formValues[key])}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      step={1}
                      marks={[
                        { value: 1, label: "1" },
                        { value: 2, label: "2" },
                        { value: 3, label: "3" },
                      ]}
                      min={1}
                      max={3}
                    />
                  </FormControl>
                </Box>
              );
            else
              return (
                <TextField
                  key={key}
                  label={key.toUpperCase()}
                  value={formValues[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                  error={fieldError[key] ? fieldError[key].error : false}
                  helperText={fieldError[key] ? fieldError[key].message : ""}
                />
              );
          })}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ color: "#003c40", fontWeight: "bold" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          disabled={disableSave}
          sx={{ color: "#003c40", fontWeight: "bold" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFormDialog;
