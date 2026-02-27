import React, { createContext, useEffect, useState } from "react"; 
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";
// import Cookie from 'cookie-universal' ;
 
 
// إنشاء السياق
export const UserContext = createContext();
 
export const UserProvider = ({ children }) => {
  // const cookie=Cookie();
   
  // const token=cookie.get('h-resurce');
 
  const [user, setUser] = useState([]);
  const [permissions, setPermissions] = useState(null);   
  const [update, setUpdate] = useState(true);   
 const [loading, setLoading] = useState(true);

  async function User_role( ) {
    
    // await axios.get(`http://127.0.0.1:8000/api/${USER}`,{
    //   headers:{
    //     Authorization:`Bearer ${token}`
    // }
    // })
        await  Axios.get(`${USER}` )            
        .then(data=>{
          setUser(data.data);
          fetchPermissions(data.data.role_id);
          // .then(data=>{setUser(data.data);fetchPermissions(data.data.role_id);
        // console.log(data.data)

      }) 
      // .catch(()=>navegate('/login',{replace:true}) ) 
      .catch((data)=>console.log(data) ) 
  }
  useEffect(()=>{ 
      User_role()              
// },[ ])
},[ ])

 

async function fetchPermissions(id) {
    await Axios.get(`roles/${id}`)
  .then(data=>{setPermissions(data.data);     
  })  
 
};
 

  return (
    <UserContext.Provider value={{ user, setUser,permissions, setPermissions ,update, setUpdate}}>
      {children}
    </UserContext.Provider>
  );
};
