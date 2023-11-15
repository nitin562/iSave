import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addData.css";
import Title from "../../TitleComp/Title";
import InputB from "../../InputBox/InputB";
import links from "../../Links";
import Loader from "../../Loading/Loader";
export default function AddData() {
  const nav = useNavigate();
  const fileRef = useRef(0);
  const [title, settitle] = useState("");
  const [key, setkey] = useState("");
  const [file, setfile] = useState(null);
  const [selected, setselected] = useState(false);
  const [note, setnote] = useState("");
  const [err, seterr] = useState([]);
  const [Load, setLoad] = useState(false)
  const onFileSelect = (e) => {
    seterr([]);
    console.log(e.target.files, 1);
    setfile(e.target.files[0]);
    e.target.value=""
    setselected(true);
  };
  const OnTitleChange = (e) => {
    if (e.target.name === "title") {
      settitle(e.target.value);
    } else {
      setkey(e.target.value);
    }
  };
  const extract = async () => {
    
    if (file) {
        setLoad(true)
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
        setnote((prev) => prev + result.text);
      } else {
        seterr((prev) => {
          return [
            ...prev,
            { errName: "title", errMsg: "Uploading Problem- please Try again" },
          ];
        });
      }
      setfile(null);
      setselected(false);
    }
    setLoad(false)
  };
  const submit = async (e) => {
    e.preventDefault();
    setLoad(true)
    if (title === "") {
      seterr((prev) => [
        ...prev,
        { errName: "title", errMsg: "Title is required" },
      ]);
    }
    if (key === "") {
      seterr((prev) => [
        ...prev,
        { errName: "special", errMsg: "key is required" },
      ]);
    }
    if (title === "" || key === "") {
      return;
    }
 
    const url = links.addNote;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        title,
        note,
        special: key,
      }),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.success === 1) {
      nav("/dashboard/data");
    } else {
      console.log(result.error);
    }
    setLoad(false)
  };
  useEffect(() => {
    if (selected) {
      extract();
    }
  }, [selected]);
  return (
    <div id="field" className="scrollbar">
      <Title
        title="New Entry"
        icon="upload text using pdf or txt"
        clas="fa-solid fa-upload"
        click={() => fileRef.current.click()}
      />
      <input
        type="file"
        accept=".pdf,.txt"
        id="pdf"
        onChange={onFileSelect}
        ref={fileRef}
      />
      <form className="Info" onSubmit={submit}>
        <InputB
          type="text"
          name="title"
          state={title}
          write="Enter Title"
          change={OnTitleChange}
          width="90%"
          err={err}
        />
        <textarea
          value={note}
          onChange={(e) => setnote(e.target.value)}
          className="scrollbar"
          name="note"
          id="note"
        ></textarea>
        <div className="keybox">
          <InputB
            type="password"
            name="special"
            state={key}
            write="Enter key to save"
            change={OnTitleChange}
            width="80%"
            err={err}
          />
          {Load&&<Loader/>}
          <button type="submit">
            <i class="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
