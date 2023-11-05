import React from "react";
import "./bicon.css"
import {useNavigate} from "react-router-dom"
export default function BIcon({path,clas,title}) {
  const nav=useNavigate()
  return (
    <button
      id="BIcon"
      title={title}
      onClick={() => {
        nav(path);
      }}
    >
      <i className={clas}></i>
    </button>
  );
}
