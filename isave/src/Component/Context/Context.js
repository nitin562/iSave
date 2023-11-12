import { createContext, useContext, useState } from "react";

const context=createContext()
const useCont=(()=>useContext(context))

const CProvider=(props)=>{
    const parameter={
        notes:[]
    }
    
    const [state, setstate] = useState(parameter)
    return (
        <context.Provider value={{state,setstate}}>
            {props.children}
        </context.Provider>
    )
}

export {context,useCont,CProvider}