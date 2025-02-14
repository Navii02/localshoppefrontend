/* eslint-disable react/prop-types */
import { Box, TextField, Button, Typography, Paper, Divider } from "@mui/material";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import { businessRegister, businessLogin } from "../../service/allApi";

function BusinessRegisteration({ register }) {
  const Navigate = useNavigate();
  const [Details, setDetails] = useState({
    businessname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    const { businessname, username, email, password, confirmPassword } = Details;
    if (!businessname || !username || !email || !password || !confirmPassword) {
      alert("Please Fill The Form Completely");
    } else if (password !== confirmPassword) {
      alert("The password must be the same");
    } else {
      const result = await businessRegister(Details);
      if (result.status === 200) {
        alert("Registration Successfully Completed");
        setDetails({
          businessname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        sessionStorage.setItem("userdetails", JSON.stringify(result.data.newUser));
        sessionStorage.setItem("token", result.data.token);
        Navigate("/business/registrationpage");
      } else if (result.status === 406) {
        alert("The User is already registered");
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
      const result = await businessLogin(Details);
      if (result.status === 200) {
        sessionStorage.setItem("userdetails", JSON.stringify(result.data.existingBusinessUser));
        sessionStorage.setItem("token", result.data.token);
        alert("Login Successful");
        Navigate("/business");
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
        background: "linear-gradient(135deg,rgb(64, 202, 241) 0%,rgb(163, 255, 120) 100%)",
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 4,
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {register ? "Join Us" : "Sign In"}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box component="form" noValidate autoComplete="off">
          {register && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Business Name"
                variant="outlined"
                value={Details.businessname}
                onChange={(e) =>
                  setDetails({ ...Details, businessname: e.target.value })
                }
              />
              <TextField
                fullWidth
                margin="normal"
                label="Owner Name"
                variant="outlined"
                value={Details.username}
                onChange={(e) =>
                  setDetails({ ...Details, username: e.target.value })
                }
              />
            </>
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
            value={Details.email}
            onChange={(e) =>
              setDetails({ ...Details, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={Details.password}
            onChange={(e) =>
              setDetails({ ...Details, password: e.target.value })
            }
          />
          {register && (
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={Details.confirmPassword}
              onChange={(e) =>
                setDetails({ ...Details, confirmPassword: e.target.value })
              }
            />
          )}
          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={register ? handleRegister : handleLogin}
              sx={{
                width: "100%",
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              {register ? "Sign Up" : "Sign In"}
            </Button>
          </Box>
          {/* <Divider sx={{ my: 3 }}>or</Divider> */}
          {/* <Box textAlign="center">
            <Button
              variant="outlined"
              color="error"
              startIcon={<FontAwesomeIcon icon={faGoogle} />}
              sx={{
                width: "100%",
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Sign in with Google
            </Button>
          </Box> */}
          {!register && (
            <Box textAlign="center" mt={2}>
              <Link to="/forgotpassword" className="text-decoration-none">
                <Typography variant="body2" sx={{ color: "red" }}>
                  Forgot Password?
                </Typography>
              </Link>
            </Box>
          )}
          <Box textAlign="center" mt={2}>
            <Link
              to={!register ? "/business/register" : "/business/login"}
              className="text-decoration-none"
            >
              <Typography variant="body2" color="primary">
                {!register
                  ? "New User? Click Here to Sign Up"
                  : "Already User? Click Here to Sign In"}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default BusinessRegisteration;
