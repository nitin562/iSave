import React, { useRef, useState } from "react";
import "./nav.css";
import BIcon from "../BIcon/BIcon";
import { useNavigate } from "react-router-dom";
export default function Nav() {
  const [toggle, settoggle] = useState(false);
 
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
  const Logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    nav("/");
  };
  return (
    <div className="wrap-2" ref={wrap2}>
      <div className="user_info">
        <img id="user_nav" src={require("../Images/navUser.png")} alt="user" />
        <p>{localStorage.getItem("name")}</p>
      </div>
      <div className="menu">
        <span onClick={() => nav("data")}>
          <i className="fa-solid fa-database"></i>Your Data
        </span>
        <span>
          <i className="fa-solid fa-plus"></i>Add Data
        </span>
        <span>
          <i className="fa-solid fa-upload"></i>upload PDF
        </span>
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
