import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CustomButton from "../../Atoms/CustomButton";
import TextInput from "../../Atoms/TextInput"; // Import the reusable TextInput component
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
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

const Register = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    name: "",
    state: "",
    district: "",
  });

  const [errors, setErrors] = useState({});
const navigate = useNavigate('')
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.district) newErrors.district = "District is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/mate/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.data.success) {
        toast.success("User registered successfully!");
        setFormData({ mobile: "", name: "", state: "", district: "" });
        setErrors({});
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error("Registration failed! Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4">
            <img
              src="/smartphone.png"
              alt="Mobile"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Register</h3>

            <TextInput
              label="Mobile Number"
              name="mobile"
              type="text"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              error={errors.mobile}
              required
              icon={<i className="bi bi-phone" />}
            />

            <TextInput
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              icon={<i className="bi bi-person" />}
            />

            <TextInput
              label="State"
              name="state"
              type="text"
              placeholder="Enter your state"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              required
              icon={<i className="bi bi-geo-alt" />}
            />

            <TextInput
              label="District"
              name="district"
              type="text"
              placeholder="Enter your district"
              value={formData.district}
              onChange={handleChange}
              error={errors.district}
              required
              icon={<i className="bi bi-house" />}
            />

            <Footer>
              <CustomButton
                type="primary"
                label="Register"
                className="btn btn-primary w-100"
                onClick={handleSubmit}
              />
            </Footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
