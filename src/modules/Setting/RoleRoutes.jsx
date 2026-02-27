import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
 

const Role = lazy(() => import("./Role"));
const RoleUpdate = lazy(() => import("./RoleUpdate"));
 
 
 

export default function RoleRoutes() {
  return (   
    <Routes>      
      <Route index element={<Role />} />
      <Route path="RoleUpdate/:id" element={<RoleUpdate />} />          
    </Routes>
    
    
  );
}