import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/api"; // Assuming this is a custom API utility
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../Atoms/CustomButton";

const UpdateProfile = () => {
  const { userId = '671397f170a753bb6e3093b2' } = useParams(); // Get user ID from the route
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    personalDetails: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      bloodGroup: "",
      complexion: "",
      height: "",
      weight: "",
    },
    religiousBackground: {
      religion: "",
      caste: "",
      subCaste: "",
      language: "",
    },
    astroDetails: {
      dateOfBirth: "",
      placeOfBirth: "",
      timeOfBirth: "",
      rashi: "",
      nakshatra: "",
      gotra: "",
    },
    familyDetails: {
      fatherName: "",
      motherName: "",
      fatherOccupation: "",
      motherOccupation: "",
      noOfBrothers: "",
      noOfSisters: "",
    },
    educationDetails: {
      degree: "",
      collegeName: "",
    },
    careerDetails: {
      employedIn: "",
      companyName: "",
      designation: "",
      income: "",
    },
    lifestyle: {
      diet: "",
    },
    contactInformation: {
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
    },
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiRequest("GET", `http://localhost:4000/api/profile/viewProfile/${userId}`);
        if (response.status === 200) {
          setProfileData(response.data); // Assuming response data is in the correct format
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [userId]);

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest("PUT", `http://localhost:4000/api/profile/updateProfile/${userId}`, profileData);
      if (response.status === 200) {
        console.log("Profile updated successfully");
        navigate(`/view-profile/${userId}`); // Redirect after update
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      
      <div>
        <h3>Personal Details</h3>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={profileData.personalDetails.firstName}
          onChange={(e) => handleChange(e, 'personalDetails')}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={profileData.personalDetails.lastName}
          onChange={(e) => handleChange(e, 'personalDetails')}
          required
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={profileData.personalDetails.age}
          onChange={(e) => handleChange(e, 'personalDetails')}
          required
        />
        <label>Gender:</label>
        <select
          name="gender"
          value={profileData.personalDetails.gender}
          onChange={(e) => handleChange(e, 'personalDetails')}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label>Blood Group</label>
        <select
          name="bloodGroup"
          value={profileData.personalDetails.bloodGroup}
          onChange={(e) => handleChange(e, 'personalDetails')}
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
        </select>
        <label>Complexion</label>
        <select
          name="complexion"
          value={profileData.personalDetails.complexion}
          onChange={(e) => handleChange(e, 'personalDetails')}
          required
        >
          <option value="">Select Complexion</option>
          <option value="Fair">Fair</option>
          <option value="Wheatish">Wheatish</option>
          <option value="Dusky">Dusky</option>
          <option value="Dark">Dark</option>
        </select>
        <label>Height</label>
        <select
          name="height"
          value={profileData.personalDetails.height}
          onChange={(e) => handleChange(e, 'personalDetails')}
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
        <label>Weight</label>
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={profileData.personalDetails.weight}
          onChange={(e) => handleChange(e, 'personalDetails')}
          required
        />
      </div>

      <div>
        <h3>Religious Background</h3>
        <label>Religion:</label>
        <input
          type="text"
          name="religion"
          placeholder="Religion"
          value={profileData.religiousBackground.religion}
          onChange={(e) => handleChange(e, 'religiousBackground')}
          required
        />
        <label>Caste:</label>
        <input
          type="text"
          name="caste"
          placeholder="Caste"
          value={profileData.religiousBackground.caste}
          onChange={(e) => handleChange(e, 'religiousBackground')}
        />
        <label>Sub Caste:</label>
        <input
          type="text"
          name="subCaste"
          placeholder="Sub Caste"
          value={profileData.religiousBackground.subCaste}
          onChange={(e) => handleChange(e, 'religiousBackground')}
        />
        <label>Language:</label>
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={profileData.religiousBackground.language}
          onChange={(e) => handleChange(e, 'religiousBackground')}
          required
        />
      </div>

      <div>
        <h3>Astrological Details</h3>
        <label>Date Of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={profileData.astroDetails.dateOfBirth}
          onChange={(e) => handleChange(e, 'astroDetails')}
          required
        />
        <label>Place Of Birth:</label>
        <input
          type="text"
          name="placeOfBirth"
          placeholder="Place of Birth"
          value={profileData.astroDetails.placeOfBirth}
          onChange={(e) => handleChange(e, 'astroDetails')}
          required
        />
        <label>Time Of Birth:</label>
        <input
          type="text"
          name="timeOfBirth"
          placeholder="Time of Birth"
          value={profileData.astroDetails.timeOfBirth}
          onChange={(e) => handleChange(e, 'astroDetails')}
        />
        <label>Rashi:</label>
        <input
          type="text"
          name="rashi"
          placeholder="Rashi"
          value={profileData.astroDetails.rashi}
          onChange={(e) => handleChange(e, 'astroDetails')}
          required
        />
        <label>Nakshatra:</label>
        <input
          type="text"
          name="nakshatra"
          placeholder="Nakshatra"
          value={profileData.astroDetails.nakshatra}
          onChange={(e) => handleChange(e, 'astroDetails')}
        />
        <label>Gotra:</label>
        <input
          type="text"
          name="gotra"
          placeholder="Gotra"
          value={profileData.astroDetails.gotra}
          onChange={(e) => handleChange(e, 'astroDetails')}
          required
        />
      </div>

      <div>
        <h3>Family Details</h3>
        <label>Father Name:</label>
        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={profileData.familyDetails.fatherName}
          onChange={(e) => handleChange(e, 'familyDetails')}
          required
        />
        <label>Mother Name:</label>
        <input
          type="text"
          name="motherName"
          placeholder="Mother's Name"
          value={profileData.familyDetails.motherName}
          onChange={(e) => handleChange(e, 'familyDetails')}
          required
        />
        <label>Father Occupation:</label>
        <input
          type="text"
          name="fatherOccupation"
          placeholder="Father's Occupation"
          value={profileData.familyDetails.fatherOccupation}
          onChange={(e) => handleChange(e, 'familyDetails')}
        />
        <label>Mother Occupation:</label>
        <input
          type="text"
          name="motherOccupation"
          placeholder="Mother's Occupation"
          value={profileData.familyDetails.motherOccupation}
          onChange={(e) => handleChange(e, 'familyDetails')}
        />
        <label>No Of Brothers:</label>
        <input
          type="number"
          name="noOfBrothers"
          placeholder="Number of Brothers"
          value={profileData.familyDetails.noOfBrothers}
          onChange={(e) => handleChange(e, 'familyDetails')}
        />
        <label>No Of Sisters:</label>
        <input
          type="number"
          name="noOfSisters"
          placeholder="Number of Sisters"
          value={profileData.familyDetails.noOfSisters}
          onChange={(e) => handleChange(e, 'familyDetails')}
        />
      </div>

      <div>
        <h3>Education Details</h3>
        <label>Degree:</label>
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={profileData.educationDetails.degree}
          onChange={(e) => handleChange(e, 'educationDetails')}
        />
        <label>Collage Name:</label>
        <input
          type="text"
          name="collegeName"
          placeholder="College Name"
          value={profileData.educationDetails.collegeName}
          onChange={(e) => handleChange(e, 'educationDetails')}
        />
      </div>

      <div>
        <h3>Career Details</h3>
        <label>Employed In:</label>
        <input
          type="text"
          name="employedIn"
          placeholder="Employed In"
          value={profileData.careerDetails.employedIn}
          onChange={(e) => handleChange(e, 'careerDetails')}
        />
        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={profileData.careerDetails.companyName}
          onChange={(e) => handleChange(e, 'careerDetails')}
        />
        <label>Designation:</label>
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={profileData.careerDetails.designation}
          onChange={(e) => handleChange(e, 'careerDetails')}
        />
        <label>Income:</label>
        <input
          type="number"
          name="income"
          placeholder="Income"
          value={profileData.careerDetails.income}
          onChange={(e) => handleChange(e, 'careerDetails')}
        />
      </div>

      <div>
        <h3>Lifestyle</h3>
        <label>Diet:</label>
        <select
          name="diet"
          value={profileData.lifestyle.diet}
          onChange={(e) => handleChange(e, 'lifestyle')}
          required
        >
          <option value="">Select Diet</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Vegan">Vegan</option>
        </select>
      </div>

      <div>
        <h3>Contact Information</h3>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={profileData.contactInformation.contactNumber}
          onChange={(e) => handleChange(e, 'contactInformation')}
          required
        />
        <h4>Address</h4>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={profileData.contactInformation.address.country}
          onChange={(e) => handleChange(e, 'contactInformation.address')}
          required
        />
        <label>State:</label>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={profileData.contactInformation.address.state}
          onChange={(e) => handleChange(e, 'contactInformation.address')}
          required
        />
        <label>District:</label>
        <input
          type="text"
          name="district"
          placeholder="District"
          value={profileData.contactInformation.address.district}
          onChange={(e) => handleChange(e, 'contactInformation.address')}
          required
        />
        <label>Residential Address:</label>
        <input
          type="text"
          name="residentialAddress"
          placeholder="Residential Address"
          value={profileData.contactInformation.address.residentialAddress}
          onChange={(e) => handleChange(e, 'contactInformation.address')}
          required
        />
        <label>Paramanent Address:</label>
        <input
          type="text"
          name="permanentAddress"
          placeholder="Permanent Address"
          value={profileData.contactInformation.address.permanentAddress}
          onChange={(e) => handleChange(e, 'contactInformation.address')}
          required
        />
        <label>LinkedIn Url:</label>
        <input
          type="text"
          name="linkedInUrl"
          placeholder="LinkedIn URL"
          value={profileData.contactInformation.linkedInUrl}
          onChange={(e) => handleChange(e, 'contactInformation')}
        />
        <label>Instagram Url:</label>
        <input
          type="text"
          name="instagramUrl"
          placeholder="Instagram URL"
          value={profileData.contactInformation.instagramUrl}
          onChange={(e) => handleChange(e, 'contactInformation')}
        />
        <label>Facebook Url:</label>
        <input
          type="text"
          name="facebookUrl"
          placeholder="Facebook URL"
          value={profileData.contactInformation.facebookUrl}
          onChange={(e) => handleChange(e, 'contactInformation')}
        />
      </div>

      <CustomButton label="Update" type="primary">Update Profile</CustomButton>
    </form>
  );
};

export default UpdateProfile;
