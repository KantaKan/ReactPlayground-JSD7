import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper, Avatar, useTheme, Snackbar, Alert } from "@mui/material";

const FormPost = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    quantity: "",
    price: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "image") {
      setImagePreview(value);
    }
    setSnackbar({
      open: true,
      message: `${name.charAt(0).toUpperCase() + name.slice(1)} updated`,
      severity: "info",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://store-crud.onrender.com/api/product", formData);
      console.log("Data submitted:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const theme = useTheme();

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        margin: "0 auto",
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add Product
      </Typography>
      <TextField fullWidth label="Name" variant="outlined" name="name" value={formData.name} onChange={handleChange} required />
      <TextField fullWidth label="Image URL" variant="outlined" name="image" value={formData.image} onChange={handleChange} required />
      <TextField fullWidth label="Price" variant="outlined" name="price" value={formData.price} onChange={handleChange} required />
      <TextField fullWidth label="Quantity" variant="outlined" type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
      <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: "center", mt: 2 }}>
        Submit
      </Button>
      {imagePreview && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Image Preview:
          </Typography>
          <Avatar src={imagePreview} alt="Preview" sx={{ width: 340, height: 325 }} />
        </Box>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FormPost;
