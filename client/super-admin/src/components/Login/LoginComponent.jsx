import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

import { login } from "../../services/user.services";
import useAuth from "../../hooks/useAuth";

export default function LoginComponent() {
  const { setAuth } = useAuth();

  // initial state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [activeButton, setActiveButton] = useState("login"); //Setting to login as the landing page is Login

  const handleToggle = (buttonText) => {
    if (buttonText == "LOGIN" && activeButton != "login") {
      setActiveButton("login");
    }

    if (buttonText == "REGISTER" && activeButton != "register") {
      setActiveButton("register");
    }
  };

  const handleSubmit = async (e) => {
    try {
      console.log(e.target.innerText);
    } catch (error) {
      console.log("nope");
    }

    //To update the Active Button 
    handleToggle(e.target.innerText);

    // prevent the form from refreshing the whole page
    e.preventDefault();

    // make the API call
    await login(phoneNumber, password)
      .then((result) => {
        // set the cookie
        setAuth(result.data.token);

        // redirect user to the auth page
        window.location.href = "/";
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <React.Fragment>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <TextField
          label="Email"
          onChange={(e) => setPhoneNumber(e.target.value)}
          // required
          variant="outlined"
          color="secondary"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={phoneNumber}
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          // required
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={handleSubmit}
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
          type="submit"
          onClick={handleSubmit}
          sx={{
            backgroundColor: activeButton === "register" ? "#4CAF50" : null,
          }}
        >
          Register
        </Button>
      </form>
      <small>
        Need an account? <a href="/">Register here</a>
      </small>
    </React.Fragment>
  );
}
