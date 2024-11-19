// src/Register.js
import React, { useState } from "react";
import { fetchData } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import CustomButton from "../../Atoms/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

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

    const { success } = await fetchData(
      "/mate/api/v1/users/register",
      "POST",
      formData
    );
    if (success) {
      toast.success("User registered successfully!");
      setFormData({ mobile: "", name: "", state: "", district: "" });
      setErrors({});
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-3">
            <img
            src="/smartphone.png"
            alt="Male"
            style={{ width: "50px", marginBottom: "20px" }}
          />
            <h3>Register</h3>
           
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && (
                <div className="invalid-feedback">{errors.mobile}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className={`form-control ${errors.state ? "is-invalid" : ""}`}
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && (
                <div className="invalid-feedback">{errors.state}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="district" className="form-label">
                District
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.district ? "is-invalid" : ""
                }`}
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
              {errors.district && (
                <div className="invalid-feedback">{errors.district}</div>
              )}
            </div>
            <Footer>
              <CustomButton type="primary" label={"Register"} className="btn btn-primary w-100">
                
              </CustomButton>
            </Footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
