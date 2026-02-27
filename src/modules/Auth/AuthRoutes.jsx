import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
// import Register2 from "../../pages/Auth/Register2";
import Homepage from "../../pages/Home/HomePage";
import Error403 from "./403";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/register2" element={<Register2 />} /> */}
      <Route path="*" element={<Error403 />} />
    </Routes>
  );
}