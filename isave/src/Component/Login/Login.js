import React, { useState } from "react";
import "./login.css";

import BIcon from "../BIcon/BIcon";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const nav=useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const changeVal=(e)=>{
    if(e.target.id==="Email"){
      setemail(e.target.value)
    }
    else{
      setpassword(e.target.value)
    }
  }
  const loginSubmit=async(e)=>{
    e.preventDefault()
    const url="http://localhost:8000/api/auth/login"+`?email=${email}&Password=${password}`
    const response=await fetch(url)
    const result=await response.json()
    if(result.success===1){
      // ok
      localStorage.setItem("name",result.name)
      localStorage.setItem("token",result.token)
      nav("/welcome")
    }
  }
  return (
    <div id="Login" className="scrollbar">
      <form className="loginCont" onSubmit={loginSubmit}>
        <p id="head-1">LOGIN</p>
        <img src={require("../Images/user.png")} alt="user" />
        <input type="email" id="Email" placeholder="Enter Email" name="email" value={email} onChange={changeVal} />
        <input
          type="password"
          id="Password"
          name="Password"
          placeholder="Enter Password"
          value={password}
          onChange={changeVal}
        />
        <div className="buttons">
          <button type="submit">Login</button>
        </div>
      </form>
      <BIcon title="Sign in" clas="fa-solid fa-user-plus" path="/sign"/>
    </div>
  );
}
