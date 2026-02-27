 import { Routes, Route } from "react-router-dom";
import { lazy } from "react"; 
import Error403 from "../Auth/403"; 

// const Users = lazy(() => import("../../pages/Users/users"));
const Leaves = lazy(() => import("./Leaves"));
const LeavesType = lazy(() => import("./LeavesType"));
const AddLeavesRequst = lazy(() => import("./AddLeavesRequst1"));
const LeavesRequestsManegment = lazy(() => import("./LeavesRequestsManegment"));
const LeaveBalancesTable = lazy(() => import("./LeaveBalances"));
const LeavesTypeUpdate = lazy(() => import("./LeavesTypeUpdate"));
// const LeavesType = lazy(() => import("./DepartmentUpdate"));
 

export default function LeavesRoutes() {
  return (
   
     <Routes>        
          <Route index element={<Leaves />} />
          <Route path="LeavesType" element={<LeavesType />} />
          <Route path=":id" element={<LeavesTypeUpdate />} />
          <Route path="AddLeavesRequst" element={<AddLeavesRequst />} />
          <Route path="LeavesRequestsManegment" element={<LeavesRequestsManegment />} />        
          <Route path="LeaveBalancesTable" element={<LeaveBalancesTable />} />        
          <Route path="*" element={<Error403 />} />
     
      </Routes>     
  
    
    
  );
}