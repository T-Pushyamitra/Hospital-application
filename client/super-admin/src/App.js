import "./App.css";
import ResponsiveAppBar from "./components/Nabar/NavbarComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./components/Login/LoginComponent";
import SuperAdminHomeComponent from "./components/SuperAdminHomeComponent/SuperAdminHomeComponent";
import ProtectedRoute from "./protectedRoutes/protectedRoutes";
import useAuth from "./hooks/useAuth";
import TableComponent from "./components/Table/TableComponent";

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
      {auth ? <ResponsiveAppBar pages={['Home', 'Users']} /> : <></>}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<SuperAdminHomeComponent />} />
          <Route path="/users" element={<TableComponent />} />
        </Route>
        <Route path='/login' element={!auth ? <LoginComponent /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
