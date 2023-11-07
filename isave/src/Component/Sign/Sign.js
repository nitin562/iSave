import React, { useState } from "react";
import BIcon from "../BIcon/BIcon";
import "./sign.css";
import { useNavigate } from "react-router-dom";
import InputB from "../InputBox/InputB";

export default function Sign() {
  const nav=useNavigate()
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
    const data={
      name:Name,
      email,
      Password:password
    }
    const options={
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }
    const response=await fetch("http://localhost:8000/api/auth/sign",options)
    const result=await response.json()
    if(result.success===1){
      // ok
      localStorage.setItem("name",result.name)
      localStorage.setItem("token",result.token)
      nav("/welcome")

    }
  };
  return (
    <div id="sign" className="scrollbar">
      <form className="signCont" onSubmit={onSign}>
        <p id="head-1">CREATE ACCOUNT</p>
        <img src={require("../Images/user.png")} alt="user" />
        <InputB
          state={Name}
          change={onchange}
          type="text"
          name="user"
          write="Enter username"
        />
        <InputB
          state={email}
          change={onchange}
          type="email"
          write="Enter Email"
          name="email"
        />
        <InputB
          state={password}
          change={onchange}
          type="password"
          name="Password"
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
