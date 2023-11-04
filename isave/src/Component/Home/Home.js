import React from 'react'
import {Route,Routes} from "react-router-dom"
import Login from '../Login/Login'
export default function Home() {
  return (
    <div id='Home' className='scrollbar'>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
    </div>
  )
}
