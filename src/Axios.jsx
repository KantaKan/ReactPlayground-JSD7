import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

function ProductCard({ product }) {
  return (
    <div className="product-card ">
      <div className="product-name">{product.name}</div>
      <img className="product-image " src={product.image} alt={product.name} />
      <div className="product-price">price: {product.price}</div>
    </div>
  );
}

function MultiActionAreaCard({ product }) {
  return (
    <Card sx={{ maxWidth: 380 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" sx={{ height: 375, objectFit: "cover" }} image={product.image} alt={product.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor nihil modi numquam?
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

function Store() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchapi = async () => {
      try {
        const respond = await axios.get("https://store-crud.onrender.com/api/product");
        setData(respond.data);
        console.log(respond.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchapi();
  }, []);

  return (
    <div className="flex flex-wrap">
      {data.map((product) => (
        <MultiActionAreaCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Store;
