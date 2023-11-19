import React, { useState } from "react";
import InputB from "../InputBox/InputB";
import "./set.css";
import Title from "../TitleComp/Title";
import links from "../Links";
import { useNavigate } from "react-router-dom";
import Load from "../Loading/Load";
export default function Set() {
  const [err, seterr] = useState([]);
  const [key, setkey] = useState("");
  const [load, setload] = useState(false);
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setload(true);
    seterr([]);
    if (key === "") {
      seterr((prev) => [
        ...prev,
        { errName: "special", errMsg: "New Key cannot be empty" },
      ]);
      return;
    }
    const url = links.changeKey;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        id: localStorage.getItem("selected"),
        special: key,
      }),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    if (result.success === 1) {
      nav("/dashboard/data");
    } else {
      seterr("Problem during updation, try again later");
    }
    setload(true);
  };
  return (
    <div id="set" className="scrollbar">
      <Title title="Reset Key" />
      {load && <Load />}

      <form className="main_set" onSubmit={submit}>
        <InputB
          write="Enter New Key"
          state={key}
          err={err}
          change={(e) => setkey(e.target.value)}
          type="password"
          name="key"
        />

        <button type="submit">RESET</button>
      </form>
    </div>
  );
}
