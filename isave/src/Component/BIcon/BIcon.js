import React from "react";
import "./bicon.css"
import {useNavigate} from "react-router-dom"
export default function BIcon({path,clas,title,click}) {
  const nav=useNavigate()
  return (
    <button
      id="BIcon"
      title={title}
      onClick={() => {
        if(path){
          nav(path)
        }
        if(click){
          click()
        };
      }}
    >
      <i className={clas}></i>
    </button>
  );
}
