import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../Auth/ProtectedRoute ";
import Dashboard from "./Dashboard";
import Home from "../../pages/HomeWebSite2";
import Error403 from "../Auth/403";
import DepartmentRoutes from "../Department/DepartmentRoutes";
import LeavesRoutes from "../Leaves/LeavesRoutes"; 
import TaskesRoutes from "../Taskes/TaskesRoutes";
import Documents from "../Documents/Documents";
import AddDocument from "../Documents/AddDocument";
import UpdateDocument from "../Documents/UpdateDocument";
import DocumentShow from "../Documents/DocumentShow";
import Chatbot from "../../pages/Chatbot/Chatbot";
 

const UsersRoutes = lazy(() => import("../Users/UsersRoutes"));
const PayrollsRoutes = lazy(() => import("../payrolls/PayrollsRoutes"));
const RoleRoutes = lazy(() => import("../Setting/RoleRoutes"));

const UsersRoutesSuspense = () => (
  <Suspense fallback={<div>Loading Users...</div>}>
    <UsersRoutes />
  </Suspense>
);

 

export default function DashboardRoutes() {
  return (
    <Routes>    
      <Route element={<ProtectedRoute permission="dashboard" />}>
        <Route path="/*" element={<Dashboard />}>
          <Route index element={<Home />} />
            {/* //     users    */} 
          <Route path="users/*" element={<UsersRoutesSuspense />}  >
          <Route path="*" element={<Error403 />} />
          </Route>
          {/* //     payrolls    */} 
          <Route element={<ProtectedRoute permission="إدارة المرتبات" />}>
            <Route path="payrolls/*" element={<PayrollsRoutes />} />
          </Route>
           {/* //     departments    */} 
          <Route element={<ProtectedRoute permission="إدارة الاقسام" />}>
            <Route path="departments/*" element={<DepartmentRoutes />} />
          </Route>

           {/* //     Leaves    */} 
          <Route element={<ProtectedRoute permission="إدارة الإجازات" />}>
            <Route path="Leaves/*" element={<LeavesRoutes />} />
          </Route>

           {/* //     Taskes    */} 
          <Route element={  <ProtectedRoute permission="مهام الإدارات" /> }>    
              <Route path="Taskes/*" element={<TaskesRoutes />} />                         
          </Route>

           {/* //     documents    */} 
          <Route element={  <ProtectedRoute permission="المستندات" />} >           
              <Route path='documents' element={<Documents/>}  ></Route> 
              <Route path='AddDocument' element={<AddDocument/>} ></Route> 
              <Route path='UpdateDocument/:id' element={<UpdateDocument/>} ></Route>            
              <Route path='DocumentShow/:id' element={<DocumentShow/>}  ></Route>                     
          </Route> 


          <Route path="role/*" element={<RoleRoutes />} />


          <Route path='Chatbot' element={<Chatbot />}></Route>                      
         
          {/* أي رابط خاطئ داخل dashboard */}
          <Route path="*" element={<Error403 />} />
        </Route>
      </Route>

      {/* أي رابط خاطئ خارج dashboard */}
      <Route path="*" element={<Error403 />} />
    </Routes>
  );
}