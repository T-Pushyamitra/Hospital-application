import React, { useEffect, useState } from "react";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { getLoggedInUser } from "../../services/user.services";

export default function AccountComponent(){

    const [user, setUser] = useState([]);

    useEffect(() => {
      const fetchData = async() => {
        const data = await getLoggedInUser();
        setUser(data.data);
      }
      fetchData();
    }, [])

    
    return (
        <Container component="main" maxWidth="md">
          <CssBaseline />
            <Typography component="h1" variant="h5">
              Account
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    value={user.firstName}
                    required
                    fullWidth
                    id="outlined-read-only-input"
                    label="First Name"
                    autoFocus
                    InputProps={{
            readOnly: true,
          }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={user.lastName}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="dateOfBirth"
                    label="Date Of Birth"
                    name="dateOfBirth"
                    value={user.dateOfBirth}
                    type="date"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      required
                    fullWidth
                      id="sex"
                      label="Sex"
                      name="sex"
                    value={user.sex}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={user.email}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    disabled={true}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
        </Container>
    )
}