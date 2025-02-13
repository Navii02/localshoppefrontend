import { faFacebook, faXTwitter,faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import React from 'react'

function UserFooter() {
  return (
    <>
      <div className="container mt-3">
        <hr />
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-4">
                <h6>ABOUT</h6>
                <p>Contact Us</p>
                <p>About Us</p>
              </div>
              <div className="col-md-4">
                <h6>HELP</h6>
                <p>Payments</p>
                <p>Shipping</p>
                <p>Cancellation & Returns</p>
              </div>
              <div className="col-md-4">
                <h6>CUSTOMER POLICY</h6>
                <p>Payments</p>
                <p>Shipping</p>
                <p>Cancellation & Returns</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6"style={{ borderLeft: "1px solid #7E99A3", height: "100%" }}>
            <div className="row">
              <div className="col-md-6">
                <h6>Mail Us</h6>
                <span>
                  Local shoppee Internet Private Limited, <br />
                  Buildings Alyssa, <br />
                  Begonia & Clove Embassy Tech Village, <br />
                  Outer Ring Road, <br />
                  Devarabeesanahalli Village, <br />
                  Bengaluru, 560103, Karnataka,India <br />
                </span>
                <p className="mt-2 fw-bold">Social</p>
                <div className="">
                <FontAwesomeIcon className="me-3" icon={faFacebook} />
                <FontAwesomeIcon className="me-3"  icon={faXTwitter} />
                <FontAwesomeIcon icon={faYoutube} />
                </div>
              </div>
              <div className="col-md-6">
                <h6>Registered Office Address</h6>
                <span>
                  Local Shopppee Internet Private Limited, <br />
                   Buildings Alyssa, <br />
                  Begonia &Clove Embassy Tech Village, <br />
                   Outer Ring Road, <br />
                  Devarabeesanahalli Village, <br />
                  Bengaluru, 560103, Karnataka,India  <br />
                  CIN : U51109KA2012PTC066107 <br />
                  Telephone: 044-45614700 /044-67415800 <br />
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <div className="d-flex align-items-center justify-content-center">
           <p>©2025 LocalShoppee.com</p> 
          </div>
        </div>
      </div>
    </>
  );
}

export default UserFooter;
