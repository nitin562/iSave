import React from 'react'
import "./title.css"
export default function Title({title,search,click}) {
  return (
    <div id="titleBox">
        <p>{title}</p>
        {search &&<i onClick={click} className="fa-solid fa-magnifying-glass"></i>}
    </div>
  )
}
