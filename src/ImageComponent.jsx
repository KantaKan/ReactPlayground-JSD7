import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axios from "axios";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomImageList() {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchapi = async () => {
      setLoading(true);
      try {
        const respond = await axios.get("https://store-crud.onrender.com/api/product");
        setItemData(respond.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchapi();
  }, []);

  return (
    <ImageList sx={{ width: 500, height: 450 }} variant="quilted" cols={4} rowHeight={121}>
      {itemData.map((item) => (
        <ImageListItem key={item.image} cols={item.cols || 1} rows={item.rows || 1}>
          <img {...srcset(item.image, 121, item.rows, item.cols)} alt={item.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
