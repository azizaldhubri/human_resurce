import { Routes, Route } from "react-router-dom";
import { lazy } from "react"; 
import Error403 from "../Auth/403"; 

// const Users = lazy(() => import("../../pages/Users/users"));
const Department = lazy(() => import("./Departments"));
const AddDepartment = lazy(() => import("./AddDepartment"));
const DepartmentUpdate = lazy(() => import("./DepartmentUpdate"));
 

export default function DepartmentRoutes() {
  return (
   
     <Routes>        
          <Route index element={<Department />} />
          <Route path="add" element={<AddDepartment />} />
          <Route path="/:id" element={<DepartmentUpdate />} />        
          <Route path="*" element={<Error403 />} />
     
      </Routes>     
  
    
    
  );
}