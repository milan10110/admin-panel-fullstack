import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "state";
import { useRegisterUserMutation } from "state/api";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [registerUser, response] = useRegisterUserMutation();

  console.log(response);

  const userData = useSelector((state) => state.global.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      reEnteredPassword: data.get("reEnterPassword"),
      fullName: data.get("fullName"),
    });

    const credentials = {
      name: data.get("fullName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    registerUser(credentials);
  };

  useEffect(() => {
    if (response.data) {
      const userData = response.data;
      dispatch(setUser(userData));
    }
  }, [response.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userData) {
      navigate("/dashboard");
    }
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="reEnterPassword"
                label="Re-Enter Password"
                type="password"
                id="reEnterPassword"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
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
              <Link
                to="/login"
                variant="body2"
                sx={{ color: theme.palette.secondary[100] }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
