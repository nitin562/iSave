import React, { useRef,useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Typed from "typed.js"
import "./welcome.css";
export default function Welcome() {
  const span = useRef(0);
  const nav=useNavigate()
  useEffect(() => {
    const typed = new Typed(span.current, {
      strings: [`${localStorage.getItem("name")}`],
      typeSpeed: 200,
      showCursor:false,
      startDelay:250
    });
    setTimeout(()=>{
      nav("/dashboard/data")
    },[3000])
    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  return (
    <div id="welcome">
      <p>WELCOME</p>
      <span ref={span}></span>
    </div>
  );
}
