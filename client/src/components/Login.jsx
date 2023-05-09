//child of App.js
import React, { useEffect, useState } from "react";
import { userLogin } from "../api/Login";
import { useNavigate } from "react-router-dom";
import '../css/Login.css'
import useNotification from './ui/useNotification';

const Login = ({ username, setUsername }) => {
  const { toastNotify } = useNotification();

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
    const result = await userLogin({ username, password });
    console.log(result)

    if (result && result.token) {

        toastNotify("You're logged in!", "success");
        console.log("logged-in user:", username);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", username)
        localStorage.setItem("isAdmin", result.user.isAdmin)
        localStorage.setItem("user_id", result.user.id)
        navigate("/");
        } else {
          toastNotify("Invalid Credentials", "error");
        }
      } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin} id="login">
        <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required />
        </label>
        <br/>
        <br/>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <br></br>
        <br></br>
          <button formtype="login" name="login">Login</button>
      </form>
    </>
  );
};

export default Login
