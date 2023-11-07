import React, { useRef, useState } from 'react'
import "./data.css"
import Title from '../TitleComp/Title'
export default function Data() {
  const search=useRef(0)
  const [showSearch, setshowSearch] = useState(false)
  const onClickingSearch=()=>{
    if(showSearch){
      search.current.style.height="0rem"
    }
    else{
      search.current.style.height="5rem"
    }
    setshowSearch(prev=>!prev)
  }
  const onSubmitSearch=(e)=>{
    e.preventDefault()
  }
  return (
    <div id="Data" className='scrollbar'>
      <Title title="YOUR DATA" search={true} click={onClickingSearch}/>
      <form className="search" ref={search} onSubmit={onSubmitSearch}>
        <input type="search" id="search" name="search" placeholder='Enter Title'/>
      </form>
    </div>
  )
}
