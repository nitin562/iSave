import React, { useEffect, useState } from 'react'
import Title from "../TitleComp/Title"
import "./Qa.css"
import links from '../Links'
import { useNavigate } from 'react-router-dom'
import Load from '../Loading/Load'
export default function () {
  const [ques, setques] = useState("")
  const [ans, setans] = useState("")
  const [err, seterr] = useState(null)
  const [load, setload] = useState(false)
  const nav=useNavigate()
  const fetchQuestion=async()=>{
    setload(true)
    const url=`${links.Q}?token=${localStorage.getItem("token")}`
    const response=await fetch(url)
    const result=await response.json()
    if(result.success===1){
      setques(result.Ques)
    }
    setload(false)
  }
  const submit=async(e)=>{
    e.preventDefault()
    setload(true)
    if(ans===""){
      seterr("Answer can't be empty.")
      return
    }
    const url=`${links.A}?token=${localStorage.getItem("token")}&ANS=${ans}`
    alert(url)
    const response=await fetch(url)
    const result=await response.json()
    if(result.success===1){
      if(result.correct===true){
        localStorage.setItem("AccessToChange",true)
        nav("/dashboard/view/Reset/set")
      }
      else{
        seterr("Answer is not correct.")
      }
    }
    else{
      seterr("Some Server Side problem occur, try again later")
    }
    setload(false)
  }
  useEffect(()=>{
    fetchQuestion()
  },[])
  return (
    <div id='reset'>
        <Title title={localStorage.getItem("selectedTitle")}/>
        {load&&<Load/>}
        {!load&&<form className="ques_ans" onSubmit={submit}>
          <p className="ques"><span>Q</span>{ques}</p>
          <textarea className='scrollbar' name="ans" id="ans" placeholder='Enter Answer here'value={ans} onChange={(e)=>setans(e.target.value)} autoFocus></textarea>
          {err&&<p id="Signal" style={{color:"red"}} >{err}</p>}
          <button type="submit"><i className="fa-solid fa-check"></i></button>

        </form>}
    </div>
  )
}
