import React, { useContext, useMemo } from "react";
import { AppContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "./Cart.css";

export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Calculate total order value
  const orderValue = useMemo(() => {
    return products.reduce((total, product) => {
      const qty = cart[product._id] || 0;
      return total + product.price * qty;
    }, 0);
  }, [cart, products]);

  // Increase quantity
  const increment = (id) => {
    setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 });
  };

  // Decrease quantity or remove from cart
  const decrement = (id) => {
    if (cart[id] > 1) {
      setCart({ ...cart, [id]: cart[id] - 1 });
    } else {
      const updatedCart = { ...cart };
      delete updatedCart[id];
      setCart(updatedCart);
    }
  };

  // Place the order
  const placeOrder = async () => {
    try {
      // Build products array with all details
      const productsInOrder = products
        .filter((p) => cart[p._id])
        .map((p) => ({
          productId: p._id,
          name: p.name,
          price: p.price,
          quantity: cart[p._id],
        }));

      await axios.post(`${API}/orders/new`, {
        email: user.email,
        products: productsInOrder,
        orderValue,
      });
      setCart({});
      navigate("/orders");
    } catch (error) {
      console.error("Order error:", error);
      alert("Could not place order. Please try again.");
    }
  };

  const loginToOrder = () => {
    navigate("/login");
  };

  // Get products in cart with quantity
  const cartProducts = products.filter((p) => cart[p._id]);

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      <hr />
      {cartProducts.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/">Go to Products</Link>
        </div>
      ) : (
        cartProducts.map((p) => (
          <div key={p._id} className="cart-item">
            <span className="cart-name">{p.name}</span>
            <span className="cart-price">₹{p.price}</span>
            <button
              className="cart-qty-btn"
              onClick={() => decrement(p._id)}
            >
              -
            </button>
            <span className="cart-qty">{cart[p._id]}</span>
            <button
              className="cart-qty-btn"
              onClick={() => increment(p._id)}
            >
              +
            </button>
            <span className="cart-item-total">= ₹{p.price * cart[p._id]}</span>
          </div>
        ))
      )}
      <hr />
      <h3 className="cart-total">
        Total:{" "}
        <span style={{ marginLeft: "10px" }}>₹{orderValue}</span>
      </h3>
      <hr />
      <div className="cart-actions">
        {user?.name ? (
          <button onClick={placeOrder}>Place Order</button>
        ) : (
          <button onClick={loginToOrder}>Login to Order</button>
        )}
      </div>
    </div>
  );
}