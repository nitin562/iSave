import React, { useState } from "react";
import BIcon from "../BIcon/BIcon";
import "./sign.css";
import { useNavigate } from "react-router-dom";
import InputB from "../InputBox/InputB";
import links from "../Links";

export default function Sign() {
  const nav = useNavigate();
  const [error, seterror] = useState([]);
  const [Name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const onchange = (e) => {
    if (e.target.type === "text") {
      setName(e.target.value);
    } else if (e.target.type === "email") {
      setemail(e.target.value);
    } else {
      setpassword(e.target.value);
    }
  };

  const onSign = async (e) => {
    e.preventDefault();
    seterror([])
    const data = {
      name: Name,
      email,
      Password: password,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      links.sign,
      options
    );
    const result = await response.json();
    if (result.success === 1) {
      // ok
      localStorage.setItem("name", result.name);
      localStorage.setItem("token", result.token);
      nav("/welcome");
    } else if (result.success === 0) {
      //error as array
      console.log(1, result);

      result.err.errors.forEach((e) => {
        // e is object with path and msg
        seterror((prev) => {
          return [...prev, { errName: e.path, errMsg:e.msg }]; //e.path="email" or "Password"
        });
      });
    } else if (result.success === -1) {
      //email is not found
      seterror((prev) => {
        return [...prev, { errName: "email",errMsg:"Email is already used" }];
      });
    } 
  };
  return (
    <div id="sign" className="scrollbar">
      <form className="signCont" onSubmit={onSign}>
        <p id="head-1">CREATE ACCOUNT</p>
        <img src={require("../Images/user.png")} alt="user" />
        <InputB
          state={Name}
          width="80%"
          change={onchange}
          type="text"
          name="name"
          err={error}
          write="Enter username"
        />
        <InputB
          width="80%"
          state={email}
          change={onchange}
          type="email"
          write="Enter Email"
          err={error}
          name="email"
        />
        <InputB
          state={password}
          width="80%"
          change={onchange}
          type="password"
          name="Password"
          err={error}
          write="Enter Password"
        />
        <div className="buttons">
          <button type="submit">Register</button>
        </div>
      </form>
      <BIcon title="Log in" clas="fa-solid fa-user" path="/" />
    </div>
  );
}
