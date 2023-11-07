import React from 'react'
import {Route,Routes} from "react-router-dom"
import Login from '../Login/Login'
import Sign from '../Sign/Sign'
import Welcome from '../Welcome/Welcome'
import Dash from '../dashboard/Dash'
export default function Home() {
  return (
    <div id='Home' className='scrollbar'>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/sign" element={<Sign/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/dashboard/*" element={<Dash/>}/>




        </Routes>
    </div>
  )
}
