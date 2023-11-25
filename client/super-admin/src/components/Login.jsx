import React, { useState } from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FormGroup } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [activeButton, setActiveButton] = useState("login");


  const handleToggle = (button) => {
    setActiveButton(button);
};

  const handleSubmit = (event) => {

    console.log("hellooo");
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    console.log('after')
    if (email == "" && activeButton == "login") {
        console.log("hiiiiii");
      setEmailError(true);
    }
    if (password == "" && activeButton == "login") {
      setPasswordError(true);
    }

    if (email && password) {
      console.log(email, password);
    }
  };

  return (
    <React.Fragment>
      <FormControl>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}
            error={emailError}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={password}
            error={passwordError}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button
            variant="outlined"
            color="primary"
            // type="submit"
            onClick={() => handleToggle('login')}
            sx={{
              mr: 2,
              backgroundColor: activeButton === "login" ? "#4CAF50" : null,
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            // type="submit"
            onClick={() => handleToggle('register')}
            sx={{
              backgroundColor: activeButton === "register" ? "#4CAF50" : null,
            }}
          >
            Register
          </Button>
          {/* "&:hover": { backgroundColor: "#45a049" }   */}
          {/* "&:hover": { backgroundColor: "#45a049" } // Darker green color on hover */}
        </form>
      </FormControl>
      {/* <small>Need an account? <Link to="/">Register here</Link></small> */}
    </React.Fragment>
  );
};

export default Login;
