import React from 'react'
import "./title.css"
export default function Title({title,icon,click,clas,text}) {

  return (
    <div id="titleBox">
        <p>{title.length>15?title.slice(0,16)+"...":title}</p>
        {icon &&<i title={icon} onClick={click} className={clas}></i>}
        {text&&<span onClick={click?click:()=>{}}>{text}</span>}
    </div>
  )
}
