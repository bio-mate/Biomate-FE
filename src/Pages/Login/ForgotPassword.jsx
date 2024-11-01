// src/components/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming a successful response has a status code of 200
      if (response.status === 200) {
        setMessage("Password reset link sent to your email.");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      setMessage(
        error.response.data.message ||
          "An error occurred while sending the password reset link."
      );
    } else if (error.request) {
      // The request was made but no response was received
      setMessage("No response received from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
