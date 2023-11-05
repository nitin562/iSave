import React from 'react'
import {Route,Routes} from "react-router-dom"
import Login from '../Login/Login'
import Sign from '../Sign/Sign'
import Welcome from '../Welcome/Welcome'
export default function Home() {
  return (
    <div id='Home' className='scrollbar'>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/sign" element={<Sign/>}/>
          <Route path="/welcome" element={<Welcome/>}/>



        </Routes>
    </div>
  )
}
