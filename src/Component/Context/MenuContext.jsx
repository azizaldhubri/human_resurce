import { createContext, useState } from "react";

export const Menu=createContext(true);
export default function MenuContext({children}){
//    const[isOpen,setisOpen]=useState(true);
   const[isupdateNotifaction,setIsupdateNotifaction]=useState(true);
   const[isOpen,setisOpen]=useState(window.innerWidth>625 ? true:false);
   
//   console.log()
    return (
        <Menu.Provider value={{isOpen,setisOpen,isupdateNotifaction,setIsupdateNotifaction}}>
            {children}
        </Menu.Provider>
    )
}