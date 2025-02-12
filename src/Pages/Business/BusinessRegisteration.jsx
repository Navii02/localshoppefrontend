//import React from 'react'
import { Box, TextField, Button } from "@mui/material";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
    const { businessname, username, email, password, confirmPassword } =
      Details;
    if (!businessname || !username || !email || !password || !confirmPassword) {
      alert("Please Fill The Form Completly");
    } else if (password != confirmPassword) {
      alert("The password must be same");
    } else {
      const result = await businessRegister(Details);
      console.log(result);
      if (result.status == 200) {
        alert("Registration Successfully Completed");
        setDetails({
          businessname: "",
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

        Navigate("/business/registrationpage");
      } else if (result.status == 406) {
        alert("The User is already registered");
        setDetails({
          businessname: "",
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

  useEffect(() => {
  
  },[]);

  const handleLogin = async () => {
    const { email, password } = Details;
    if ((!email, !password)) {
      alert("Please Fill The Form Completly");
    } else {
      const result = await businessLogin(Details);
      console.log(result);
      if (result.status == 200) {
       
        setDetails({
          businessname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
       
      sessionStorage.setItem(
        "userdetails",
        JSON.stringify(result.data.existingBusinessUser)
      );
      sessionStorage.setItem("token", result.data.token);

      const userDetails = JSON.parse(sessionStorage.getItem("userdetails"));
      if (
        userDetails &&
        userDetails.BankDetails &&
        userDetails.BankDetails.Name &&
        userDetails.BankDetails.AccountNo &&
        userDetails.BankDetails.IFSCode &&
        userDetails.PanCardNo &&
        userDetails.PanName &&
        userDetails.BusinessType &&
        userDetails.GSTNo &&
        userDetails.LicenseNo &&
        userDetails.LicenseImg &&
        userDetails.PancardImg &&
        userDetails.photo

      ) {
      if(userDetails.status == "approved"){
        alert("Login Sucessful");
        Navigate('/business')
      }
      else if(userDetails.status == "Pending"){
        alert("Your Account is Under reviewing session. Please wait for  your account get activated.")
      }
      else{
        alert("Your Account is is not satisfiy recommended creteria")
      }
      } else {
        Navigate("/business/registrationpage");
      }
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
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 ">
        <div
          className="col-lg-4 col-md-6 col-sm-10 rounded p-3"
          style={{ background: "#D0DDD0" }}
        >
          {register ? (
            <h1 className="text-center mb-4">Join Us</h1>
          ) : (
            <h1 className="text-center mb-4">Sign In</h1>
          )}
          <Box component="form" noValidate autoComplete="off">
            {register && (
              <div>
                <TextField
                  fullWidth
                  margin="normal"
                  id="Business Name"
                  label="Business Name"
                  variant="outlined"
                  type="text"
                  value={Details.businessname}
                  onChange={(e) =>
                    setDetails({ ...Details, businessname: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="Owner Name"
                  label="Owner Name"
                  variant="outlined"
                  type="text"
                  value={Details.username}
                  onChange={(e) =>
                    setDetails({ ...Details, username: e.target.value })
                  }
                />
              </div>
            )}
            <TextField
              fullWidth
              margin="normal"
              id="email"
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
              id="password"
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
                id="confirm password"
                label="confirm Password"
                type="password"
                variant="outlined"
                value={Details.confirmPassword}
                onChange={(e) =>
                  setDetails({ ...Details, confirmPassword: e.target.value })
                }
              />
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
              <Button
                variant="contained"
                color="error"
                className="w-50"
                startIcon={<FontAwesomeIcon icon={faGoogle} />}
              >
                Sign in with Google
              </Button>
            </div>
            {!register && (
              <div className="text-center mt-3">
                <Link to="/forgotpassword" className="text-decoration-none">
                  <small>Forgot Password?</small>
                </Link>
              </div>
            )}
            <div className="d-flex justify-content-center mt-3">
              <Link
                to={!register ? "/business/register" : "/business/login"}
                className="text-decoration-none text-primary"
              >
                <small>
                  {!register
                    ? "New User? Click Here to Sign Up"
                    : "Already User? Click Here to Sign In"}
                </small>
              </Link>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default BusinessRegisteration;
