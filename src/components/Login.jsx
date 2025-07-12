import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const [loginData, setLoginData] = useState({ email: "", pass: "" });
  const Navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL + "/users/login";
      console.log("Login API URL:", apiUrl);
      console.log("Login data:", loginData);
      const res = await axios.post(apiUrl, loginData);

      if (res.data.message) {
        setMsg(res.data.message);
      } else {
        setMsg("Welcome " + res.data.name);
        setUser({ ...res.data, token: "123" });
        Navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMsg("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h3>Login</h3>
      {msg && <p className="login-message">{msg}</p>}
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <p>
          <input
            type="text"
            placeholder="Email address"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            value={loginData.pass}
            onChange={(e) =>
              setLoginData({ ...loginData, pass: e.target.value })
            }
          />
        </p>
        <button type="submit">Submit</button>
      </form>
      <div className="register-link">
        New user? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
