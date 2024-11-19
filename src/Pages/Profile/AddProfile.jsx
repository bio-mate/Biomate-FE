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
} from "../../constant/constant";

import "../../styles/PhotoUpload.css";
import Navbar from "../../components/Navbar";

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
  });

  const [religiousDetails, setReligiousDetails] = useState({
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
    state: "",
    district: "",
    residentialAddress: "",
    permanentAddress: "",
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

  // const validateFields = () => {
  //   const newErrors = {};

  //   // Step 1: Personal Details Validation
  //   if (step === 1) {
  //     if (!personalDetails.first_name.trim())
  //       newErrors.first_name = "First name is required.";
  //     if (!personalDetails.middle_name.trim())
  //       newErrors.middle_name = "Middle name is required.";
  //     if (!personalDetails.last_name.trim())
  //       newErrors.last_name = "Last name is required.";
  //     if (!personalDetails.age || personalDetails.age < 18)
  //       newErrors.age = "Age must be 18 or older.";
  //     // if (!personalDetails.gender) newErrors.gender = "Gender is required.";
  //   }

  //   // Step 2: Religious Details Validation
  //   if (step === 2) {
  //     if (!religiousDetails.caste.trim())
  //       newErrors.caste = "Caste is required.";
  //     if (!religiousDetails.subCaste.trim())
  //       newErrors.subCaste = "Sub caste is required.";
  //   }

  //   // Step 3: Astrological Details Validation
  //   if (step === 3) {
  //     if (!astroDetails.dob) newErrors.dob = "Date of birth is required.";
  //     if (!astroDetails.pob.trim())
  //       newErrors.pob = "Place of birth is required.";
  //   }

  //   // Step 4: Family Details Validation
  //   if (step === 4) {
  //     if (!familyDetails.fatherName.trim())
  //       newErrors.fatherName = "Father's name is required.";
  //   }

  //   // Step 5: Education Details Validation
  //   if (step === 5) {
  //     if (!educationDetails.degree.trim())
  //       newErrors.degree = "Degree is required.";
  //   }

  //   // Step 6: Employment Details Validation
  //   if (step === 6) {
  //     if (!employmentDetails.employeeIn.trim())
  //       newErrors.employeeIn = "Employment status is required.";
  //   }

  //   // Step 7: Address Details Validation
  //   if (step === 7) {
  //     if (!address.state.trim()) newErrors.state = "State is required.";
  //     if (!address.district.trim())
  //       newErrors.district = "District is required.";
  //     if (!address.residentialAddress.trim())
  //       newErrors.residentialAddress = "Residential address is required.";
  //     if (!address.permanentAddress.trim())
  //       newErrors.permanentAddress = "Permanent address is required.";
  //   }

  //   // Step 8: Social Media Validation
  //   if (step === 8) {
  //     if (!socialMedia.facebook.trim())
  //       newErrors.facebook = "Facebook link is required.";
  //     if (!socialMedia.linkedin.trim())
  //       newErrors.linkedin = "LinkedIn link is required.";
  //     if (!socialMedia.instagram.trim())
  //       newErrors.instagram = "Instagram link is required.";
  //   }

  //   // Step 9: Diet Preference Validation
  //   if (step === 9) {
  //     if (!diet) newErrors.diet = "Diet preference is required.";
  //   }

  //   // Step 10: Profile Images Validation
  //   if (step === 10) {
  //     if (profileImages.length === 0)
  //       newErrors.profileImages = "At least one profile image is required.";
  //   }

  //   // Step 11: Kundali Images Validation
  //   if (step === 11) {
  //     if (kundaliImages.length === 0)
  //       newErrors.kundaliImages = "At least one kundali image is required.";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // Handler for updating input fields

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
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
    const token =
      "e534555d00f37649827e53a1a8b7395b:9b51f399b15bbfe2aafd4f06f824700d0f1d4ceb5ab4cb870a0a3a754be03292154b632970ce76216a8220b0015e4bd062fe06ca46f61ed64781ab17da8554f90bf986e73273d2e6c2b1c84532cc8da7f46625f914b6407a944ec17fc9f33fef477ccb6a7a72d8ba3039fe42d51c99d65d649fc8b0a1838910d3d5d24a28419f445df6a908599adb30632610fddf697e707b610be041d49b8718120fc9c6589cdb89a076e833be4ce418d42a6ad147c19bb84e79f60eb3013a351d03741fa2c30ea7991c7d65804d410c57cc8ac633ed823a4cbb9a3513158f7a89cc737e006354cc24946a3d611416c780a6dc75751dd1d2049b465308bb98d39ee3b50d2c9df8bd275f2e14d2a26c8d677c09335feac957c35c32e99269d6ef5b18fc47cb01445663227f7b9b6fab1fc6a48b9b9bb036b5ea645845d55c0a8286d623ea70ba22698312056e84a4991ba12da1e6a7de10e9172104a242c81717e8aac9438aa6b2fd0e61f337bd488572acea84160a540bf7771e6f9fffd7540856ce7468d2ad0100cd9847d94490f71ae8eb7889982381717b4c0d038a0168ab30b41990e1ab571cb53ea6c81e260de331dd77bb58ef3b2eff22ced93f74f3bcf05d03fa7c4d85d8e0142b4968159241d6a515a9f6a4cf4c283eb3ad13ee06b4346090c7571189c2bbecad063fd7c29fddaf9218b83bc0f3bd0e39370ceeecb0865b96be8f5e9887672617"; // Use actual token retrieval logic

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
      navigate(`/user-profile/${id}`); // Navigate on success
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
        {/* personal details */}
        {step === 1 && (
          <div>
            <ProgressBar currentStep={step} titles={titles} />
            <img
              src="/user.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Personal Details</h3>
            <TextInput
              label="First Name"
              name="first_name"
              value={personalDetails.first_name}
              onChange={(e) => handleChange(e, setPersonalDetails)}
              error={errors.first_name}
              required
            />
            <TextInput
              label="Middle Name"
              name="middle_name"
              value={personalDetails.middle_name}
              onChange={(e) => handleChange(e, setPersonalDetails)}
            />
            <TextInput
              label="Last Name"
              name="last_name"
              value={personalDetails.last_name}
              onChange={(e) => handleChange(e, setPersonalDetails)}
              error={errors.last_name}
              required
            />
          </div>
        )}
        {/* age */}
        {step === 2 && (
          <>
            <img
              src="/age.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <div>
              <label>
                Age:<span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="number"
                name="age"
                value={personalDetails.age}
                onChange={(e) => handleChange(e, setPersonalDetails)}
                style={{ borderColor: errors.age ? "red" : "" }}
              />
              {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
            </div>
          </>
        )}
        {/* height */}
        {step === 3 && (
          <>
            <img
              src="/height.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <div>
              <label>Height:</label>
              <input
                type="text"
                name="height"
                value={personalDetails.height}
                onChange={(e) => handleChange(e, setPersonalDetails)}
              />
            </div>
          </>
        )}
        {/* weight */}
        {step === 4 && (
          <>
            <img
              src="/weight.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <div>
              <label>Weight:</label>
              <input
                type="text"
                name="weight"
                value={personalDetails.weight}
                onChange={(e) => handleChange(e, setPersonalDetails)}
              />
            </div>
          </>
        )}
        {/* gender */}
        {step === 5 && (
          <div>
            <img
              src="/gender.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <IconRadioGroup
              label="Select Gender"
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
            <img
              src="/skin-care.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <div>
              <IconRadioGroup
                label="Select Complexion"
                options={complexions}
                selectedValue={personalDetails.complexion}
                onChange={handleComplexionSelect}
                error={errors.gender}
              />
            </div>

            <input type="hidden" value={personalDetails.complexion} required />
          </div>
        )}
        {/* Blood Group */}
        {step === 7 && (
          <div>
            <img
              src="/blood.png"
              alt="Blood Group Icon"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <div style={{ marginBottom: "10px" }}>
              <IconRadioGroup
                label="Blood Groups"
                options={bloodGroups}
                selectedValue={personalDetails.blood_group}
                onChange={handleBloodGroupSelect}
                error={errors.blood_group} // Use the appropriate error for blood group
              />
            </div>
            <input type="hidden" value={personalDetails.blood_group} required />
          </div>
        )}
        {/* Religious Details */}
        {step === 8 && (
          <div>
            <img
              src="/pray.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Religious Details</h3>
            <DropdownInput
              label="Select Religion"
              name="religion"
              value={religiousDetails.religion}
              onChange={handleChange}
              options={religionOptions}
              error={errors.religion}
              required
            />

            <label>
              Caste:<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              name="caste"
              value={religiousDetails.caste}
              onChange={(e) => handleChange(e, setReligiousDetails)}
              style={{ borderColor: errors.caste ? "red" : "" }}
            />
            {errors.caste && <p style={{ color: "red" }}>{errors.caste}</p>}

            <label>
              Sub Caste:<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              name="subCaste"
              value={religiousDetails.subCaste}
              onChange={(e) => handleChange(e, setReligiousDetails)}
              style={{ borderColor: errors.subCaste ? "red" : "" }}
            />
            {errors.subCaste && (
              <p style={{ color: "red" }}>{errors.subCaste}</p>
            )}

            <label>Mother Tongue:</label>
            <input
              type="text"
              name="language"
              value={religiousDetails.language}
              onChange={(e) => handleChange(e, setReligiousDetails)}
            />
            <label>Gotra:</label>
            <input
              type="text"
              name="gotra"
              value={religiousDetails.gotra}
              onChange={(e) => handleChange(e, setReligiousDetails)}
            />
          </div>
        )}
        {/* Astro Details */}
        {step === 9 && (
          <div>
            <img
              src="/astrology.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Astro Details</h3>
            <label>
              Date of Birth:<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="date"
              name="dob"
              value={astroDetails.dob}
              onChange={(e) => handleChange(e, setAstroDetails)}
              style={{ borderColor: errors.dob ? "red" : "" }}
            />
            {errors.dob && <p style={{ color: "red" }}>{errors.dob}</p>}

            <label>
              Place of Birth:<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              name="pob"
              value={astroDetails.pob}
              onChange={(e) => handleChange(e, setAstroDetails)}
              style={{ borderColor: errors.pob ? "red" : "" }}
            />
            {errors.pob && <p style={{ color: "red" }}>{errors.pob}</p>}

            <label>Time of Birth:</label>
            <input
              type="time"
              name="tob"
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
            <label>Nakshatra:</label>
            <input
              type="text"
              name="nakshatra"
              value={religiousDetails.nakshatra}
              onChange={(e) => handleChange(e, setReligiousDetails)}
            />
          </div>
        )}
        {/* Family Details */}
        {step === 10 && (
          <div>
            <img
              src="/family.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
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
              type="number" // Assuming TextInput can handle type
              value={familyDetails.noOfBrothers}
              onChange={(e) => handleChange(e, setFamilyDetails)}
            />

            <TextInput
              label="No. of Sisters"
              name="noOfSisters"
              type="number" // Assuming TextInput can handle type
              value={familyDetails.noOfSisters}
              onChange={(e) => handleChange(e, setFamilyDetails)}
            />

            {/* {familyDetails.noOfBrothers >= 1 && (
            <>
              <label>Brother's Name:</label>
              {Array.from({ length: familyDetails.noOfBrothers }).map(
                (_, index) => (
                  <TextInput
                    key={`brother-${index}`}
                    label={`Brother's Name ${index + 1}`}
                    name={`brotherName${index + 1}`} // Unique name for each input
                    value={familyDetails[`brotherName${index + 1}`] || ""} // Handle state
                    onChange={(e) => handleChange(e, setFamilyDetails)}
                  />
                )
              )}
            </>
          )}

          {familyDetails.noOfSisters >= 1 && (
            <>
              <label>Sister's Name:</label>
              {Array.from({ length: familyDetails.noOfSisters }).map(
                (_, index) => (
                  <TextInput
                    key={`sister-${index}`}
                    label={`Sister's Name ${index + 1}`}
                    name={`sisterName${index + 1}`} // Unique name for each input
                    value={familyDetails[`sisterName${index + 1}`] || ""} // Handle state
                    onChange={(e) => handleChange(e, setFamilyDetails)}
                  />
                )
              )}
            </>
          )} */}
          </div>
        )}
        {/* Education Details */}
        {step === 11 && (
          <div>
            <img
              src="/education.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Education Details</h3>
            <label>
              Degree:<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              name="degree"
              value={educationDetails.degree}
              onChange={(e) => handleChange(e, setEducationDetails)}
              style={{ borderColor: errors.degree ? "red" : "" }}
            />
            {errors.degree && <p style={{ color: "red" }}>{errors.degree}</p>}

            <label>College Name:</label>
            <input
              type="text"
              name="collegeName"
              value={educationDetails.collegeName}
              onChange={(e) => handleChange(e, setEducationDetails)}
            />
          </div>
        )}
        {/* Employment Details */}
        {step === 12 && (
          <div>
            <img
              src="/office.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Employment Details</h3>
            <DropdownInput
              label="Are you employed in:"
              name="employeeIn"
              value={employmentDetails.employeeIn}
              onChange={(e) => handleChange(e, setEmploymentDetails)}
              options={employeeInOptions}
              error={errors.employeeIn}
            />

            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={employmentDetails.companyName}
              onChange={(e) => handleChange(e, setEmploymentDetails)}
            />

            <label>Designation:</label>
            <input
              type="text"
              name="designation"
              value={employmentDetails.designation}
              onChange={(e) => handleChange(e, setEmploymentDetails)}
            />

            <DropdownInput
              label="Select Income Range"
              name="income"
              value={employmentDetails.income} // Make sure this is the correct state
              onChange={(e) => handleChange(e, setEmploymentDetails)} // Ensure setEmploymentDetails is used
              options={incomeOptions} // Your salary options array
              error={errors.income} // Error handling for salary
            />
          </div>
        )}
        {/* Address Details */}
        {step === 13 && (
          <div>
            <img
              src="/placeholder.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Address Details</h3>
            <label>
              State:<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={(e) => handleChange(e, setAddress)}
              style={{ borderColor: errors.state ? "red" : "" }}
            />
            {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}

            <label>
              District:<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              name="district"
              value={address.district}
              onChange={(e) => handleChange(e, setAddress)}
              style={{ borderColor: errors.district ? "red" : "" }}
            />
            {errors.district && (
              <p style={{ color: "red" }}>{errors.district}</p>
            )}

<label>
            Residential Address:<span style={{ color: "red" }}> *</span>
          </label>
          <textarea
            name="residentialAddress"
            value={address.residentialAddress}
            onChange={(e) => handleChange(e, setAddress)}
            style={{ borderColor: errors.residentialAddress ? "red" : "" }}
          />
          {errors.residentialAddress && (
            <p style={{ color: "red" }}>{errors.residentialAddress}</p>
          )}

            <label>
              Permanent Address:<span style={{ color: "red" }}> *</span>
            </label>
            <textarea
              name="permanentAddress"
              value={address.permanentAddress}
              onChange={(e) => handleChange(e, setAddress)}
              style={{ borderColor: errors.permanentAddress ? "red" : "" }}
            />
            {errors.permanentAddress && (
              <p style={{ color: "red" }}>{errors.permanentAddress}</p>
            )}
          </div>
        )}
        {/* Social Media Links */}
        {step === 14 && (
          <div>
            <img
              src="/instagram.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Social Media Links</h3>
            <label>Facebook:</label>
            <input
              type="text"
              name="facebook"
              value={socialMedia.facebook}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, facebook: e.target.value })
              }
              style={{ borderColor: errors.facebook ? "red" : "" }}
            />
            {errors.facebook && (
              <p style={{ color: "red" }}>{errors.facebook}</p>
            )}

            <label>LinkedIn:</label>
            <input
              type="text"
              name="linkedin"
              value={socialMedia.linkedin}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, linkedin: e.target.value })
              }
              style={{ borderColor: errors.linkedin ? "red" : "" }}
            />
            {errors.linkedin && (
              <p style={{ color: "red" }}>{errors.linkedin}</p>
            )}

            <label>Instagram:</label>
            <input
              type="text"
              name="instagram"
              value={socialMedia.instagram}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, instagram: e.target.value })
              }
              style={{ borderColor: errors.instagram ? "red" : "" }}
            />
            {errors.instagram && (
              <p style={{ color: "red" }}>{errors.instagram}</p>
            )}
          </div>
        )}
        {/* Lifestyle Details */}
        {step === 15 && (
          <div>
            <img
              src="/lifestyle.png"
              alt="Male"
              style={{ width: "50px", marginBottom: "20px" }}
            />
            <h3>Lifestyle Details</h3>
            <label>
              Diet:<span style={{ color: "red" }}> *</span>
            </label>
            <select
              name="diet"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              style={{ borderColor: errors.diet ? "red" : "" }}
            >
              <option value="">Select Diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
            {errors.diet && <p style={{ color: "red" }}>{errors.diet}</p>}
          </div>
        )}
        {/* Upload Profile Images */}

        {step === 16 && (
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
        {step === 17 && (
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
            {step < 17 ? (
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
