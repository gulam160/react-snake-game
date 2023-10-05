import axios from "axios";
import React, { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

function SignInForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loginAndRecordScore } = useContext(GameContext);
  const { name, email, password } = userData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData) {
      try {
        axios
          .post("https://reqres.in/api/login", { email, password })
          .then((res) => loginAndRecordScore(res.data.token, name));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="form-container">
      <h1 className="sign-in">Sign In 👇</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button className="signin-btn" type="submit">
          Sign in
        </button>
      </form>
      <div className="credentials">
        <b>Credentials</b>
        <p>name : your name</p>
        <p>email : eve.holt@reqres.in</p>
        <p>password : citysilica</p>
      </div>
    </div>
  );
}

export default SignInForm;
