import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Atoms/CustomButton";
import ProgressBar from "../../Atoms/ProgressBar";
import axios from "axios";
import styled from "styled-components";
import "../../styles/InputField.css";
import IconRadioGroup from "../../Atoms/IconRadioGroup";
import TextInput from "../../Atoms/TextInput";
import DropdownInput from "../../Atoms/DropdownInput";
import {
  titles,
  complexions,
  bloodGroups,
  genderOptions,
  religionOptions,
  rashiOptions,
  nakshatraOptions,
  occupationOptions,
  gotraOptions,
  incomeOptions,
  employeeInOptions,
  hobbiesOptions,
  financialStatusOptions,
  heightOptions,
} from "../../constant/constant";

import "../../styles/PhotoUpload.css";
import Navbar from "../../components/Navbar";
import MultiCheckboxTabs from "../../Atoms/MultiCheckboxTabs";
import TextArea from "../../Atoms/TextArea";
import { FaFacebook, FaInstagram, FaLinkedin, FaUser } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between; /* Align items to edges */
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  bottom: 20px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
`;
const AddProfile = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [stateCityData, setStateCityData] = useState({}); // Full state-city data from API

  // States for each section
  const [personalDetails, setPersonalDetails] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    age: "",
    gender: "",
    blood_group: "",
    complexion: "",
    height: "",
    // height: { feet: "", inch: "" },
    weight: "",
    hobbies: [],
    aboutMe: "",
    lookingFor: "",
  });

  const [contactDetails, setContactDetails] = useState({
    parentNumber: "",
    selfNumber: "",
  });

  const [religiousDetails, setReligiousDetails] = useState({
    religion: "",
    caste: "",
    subCaste: "",
    language: "",
    gotra: "",
  });

  const [astroDetails, setAstroDetails] = useState({
    dob: "",
    pob: "",
    tob: "",
    rashi: "",
    nakshatra: "",
  });

  const [familyDetails, setFamilyDetails] = useState({
    fatherName: "",
    motherName: "",
    brotherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    noOfBrothers: "",
    noOfSisters: "",
    familyFinancialStatus: "",
    familyIncome: "",
  });

  const [educationDetails, setEducationDetails] = useState({
    degree: "",
    collegeName: "",
  });

  const [employmentDetails, setEmploymentDetails] = useState({
    employeeIn: "",
    companyName: "",
    designation: "",
    income: "",
  });

  const [address, setAddress] = useState({
    nativePlace: "",
    residential: { state: "", district: "", pinCode: "", addressLine: "" },
    permanent: { state: "", district: "", pinCode: "", addressLine: "" },
  });
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    linkedin: "",
    instagram: "",
  });

  const [profileImages, setProfileImages] = useState([{ url: "", status: 1 }]);
  const [kundaliImages, setKundaliImages] = useState([{ url: "", status: 1 }]);

  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [isPublished, setIsPublished] = useState(false);
  const [diet, setDiet] = useState("");
  const [errors, setErrors] = useState({});

  // Handler for updating input fields

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    console.log("namename", name);
    console.log("valuevalue", value);
    setState((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Clear error when input is changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleAddressChange = (e, setState) => {
    const { name, value } = e.target;

    setState((prevDetails) => {
      // Split the name to handle nested keys
      const keys = name.split(".");
      const newDetails = { ...prevDetails };

      // Navigate to the appropriate level and update the value
      let current = newDetails;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      return newDetails;
    });
  };

  // Navigate through steps
  const handleNext = () => {
    // if (validateFields()) {
    setStep(step + 1);
    // }
    console.log("step", step);
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("personalDetails", JSON.stringify(personalDetails));
    formData.append("contactDetails", JSON.stringify(contactDetails));
    formData.append("religiousDetails", JSON.stringify(religiousDetails));
    formData.append("astroDetails", JSON.stringify(astroDetails));
    formData.append("familyDetails", JSON.stringify(familyDetails));
    formData.append("educationDetails", JSON.stringify(educationDetails));
    formData.append("employmentDetails", JSON.stringify(employmentDetails));
    formData.append("address", JSON.stringify(address));
    formData.append("socialMedia", JSON.stringify(socialMedia));
    formData.append("paymentStatus", paymentStatus);
    formData.append("isPublished", isPublished);
    formData.append("diet", diet);

    profileImages.forEach((image, index) => {
      if (image.file) {
        formData.append(`profileImages[${index}]`, image.file);
        formData.append(`profileImages[${index}][status]`, "1");
        formData.append(`profileImages[${index}][primary]`, "0");
      }
    });

    kundaliImages.forEach((image, index) => {
      if (image.file) {
        formData.append(`kundaliImages[${index}]`, image.file);
        formData.append(`kundaliImages[${index}][status]`, "1");
        formData.append(`kundaliImages[${index}][primary]`, "0");
      }
    });

    // Retrieve token
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found. Please log in.");
      return; // Exit if there's no token
    }

    try {
      const response = await axios.post("/mate/api/v1/profile/save", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
      const id = response.data.data.newUserProfile._id;
      navigate(`/user-profile/success/${id}`); // Navigate on success
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const filteredFiles = files.filter((file) => file.size <= 3 * 1024 * 1024);
    const limitedFiles =
      type === "profile"
        ? filteredFiles.slice(0, 6)
        : filteredFiles.slice(0, 2);

    if (type === "profile") {
      setProfileImages((prevImages) => [
        ...prevImages,
        ...limitedFiles.map((file) => ({
          file,
          url: URL.createObjectURL(file),
          status: 1,
        })),
      ]);
    } else if (type === "kundali") {
      setKundaliImages((prevImages) => [
        ...prevImages,
        ...limitedFiles.map((file) => ({
          file,
          url: URL.createObjectURL(file),
          status: 1,
        })),
      ]);
    }
  };

  // Handler to remove an image
  const handleRemoveImage = (index, type) => {
    if (type === "profile") {
      setProfileImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setKundaliImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleComplexionSelect = (complexion) => {
    setPersonalDetails({ ...personalDetails, complexion });
  };

  const handleBloodGroupSelect = (blood_group) => {
    setPersonalDetails({ ...personalDetails, blood_group });
  };
  const handleGenderSelect = (gender) => {
    setPersonalDetails({ ...personalDetails, gender });
    console.log("gender", gender);
  };

  const token = localStorage.getItem("authToken");

  // Fetch states and districts on component mount
  useEffect(() => {
    const fetchStatesAndCities = async () => {
      try {
        const response = await axios.get(`/mate/api/v1/global/state-city`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data.stateCities; // Extract state-city data
        setStateCityData(data); // Save the entire structure
        setStates(Object.keys(data)); // Extract state names as keys
      } catch (error) {
        console.error("Error fetching state-city data:", error);
      }
    };

    fetchStatesAndCities();
  }, [token]);

  // Handle state selection
  const handleStateChange = (e) => {
    const selectedState = e.target.value;

    // Update state in the address and reset district
    setAddress((prevAddress) => ({
      ...prevAddress,
      residential: { ...prevAddress.residential, state: selectedState, district: "" },
    }));

    // Update the districts dropdown based on the selected state
    if (selectedState && stateCityData[selectedState]) {
      setDistricts(stateCityData[selectedState]); // Districts for the selected state
    } else {
      setDistricts([]); // Clear districts if no state is selected
    }
  };

  // Handle district selection
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;

    // Update district in the address
    setAddress((prevAddress) => ({
      ...prevAddress,
      residential: { ...prevAddress.residential, district: selectedDistrict },
    }));
  };
  console.log("district", districts)
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        {step > 1 && (
          <Header>
            <div onClick={handlePrevious}>
              <img src="/back.png" alt="Male" style={{ width: "30px" }} />
            </div>
            <ProgressBar currentStep={step} titles={titles} />
          </Header>
        )}

        {/* Personal Details */}
        {step === 1 && (
          <div>
            <ProgressBar currentStep={step} titles={titles} />
            <img src="/user.png" alt="User" className="step-icon" />
            <h3>Personal Details</h3>
            <TextInput
              label="First Name"
              name="first_name"
              type="text"
              value={personalDetails.first_name}
              onChange={(e) => handleChange(e, setPersonalDetails)}
              error={errors.first_name}
              required
            />
            <TextInput
              label="Middle Name"
              name="middle_name"
              type="text"
              value={personalDetails.middle_name}
              onChange={(e) => handleChange(e, setPersonalDetails)}
              error={errors.middle_name}
            />
            <TextInput
              label="Last Name"
              name="last_name"
              type="text"
              value={personalDetails.last_name}
              onChange={(e) => handleChange(e, setPersonalDetails)}
              error={errors.last_name}
              required
            />
            <label style={{ marginBottom: "10px" }}>Select Gender</label>
            <IconRadioGroup
              label="Select Gender"
              name="gender"
              options={genderOptions}
              selectedValue={personalDetails.gender}
              onChange={handleGenderSelect}
              error={errors.gender}
            />
          </div>
        )}

        {/* Age */}
        {step === 2 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "45%" }}>
                <TextInput
                  label="Age"
                  name="age"
                  type="number"
                  value={personalDetails.age}
                  onChange={(e) => handleChange(e, setPersonalDetails)}
                  error={errors.age}
                  required
                />
              </div>
              <div style={{ width: "45%" }}>
                <TextInput
                  label="Weight"
                  name="weight"
                  type="number"
                  value={personalDetails.weight}
                  onChange={(e) => handleChange(e, setPersonalDetails)}
                  error={errors.weight}
                  required
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                <DropdownInput
                  label="Height"
                  name="height"
                  value={personalDetails.height}
                  onChange={(e) => handleChange(e, setPersonalDetails)}
                  options={heightOptions}
                  error={errors.height}
                  required
                />
              </div>
              <div>
                <DropdownInput
                  label="Blood Group"
                  name="blood_group"
                  value={personalDetails.blood_group}
                  onChange={(e) => handleChange(e, setPersonalDetails)}
                  options={bloodGroups}
                  error={errors.blood_group}
                  required
                />
              </div>
            </div>
            <div>
              <label style={{ marginBottom: "10px" }}>Select Complexion</label>
              <IconRadioGroup
                label="Select Complexion"
                options={complexions}
                selectedValue={personalDetails.complexion}
                onChange={handleComplexionSelect}
                error={errors.complexion}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <img src="/pray.png" alt="Religion" className="step-icon" />
            <h3>Religious Details</h3>
            <DropdownInput
              label="Select Religion"
              name="religion"
              value={religiousDetails.religion}
              onChange={(e) => handleChange(e, setReligiousDetails)}
              options={religionOptions}
              error={errors.religion}
              required
            />
            <TextInput
              label="Caste"
              name="caste"
              value={religiousDetails.caste}
              onChange={(e) => handleChange(e, setReligiousDetails)}
              error={errors.caste}
              required
            />
            <TextInput
              label="Sub Caste"
              name="subCaste"
              value={religiousDetails.subCaste}
              onChange={(e) => handleChange(e, setReligiousDetails)}
              error={errors.subCaste}
              required
            />
            <TextInput
              label="Mother Tongue"
              name="language"
              value={religiousDetails.language}
              onChange={(e) => handleChange(e, setReligiousDetails)}
            />
            <TextInput
              label="Gotra"
              name="gotra"
              value={religiousDetails.gotra}
              onChange={(e) => handleChange(e, setReligiousDetails)}
            />
          </div>
        )}

        {/* Astro Details */}
        {step === 4 && (
          <div>
            <img src="/astrology.png" alt="Astrology" className="step-icon" />
            <h3>Astro Details</h3>

            <TextInput
              label="Place of Birth"
              name="pob"
              value={astroDetails.pob}
              onChange={(e) => handleChange(e, setAstroDetails)}
              error={errors.pob}
              required
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextInput
                label="Date of Birth"
                name="dob"
                type="date"
                value={astroDetails.dob}
                onChange={(e) => handleChange(e, setAstroDetails)}
                error={errors.dob}
                required
              />
              <div
                style={{
                  width: "50%",
                }}
              >
                <TextInput
                  label="Time of Birth"
                  name="tob"
                  type="time"
                  value={astroDetails.tob}
                  onChange={(e) => handleChange(e, setAstroDetails)}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <DropdownInput
                label="Select Rashi"
                name="rashi"
                value={astroDetails.rashi}
                onChange={(e) => handleChange(e, setAstroDetails)}
                options={rashiOptions}
                error={errors.rashi}
              />
              <DropdownInput
                label="Select Nakshatra"
                name="nakshatra"
                value={astroDetails.nakshatra} // State value for nakshatra
                onChange={(e) => handleChange(e, setAstroDetails)} // Your handler function
                options={nakshatraOptions}
                error={errors.nakshatra} // Validation error message, if any
                required
              />
            </div>
          </div>
        )}

        {/* Family Details */}
        {step === 5 && (
          <div>
            <img src="/family.png" alt="Family" className="step-icon" />
            <h3>Family Details</h3>
            <TextInput
              label="Father's Name"
              name="fatherName"
              value={familyDetails.fatherName}
              onChange={(e) => handleChange(e, setFamilyDetails)}
              error={errors.fatherName}
              required
            />
            <TextInput
              label="Mother's Name"
              name="motherName"
              value={familyDetails.motherName}
              onChange={(e) => handleChange(e, setFamilyDetails)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "45%" }}>
                <DropdownInput
                  label="Father's Occupation"
                  name="fatherOccupation"
                  value={familyDetails.fatherOccupation}
                  onChange={(e) => handleChange(e, setFamilyDetails)}
                  options={occupationOptions}
                  error={errors.fatherOccupation}
                />
              </div>
              <div style={{ width: "45%" }}>
                <DropdownInput
                  label="Mother's Occupation"
                  name="motherOccupation"
                  value={familyDetails.motherOccupation}
                  onChange={(e) => handleChange(e, setFamilyDetails)}
                  options={occupationOptions}
                  error={errors.motherOccupation}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "45%" }}>
                <TextInput
                  label="No. of Brothers"
                  name="noOfBrothers"
                  type="number"
                  value={familyDetails.noOfBrothers}
                  onChange={(e) => handleChange(e, setFamilyDetails)}
                />
              </div>
              <div style={{ width: "45%" }}>
                <TextInput
                  label="No. of Sisters"
                  name="noOfSisters"
                  type="number"
                  value={familyDetails.noOfSisters}
                  onChange={(e) => handleChange(e, setFamilyDetails)}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "45%" }}>
                <DropdownInput
                  label="Family Financial Status"
                  name="familyFinancialStatus"
                  value={familyDetails.familyFinancialStatus}
                  onChange={(e) => handleChange(e, setFamilyDetails)}
                  options={financialStatusOptions}
                  error={errors.familyFinancialStatus}
                />
              </div>
              <div style={{ width: "45%" }}>
                <DropdownInput
                  label="Family Income Range"
                  name="familyIncome"
                  value={familyDetails.familyIncome}
                  onChange={(e) => handleChange(e, setFamilyDetails)}
                  options={incomeOptions}
                  error={errors.familyIncome}
                />
              </div>
            </div>
          </div>
        )}

        {/* Education Details */}
        {step === 6 && (
          <div>
            <img
              src="/education.png"
              alt="Education"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Education Details</h3>
            <TextInput
              label="Degree"
              name="degree"
              value={educationDetails.degree}
              onChange={(e) => handleChange(e, setEducationDetails)}
              error={errors.degree}
            />
            <TextInput
              label="College Name"
              name="collegeName"
              value={educationDetails.collegeName}
              onChange={(e) => handleChange(e, setEducationDetails)}
            />
          </div>
        )}
        {/* Career Details */}
        {step === 7 && (
          <div>
            <img
              src="/office.png"
              alt="Office"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Employment Details</h3>
            <DropdownInput
              label="Are you employed in"
              name="employeeIn"
              value={employmentDetails.employeeIn}
              onChange={(e) => handleChange(e, setEmploymentDetails)}
              options={employeeInOptions}
              error={errors.employeeIn}
            />
            <TextInput
              label="Company Name"
              name="companyName"
              value={employmentDetails.companyName}
              onChange={(e) => handleChange(e, setEmploymentDetails)}
            />
            <TextInput
              label="Designation"
              name="designation"
              value={employmentDetails.designation}
              onChange={(e) => handleChange(e, setEmploymentDetails)}
            />
            <DropdownInput
              label="Select Income Range"
              name="income"
              value={employmentDetails.income}
              onChange={(e) => handleChange(e, setEmploymentDetails)}
              options={incomeOptions}
              error={errors.income}
            />
          </div>
        )}
        {/* Address Details */}
        {/* {step === 8 && (
          <div>
            <div>
              <img
                src="/placeholder.png"
                alt="Male"
                style={{ width: "50px", marginBottom: "20px" }}
              />
              <h3>Address Details</h3>

              <TextInput
                label="Native Place"
                name="nativePlace"
                type="text" // Assuming TextInput can handle type
                onChange={(e) => handleChange(e, setAddress)}
              />

              <h4>Residential Address</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ width: "45%" }}>
                  <TextInput
                    label="State"
                    name="residential.state"
                    type="text" // Assuming TextInput can handle type
                    value={address.residential.state}
                    onChange={(e) => handleAddressChange(e, setAddress)}
                  />
                </div>
                <div style={{ width: "45%" }}>
                  <TextInput
                    label="District"
                    name="residential.district"
                    type="text" // Assuming TextInput can handle type
                    value={address.residential.district}
                    onChange={(e) => handleAddressChange(e, setAddress)}
                  />
                </div>
              </div>
              <TextInput
                label="Pin-Code"
                name="residential.pinCode"
                type="text" // Assuming TextInput can handle type
                value={address.residential.pinCode}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />

              <TextInput
                label="Address Line"
                name="residential.addressLine"
                type="text" // Assuming TextInput can handle type
                value={address.residential.addressLine}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />

              <h4>Permanent Address</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ width: "45%" }}>
                  <TextInput
                    label="State"
                    name="permanent.state"
                    type="text" // Assuming TextInput can handle type
                    value={address.permanent.state}
                    onChange={(e) => handleAddressChange(e, setAddress)}
                  />
                </div>
                <div style={{ width: "45%" }}>
                  <TextInput
                    label="District"
                    name="permanent.district"
                    type="text" // Assuming TextInput can handle type
                    value={address.permanent.district}
                    onChange={(e) => handleAddressChange(e, setAddress)}
                  />
                </div>
              </div>
              <TextInput
                label="Pin-Code"
                name="permanent.pinCode"
                type="text" // Assuming TextInput can handle type
                value={address.permanent.pinCode}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />

              <TextInput
                label="Address Line"
                name="permanent.addressLine"
                type="text" // Assuming TextInput can handle type
                value={address.permanent.addressLine}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />
            </div>
          </div>
        )} */}
        {step === 8 && (
          <div>
            <div>
              <img
                src="/placeholder.png"
                alt="Male"
                style={{ width: "50px", marginBottom: "20px" }}
              />
              <h3>Address Details</h3>

              <TextInput
                label="Native Place"
                name="nativePlace"
                type="text"
                onChange={(e) => handleChange(e, setAddress)}
              />

              <h4>Residential Address</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                
                <div style={{display:'flex'}}>
                  <div style={{ width: "45%", marginBottom: "20px", marginRight:'20px' }}>
                    <label htmlFor="state">State</label>
                    <select
                      id="state"
                      name="residential.state"
                      value={address.residential.state}
                      onChange={handleStateChange}
                      className="form-control"
                    >
                      <option value="">Select a State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ width: "45%" }}>
                    <label htmlFor="district">District</label>
                    <select
                      id="district"
                      name="residential.district"
                      value={address.residential.district}
                      onChange={handleDistrictChange}
                      className="form-control"
                      disabled={!address.residential.state}
                    >
                      <option value="">Select a District</option>
                      {districts.map((district, index) => (
                        <option key={index} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <TextInput
                label="Pin-Code"
                name="residential.pinCode"
                type="text"
                value={address.residential.pinCode}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />

              <TextInput
                label="Address Line"
                name="residential.addressLine"
                type="text"
                value={address.residential.addressLine}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />

              <div style={{ marginTop: "20px" }}>
                <label style={{ display: "flex" }}>
                  <input
                    type="checkbox"
                    style={{
                      marginRight: "8px",
                      width: "10%",
                      padding: "20px",
                    }}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAddress((prev) => ({
                          ...prev,
                          permanent: { ...prev.residential },
                        }));
                      } else {
                        setAddress((prev) => ({
                          ...prev,
                          permanent: {
                            state: "",
                            district: "",
                            pinCode: "",
                            addressLine: "",
                          },
                        }));
                      }
                    }}
                  />
                  <span style={{ width: "100%" }}>
                    {" "}
                    Same as Residential Address
                  </span>
                </label>
              </div>

              <h4>Permanent Address</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ width: "45%" }}>
                  <TextInput
                    label="State"
                    name="permanent.state"
                    type="text"
                    value={address.permanent.state}
                    onChange={(e) => handleAddressChange(e, setAddress)}
                  />
                </div>
                <div style={{ width: "45%" }}>
                  <TextInput
                    label="District"
                    name="permanent.district"
                    type="text"
                    value={address.permanent.district}
                    onChange={(e) => handleAddressChange(e, setAddress)}
                  />
                </div>
              </div>
              <TextInput
                label="Pin-Code"
                name="permanent.pinCode"
                type="text"
                value={address.permanent.pinCode}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />

              <TextInput
                label="Address Line"
                name="permanent.addressLine"
                type="text"
                value={address.permanent.addressLine}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />
            </div>
          </div>
        )}

        {/* Contact  Details */}
        {step === 9 && (
          <div>
            <img
              src="/instagram.png"
              alt="Social Media"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <TextInput
              icon={<IoMdCall />}
              label="Parent Contact no"
              name="parentNumber"
              type="number" // Assuming TextInput can handle type
              value={contactDetails.parentNumber}
              onChange={(e) => handleChange(e, setContactDetails)}
            />
            <TextInput
              icon={<IoMdCall />}
              label="Self Contact no"
              name="selfNumber"
              type="number" // Assuming TextInput can handle type
              value={contactDetails.selfNumber}
              onChange={(e) => handleChange(e, setContactDetails)}
            />
            <h3>Social Media Links</h3>
            <TextInput
              icon={<FaFacebook />}
              label="Facebook"
              name="facebook"
              value={socialMedia.facebook}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, facebook: e.target.value })
              }
              error={errors.facebook}
            />
            <TextInput
              icon={<FaLinkedin />}
              label="LinkedIn"
              name="linkedin"
              value={socialMedia.linkedin}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, linkedin: e.target.value })
              }
              error={errors.linkedin}
            />
            <TextInput
              icon={<FaInstagram />}
              label="Instagram"
              name="instagram"
              value={socialMedia.instagram}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, instagram: e.target.value })
              }
              error={errors.instagram}
            />
          </div>
        )}
        {/* LifeStyle Details */}
        {step === 10 && (
          <>
            <div>
              <img
                src="/lifestyle.png"
                alt="Lifestyle"
                style={{ width: "50px", marginBottom: "20px" }}
              />
              <h3>Lifestyle Details</h3>

              {/* Diet Dropdown Input */}
              <DropdownInput
                label="Diet"
                name="diet"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                options={[
                  { label: "Select Diet", value: "" },
                  { label: "Vegetarian", value: "vegetarian" },
                  { label: "Non-Vegetarian", value: "non-vegetarian" },
                  { label: "Vegan", value: "vegan" },
                ]}
                error={errors.diet}
              />
            </div>

            {/* Hobbies Section */}
            {/* <div>
              <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                Select Hobbies (max 10)
              </label>

              
              <MultiCheckboxTabs
                options={hobbiesOptions}
                selectedOptions={personalDetails.hobbies}
                onChange={(newHobbies) =>
                  setPersonalDetails((prev) => ({
                    ...prev,
                    hobbies: newHobbies,
                  }))
                }
                maxSelection={10}
              />

            
              {errors.hobbies && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "5px",
                    marginBottom: "0", // Remove space below error message
                  }}
                >
                  {errors.hobbies}
                </p>
              )}
            </div> */}
          </>
        )}

        {/* About Me */}
        {step === 11 && (
          <>
            <div>
              <TextArea
                icon={<MdAccountCircle />}
                label="About Me"
                value={personalDetails.aboutMe}
                onChange={(value) =>
                  setPersonalDetails((prev) => ({
                    ...prev,
                    aboutMe: value,
                  }))
                }
                maxWords={1000}
                placeholder="Write your feedback here (max 1000 words)..."
                error={errors.aboutMe}
              />
              <div>
                <TextArea
                  icon={<CiSearch />}
                  label="What are you looking for?"
                  value={personalDetails.lookingFor}
                  onChange={(value) =>
                    setPersonalDetails((prev) => ({
                      ...prev,
                      lookingFor: value,
                    }))
                  }
                  maxWords={1000}
                  placeholder="Write your expectations here (max 1000 words)..."
                  error={errors.lookingFor}
                />
              </div>
            </div>
          </>
        )}

        {/* Upload Profile Images */}
        {step === 12 && (
          <div>
            <h3>Upload Profile Images</h3>
            <div className="image-upload-grid">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="image-box">
                  {profileImages[index] ? (
                    <div className="image-preview">
                      <img
                        src={profileImages[index].url}
                        alt={`Profile ${index + 1}`}
                      />
                      <button
                        onClick={() => handleRemoveImage(index, "profile")}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="upload-placeholder">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "profile")}
                      />
                      <span>+</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kundali Images */}
        {step === 13 && (
          <div>
            <h3>Upload Kundali Images</h3>
            <div className="image-upload-grid">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="image-box">
                  {kundaliImages[index] ? (
                    <div className="image-preview">
                      <img
                        src={kundaliImages[index].url}
                        alt={`Kundali ${index + 1}`}
                      />
                      <button
                        onClick={() => handleRemoveImage(index, "kundali")}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="upload-placeholder">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "kundali")}
                      />
                      <span>+</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
      <div>
        <Footer>
          {step < 13 ? (
            <CustomButton
              type="primary"
              onClick={handleNext}
              label={"Next"}
            ></CustomButton>
          ) : (
            <CustomButton
              type="primary"
              onClick={handleSubmit}
              label={"Submit"}
            ></CustomButton>
          )}
        </Footer>
      </div>
    </>
  );
};

export default AddProfile;
