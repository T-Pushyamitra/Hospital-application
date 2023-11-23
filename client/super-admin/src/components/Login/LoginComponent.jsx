import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Cookies from "universal-cookie";

import { login } from "../../services/user.services";

// TODO: Set the auth token on to cookies
const cookies = new Cookies();

export default function LoginComponent() {

  // initial state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // make the API call
    await login(phoneNumber, password)
      .then((result) => {
        console.log(result)
        // set the cookie
        cookies.set('TOKEN', result.data.token, {path: "/"});

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
                    onChange={e => setPhoneNumber(e.target.value)}
                    // required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={phoneNumber}
                 />
                 <TextField 
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    // required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Button variant="outlined" color="secondary" type="submit">Login</Button>
             
        </form>
        <small>Need an account? <a href="/">Register here</a></small>
        </React.Fragment>
     );
}