import React,{useEffect} from "react";
import "./dash.css";
import { Routes, Route,useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";

import Data from "../WorkArea/Data";
import View from "../viewArea/View";
import AddData from "../viewArea/AddingData/AddData";
import Reset from "../QA/Reset";
import Set from "../QA/Set";
// import Upload from '../uploadPDF/Upload'

export default function Dash() {
  
  return (
    <div id="dash">
      <Nav />
      <Routes>
        <Route path="data" element={<Data />} />
        <Route path="view/:id" element={<View />} />
        <Route path="addNew" element={<AddData />} />
        <Route path="view/Reset" element={<Reset />} />
        <Route path="view/Reset/set" element={<Set />} />
        {/* <Route path="uploadFile" element={<Upload/>}/> */}
      </Routes>
    </div>
  );
}
