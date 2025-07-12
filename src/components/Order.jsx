import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Order.css";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/orders/${user.email}`);
      setOrders(res.data);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email) {
      fetchOrders();
    }
  }, [user.email]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="order-container">
      <h3>My Orders</h3>
      {orders && orders.length > 0 ? (
        <table className="order-table" border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Email</th>
              <th>Order Value</th>
              <th>Date</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.email}</td>
                <td>₹{order.orderValue}</td>
                <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : "N/A"}</td>
                <td>
                  {order.products && order.products.length > 0 ? (
                    <ul>
                      {order.products.map((prod, index) => (
                        <li key={index}>
                          {prod.name} - Qty: {prod.quantity} - Price: <b>₹{prod.price}</b>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No products"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}