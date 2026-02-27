import { Routes, Route } from "react-router-dom";
import { lazy } from "react"; 
import Error403 from "../Auth/403"; 

// const Users = lazy(() => import("../../pages/Users/users"));
const Taskes = lazy(() => import("./Taskes"));
const AddTask = lazy(() => import("./AddTask"));
 

export default function TaskesRoutes() {
  return (
   
     <Routes>        
          <Route index element={<Taskes />} />
          <Route path="add" element={<AddTask />} />                            
          <Route path="*" element={<Error403 />} />
     
      </Routes>     
  
    
    
  );
}