import React from 'react'
import "./tile.css"
import { useNavigate } from 'react-router-dom'
export default function Tile({title,time,id}) {
    const createDate=(d)=>{
        let date=new Date(d)
        return date.toLocaleDateString()+" "+date.toLocaleTimeString()
    }
    const nav=useNavigate()
    const GoToView=()=>{
      localStorage.setItem("selected",id)
      nav(`/dashboard/view/${id}`)
    }
  return (
    <div id="Tile" onClick={GoToView}>
        <p>{title.length>15?title.slice(0,16)+"...":title}</p>
        <div className="date">
            <p><i className="fa-solid fa-clock"></i>{createDate(time)}</p>
        </div>
    </div>
  )
}
