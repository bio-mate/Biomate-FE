// src/Login.js
import React, { useState } from "react";
import { fetchData } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../../context/userContext"; // Import the context
import CustomButton from "../../Atoms/CustomButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Footer = styled.div`
    position: fixed;
    bottom: 20px;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  
const Login = () => {
  const { login } = useUserContext(); // Get the login function from context
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate()

  

  const validateMobile = () => {
    if (!mobile) {
      setError("Mobile number is required");
      return false;
    } else if (!/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be 10 digits");
      return false;
    }
    setError("");
    return true;
  };

  const handleSendOtp = async () => {
    if (!validateMobile()) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    try {
      const { success } = await fetchData(
        "/mate/api/v1/auth/otp/send",
        "POST",
        { mobile }
      );
      if (success) {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again later.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 4) {
      setError("OTP must be 4 digits");
      return;
    }

    try {
      const { success, token } = await fetchData(
        "/mate/api/v1/users/generate-token",
        "POST",
        { mobile, code: otp }
      );
      if (success) {
        toast.success("Login successful!");
        login({ mobile, token }); // Store user credentials in context
        setMobile("");
        setOtp("");
        setOtpSent(false);
        navigate('/addProfile')
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error verifying OTP. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* <h3 className="text-center">Login</h3> */}
          
          <form onSubmit={handleVerifyOtp} className="p-4">
            <div className="mb-3">
            <img
            src="/smartphone.png"
            alt="Male"
            style={{ width: "50px", marginBottom: "20px" }}
          />
              <label htmlFor="mobile" className="form-label">
                <h2>What is your Mobile Number?</h2>
              </label>
              <input
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={otpSent}
              />

              <p style={{fontSize:'12px'}}>You will receive an SMS with varification code</p>
              {error && <div className="invalid-feedback">{error}</div>}
            </div>

            {!otpSent && (
              <Footer>
                <CustomButton
                  type="primary"
                  className="btn btn-secondary w-100 mb-3"
                  onClick={handleSendOtp}
                  label={"Send OTP"}
                ></CustomButton>
              </Footer>
            )}

            {otpSent && (
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            {otpSent && (
              <CustomButton
                type="primary"
                className="btn btn-primary w-100"
                label={"Submit OTP"}
                onClick={handleVerifyOtp}
              ></CustomButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
