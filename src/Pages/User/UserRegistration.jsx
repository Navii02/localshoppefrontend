/* eslint-disable react/prop-types */

import { Box, TextField, Button, Grid, Typography, Paper } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRegister, UserLogin } from "../../service/allApi";

function UserRegistration({ register }) {
  const Navigate = useNavigate();

  const [Details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = Details;
    console.log(Details);

    if (!username || !email || !password || !confirmPassword) {
      alert("Please Fill The Form Completely");
    } else if (password !== confirmPassword) {
      alert("The password must be the same");
    } else {
      const result = await UserRegister(Details);
      console.log(result);
      if (result.status === 200) {
        alert("Registration Successfully Completed");
        setDetails({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        sessionStorage.setItem(
          "userdetails",
          JSON.stringify(result.data.newUser)
        );
        sessionStorage.setItem("token", result.data.token);

        Navigate("/login");
      } else if (result.status === 406) {
        alert("The User is already registered");
        setDetails({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = Details;
    if (!email || !password) {
      alert("Please Fill The Form Completely");
    } else {
      const result = await UserLogin(Details);
      console.log(result);
      if (result.status === 200) {
        alert("Login Successful");
        setDetails({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        sessionStorage.setItem(
          "userdetails",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);
        Navigate("/");
      } else if (result.status === 406) {
        alert("Invalid email or password");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
          maxWidth: "1000px",
          display: "flex",
        }}
      >
        <Grid container>
          {/* Left Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "block" },
              backgroundColor: "#fff",
            }}
          >
            <img
              src={
                !register
                  ? "https://media.tenor.com/7LAB1WbMURAAAAAd/website.gif"
                  : "https://www.akoode.com/assets/img/ecommer-banner-right.gif"
              }
              alt="Illustration"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderTopLeftRadius: "16px",
                borderBottomLeftRadius: "16px",
              }}
            />
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6} sx={{ background: "#fff", p: 4 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
              {!register ? "Login" : "Sign Up"}
            </Typography>

            <Box component="form">
              {register && (
                <TextField
                  className="w-100 mt-3"
                  id="Username"
                  label="Username"
                  variant="outlined"
                  value={Details.username}
                  onChange={(e) =>
                    setDetails({ ...Details, username: e.target.value })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
              <TextField
                className="w-100 mt-3"
                id="email"
                label="Email"
                variant="outlined"
                value={Details.email}
                onChange={(e) =>
                  setDetails({ ...Details, email: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                className="w-100 mt-3"
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={Details.password}
                onChange={(e) =>
                  setDetails({ ...Details, password: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              {register && (
                <TextField
                  className="w-100 mt-3"
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  value={Details.confirmPassword}
                  onChange={(e) =>
                    setDetails({
                      ...Details,
                      confirmPassword: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
              <Button
                variant="contained"
                color="success"
                onClick={!register ? handleLogin : handleRegister}
                fullWidth={false} // Remove full width to allow centering
                sx={{
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  display: "block",
                  mx: "auto", // Centers the button horizontally
                }}
              >
                {!register ? "Sign In" : "Sign Up"}
              </Button>

              
              {!register && (
                <Box textAlign="center" mt={2}>
                  <Link to="/forgotpassword" className="text-decoration-none">
                    <Typography variant="body2" sx={{ color: "red" }}>
                      Forgot Password?
                    </Typography>{" "}
                  </Link>
                </Box>
              )}

              <Box textAlign="center" mt={2}>
                <Link
                  to={!register ? "/register" : "/login"}
                  className="text-decoration-none text-primary"
                >
                  <Typography variant="body2">
                    {!register
                      ? "New User? Click Here to Sign Up"
                      : "Already User? Click Here to Sign In"}
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UserRegistration;
