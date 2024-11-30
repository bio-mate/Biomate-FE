import React, { useState } from "react";
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
  gotraOptions,
  incomeOptions,
  employeeInOptions,
  hobbiesList,
  financialStatus,
} from "../../constant/constant";

import "../../styles/PhotoUpload.css";
import Navbar from "../../components/Navbar";
import MultiCheckboxTabs from "../../Atoms/MultiCheckboxTabs";
import TextArea from "../../Atoms/TextArea";

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between; /* Align items to edges */
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 20px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AddProfile = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

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
    console.log("namename",name)
    console.log("valuevalue",value)
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
        const keys = name.split('.');
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
      if (image.url) {
        formData.append(`profileImages[${index}]`, image.file);
      }
    });

    kundaliImages.forEach((image, index) => {
      if (image.url) {
        formData.append(`kundaliImages[${index}]`, image.file);
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
  const heightOptions = [];
  for (let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches < 12; inches++) {
      const height = `${feet}'${inches}"`;
      heightOptions.push(height);
      if (feet === 7 && inches === 0) break; // Stop at 7'0"
    }
  }

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
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
          </div>
        )}

        {/* Age */}
        {step === 2 && (
          <div>
            <img src="/age.png" alt="Age" className="step-icon" />
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
        )}

        {/* Height */}
        {step === 3 && (
          <div>
            <img src="/height.png" alt="Height" className="step-icon" />
            <TextInput
              label="Height"
              name="height"
              type="number"
              value={personalDetails.height}
              onChange={(e) => handleChange(e, setPersonalDetails)}
              error={errors.height}
              required
            />
          </div>
        )}
        {/* {step === 3 && (
          <div>
            <img src="/height.png" alt="Height" className="step-icon" />
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
        )} */}

        {/* Weight */}
        {step === 4 && (
          <div>
            <img src="/weight.png" alt="Weight" className="step-icon" />
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
        )}

        {/* Gender */}
        {step === 5 && (
          <div>
            <img src="/gender.png" alt="Gender" className="step-icon" />
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

        {/* Complexion */}
        {step === 6 && (
          <div>
            <img src="/skin-care.png" alt="Complexion" className="step-icon" />
            <IconRadioGroup
              label="Select Complexion"
              options={complexions}
              selectedValue={personalDetails.complexion}
              onChange={handleComplexionSelect}
              error={errors.complexion}
            />
          </div>
        )}

        {/* Blood Group */}
        {step === 7 && (
          <div>
            <img src="/blood.png" alt="Blood Group" className="step-icon" />
            <IconRadioGroup
              label="Blood Group"
              options={bloodGroups}
              selectedValue={personalDetails.blood_group}
              onChange={handleBloodGroupSelect}
              error={errors.blood_group}
            />
          </div>
        )}

        {/* Religious Details */}
        {step === 8 && (
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
        {step === 9 && (
          <div>
            <img src="/astrology.png" alt="Astrology" className="step-icon" />
            <h3>Astro Details</h3>
            <TextInput
              label="Date of Birth"
              name="dob"
              type="date"
              value={astroDetails.dob}
              onChange={(e) => handleChange(e, setAstroDetails)}
              error={errors.dob}
              required
            />
            <TextInput
              label="Place of Birth"
              name="pob"
              value={astroDetails.pob}
              onChange={(e) => handleChange(e, setAstroDetails)}
              error={errors.pob}
              required
            />
            <TextInput
              label="Time of Birth"
              name="tob"
              type="time"
              value={astroDetails.tob}
              onChange={(e) => handleChange(e, setAstroDetails)}
            />
            <DropdownInput
              label="Select Rashi"
              name="rashi"
              value={astroDetails.rashi}
              onChange={(e) => handleChange(e, setAstroDetails)}
              options={rashiOptions}
              error={errors.rashi}
            />
            <TextInput
              label="Nakshatra"
              name="nakshatra"
              value={astroDetails.nakshatra}
              onChange={(e) => handleChange(e, setAstroDetails)}
            />
          </div>
        )}

        {/* Family Details */}
        {step === 10 && (
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
            <TextInput
              label="Father's Occupation"
              name="fatherOccupation"
              value={familyDetails.fatherOccupation}
              onChange={(e) => handleChange(e, setFamilyDetails)}
            />
            <TextInput
              label="Mother's Occupation"
              name="motherOccupation"
              value={familyDetails.motherOccupation}
              onChange={(e) => handleChange(e, setFamilyDetails)}
            />
            <TextInput
              label="No. of Brothers"
              name="noOfBrothers"
              type="number"
              value={familyDetails.noOfBrothers}
              onChange={(e) => handleChange(e, setFamilyDetails)}
            />
            <TextInput
              label="No. of Sisters"
              name="noOfSisters"
              type="number"
              value={familyDetails.noOfSisters}
              onChange={(e) => handleChange(e, setFamilyDetails)}
            />
            <DropdownInput
              label="Family Financial Status"
              name="familyFinancialStatus"
              value={familyDetails.familyFinancialStatus}
              onChange={(e) => handleChange(e, setFamilyDetails)}
              options={financialStatus}
              error={errors.familyFinancialStatus}
            />
            <DropdownInput
              label="Family Income Range"
              name="familyIncome"
              value={familyDetails.familyIncome}
              onChange={(e) => handleChange(e, setFamilyDetails)}
              options={incomeOptions}
              error={errors.familyIncome}
            />
          </div>
        )}

        {/* Education Details */}
        {step === 11 && (
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
        {step === 12 && (
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
        {step === 13 && (
          <div>
            <img
              src="/placeholder.png"
              alt="Address"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Address Details</h3>

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
              <TextInput
                label="State"
                name="residential.state"
                type="text" // Assuming TextInput can handle type
                value={address.residential.state}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />
              <TextInput
                label="District"
                name="residential.district"
                type="text" // Assuming TextInput can handle type
                value={address.residential.district}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />
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
              <TextInput
                label="State"
                name="permanent.state"
                type="text" // Assuming TextInput can handle type
                value={address.permanent.state}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />
              <TextInput
                label="District"
                name="permanent.district"
                type="text" // Assuming TextInput can handle type
                value={address.permanent.district}
                onChange={(e) => handleAddressChange(e, setAddress)}
              />
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
        )}
        {/* Contact  Details */}
        {step === 14 && (
          <div>
            <img
              src="/instagram.png"
              alt="Social Media"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <TextInput
              label="Parent Contact no"
              name="parentNumber"
              type="number" // Assuming TextInput can handle type
              value={contactDetails.parentNumber}
              onChange={(e) => handleChange(e, setContactDetails)}
            />
            <TextInput
              label="Self Contact no"
              name="selfNumber"
              type="number" // Assuming TextInput can handle type
              value={contactDetails.selfNumber}
              onChange={(e) => handleChange(e, setContactDetails)}
            />
            <h3>Social Media Links</h3>
            <TextInput
              label="Facebook"
              name="facebook"
              value={socialMedia.facebook}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, facebook: e.target.value })
              }
              error={errors.facebook}
            />
            <TextInput
              label="LinkedIn"
              name="linkedin"
              value={socialMedia.linkedin}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, linkedin: e.target.value })
              }
              error={errors.linkedin}
            />
            <TextInput
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
        {step === 15 && (
          <div>
            <img
              src="/lifestyle.png"
              alt="Lifestyle"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Lifestyle Details</h3>
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
        )}
        {/* hobbies Detsila */}
        {step === 16 && (
          <div>
            <img
              src="/hobbies.png"
              alt="Hobbies"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <div>
              <label>Select Hobbies (max 10)</label>
              <MultiCheckboxTabs
                options={hobbiesList}
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
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.hobbies}
                </p>
              )}
            </div>
          </div>
        )}
        {/* About Me */}
        {step === 17 && (
          <div>
            <img
              src="/feedback.png"
              alt="Feedback"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <TextArea
              label="Provide Your Feedback"
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
          </div>
        )}
        {/* Looking For */}
        {step === 18 && (
          <div>
            <img
              src="/feedback.png"
              alt="Looking For"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <TextArea
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
        )}

        {/* Upload Profile Images */}

        {step === 19 && (
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
        {step === 20 && (
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

        <div>
          <Footer>
            {step < 20 ? (
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
      </form>
    </>
  );
};

export default AddProfile;
