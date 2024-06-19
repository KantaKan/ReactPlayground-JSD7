import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Alert, Box, Button, CardActionArea, CardActions, CircularProgress, Fab, Modal, Snackbar, TextField } from "@mui/material";
import { Link } from "react-router-dom";

function MultiActionAreaCard({ product, onUpdate, onDelete }) {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`https://store-crud.onrender.com/api/product/${editedProduct._id}`, editedProduct);
      if (response.status === 200) {
        setSnackMessage("Product updated successfully!");
        setSnackOpen(true);
        onUpdate(editedProduct);
      }
      handleClose();
    } catch (error) {
      setSnackMessage("Error editing product.");
      setSnackOpen(true);
      console.error("Error editing product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://store-crud.onrender.com/api/product/${editedProduct._id}`);
      setSnackMessage("Product deleted successfully!");
      setSnackOpen(true);
      onDelete(editedProduct._id);
    } catch (error) {
      setSnackMessage("Error deleting product.");
      setSnackOpen(true);
      console.error("Error deleting product:", error);
    }
  };

  const handleChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Card sx={{ maxWidth: 450, height: "100%", display: "flex", flexDirection: "column", width: "100%", flexWrap: "wrap", justifyContent: "center", margin: "auto" }}>
      <CardActionArea>
        <CardMedia component="img" height="140" sx={{ height: 375, objectFit: "cover" }} image={product.image} alt={product.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description || "No description"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleOpen}>
          Edit
        </Button>
        <Button size="small" color="primary" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>

      <Modal open={open} onClose={handleClose} aria-labelledby="edit-modal-title" aria-describedby="edit-modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="edit-modal-title" variant="h6" component="h2" gutterBottom>
            Edit Product
          </Typography>
          <TextField fullWidth margin="normal" id="name" label="Name" value={editedProduct.name} onChange={handleChange} />
          <TextField fullWidth margin="normal" id="description" label="Description" value={editedProduct.description} onChange={handleChange} />
          <TextField fullWidth margin="normal" id="quantity" label="Quantity" type="number" value={editedProduct.quantity} onChange={handleChange} />
          <TextField fullWidth margin="normal" id="price" label="Price" type="number" step="0.01" value={editedProduct.price} onChange={handleChange} />
          <TextField fullWidth margin="normal" id="image" label="Image URL" value={editedProduct.image} onChange={handleChange} />
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Save Changes
          </Button>
          <Button variant="contained" onClick={handleClose} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity={snackMessage.startsWith("Error") ? "error" : "success"}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}

function Store() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchapi = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://store-crud.onrender.com/api/product");
        setData(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchapi();
  }, []);

  const handleUpdate = (updatedProduct) => {
    setData((prevData) => prevData.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
  };

  const handleDelete = (productId) => {
    setData((prevData) => prevData.filter((product) => product._id !== productId));
  };

  return (
    <div className="product-list" style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: 16, padding: 16 }}>
      {loading ? (
        <div className="loading-indicator" style={{ textAlign: "center", marginTop: "50px" }}>
          <CircularProgress />
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
            Loading products...
          </Typography>
        </div>
      ) : (
        data.map((product) => <MultiActionAreaCard key={product._id} product={product} onUpdate={handleUpdate} onDelete={handleDelete} />)
      )}
      <div className="sticky bottom-14">
        <Link to="/form">
          <Fab color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </div>
  );
}

export default Store;
