import React, { useState } from "react";

const Login = () => {
  // todo change backend to swap require of username/fullname
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const login = () => {
    console.log("logged in!");
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={login}>
        <label htmlFor="name">Name </label>
        <input type="text" value={name}></input>
        <label htmlFor="name">Email </label>
        <input type="text" value={email}></input>
        <label htmlFor="name">Password </label>
        <input type="text" value={password}></input>
        <label htmlFor="name">Confirm Password </label>
        <input type="text" value={confirmPassword}></input>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Login;
