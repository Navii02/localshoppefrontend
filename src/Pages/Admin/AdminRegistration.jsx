import { Link } from "react-router-dom"
import { Box, TextField,Button} from "@mui/material";
//import React from 'react'

function AdminRegistration({register}) {
  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 p-5">
      <div className="col-lg-4 col-md-6 col-sm-10 p-3 rounded"style={{background:"#F9F6E6"}}>
      {register ? <h1 className="text-center mb-4">Sign Up</h1>:
        <h1 className="text-center mb-4">Sign In</h1>}
        <Box component="form" noValidate autoComplete="off">
        {register &&<div>
       
             <TextField
            fullWidth
            margin="normal"
            id="Username"
            label="Username"
            variant="outlined"
            type="text"
          />
          </div>}
          <TextField
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            variant="outlined"
            type="email"
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            label="Password"
            type="password"
            variant="outlined"
          />
          { register && <TextField
            fullWidth
            margin="normal"
            id="confirm password"
            label="confirm Password"
            type="password"
            variant="outlined"
          />}
          <div className="d-flex justify-content-center mt-4">
            <Button variant="contained" color="success" className="w-50">
            {!register ? "Sign In" : "Sign Up"}
            </Button>
          </div>
          {!register &&<div className="text-center mt-3">
            <Link to="/forgotpassword" className="text-decoration-none">
              <small>Forgot Password?</small>
            </Link>
          </div>}
          <div className="d-flex justify-content-center mt-3">
                <Link
                  to={!register ? "/admin/register" : "/admin/login"}
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
      
    </>
  )
}

export default AdminRegistration
