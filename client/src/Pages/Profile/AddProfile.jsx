import React, { useState, useEffect } from "react";
import axios from "axios";
import apiRequest from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import InputField from "../../Atoms/InputField";
import CustomButton from "../../Atoms/CustomButton";
import ProgressBar from "../../Atoms/ProgressBar";
import PhotoUpload from "../../Atoms/PhotoUpload";
import UserPreviewPage from "./UserPreviewPage";

const AddProfile = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(uuidv4()); // Generate a unique user ID
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    complexion: "",
    height: "",
    weight: "",
  });

  const [religiousBackground, setReligiousBackground] = useState({
    religion: "",
    caste: "",
    subCaste: "",
    language: "",
  });

  const [astroDetails, setAstroDetails] = useState({
    dateOfBirth: "",
    placeOfBirth: "",
    timeOfBirth: "",
    rashi: "",
    nakshatra: "",
    gotra: "",
  });

  const [familyDetails, setFamilyDetails] = useState({
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    noOfBrothers: "",
    noOfSisters: "",
  });

  const [educationDetails, setEducationDetails] = useState({
    degree: "",
    collegeName: "",
  });

  const [careerDetails, setCareerDetails] = useState({
    employedIn: "",
    companyName: "",
    designation: "",
    income: "",
  });

  const [lifestyle, setLifestyle] = useState({
    diet: "",
  });

  const [contactInformation, setContactInformation] = useState({
    contactNumber: "",
    address: {
      country: "",
      state: "",
      district: "",
      residentialAddress: "",
      permanentAddress: "",
    },
    linkedInUrl: "",
    instagramUrl: "",
    facebookUrl: "",
  });

  const [imagePreviews, setImagePreviews] = useState({
    profileImages: [],
    kundaliImages: [],
  });
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const titles = [
    "Personal",
    "Religious",
    "Astro",
    "Family",
    "Edu & Career",
    "Lifestyle",
    "Contact",
    "Upload Photo",
    "Upload Photo",
    "Upload Photo",
  ];

  const navigate = useNavigate();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/profile/viewProfile"
        );
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Could not fetch profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleGenderSelect = (gender) => {
    setPersonalDetails({ ...personalDetails, gender });
    console.log("gender", gender);
  };

  const bloodGroups = [
    {
      value: "A Positive (A+)",
      label: "A Positive (A+)",
      icon: "/path/to/a-positive-icon.png",
    },
    {
      value: "A Negative (A-)",
      label: "A Negative (A-)",
      icon: "/path/to/a-negative-icon.png",
    },
    {
      value: "B Positive (B+)",
      label: "B Positive (B+)",
      icon: "/path/to/b-positive-icon.png",
    },
    {
      value: "B Negative (B-)",
      label: "B Negative (B-)",
      icon: "/path/to/b-negative-icon.png",
    },
    {
      value: "AB Positive (AB+)",
      label: "AB Positive (AB+)",
      icon: "/path/to/ab-positive-icon.png",
    },
    {
      value: "AB Negative (AB-)",
      label: "AB Negative (AB-)",
      icon: "/path/to/ab-negative-icon.png",
    },
    {
      value: "O Positive (O+)",
      label: "O Positive (O+)",
      icon: "/path/to/o-positive-icon.png",
    },
    {
      value: "O Negative (O-)",
      label: "O Negative (O-)",
      icon: "/path/to/o-negative-icon.png",
    },
  ];

  const handleBloodGroupSelect = (bloodGroup) => {
    setPersonalDetails({ ...personalDetails, bloodGroup });
  };

  const complexions = [
    { value: "Fair", label: "Fair", icon: "/groom.png" },
    {
      value: "Wheatish",
      label: "Wheatish",
      icon: "/groom.png",
    },
    { value: "Dusky", label: "Dusky", icon: "/groom.png" },
    { value: "Dark", label: "Dark", icon: "/groom.png" },
  ];

  const handleComplexionSelect = (complexion) => {
    setPersonalDetails({ ...personalDetails, complexion });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append user data to FormData
    formData.append("userId", userId); // Use stored userId
    formData.append("personalDetails", JSON.stringify(personalDetails));
    formData.append("religiousBackground", JSON.stringify(religiousBackground));
    formData.append("astroDetails", JSON.stringify(astroDetails));
    formData.append("familyDetails", JSON.stringify(familyDetails));
    formData.append("educationDetails", JSON.stringify(educationDetails));
    formData.append("careerDetails", JSON.stringify(careerDetails));
    formData.append("lifestyle", JSON.stringify(lifestyle));
    formData.append("contactInformation", JSON.stringify(contactInformation));

    console.log("formdata", formData);
    try {
      const response = await apiRequest(
        "POST",
        "http://localhost:4000/api/profile/addProfile",
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      if (response.status === 201) {
        console.log(response.data.message);
        // Optionally navigate to another page or show a success message
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleImageUpload = (newImage) => {
    setImagePreviews((prev) => ({
      ...prev,
      profileImages: [...prev.profileImages, newImage],
    }));
  };

  const handleKundaliUpload = (image) => {
    setImagePreviews((prev) => ({
      ...prev,
      kundaliImages: [...prev.kundaliImages, image],
    }));
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => ({
      ...prev,
      profileImages: prev.profileImages.filter((_, i) => i !== index),
    }));
  };
  console.log("profilesprofilesprofiles", profiles);
  const handleFeetChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      height: { ...personalDetails.height, feet: e.target.value },
    });
  };

  const handleInchesChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      height: { ...personalDetails.height, inches: e.target.value },
    });
  };
  const heightString = `${personalDetails.height.feet}'${personalDetails.height.inches}''`;

  return (
    <form onSubmit={handleSubmit} enctype="multipart/form-data">
      {step === 1 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h2>Personal Details</h2>

          <input
            type="text"
            placeholder="Enter First Name"
            value={personalDetails.firstName}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                firstName: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={personalDetails.lastName}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                lastName: e.target.value,
              })
            }
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={personalDetails.age}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, age: e.target.value })
            }
            required
          />

          {/* <select
            value={personalDetails.bloodGroup}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                bloodGroup: e.target.value,
              })
            }
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A Positive (A+)">A Positive (A+)</option>
            <option value="A Negative (A-)">A Negative (A-)</option>
            <option value="B Positive (B+)">B Positive (B+)</option>
            <option value="B Negative (B-)">B Negative (B-)</option>
            <option value="AB Positive (AB+)">AB Positive (AB+)</option>
            <option value="AB Negative (AB-)">AB Negative (AB-)</option>
            <option value="O Positive (O+)">O Positive (O+)</option>
            <option value="O Negative (O-)">O Negative (O-)</option>
          </select> */}

          
          {/* <select
            value={personalDetails.complexion}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                complexion: e.target.value,
              })
            }
            required
          >
            <option value="">Select Complexion</option>
            <option value="Fair">Fair</option>
            <option value="Wheatish">Wheatish</option>
            <option value="Dusky">Dusky</option>
            <option value="Dark">Dark</option>
          </select> */}

          {/* <div>
            <h3>Select Complexion</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                marginBottom: "10px",
              }}
            >
              {complexions.map(({ value, label, icon }) => (
                <div
                  key={value}
                  onClick={() => handleComplexionSelect(value)}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    border:
                      personalDetails.complexion === value
                        ? "2px solid blue"
                        : "1px solid gray",
                    textAlign: "center",
                    margin: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={icon}
                    alt={label}
                    style={{ width: "50px", marginBottom: "5px" }}
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <input type="hidden" value={personalDetails.complexion} required />
          </div>*/}
          <select
            value={personalDetails.height}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                height: e.target.value,
              })
            }
            required
          >
            <option value="">Select Height</option>
            <option value="4'5''">4'5''</option>
            <option value="4'6''">4'6''</option>
            <option value="4'7''">4'7''</option>
            <option value="4'8''">4'8''</option>
            <option value="4'9''">4'9''</option>
            <option value="4'10''">4'10''</option>
            <option value="4'11''">4'11''</option>
            <option value="5'0''">5'0''</option>
            <option value="5'1''">5'1''</option>
            <option value="5'2''">5'2''</option>
            <option value="5'3''">5'3''</option>
            <option value="5'4''">5'4''</option>
            <option value="5'5''">5'5''</option>
            <option value="5'6''">5'6''</option>
            <option value="5'7''">5'7''</option>
            <option value="5'8''">5'8''</option>
            <option value="5'9''">5'9''</option>
            <option value="5'10''">5'10''</option>
            <option value="5'11''">5'11''</option>
            <option value="6'1''">6'1''</option>
            <option value="6'2''">6'2''</option>
            <option value="6'3''">6'3''</option>
            <option value="6'4''">6'4''</option>
            <option value="6'5''">6'5''</option>
          </select>
          <input
            type="number"
            placeholder="Weight"
            value={personalDetails.weight}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                weight: e.target.value,
              })
            }
            required
          />
          <CustomButton label="Next" type="primary" onClick={handleNext} />
        </div>
      )}
      {step === 2 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <img src="/gender.png" alt="Male" style={{ width: "150px" }} />
          <h3>Select Gender</h3>
          <p>Please Select your Gender</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "10px",
            }}
          >
            <div
              onClick={() => handleGenderSelect("Male")}
              style={{
                cursor: "pointer",
                padding: "10px",
                border:
                  personalDetails.gender === "Male"
                    ? "2px solid blue"
                    : "1px solid gray",
                marginRight: "10px",
              }}
            >
              <img src="/groom.png" alt="Male" style={{ width: "150px" }} />
              <span>Male</span>
            </div>
            <div
              onClick={() => handleGenderSelect("Female")}
              style={{
                cursor: "pointer",
                padding: "10px",
                border:
                  personalDetails.gender === "Female"
                    ? "2px solid blue"
                    : "1px solid gray",
              }}
            >
              <img src="/bride.png" alt="Female" style={{ width: "150px" }} />
              <span>Female</span>
            </div>
            {/* <div
                onClick={() => handleGenderSelect("Other")}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  border:
                    personalDetails.gender === "Other"
                      ? "2px solid blue"
                      : "1px solid gray",
                }}
              >
                <img
                  src="/path/to/other-icon.png"
                  alt="Other"
                  style={{ width: "50px" }}
                />
                <span>Other</span>
              </div> */}
          </div>
          <input type="hidden" value={personalDetails.gender} required />
          <CustomButton
            label="Back"
            onClick={handlePrevious}
            type="secondary"
          />
          <CustomButton label="Next" type="primary" onClick={handleNext} />
        </div>
      )}

      {step === 3 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <div>
            <img src="/gender.png" alt="Male" style={{ width: "150px" }} />
            <h3>Select Complexion</h3>
            <p>Please Select your Complexion</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // 2 items per row
                gap: "10px", // space between the items
                marginBottom: "10px",
              }}
            >
              {complexions.map(({ value, label, icon }) => (
                <div
                  key={value}
                  onClick={() => handleComplexionSelect(value)}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    border:
                      personalDetails.complexion === value
                        ? "2px solid blue"
                        : "1px solid gray",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={icon}
                    alt={label}
                    style={{ width: "150px", marginBottom: "5px" }}
                  />
                  <span>{label}</span>
                </div>
              ))}
              <CustomButton
                label="Back"
                onClick={handlePrevious}
                type="secondary"
              />
              <CustomButton label="Next" type="primary" onClick={handleNext} />
            </div>

            <input type="hidden" value={personalDetails.complexion} required />
          </div>
        </div>
      )}
      {step === 4 && (
        // <div>
        //   <h3>Select Height</h3>
        //   <div
        //     style={{
        //       display: "flex",
        //       alignItems: "center",
        //       marginBottom: "10px",
        //     }}
        //   >
        //     <select
        //       value={personalDetails.height.feet}
        //       onChange={handleFeetChange}
        //       required
        //       style={{ marginRight: "10px" }}
        //     >
        //       <option value="">Feet</option>
        //       {[...Array(4)].map((_, index) => (
        //         <option key={index} value={4 + index}>
        //           {4 + index}
        //         </option>
        //       ))}
        //       {[...Array(4)].map((_, index) => (
        //         <option key={index + 4} value={8 + index}>
        //           {8 + index}
        //         </option>
        //       ))}
        //     </select>
        //     <select
        //       value={personalDetails.height.inches}
        //       onChange={handleInchesChange}
        //       required
        //     >
        //       <option value="">Inches</option>
        //       {[...Array(11)].map((_, index) => (
        //         <option key={index} value={index + 1}>
        //           {index + 1}
        //         </option>
        //       ))}
        //     </select>
        //   </div>
        //   <input type="hidden" value={heightString} required />
        // </div>
        <div>
        <ProgressBar currentStep={step} titles={titles} />
        <div>
          <img src="/gender.png" alt="Male" style={{ width: "150px" }} />
            <h3>Select Blood Group</h3>
            <p>Please Select your Blood Group</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // 2 items per row
                gap: "10px", // space between the items
                marginBottom: "10px",
              }}
            >
              {bloodGroups.map(({ value, label, icon }) => (
                <div
                  key={value}
                  onClick={() => handleBloodGroupSelect(value)}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    border:
                      personalDetails.bloodGroup === value
                        ? "2px solid blue"
                        : "1px solid gray",
                    textAlign: "center",
                    margin: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={icon}
                    alt={label}
                    style={{ width: "50px", marginBottom: "5px" }}
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <input type="hidden" value={personalDetails.bloodGroup} required />
            <CustomButton
            label="Back"
            onClick={handlePrevious}
            type="secondary"
          />
          <CustomButton label="Next" type="primary" onClick={handleNext} />
          </div> 
          </div>
      )}
      {step === 5 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h2>Religious Background</h2>
          <input
            type="text"
            placeholder="Religion"
            value={religiousBackground.religion}
            onChange={(e) =>
              setReligiousBackground({
                ...religiousBackground,
                religion: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Caste"
            value={religiousBackground.caste}
            onChange={(e) =>
              setReligiousBackground({
                ...religiousBackground,
                caste: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Sub Caste"
            value={religiousBackground.subCaste}
            onChange={(e) =>
              setReligiousBackground({
                ...religiousBackground,
                subCaste: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Language"
            value={religiousBackground.language}
            onChange={(e) =>
              setReligiousBackground({
                ...religiousBackground,
                language: e.target.value,
              })
            }
            required
          />
          <CustomButton
            label="Back"
            onClick={handlePrevious}
            type="secondary"
          />
          <CustomButton label="Next" type="primary" onClick={handleNext} />
        </div>
      )}

      {step === 6 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h2>Astrological Details</h2>
          <input
            type="date"
            placeholder="Date of Birth"
            value={astroDetails.dateOfBirth}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                dateOfBirth: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Place of Birth"
            value={astroDetails.placeOfBirth}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                placeOfBirth: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Time of Birth"
            value={astroDetails.timeOfBirth}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                timeOfBirth: e.target.value,
              })
            }
          />
          {/* <InputField
            label="Time of Birth"
            value={astroDetails.timeOfBirth}
            onChange={(value) =>
              setAstroDetails({ ...astroDetails, timeOfBirth: value })
            }
            required
            placeholder="Enter Time of Birth"
          /> */}
          <input
            type="text"
            placeholder="Rashi"
            value={astroDetails.rashi}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                rashi: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Nakshatra"
            value={astroDetails.nakshatra}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                nakshatra: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Gotra"
            value={astroDetails.gotra}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                gotra: e.target.value,
              })
            }
            required
          />
          <CustomButton
            label="Back"
            className="btn btn-success"
            onClick={handlePrevious}
            type="secondary"
          >
            Back
          </CustomButton>
          <CustomButton
            label="Next"
            type="primary"
            className="btn btn-success"
            onClick={handleNext}
          >
            Next
          </CustomButton>
        </div>
      )}

      {step === 4 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h2>Education Details</h2>
          <input
            type="text"
            placeholder="Degree"
            value={educationDetails.degree}
            onChange={(e) =>
              setEducationDetails({
                ...educationDetails,
                degree: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="College Name"
            value={educationDetails.collegeName}
            onChange={(e) =>
              setEducationDetails({
                ...educationDetails,
                collegeName: e.target.value,
              })
            }
            required
          />

          <CustomButton label="Back" onClick={handlePrevious} type="secondary">
            Back
          </CustomButton>
          <CustomButton label="Next" type="primary" onClick={handleNext}>
            Next
          </CustomButton>
        </div>
      )}

      {step === 5 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h2>Career Details</h2>

          <select
            value={careerDetails.employedIn}
            onChange={(e) =>
              setCareerDetails({
                ...careerDetails,
                employedIn: e.target.value,
              })
            }
            required
          >
            <option value="">Select Employment Type</option>
            <option value="Government/PSU">Government/PSU</option>
            <option value="Defence">Defence</option>
            <option value="Private">Private</option>
            <option value="Business">Business</option>
            <option value="Self Employed">Self Employed</option>
            <option value="Not Working">Not Working</option>
          </select>

          <input
            type="text"
            placeholder="Company Name"
            value={careerDetails.companyName}
            onChange={(e) =>
              setCareerDetails({
                ...careerDetails,
                companyName: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Designation"
            value={careerDetails.designation}
            onChange={(e) =>
              setCareerDetails({
                ...careerDetails,
                designation: e.target.value,
              })
            }
            required
          />

          <select
            value={careerDetails.income}
            onChange={(e) =>
              setCareerDetails({ ...careerDetails, income: e.target.value })
            }
            required
          >
            <option value="">Select Income Range</option>
            <option value="0-2 LPA">0-2 LPA</option>
            <option value="2-4 LPA">2-4 LPA</option>
            <option value="4-7 LPA">4-7 LPA</option>
            <option value="7-10 LPA">7-10 LPA</option>
            <option value="10-15 LPA">10-15 LPA</option>
            <option value="15-20 LPA">15-20 LPA</option>
            <option value="20-25 LPA">20-25 LPA</option>
            <option value="more than 25 LPA">more than 25 LPA</option>
          </select>
          <CustomButton label="Back" onClick={handlePrevious} type="secondary">
            Back
          </CustomButton>
          <CustomButton label="Next" type="primary" onClick={handleNext}>
            Next
          </CustomButton>
        </div>
      )}

      {step === 6 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h2>Family Details</h2>
          <input
            type="text"
            placeholder="Father's Name"
            value={familyDetails.fatherName}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                fatherName: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Mother's Name"
            value={familyDetails.motherName}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                motherName: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Father's Occupation"
            value={familyDetails.fatherOccupation}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                fatherOccupation: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Mother's Occupation"
            value={familyDetails.motherOccupation}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                motherOccupation: e.target.value,
              })
            }
            required
          />
          <input
            type="number"
            placeholder="Number of Brothers"
            value={familyDetails.noOfBrothers}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                noOfBrothers: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Number of Sisters"
            value={familyDetails.noOfSisters}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                noOfSisters: e.target.value,
              })
            }
          />
          <CustomButton label="Back" onClick={handlePrevious} type="secondary">
            Back
          </CustomButton>
          <CustomButton label="Next" type="primary" onClick={handleNext}>
            Next
          </CustomButton>
        </div>
      )}

      {step === 7 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h2>Lifestyle</h2>
          <select
            value={lifestyle.diet}
            onChange={(e) =>
              setLifestyle({ ...lifestyle, diet: e.target.value })
            }
            required
          >
            <option value="">Select Diet</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="jain">Jain</option>
            <option value="vegan">Vegan</option>
            <option value="occasionallyNon-Veg">Occasionally Non-Veg</option>
          </select>
          <CustomButton label="Back" onClick={handlePrevious} type="secondary">
            Back
          </CustomButton>
          <CustomButton label="Next" type="primary" onClick={handleNext}>
            Next
          </CustomButton>
        </div>
      )}

      {step === 8 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h2>Contact Information</h2>

          <input
            type="text"
            placeholder="Contact Number"
            value={contactInformation.contactNumber}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                contactNumber: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Country"
            value={contactInformation.address.country}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                address: {
                  ...contactInformation.address,
                  country: e.target.value,
                },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="State"
            value={contactInformation.address.state}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                address: {
                  ...contactInformation.address,
                  state: e.target.value,
                },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="District"
            value={contactInformation.address.district}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                address: {
                  ...contactInformation.address,
                  district: e.target.value,
                },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Residential Address"
            value={contactInformation.address.residentialAddress}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                address: {
                  ...contactInformation.address,
                  residentialAddress: e.target.value,
                },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Permanent Address"
            value={contactInformation.address.permanentAddress}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                address: {
                  ...contactInformation.address,
                  permanentAddress: e.target.value,
                },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="LinkedIn URL"
            value={contactInformation.linkedInUrl}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                linkedInUrl: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Instagram URL"
            value={contactInformation.instagramUrl}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                instagramUrl: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Facebook URL"
            value={contactInformation.facebookUrl}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                facebookUrl: e.target.value,
              })
            }
          />

          <CustomButton label="Back" onClick={handlePrevious} type="secondary">
            Back
          </CustomButton>
          <CustomButton label="Next" type="primary" onClick={handleSubmit}>
            Next
          </CustomButton>
        </div>
      )}

      {/* {step === 9 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h3>Profile Images (At least 1 required)</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <PhotoUpload
                key={index}
                profileId={"670be21366eb9770ed8867c1"}
                onUpload={(image) => handleImageUpload(image)}
              />
            ))}
          </div>
          <CustomButton
            label="Back"
            onClick={handlePrevious}
            type="secondary"
            disabled={imagePreviews.profileImages.length === 0}
          />
          <CustomButton
            label="Next"
            type="primary"
            onClick={handleNext}
            disabled={imagePreviews.profileImages.length < 1}
          />
        </div>
      )}

      {step === 10 && ( // Assuming step 10 is for Kundali upload
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h3>Kundali Images (At least 1 required)</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <PhotoUpload
                key={index}
                profileId={"670be21366eb9770ed8867c1"}
                onUpload={(image) => handleKundaliUpload(image)} // Adjust this handler for kundali images
              />
            ))}
          </div>
          <CustomButton
            label="Back"
            onClick={handlePrevious}
            type="secondary"
            disabled={imagePreviews.kundaliImages.length === 0} // Ensure the appropriate preview array is used
          />
          <CustomButton
            label="Next"
            type="primary"
            onClick={handleSubmit}
            disabled={imagePreviews.kundaliImages.length < 1} // Ensure at least one image is uploaded
          />
        </div>
      )} */}

      {/* {step === 11 && (
        <div>
          <ProgressBar currentStep={step} titles={titles} />
          <h3>Preview</h3>
          <UserPreviewPage />
        </div>
      )} */}
    </form>
  );
};

export default AddProfile;
