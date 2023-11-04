import React from "react";
import "./login.css";
export default function Login() {
  return (
    <div id="Login" className="scrollbar">
      <form className="loginCont">
        <img src={require("../Images/user.png")} alt="user" />
        <input type="email" id="Email" placeholder="Enter Email" name="email" />
        <input
          type="password"
          id="Password"
          name="Password"
          placeholder="Enter Password"
        />
        <div className="buttons">
          <button type="submit">Login</button>
        </div>
      </form>
      <button id="Signup" title="Sign in"><i className="fa-solid fa-user-plus"></i></button>
    </div>
  );
}
