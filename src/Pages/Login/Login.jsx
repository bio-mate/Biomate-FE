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
  const navigate = useNavigate();

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
    } catch (err) {
      toast.error("Error sending OTP. Please try again later.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 4) {
      toast.error("OTP must be 4 digits");
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
        localStorage.setItem("authToken", token);
        login({ mobile, token }); // Store user credentials in context
        setMobile("");
        setOtp("");
        setOtpSent(false);
        navigate("/profile");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      toast.error("Error verifying OTP. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleVerifyOtp} className="p-4">
            <div className="mb-3 text-center">
              <img
                src="/smartphone.png"
                alt="Smartphone Icon"
                style={{ width: "50px", marginBottom: "20px" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                <h2>What is your Mobile Number?</h2>
              </label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={otpSent}
              />
              <p style={{ fontSize: "12px", color: "red" }}>
                You will receive an SMS with a verification code.
              </p>
              {error && <div className="invalid-feedback">{error}</div>}
            </div>

            {!otpSent && (
              <Footer>
                <CustomButton
                  type="primary"
                  className="btn btn-secondary w-100"
                  onClick={handleSendOtp}
                  label="Send OTP"
                />
              </Footer>
            )}

            {otpSent && (
              <>
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
                <CustomButton
                  type="submit"
                  className="btn btn-primary w-100"
                  label="Submit OTP"
                  onClick={handleVerifyOtp}
                />
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
