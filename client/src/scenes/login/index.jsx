import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "state";
import { useAuthenticateUserMutation } from "state/api";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [authenticateUser, response] = useAuthenticateUserMutation();

  const userData = useSelector((state) => state.global.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const credentials = {
      email: data.get("email"),
      password: data.get("password"),
    };

    authenticateUser(credentials);
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
    <>
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
          <Typography
            sx={{ color: theme.palette.secondary[100] }}
            component="h1"
            variant="h5"
          >
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link
                  href="#"
                  variant="body2"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
