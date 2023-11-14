import React, { useState } from 'react'
import "./save.css"
import links from '../../Links'
import InputB from '../../InputBox/InputB'
import {useNavigate} from "react-router-dom"
export default function Save({note,showSelf,textChange}) {
    const nav=useNavigate()
    const [key, setkey] = useState("")
    const [err, seterr] = useState([])
    const onSubmit=async(e)=>{
        e.preventDefault()
        const url=links.updateNote;
        const options={
          method:"PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            noteId:localStorage.getItem("selected"),
            note,
            special:key
          })
        }
        const response=await fetch(url,options)
        const result=await response.json()
        if(result.success===1){
          nav("/dashboard/data")
          textChange(false)
          showSelf(false)
        }
        else{
          seterr([{errName:"special",errMsg:"Please try Again"}])
        }
    }
  return (
    <div id="save">
        <form className="saveBox" onSubmit={onSubmit}>
            
            <InputB type="password" name="special" write='Save with any Speciak key' state={key} change={(e)=>setkey(e.target.value)} width="90%" err={err}/>
        </form>
    </div>
  )
}
