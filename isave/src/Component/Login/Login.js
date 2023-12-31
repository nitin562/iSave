import React, { useState } from "react";
import "./login.css";

import AIcon from "../BIcon/AIcon";
import { useNavigate } from "react-router-dom";
import InputB from "../InputBox/InputB";
import links from "../Links";
import Loader from "../Loading/Loader";

export default function Login() {
  const [error, seterror] = useState([])
  const [load, setload] = useState(false)
  const nav=useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const changeVal=(e)=>{
    if(e.target.type==="email"){
      setemail(e.target.value)
    }
    else{
      setpassword(e.target.value)
    }
  }
  const loginSubmit=async(e)=>{
    e.preventDefault()
    setload(true)
    seterror([])
    const url=`${links.login}?email=${email}&Password=${password}`
    const response=await fetch(url)
    const result=await response.json()
    console.log(result)
    if(result.success===1){
      // ok
      localStorage.setItem("name",result.name)
      localStorage.setItem("token",result.token)
      nav("/welcome")
    }
    else if(result.success===0){
      //error as array
    console.log(1,result)

      result.err.errors.forEach((e)=>{
        // e is object with path and msg
        seterror(prev=>{
          return [...prev,{errName:e.path,errMsg:e.msg}]  //e.path="email" or "Password"
        })
      })
    }
    else if(result.success===-1){
      //email is not found
      seterror(prev=>{
        return [...prev,{errName:"email",errMsg:"Email is not found"}]
      })
    }
    else{
      seterror(prev=>{
        return [...prev,{errName:"Password",errMsg:e.msg}]
      })
    }
    setload(false)

  }
  return (
    <div id="Login" className="scrollbar">
      <form className="loginCont" onSubmit={loginSubmit}>
        <p id="head-1">LOGIN</p>
        <img src={require("../Images/user.png")} alt="user" />
        <InputB type="email" width="80%" write="Enter Email" name="email" state={email} change={changeVal} err={error}/>
        <InputB
          type="password"
          width="80%"
          name="Password"
          write="Enter Password"
          state={password}
          change={changeVal}
          err={error}
        />
        <div className="buttons">
          <button type="submit">Login</button>
        </div>
       {load&&<Loader/>}
       {load&&<p id="Signal">Wait For a While.. It may take some moments</p>}
      </form>
      
      <AIcon title="Sign in" clas="fa-solid fa-user-plus" path="/sign"/>
    </div>
  );
}
