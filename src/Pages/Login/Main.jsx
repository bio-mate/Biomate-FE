import React from "react";
import CustomButton from "../../Atoms/CustomButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css"; // Import your custom CSS for any additional styling
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate()
  const handleCreateAccount = () => {
    navigate(`/register`)
  };

  const handleLogin = () => {
    navigate(`/login`)
  };

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-between"
      style={{ height: "100vh" }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{ height: "60vh", width: "100%" }}
      >
        <img
          src=""
          alt="img"
          className="img-fluid"
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
      </div>
      <div>
        <h1>Welcome to biomate.com!</h1>
        {/* <p>
          Your Personalized Wedding Biodata Solution. Start your journey with
          BioMate today, and create a biodata that tells your story beautifully.
        </p> */}
        <p>Say goodbye to the traditional, outdated paper biodata.</p>
      </div>
      <div className="d-flex flex-column gap-2 w-100 px-4 mb-2">
        <CustomButton
          type="primary"
          onClick={handleCreateAccount}
          label="Create Account"
          className="btn btn-danger w-100" // Applying Bootstrap danger class for red button
        />
        <CustomButton
          type="secondary"
          onClick={handleLogin}
          label="Login with OTP"
          className="btn btn-danger w-100" // Applying Bootstrap danger class for red button
        />
        
      </div>
    </div>
  );
};

export default Main;
