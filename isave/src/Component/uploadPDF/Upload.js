import React, { useRef, useState } from "react";
import InputB from "../InputBox/InputB";
import Title from "../TitleComp/Title";
import "./upload.css";
export default function Upload() {
  const [file, setfile] = useState(null);
  const imgref = useRef();
  const [key, setkey] = useState("");
  const [err, seterr] = useState([]);
  const changeKey = (e) => {
    setkey(e.target.value);
  };
  const fileSelection = (e) => {
    if (e.target.files) {
      setfile(e.target.files[0]);
      console.log(e.target.files[0]);
      setkey("")
    }
  };
  const clickRef = () => {
    imgref.current.click();
  };
  const submit=(e)=>{
    e.preventDefault()
    seterr([])
    if(!file){
      return 
    }
    if(key===""){
      seterr(prev=>[...prev,{errName:"special",errMsg:"Key cannot be empty."}])
    }
    const formData=new FormData()
    formData.append("pdfFile",file)

  }
  return (
    <div id="uploader" className="scrollbar">
      <Title title="Upload PDF" />
      <p className="notice">SAVE A PDF FILE SECURELY WITH KEY</p>
      <form className="formUpload" onSubmit={submit}>
        <img
          src={require("../Images/plus.png")}
          alt="Add file"
          onClick={clickRef}
        />
        {file && <p className="fileInfo">{file.name}</p>}
        <input
          ref={imgref}
          type="file"
          name="pdf"
          id="file"
          onChange={fileSelection}
          accept=".pdf"
        />
        {file && (
          <InputB
            write="Enter Key to secure"
            state={key}
            change={changeKey}
            err={err}
            width="90%"
            type="password"
            name="special"
          />
        )}
        <button type="submit" disabled={file === null}>
          Upload
        </button>
      </form>
    </div>
  );
}
