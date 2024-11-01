// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:4000/api/auth/reset-password/${token}`, { password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Assuming a successful response has a status code of 200
      if (response.status === 200) {
        setMessage('Password has been reset successfully.');
      }
    } catch (error) {
      handleError(error);
    }
  };
  
  const handleError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      setMessage(error.response.data.message || 'An error occurred while resetting the password.');
    } else if (error.request) {
      // The request was made but no response was received
      setMessage('No response received from the server.');
    } else {
      // Something happened in setting up the request that triggered an Error
      setMessage('Error: ' + error.message);
    }
  };
  

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New Password" onChange={handleChange} required />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
