import "./App.css";
import ResponsiveAppBar from "./components/Nabar/NavbarComponent";
import { Routes, Route } from "react-router-dom";
import ButtonComponent from "./components/ButtonComponent";
import useAuth from "./hooks/useAuth";
import LoginComponent from "./components/Login/LoginComponent";

function App() {

  const { auth, setAuth } = useAuth();

  if (!auth) {
    return <LoginComponent setAuth={setAuth}/>
  }

  return (
    <div className="App">
      <ResponsiveAppBar pages={['Home', 'Roles']}/>
      <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path='/Roles' element={<ButtonComponent buttonText={"Hello"}/>} />
      </Routes>
    </div>
  );
}

export default App;
