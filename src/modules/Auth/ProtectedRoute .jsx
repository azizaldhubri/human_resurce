import React, { useContext, useMemo } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import Cookie from 'cookie-universal';
import LoadingSubmit from "../../Component/Loading/Loading";
import Error403 from "./403";
import { UserContext } from '../../Component/Context/UserProvider';

const ProtectedRoute=({ permission, children }) => {

  const cookie = Cookie();
  const token = cookie.get('h-resurce');

  const { permissions, loading } = useContext(UserContext);

if (!token) {
  return <Navigate to="/" replace />;
}

// ⛔ لم تنتهِ عملية التحميل بعد
if (loading || permissions === null) {
  return <LoadingSubmit />;
}

const hasPermission = permissions.some(
  item =>
    item.page?.name === permission &&
    item.can_view === 1
);

if (!hasPermission) {
  return <Error403 />;
}

return <Outlet />;
};

export default ProtectedRoute;