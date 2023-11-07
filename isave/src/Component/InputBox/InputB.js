import React from 'react'
import "./inputB.css"
export default function InputB({type,name,change,state,write}) {
  return (
    <input type={type} id="input" placeholder={write} name={name} value={state} onChange={change} />
  )
}
