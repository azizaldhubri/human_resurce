import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
 

const Payrolls = lazy(() => import("./payrolls"));
const AddAdvance = lazy(() => import("./AddAdvance"));
const AddAllowances = lazy(() => import("./AddAllowances"));
const AddDeductions = lazy(() => import("./AddDeductions"));
const ViewDeduction = lazy(() => import("./ViewDeduction"));
const ViewAllowances = lazy(() => import("./ViewAllowances"));
 
 

export default function PayrollsRoutes() {
  return (   
    <Routes>      
      <Route index element={<Payrolls />} />
      <Route path="AddAllowances" element={<AddAllowances />} />
      <Route path="AddAdvance" element={<AddAdvance />} />
      <Route path="AddDeductions" element={<AddDeductions />} />
      <Route path="ViewDeduction" element={<ViewDeduction />} />     
      <Route path="ViewAllowances" element={<ViewAllowances />} />     
    </Routes>
    
    
  );
}