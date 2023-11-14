import React, { useEffect, useRef, useState } from "react";
import "./data.css";
import Title from "../TitleComp/Title";
import links from "../Links.js";
import Tile from "./Tile/Tile.js";
import { useCont } from "../Context/Context.js";
import Load from "../Loading/Load.js";
export default function Data() {
  const search = useRef(0);
  const [load, setload] = useState(false)
  const [notes, setnotes] = useState([]);
  const [showSearch, setshowSearch] = useState(false);
  const cont=useCont()
  const getNotes = async () => {
    setload(true)
    const url = links.getNotes + `?token=${localStorage.getItem("token")}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.success === 1) {
      setnotes(result.notes);
      cont.setstate((prev)=>{
        return {...prev,notes:result.notes}
      })
      setload(false)
      console.log(result.notes);
    }
  };
  const onClickingSearch = () => {
    if (showSearch) {
      search.current.style.height = "0rem";
    } else {
      search.current.style.height = "5rem";
    }
    setshowSearch((prev) => !prev);
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <div id="Data" className="scrollbar">
      
      <Title title="YOUR DATA" clas="fa-solid fa-magnifying-glass" icon="search" click={onClickingSearch} />
      <form className="search" ref={search} onSubmit={onSubmitSearch}>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Enter Title"
        />
      </form>
      {load&&<Load/>}
      {!load&&<div className="notes">
        {notes.map((e) => {
          return <Tile key={e._id} title={e.title} time={e.date} id={e._id} />;
        })}
      </div>}
    </div>
  );
}
