import React from 'react'; 
import Topbar from '../../Component/Dashboard/Topbar';
import SideBar from '../../Component/Dashboard/SideBar'; 
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="position-relative w-100 border p-2">
      <Topbar />
      <div className="w-100 dashboard d-flex gap-1 position-relative p-1" style={{ marginTop:'44px', height:'91vh' }}>
        <SideBar />
        <div className='w-100 border' style={{ overflow:'auto', background:'rgba(211, 224, 230, 0.2)' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;