// import * as React from 'react';
import { FormLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { blue, deepPurple, grey, orange } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useAuth } from "../../provider/authProvider";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valerror, setvalerror] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();
  const { setToken} = useAuth();
  const auth=useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    if (email == "") {
      setvalerror("please enter a username");
    } else if (password == "") {
      setvalerror("please enter a password");
    } else if (role == "") {
      setvalerror("please choose appropriate role");
    } else {
      console.log(process.env.REACT_APP_BACKEND);
      setIsLoading(true);
      axios.post(`${process.env.REACT_APP_BACKEND}/login/login`, {
          email,
          password,
          role,
        })
        .then((res) => {
          localStorage.setItem("id", res.data._id);
          localStorage.setItem("email", email);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", role);
          setIsLoading(false);
          setToken(res.data.token);
          auth.setRole(role);
          if (role == "teacher")
            Navigate("/teacher-dashboard", {
              state: {
                email,
              },
            });
          if (role == "student")
            Navigate("/student-dashboard", {
              state: {
                email,
              },
            });
        })
        .catch((res) => {
          // console.log(res.response.data);
          // alert(res.response.data.message);
          setvalerror(res.response.data.message);
        });
    }
  };
  useEffect(() => {
    if (valerror) {
      setIsLoading(false);
      alert(valerror);
      setvalerror("");
    }
  }, [valerror]);
  return (
    <>
      {isLoading && <Loader />}

      {isLoading || (
        <ThemeProvider theme={defaultTheme}>
          <Grid
            container
            component="main"
            justifyContent="center"
            sx={{ height: "100vh" }}
          >
            <CssBaseline />
            <Grid
              container
              xs={false}
              sm={4}
              md={7}
              direction={"column"}
              justifyContent="center"
              alignItems="center" // Add this line to center the content vertically
              display="flex"
              sx={{
                // backgroundRepeat: 'no-repeat',
                backgroundColor: orange[50],
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
              }}
            >
              <Grid item>
                <img src="/assets/Eye.png" alt="gif" />
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  noWrap
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    fontSize: "3rem",
                  }}
                >
                  Procto PuLsE
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  // onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    color="secondary"
                    onChange={(e) => setEmail(e.target.value)}
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
                    color="secondary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  {/* <RadioGroup onChange={(i) => console.log(i)}> */}
                  <FormLabel>student</FormLabel>
                  <Radio
                    value="student"
                    checked={role == "student"}
                    onChange={(i) => setRole(i.target.value)}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                      },
                      color: blue[300],
                      "&.Mui-checked": {
                        color: deepPurple[900],
                      },
                    }}
                  />
                  <FormLabel>teacher</FormLabel>
                  <Radio
                    value="teacher"
                    checked={role == "teacher"}
                    onChange={(i) => setRole(i.target.value)}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                      },
                      color: deepPurple[700],
                      "&.Mui-checked": {
                        color: deepPurple[600],
                      },
                    }}
                  />
                  {/* </RadioGroup> */}
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        style={{
                          color: "black",
                        }}
                      />
                    }
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: grey[900] }}
                    onClick={handleSubmit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    {/* <Grid
											item
											xs
										>
											<Link
												href='#'
												variant='body2'
											>
												Forgot password?
											</Link>
										</Grid> */}
                    <Grid
                      item
                      onClick={() => {
                        Navigate("/signup");
                      }}
                    >
                      <Link
                        href="/signup"
                        variant="body2"
                        sx={{ color: "black" }}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
}
