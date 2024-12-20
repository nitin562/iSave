import React, { useEffect, useRef, useState } from "react";
import "./nav.css";
import Typed from "typed.js"
import BIcon from "../BIcon/BIcon";
import { useNavigate } from "react-router-dom";
export default function Nav() {
  const [toggle, settoggle] = useState(false);
  const span=useRef()
  const wrap2 = useRef(0);

  const nav = useNavigate();
  const onToggle = () => {
    if (toggle) {
      wrap2.current.style.left = "-80rem";
    } else {
      wrap2.current.style.left = "0rem";
    }
    settoggle((prev) => !prev);
  };
  const onCLickNav=(path)=>{
    nav(path)
    onToggle() //only works when android is there as for pc, it is static
  }
  const Logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    nav("/");
  };
  useEffect(()=>{
    const type=new Typed(span.current,{
      strings:["DigiStore","Secure","Two layer Security"],
      typeSpeed: 200,
      showCursor:false,
      startDelay:250,
      loop:true
    })
    return()=>{
      type.destroy()
    }
  })
  return (
    <div className="wrap-2" ref={wrap2}>
      <div className="type">
        <span id="typing" ref={span}></span>
        
      </div>
      <div className="user_info">
        <img id="user_nav" src={require("../Images/navUser.png")} alt="user" />
        <p>{localStorage.getItem("name")}</p>
      </div>
      <div className="menu">
        <span onClick={() => onCLickNav("data")}>
          <i className="fa-solid fa-database"></i>Your Data
        </span>
        <span onClick={() => onCLickNav("addNew")}>
          <i className="fa-solid fa-plus"></i>Add Data
        </span>
        {/* <span onClick={()=> onCLickNav("uploadFile")}>
          <i className="fa-solid fa-upload"></i>upload PDF
        </span> */}
      </div>
      <div className="logout">
        <button onClick={Logout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Log Out</span>
        </button>
      </div>
      <BIcon click={onToggle} clas="fa-solid fa-bars" title="Show menu" />
    </div>
  );
}
