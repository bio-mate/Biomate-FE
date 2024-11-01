import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate(`/signup`);
  };

  const handleLogin = () => {
    navigate(`/login`);
  };
  return (
    <div className="container mt-3 text-center">
      {/* Image at the top */}
      <img
        src="../weddingbg1.jpg" // Replace with your image path
        alt="Description"
        className="img-fluid mb-4"
        style={{ borderRadius: "10px", width: "", height: "400px" }} // Adjust size as needed
      />

      {/* Heading */}
      <h2 className="mb-3" style={{ color: "#d75b1c" }}>
        Welcome to BioMate
      </h2>

      {/* Description */}
      {/* <p className="mb-4">
        Your Personalized Wedding Biodata Solution. <br />
        Start your journey with BioMate today, and create a biodata that tells
        your story beautifully.
      </p> */}
      <p className="mb-2">
        Say goodbye to the traditional, outdated paper biodata.
      </p>

      {/* Buttons */}
      <div>
        <button
          className="btn btn-warning mr-2 text-white"
          style={{ backgroundColor: "#d75b1c", border: "none" }}
          onClick={handleRegister}
        >
          Register
        </button>
        <button
          className="btn btn-outline-warning"
          style={{ borderColor: "#d75b1c", color: "#d75b1c" }}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Main;
