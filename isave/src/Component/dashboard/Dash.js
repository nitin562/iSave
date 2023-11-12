import React from 'react'
import "./dash.css"
import {Routes,Route} from "react-router-dom"
import Nav from '../Nav/Nav'


import Data from '../WorkArea/Data'
import View from '../viewArea/View'

export default function Dash() {
  
  return (
    <div id="dash" >
      <Nav/>
      <Routes>
        <Route path="data" element={<Data/>}/>
        <Route path="view/:id" element={<View/>}/>

      </Routes>
    </div>
  )
}
