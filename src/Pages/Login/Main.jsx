import React from "react";
import CustomButton from "../../Atoms/CustomButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css"; // Custom CSS for any additional styling
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-between vh-100">
      <section className="d-flex flex-column align-items-center w-100" style={{ flex: 1 }}>
        <img
          src="your-image-url.jpg" // Add your image URL here
          alt="Welcome"
          className="img-fluid w-100 h-100 object-fit-cover"
        />
      </section>

      <section className="text-center">
        <h1>Welcome to biomate.com!</h1>
        <p>Say goodbye to the traditional, outdated paper biodata.</p>
      </section>

      <section className="d-flex flex-column gap-2 w-75 mx-auto">
        <CustomButton
          type="primary"
          onClick={handleCreateAccount}
          label="Create Account"
          className="btn btn-danger w-100"
        />
        <CustomButton
          type="secondary"
          onClick={handleLogin}
          label="Login with OTP"
        />
      </section>
    </div>
  );
};

export default Main;
