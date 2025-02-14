/* eslint-disable react/prop-types */
import { Link, useNavigate, } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useState ,useContext} from "react";
import { adminlogin, adminregister } from "../../service/allApi";
import "./AdminRegistration.css"; // Import the CSS file
import { loginResponseContext } from "../../context/ContextShare";

function AdminRegistration({ register }) {
  const {setLoginResponse}=useContext(loginResponseContext)
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = details;
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill out the form completely.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords must match.");
      return;
    }
    try {
      const result = await adminregister(details);
      if (result.status === 200) {
        alert("Registration Successful!");
        setDetails({ username: "", email: "", password: "", confirmPassword: "" });
        sessionStorage.setItem("userdetails", JSON.stringify(result.data.newUser));
        sessionStorage.setItem("token", result.data.token);
        navigate("/admin/login");
      } else if (result.status === 406) {
        alert("User is already registered.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleLogin = async () => {
    const { email, password } = details;
    if (!email || !password) {
      alert("Please fill out the form completely.");
      return;
    }
    try {
      const result = await adminlogin(details);
      if (result.status === 200) {
        alert("Login Successful!");
        setDetails({ username: "", email: "", password: "", confirmPassword: "" });
        sessionStorage.setItem("userdetails", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
        navigate("/admin");
        setLoginResponse(true)
      } else if (result.status === 406) {
        alert("Invalid email or password.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="registration-container">
      <Paper elevation={6} className="form-card">
        <Typography variant="h4" className="form-title">
          {register ? "Sign Up" : "Sign In"}
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          {register && (
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              variant="outlined"
              type="text"
              value={details.username}
              onChange={(e) => setDetails({ ...details, username: e.target.value })}
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={details.password}
            onChange={(e) => setDetails({ ...details, password: e.target.value })}
          />
          {register && (
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={details.confirmPassword}
              onChange={(e) => setDetails({ ...details, confirmPassword: e.target.value })}
            />
          )}
          <div className="btn-container">
            <Button
              variant="contained"
              color="success"
              className="submit-btn"
              onClick={register ? handleRegister : handleLogin}
            >
              {register ? "Sign Up" : "Sign In"}
            </Button>
          </div>

          {!register && (
            <div className="text-center">
              <Link to="/forgotpassword" className="link">
                Forgot Password?
              </Link>
            </div>
          )}
         
        </Box>
      </Paper>
    </div>
  );
}

export default AdminRegistration;
