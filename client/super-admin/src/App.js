import "./App.css";
import ResponsiveAppBar from "./components/Nabar/NavbarComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./components/Auth/LoginComponent";
import SuperAdminHomeComponent from "./components/SuperAdminHomeComponent/SuperAdminHomeComponent";
import ProtectedRoute from "./protectedRoutes/protectedRoutes";
import useAuth from "./hooks/useAuth";
import React from "react";
import RegisterComponent from "./components/Auth/RegisterComponent";

// TODO: 
function App() {
  const { auth } = useAuth();

  if (!auth) {
    <>
      <Navigate to="/login" />
      <LoginComponent />
    </>
  }

  return (
    <div className="App">
      {auth ? <ResponsiveAppBar pages={['Home', 'Roles']} /> : <></>}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<SuperAdminHomeComponent />} />
          <Route path="/roles" element={<SuperAdminHomeComponent />} />
        </Route>
        <Route path="/register" element={!auth ? <RegisterComponent />: <Navigate to="/" />} />
        <Route path='/login' element={!auth ? <LoginComponent /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
