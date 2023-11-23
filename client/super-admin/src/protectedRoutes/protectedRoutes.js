import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// receives component and any other props represented by ...rest
export default function ProtectedRoute({ component: Component, ...rest }) {
    const {auth} = useAuth();
    return (
    auth ? <Outlet/> : <Navigate to='/login'/>
  )
}