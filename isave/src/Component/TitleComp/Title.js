import React from 'react'
import "./title.css"
export default function Title({title,search,click}) {
  console.log(title.length)
  return (
    <div id="titleBox">
        <p>{title.length>40?title.slice(0,41)+"...":title}</p>
        {search &&<i onClick={click} className="fa-solid fa-magnifying-glass"></i>}
    </div>
  )
}
