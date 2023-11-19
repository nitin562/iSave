import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import Title from "../TitleComp/Title"
import InputB from "../InputBox/InputB"
import Loader from "../Loading/Loader"
import "./Qa.css";
import links from "../Links";
export default function QA() {
    const nav=useNavigate()
    const [ques, setQues] = useState("")
    const [answer, setAnswer] = useState("")
    const [retype, setRetype] = useState("")
    const [load, setLoad] = useState(false)
    const [err, seterr] = useState([])
    const OnChange=(e)=>{
        if(e.target.name==="ques"){
            setQues(e.target.value)
        }
        else if(e.target.name==="ans"){
            setAnswer(e.target.value)
        }
        else{
            setRetype(e.target.value)
        }
    }
    const submit=async(e)=>{
        e.preventDefault()
        setLoad(true)
        seterr([])
        let stop=false
        if(answer!==retype){
            seterr((prev)=>[...prev,{errName:"ReAns",errMsg:"Answer is not matched"}])
            stop=true
        }
        if(ques===""){
            seterr((prev)=>[...prev,{errName:"ques",errMsg:"Question is empty"}])
            stop=true 
        }
        if(answer===""){
            seterr((prev)=>[...prev,{errName:"ans",errMsg:"Answer is empty"}]) 
            stop=true
        }
        if(stop){
            return
        }
        const url=links.QA;
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                token:localStorage.getItem("token"),
                ques,
                ans:answer
            })
        }
        const response=await fetch(url,options)
        const result=await response.json()
        if(result.success===1){
            nav("/dashboard")
        }
        else if(result.success===-1){
            seterr((prev)=>[...prev,{errName:"ques",errMsg:result.msg}])
        }
        else if(result.success===-2){
            seterr((prev)=>[...prev,{errName:"ans",errMsg:result.msg}])
        }
        else{
            seterr((prev)=>[...prev,{errName:"ques",errMsg:"Server is down, please try again"}])
        }
        setLoad(false)

        
    }
  return (
    <div id="QA" className="scrollbar">
      <Title title="QA"/>
      <form className="main" onSubmit={submit}>
        <InputB type="text" name="ques" write="Enter Security Question" state={ques} err={err} change={OnChange}/>
        <InputB type="password" name="ans" write="Enter Security Answer" state={answer} err={err} change={OnChange}/>
        <InputB type="password" name="ReAns" write="Rewrite Answer" state={retype} err={err} change={OnChange}/>
        <button id="submit" type="submit"><i className="fa-solid fa-floppy-disk"></i></button>
        {load&&<Loader/>}
        {load&&<p id="Signal">Wait for while</p>}

      </form>
    </div>
  );
}
