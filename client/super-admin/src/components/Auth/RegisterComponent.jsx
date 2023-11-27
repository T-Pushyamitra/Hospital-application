import React, { useState } from "react";
import { TextField } from "@mui/material";
import { register } from "../../services/user.services";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alerts from "../Alert/AlertComponent";

export default function RegisterComponent() {
   const [errorMessage, setErrorMessage] = useState("");
   const [successMessage, setsuccessMessage] = useState("");


  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSubmit = async (e) => {

    // prevent the form from refreshing the whole page
    e.preventDefault();

    // make the API call
    await register(signUpData)
      .then((result) => {
        // redirect user to the auth page
        setsuccessMessage(result.message);
        window.location.href = "/login";
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          { errorMessage? <Alerts severity='error' message={errorMessage}/> : null }
          {successMessage? <Alerts severity='success' message={successMessage} /> : null }
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => handleChange(e.target)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(e) => handleChange(e.target)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="dateOfBirth"
                  label="Date Of Birth"
                  name="dateOfBirth"
                  placeholder="Date of birth"
                  type="date"
                  onChange={(e) => handleChange(e.target)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="sex"
                    label="Sex"
                    name="sex"
                  onChange={(e) => handleChange(e.target)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => handleChange(e.target)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
    </ThemeProvider>
  );
}
