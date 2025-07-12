import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Product.css";

export default function Product() {
  const { user, products, setProducts, cart, setCart } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;
  const [showPopup, setShowPopup] = useState(false);

  // Load products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products/all`);
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div>
      <div className="welcome-msg">
        Welcome {user?.name || "Guest"}!
      </div>
      <div className="App-Product-Row">
        {products?.map((p) => (
          <div key={p._id} className="product-box">
            {p.img && (
              <img
                src={p.img}
                alt={p.name}
                className="product-img"
                style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 16px auto", display: "block" }}
              />
            )}
            <h3>{p.name}</h3>
            <h4>₹{p.price}</h4>
            <button onClick={() => addToCart(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
      {showPopup && <div className="popup">Product added to cart!</div>}
    </div>
  );
}