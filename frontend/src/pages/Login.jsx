import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmiteHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Unable to login");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  return (
    <form onSubmit={onSubmiteHandler} className="auth-form">
      <div>
        <p className="auth-heading">{currentState}</p>
      </div>
      {currentState === "Sign Up" ? (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Name"
          required
        />
      ) : (
        ""
      )}

      <input
        autoComplete="new-email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
        required
      />
      <input
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        required
      />
      <div className="forgot-pass">
        <p>Forgot your password?</p>
        {currentState === "Sign Up" ? (
          <p onClick={() => setCurrentState("Login")}>Login here</p>
        ) : (
          <p onClick={() => setCurrentState("Sign Up")}>Create account</p>
        )}
      </div>
      <button className="auth-button">
        {currentState === "Sign Up" ? "Sign Up" : "Login"}
      </button>
    </form>
  );
};

export default Login;
