import "./App.css";
import ResponsiveAppBar from "./components/Nabar/NavbarComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./components/Auth/LoginComponent";
import SuperAdminHomeComponent from "./components/SuperAdminHomeComponent/SuperAdminHomeComponent";
import ProtectRoutes from "./hooks/protectedRoutes/protectedRoutes";
import useAuth from "./hooks";
import React from "react";
import RegisterComponent from "./components/Auth/RegisterComponent";
import AccountComponent from "./components/Account/AccountComponent";

// TODO: 
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Navigate to='/' exact /> } />
        <Route element={<ProtectRoutes />}>
          <ResponsiveAppBar pages={['Home', 'Roles']} />
          <Route path='/' element={<AccountComponent />} />
          <Route path="/roles" element={<SuperAdminHomeComponent />} />
        </Route>
        <Route path="/register" element={<RegisterComponent />} />
        <Route path='/login' element={<LoginComponent />} />
      </Routes>
    </div>
  );
}

export default App;
