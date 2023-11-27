import React, { useState } from "react";

import { TextField, Button } from "@mui/material";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { login } from "../../services/user.services";
import useAuth from "../../hooks/useAuth";
import Alerts from "../Alert/AlertComponent";

export default function LoginComponent() {

  const { setAuth } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [signInData, setSignInData] = useState({
    phoneNumber: "",
    password: ""
  });

  const [error, setError] = useState({
    phoneNumber: false,
    password: false
  });

  const handleChange = (e) => {
    const { name, value } = e;
    console.log(value);
    if (!value && !error[name]){
      setError({...error, [name]:true});
    }
    else{
      setError({...error, [name]:false});
    }

    setSignInData({ ...signInData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signInData.phoneNumber || !signInData.password ){
      setError({phoneNumber:!signInData.phoneNumber, password:!signInData.password})
      setErrorMessage("Required all the inputs");
    }
    else{
    await login(signInData)
      .then((response) => {
        setAuth(response?.data.token);
        setSuccessMessage(response.message);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.message)
        setErrorMessage(error.message)
      });
    }
  };

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorMessage ? <Alerts severity={"error"} message={errorMessage}/> : null}
        {successMessage ? <Alerts severity={"success"} message={successMessage}/> : null}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                error={error.phoneNumber}
                onChange={(e) => handleChange(e.target)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={error.password}
                onChange={(e) => handleChange(e.target)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                New account ? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
    </Container>
  );
}
