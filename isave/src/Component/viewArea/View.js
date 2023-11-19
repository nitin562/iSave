import React, { useEffect, useRef, useState } from "react";
import "./view.css";
import { useCont } from "../Context/Context";
import Title from "../TitleComp/Title";
import InputB from "../InputBox/InputB";
import links from "../Links";
import Save from "./Save/Save";
import Loader from "../Loading/Loader";
import { useNavigate } from "react-router-dom";
export default function View() {
  const cont = useCont();
  const prev = useRef(0);
  const nav = useNavigate();
  const id = localStorage.getItem("selected");
  const [title, settitle] = useState("");
  const [note, setNote] = useState("");
  const [decode, setDecode] = useState(false);
  const [special, setspecial] = useState("");
  const [load, setload] = useState(false);
  const [error, seterror] = useState([]);
  const [textChange, settextChange] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [file, setfile] = useState(null)
  const fileTaker = useRef()
  const [selected, setselected] = useState(false)
  const onSpecialChange = (e) => {
    if (decode) {
      return;
    }
    if (e.target.name === "special") {
      setspecial(e.target.value);
    }
  };
  useEffect(() => {
    cont.state.notes.forEach((e) => {
      if (e._id === id) {
        settitle(e.title);
        setNote(e.encodedData);
        localStorage.setItem("eData",e.encodedData)
        prev.current = e.encodedData;
      }
    });
  
    if(cont.state.notes.length===0){
      settitle(localStorage.getItem("selectedTitle"))
      setNote(localStorage.getItem("eData"))
    }
  }, []);
  const change = (e) => {
    if (!textChange) {
      settextChange(true);
    }
    setNote(e.target.value);
  };
  const DecodeWithSpecial = async (e) => {
    e.preventDefault();
    setload(true);
    const url = links.Decode;
    seterror([]);
    const body = {
      token: localStorage.getItem("token"),
      eNote: note,
      special,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.success === 1) {
      setNote(result.note);
      setDecode(true);
      setspecial("");
      settextChange(false);
    } else {
      seterror([{ errName: "special", errMsg: result.msg }]);
    }
    setload(false);
  };
  const onReverse = () => {
    if (textChange) {
      setShowSave(true);
    } else {
      setNote(prev.current);
    }
    setDecode(false);
  };
  const navToResetPage = () => {
    nav("/dashboard/view/Reset");
  };
  const fileSelection=(e)=>{
    seterror([])
    if(e.target.files){
      setfile(e.target.files[0])
      e.target.value=""
      setselected(true)
    }
  }
  const extract = async () => {
    
    if (file) {
        setload(true)
      const url = links.extract;
      const formData = new FormData();
      console.log(file);
      formData.append("pdfFile", file);
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.success === 1) {
        setNote((prev) => prev + result.text);
      } else {
        seterror((prev) => {
          return [
            ...prev,
            { errName: "special", errMsg: "Uploading Problem- please Try again" },
          ];
        });
      }
      setfile(null);
      setselected(false);
    }
    setload(false)
  };
  useEffect(()=>{
    if(selected){
      extract()
    }
  },[selected])
  
  return (
    <div id="view" className="scrollbar">
      <Title title={title} text="Reset key" click={navToResetPage} />
      {load && <Loader />}

      <div className="info">
        <form className="special" onSubmit={DecodeWithSpecial}>
          <InputB
            type="password"
            name="special"
            write="Enter Special String"
            change={onSpecialChange}
            state={special}
            err={error}
            width="80%"
          />
          <div className="btn">
            <button type="button" disabled={decode===false} title="upload" onClick={()=>fileTaker.current.click()}>
              <i className="fa-solid fa-upload"></i>
            </button>
            <button
              onClick={onReverse}
              type="button"
              title="Reverse"
              disabled={!decode}
            >
              <i className="fa-solid fa-backward"></i>
            </button>
          </div>
          <input ref={fileTaker} type="file" name="file" id="file" onChange={fileSelection} accept=".pdf,.txt"/>
        </form>
        <textarea
          className="scrollbar"
          style={{ filter: decode ? "none" : "blur(0.4rem)" }}
          disabled={!decode}
          onChange={change}
          type="text"
          value={note}
        />
      </div>

      {showSave && (
        <Save note={note} textChange={settextChange} showSelf={setShowSave} />
      )}
    </div>
  );
}
