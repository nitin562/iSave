import React from 'react'
import {Route,Routes} from "react-router-dom"
import Login from '../Login/Login'
import Sign from '../Sign/Sign'
import Welcome from '../Welcome/Welcome'
import Dash from '../dashboard/Dash'
import View from '../viewArea/View'
import QA from '../QA/QA'
export default function Home() {
  return (
    <div id='Home' className='scrollbar'>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/sign" element={<Sign/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/qa" element={<QA/>}/>

          <Route path="/dashboard/*" element={<Dash/>}/>
          {/* <Route path="/view" element={<View/>}/> */}




        </Routes>
    </div>
  )
}
