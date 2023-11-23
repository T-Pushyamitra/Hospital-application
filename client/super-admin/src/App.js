import "./App.css";
import ResponsiveAppBar from "./components/Nabar/NavbarComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./components/Login/LoginComponent";
import SuperAdminHomeComponent from "./components/SuperAdminHomeComponent/SuperAdminHomeComponent";
import ProtectedRoute from "./protectedRoutes/protectedRoutes";
import useAuth from "./hooks/useAuth";

// TODO: 
function App() {
    const {auth} = useAuth();
  return (
    <div className="App">
      <ResponsiveAppBar pages={['Home', 'Roles']}/>
      <Routes>
      <Route element={<ProtectedRoute/>}>
              <Route path='/' element={<SuperAdminHomeComponent/>} />
              <Route path="/roles" element={<SuperAdminHomeComponent/>} />
          </Route>
          <Route path='/login' element={!auth ? <LoginComponent/> : <Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default App;
