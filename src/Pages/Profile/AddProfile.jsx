import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Atoms/CustomButton";
import ProgressBar from "../../Atoms/ProgressBar";
import axios from "axios";

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
    nakshtra: "",
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

  // Validator function
  const validateFields = () => {
    const newErrors = {};

    if (step === 1) {
      if (!personalDetails.first_name.trim())
        newErrors.first_name = "First name is required.";
      if (!personalDetails.middle_name.trim())
        newErrors.middle_name = "Middle name is required.";
      if (!personalDetails.last_name.trim())
        newErrors.last_name = "Last name is required.";
      if (!personalDetails.age || personalDetails.age < 18)
        newErrors.age = "Age must be 18 or older.";
      if (!personalDetails.gender) newErrors.gender = "Gender is required.";
    }

    if (step === 2) {
      if (!religiousDetails.caste.trim())
        newErrors.caste = "Caste is required.";
      if (!religiousDetails.subCaste.trim())
        newErrors.subCaste = "Sub caste is required.";
    }

    if (step === 3) {
      if (!astroDetails.dob) newErrors.dob = "Date of birth is required.";
      if (!astroDetails.pob.trim())
        newErrors.pob = "Place of birth is required.";
    }

    if (step === 4) {
      if (!familyDetails.fatherName.trim())
        newErrors.fatherName = "Father's name is required.";
    }

    if (step === 5) {
      if (!educationDetails.degree.trim())
        newErrors.degree = "Degree is required.";
    }

    if (step === 6) {
      if (!employmentDetails.employeeIn.trim())
        newErrors.employeeIn = "Employment status is required.";
    }

    if (step === 7) {
      if (!diet) newErrors.diet = "Diet preference is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (validateFields()) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      personalDetails,
      religiousDetails,
      astroDetails,
      familyDetails,
      educationDetails,
      employmentDetails,
      address,
      socialMedia,
      profileImages,
      kundaliImages,
      paymentStatus,
      isPublished,
      diet,
    };

    // Retrieve token
    const token =
      "18df68359fbef5047b03501aa8ecf465:7ce454f3c536cc51f912102e8904da7f92abb465ce60c1a51cd6ccec917bdff96a32a02e094111ea5e0884edd1909b21a7c85d7263245fe8f1a527e09bef1af5eb0a93e3a88f4425c00f306d33298b433f5fe1cdc5343d9a8fa51d44e7a0c3dd1a956a253411d179a209d9acb67671ee9205ff35172463338cd08f01b0f2525369d2093078ed159bc79311a07b3f438494e04f2476dfac9a646f678e6e2c4355f4e88724493cd91514d5cbfe359ab62d2d9a6f801543e5ec2832261c2134033e4f6e065e9554c29066b0077711863b7757a6356b09b44e955893c54fa8426b3fbfc1db1f441328d358db6c5beaeb51e7e93e312974dbd167ac9c4092cec56ffceacbb1d3768e2b30888da8c92c1f42414d9e6046b94c947ee0270e9568fdaa1b7e83e6be1fb37de9f63088e3dddfadb03ef50b177421dda0c489b9dd54f14d7bd4ca0a0ee804e6b59c713da2a64e619e4414d310bd49c5ad70e9d5f76252314ad98a36f4715b9cab1bf1e04788968cc2db23a41d09bfe2fbea6f97e970bd9555974f644de03bb9035fadb74f978970992c22074df2be4392d6028c98633ffeaa122ba689c9b617cfffb1181fe8a908d96d3420059b46cc5ea8c111cfb3cbb3c0f11b2efe9ae74726ffffc563fbfd97953a277f8ebaa649d53b8e4b33e66df1cdb3f254d3cd58901bfcf9b0bc50d6087b0725e595c8a4bca7e321e0d7857aa73d9887672617"; // Use actual token retrieval logic

    if (!token) {
      console.error("No token found. Please log in.");
      return; // Exit if there's no token
    }

    try {
      const response = await axios.post("/mate/api/v1/profile/save", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
      navigate("/success"); // Navigate on success
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    console.log("files", files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file), // For previewing
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 1, // Default status
    }));
    console.log("newImages", newImages);
    if (type === "profile") {
      setProfileImages(newImages);
    } else if (type === "kundali") {
      setKundaliImages(newImages);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProgressBar
        currentStep={step}
        titles={[
          "Personal",
          "Religious",
          "Astro",
          "Family",
          "Education",
          "Employment",
          "Other",
        ]}
      />

      {step === 1 && (
        <div>
          <h3>Personal Details</h3>
          <label>
            First Name:<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="text"
            name="first_name"
            value={personalDetails.first_name}
            onChange={(e) => handleChange(e, setPersonalDetails)}
            style={{ borderColor: errors.first_name ? "red" : "" }}
          />
          {errors.first_name && (
            <p style={{ color: "red" }}>{errors.first_name}</p>
          )}

          <label>
            Middle Name:<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="text"
            name="middle_name"
            value={personalDetails.middle_name}
            onChange={(e) => handleChange(e, setPersonalDetails)}
            style={{ borderColor: errors.middle_name ? "red" : "" }}
          />
          {errors.middle_name && (
            <p style={{ color: "red" }}>{errors.middle_name}</p>
          )}

          <label>
            Last Name:<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="text"
            name="last_name"
            value={personalDetails.last_name}
            onChange={(e) => handleChange(e, setPersonalDetails)}
            style={{ borderColor: errors.last_name ? "red" : "" }}
          />
          {errors.last_name && (
            <p style={{ color: "red" }}>{errors.last_name}</p>
          )}

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

          <label>
            Gender:<span style={{ color: "red" }}> *</span>
          </label>
          <select
            name="gender"
            value={personalDetails.gender}
            onChange={(e) => handleChange(e, setPersonalDetails)}
            style={{ borderColor: errors.gender ? "red" : "" }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}

          <label>Blood Group:</label>
          <select
            name="blood_group"
            value={personalDetails.blood_group}
            onChange={(e) => handleChange(e, setPersonalDetails)}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <label>Complexion:</label>
          <input
            type="text"
            name="complexion"
            value={personalDetails.complexion}
            onChange={(e) => handleChange(e, setPersonalDetails)}
          />

          <label>Height:</label>
          <input
            type="text"
            name="height"
            value={personalDetails.height}
            onChange={(e) => handleChange(e, setPersonalDetails)}
          />

          <label>Weight:</label>
          <input
            type="text"
            name="weight"
            value={personalDetails.weight}
            onChange={(e) => handleChange(e, setPersonalDetails)}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Religious Details</h3>
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
          {errors.subCaste && <p style={{ color: "red" }}>{errors.subCaste}</p>}

          <label>Language:</label>
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

      {step === 3 && (
        <div>
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

          <label>Rashi:</label>
          <input
            type="text"
            name="rashi"
            value={astroDetails.rashi}
            onChange={(e) => handleChange(e, setAstroDetails)}
          />

          <label>Nakshtra:</label>
          <input
            type="text"
            name="nakshtra"
            value={astroDetails.nakshtra}
            onChange={(e) => handleChange(e, setAstroDetails)}
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>Family Details</h3>
          <label>
            Father's Name:<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="text"
            name="fatherName"
            value={familyDetails.fatherName}
            onChange={(e) => handleChange(e, setFamilyDetails)}
            style={{ borderColor: errors.fatherName ? "red" : "" }}
          />
          {errors.fatherName && (
            <p style={{ color: "red" }}>{errors.fatherName}</p>
          )}

          <label>Mother's Name:</label>
          <input
            type="text"
            name="motherName"
            value={familyDetails.motherName}
            onChange={(e) => handleChange(e, setFamilyDetails)}
          />

          <label>Brother's Name:</label>
          <input
            type="text"
            name="brotherName"
            value={familyDetails.brotherName}
            onChange={(e) => handleChange(e, setFamilyDetails)}
          />

          <label>Father's Occupation:</label>
          <input
            type="text"
            name="fatherOccupation"
            value={familyDetails.fatherOccupation}
            onChange={(e) => handleChange(e, setFamilyDetails)}
          />

          <label>Mother's Occupation:</label>
          <input
            type="text"
            name="motherOccupation"
            value={familyDetails.motherOccupation}
            onChange={(e) => handleChange(e, setFamilyDetails)}
          />

          <label>No. of Brothers:</label>
          <input
            type="number"
            name="noOfBrothers"
            value={familyDetails.noOfBrothers}
            onChange={(e) => handleChange(e, setFamilyDetails)}
          />

          <label>No. of Sisters:</label>
          <input
            type="number"
            name="noOfSisters"
            value={familyDetails.noOfSisters}
            onChange={(e) => handleChange(e, setFamilyDetails)}
          />
        </div>
      )}

      {step === 5 && (
        <div>
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

      {step === 6 && (
        <div>
          <h3>Employment Details</h3>
          <label>
            Are you employed in:<span style={{ color: "red" }}> *</span>
          </label>
          <input
            type="text"
            name="employeeIn"
            value={employmentDetails.employeeIn}
            onChange={(e) => handleChange(e, setEmploymentDetails)}
            style={{ borderColor: errors.employeeIn ? "red" : "" }}
          />
          {errors.employeeIn && (
            <p style={{ color: "red" }}>{errors.employeeIn}</p>
          )}

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

          <label>Income:</label>
          <input
            type="text"
            name="income"
            value={employmentDetails.income}
            onChange={(e) => handleChange(e, setEmploymentDetails)}
          />
        </div>
      )}

      {step === 7 && (
        <div>
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
          {errors.district && <p style={{ color: "red" }}>{errors.district}</p>}

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
      {step === 8 && (
        <div>
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
          {errors.facebook && <p style={{ color: "red" }}>{errors.facebook}</p>}

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
          {errors.linkedin && <p style={{ color: "red" }}>{errors.linkedin}</p>}

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
      {step === 9 && (
        <div>
          <h3>Other Details</h3>
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

      {step === 10 && (
        <div>
          <h3>Upload Profile Images</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e, "profile")}
          />
          {profileImages.map((image, index) => (
            <div key={index}>
              <img
                src={image.url}
                alt={`Profile Image ${index + 1}`}
                width="100"
              />
            </div>
          ))}
        </div>
      )}

      {step === 11 && (
        <div>
          <h3>Upload Kundali Images</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e, "kundali")}
          />
          {kundaliImages.map((image, index) => (
            <div key={index}>
              <img
                src={image.url}
                alt={`Kundali Image ${index + 1}`}
                width="100"
              />
            </div>
          ))}
        </div>
      )}

      <div>
        {step > 1 && (
          <CustomButton
            type="button"
            onClick={handlePrevious}
            label={"Previous"}
          ></CustomButton>
        )}
        {step < 11 ? (
          <CustomButton
            type="button"
            onClick={handleNext}
            label={"Next"}
          ></CustomButton>
        ) : (
          <CustomButton
            type="button"
            onClick={handleSubmit}
            label={"Submit"}
          ></CustomButton>
        )}
      </div>
    </form>
  );
};

export default AddProfile;
