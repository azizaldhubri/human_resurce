import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./index.css";
import DashboardRoutes from "./modules/dashboard/DashboardRoutes";
 

// Lazy Modules
const AuthRoutes = lazy(() => import("./modules/Auth/AuthRoutes"));
// const DashboardRoutes = lazy(() => import("./modules/dashboard/DashboardRoutes"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center p-1">Loading...</div>}>
        <Routes>
          <Route path="/*" element={<AuthRoutes />} />           
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;