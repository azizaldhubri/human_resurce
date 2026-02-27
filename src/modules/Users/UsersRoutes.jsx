import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Users from "./users";
import Error403 from "../Auth/403";
import ProtectedRoute from "../Auth/ProtectedRoute ";

// const Users = lazy(() => import("../../pages/Users/users"));
const AddUser = lazy(() => import("./AddUser"));
const UserUpdate = lazy(() => import("./UserUpdate"));
const Usersbymaterial = lazy(() => import("./Usersbymaterial"));

export default function UsersRoutes() {
  return (
   
     <Routes>     
      <Route   element={<ProtectedRoute permission="موارد بشرية" /> } >
          <Route index element={<Users />} />
          <Route path="add" element={<AddUser />} />
          <Route path="/:id" element={<UserUpdate />} />
          {/* <Route path="/:id(\d+)" element={<UserUpdate />} /> */}
          <Route path="material" element={<Usersbymaterial />} />
          <Route path="*" element={<Error403 />} />
      </Route>
      </Routes>     
  
    
    
  );
}