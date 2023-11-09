import React from 'react'
import "./inputB.css"
export default function InputB({type,name,change,state,write,width,err}) {
  return (
    <div className='inputB' style={width&&{width}}>
      <input type={type} className="input"  placeholder={write} name={name} value={state} onChange={change} />
      {
        err.map((e,i)=>{
          if(e.errName===name){
            return <p>{e.errMsg}</p>
          }
        })
      }
    </div>
  )
}
