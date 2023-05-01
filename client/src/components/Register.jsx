//child of App.js
import React, { useState } from "react";
import { createAccount } from "../api/Register";
import "../css/Register.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //form to create the account
  return (
    <>
      <h2> Register Here</h2>
      <form
        id="register"
        onSubmit={async (event) => {
          // checks for proper password
          let message;
          event.preventDefault();
          if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            alert("Password must be at least 8 characters long");
          } else if (
            !password.match(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
            )
          ) {
            setPasswordError(
              "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
            );
            alert(
              "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
            );
          } else if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            alert("Passwords do not match");
          } else {
            // Password is valid, do something here like submitting the form
            setPasswordError("");
            console.log("Password is valid");
            try {
              const result = await createAccount(
                username,
                password,
                email,
                name
              );
            } catch (err) {
              console.error(err);
              alert(message);
            } finally {
              setPassword("");
              setUsername("");
              setConfirmPassword("");
              setEmail("");
              setName("");
            }
            // console.log("navigating");
            // navigateLogin("/login");
          }
        }}
      >
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br></br>
        <br></br>
        <button name="register">Register</button>
      </form>
    </>
  );
};

export default Register;
