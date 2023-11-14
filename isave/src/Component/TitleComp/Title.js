import React from 'react'
import "./title.css"
export default function Title({title,icon,click,clas}) {

  return (
    <div id="titleBox">
        <p>{title.length>40?title.slice(0,41)+"...":title}</p>
        {icon &&<i title={icon} onClick={click} className={clas}></i>}
    </div>
  )
}
