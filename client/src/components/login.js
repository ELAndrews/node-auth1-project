import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", loginDetails)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <h2>Login Here</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          name="username"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
        />
        <input type="submit" onSubmit={handleSubmit} />
      </form>
    </div>
  );
}
