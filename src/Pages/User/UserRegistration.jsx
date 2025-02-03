import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TextField,Button } from "@mui/material";
import { useState } from "react";
//import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserRegister,UserLogin } from "../../service/allApi";

function UserRegistration({ register }) {
  const Navigate = useNavigate();

    const [Details, setDetails] = useState({
 
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
     const handleRegister = async () => {
        const {  username, email, password, confirmPassword } =
          Details;
          console.log(Details);
          
        if ( !username || !email || !password || !confirmPassword) {
          alert("Please Fill The Form Completly");
        } else if (password != confirmPassword) {
          alert("The password must be same");
        } else {
          const result = await UserRegister(Details);
          console.log(result);
          if (result.status == 200) {
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
          } else if (result.status == 406) {
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
          if ((!email, !password)) {
            alert("Please Fill The Form Completly");
          } else {
            const result = await UserLogin(Details);
            console.log(result);
            if (result.status == 200) {
              alert("Login Sucessful");
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
            Navigate('/')
            }else if(result.status==406){
              alert("invalid email or password")
      
            }
            else{
              alert("Something went wrong")
            }
          }
        };
  return (
    <>
    <div style={{ background: "#D6FA8C" }} className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        {/* Left Section */}
        <div className="col-md-2 d-none d-lg-block"></div>
        <div className="col-md-4 d-none d-lg-block">
          {!register ? (
            <img
              style={{ height: "100%" }}
              className="w-100 rounded"
              src="https://media.tenor.com/7LAB1WbMURAAAAAd/website.gif"
              alt="Illustration"
            />
          ) : (
            <img
              style={{ height: "100%" }}
              className="w-100 rounded"
              src="https://www.akoode.com/assets/img/ecommer-banner-right.gif"
              alt="Illustration"
            />
          )}
        </div>

        {/* Right Section */}
        <div className="col-md-4 col-sm-10 mx-auto rounded bg-light">
          <div className="p-4">
            {!register ? (
              <h1 className="text-center mt-3">Login</h1>
            ) : (
              <h1 className="text-center mt-3">Sign Up</h1>
            )}
            <Box component="form">
              {register && (
                <div>
                  <TextField
                    className="w-100 mt-3"
                    id="Username"
                    
                    label="Username"
                    variant="outlined"
                    value={Details.username}
                    onChange={(e) =>
                      setDetails({ ...Details, username: e.target.value })
                    }
                  />
                </div>
              )}
              <div>
                <TextField
                  className="w-100 mt-3"
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={Details.email}
                  onChange={(e) =>
                    setDetails({ ...Details, email: e.target.value })
                  }
                />
              </div>
              <div>
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
                />
              </div>
              {register && (
                <div>
                  <TextField
                    className="w-100 mt-3"
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    value={Details.confirmPassword}
                    onChange={(e) =>
                      setDetails({ ...Details, confirmPassword: e.target.value })
                    }
                  />
                </div>
              )}
              <div className="d-flex justify-content-center mt-4">
              {!register ? (
                <Button
                  variant="contained"
                  color="success"
                  className="w-50"
                  onClick={handleLogin}
                >
                  Sign In{" "}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  className="w-50"
                  onClick={handleRegister}
                >
                  Sign Up
                </Button>
              )}
            </div>
              <div className="text-center mt-4">
                <h5>or</h5>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-danger w-50">
                  <FontAwesomeIcon icon={faGoogle} className="me-2" />
                  Sign in with Google
                </button>
              </div>
              {!register && (
                <div className="d-flex justify-content-center mt-3">
                  <Link to="/forgotpassword" className="text-decoration-none">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
              )}
              <div className="d-flex justify-content-center mt-3">
                <Link
                  to={!register ? "/register" : "/login"}
                  className="text-decoration-none text-primary"
                >
                  <small>
                    {!register ? "New User? Click Here to Sign Up" : "Already User? Click Here to Sign In"}
                  </small>
                </Link>
              </div>
            </Box>
          </div>
        </div>

        {/* Spacer for large screens */}
        <div className="col-md-2 d-none d-lg-block"></div>
      </div>
    </div>
    </>
  );
}

export default UserRegistration;
