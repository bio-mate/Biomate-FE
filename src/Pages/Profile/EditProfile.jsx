// import React, { useEffect, useState } from "react";
// //import apiRequest from "../../utils/api"; // Assuming this is a custom API utility
// import { useNavigate, useParams } from "react-router-dom";
// import CustomButton from "../../Atoms/CustomButton";

// const UpdateProfile = () => {
//   const { userId = '671397f170a753bb6e3093b2' } = useParams(); // Get user ID from the route
//   const navigate = useNavigate();
  
//   const [profileData, setProfileData] = useState({
//     personalDetails: {
//       firstName: "",
//       lastName: "",
//       age: "",
//       gender: "",
//       bloodGroup: "",
//       complexion: "",
//       height: "",
//       weight: "",
//     },
//     religiousBackground: {
//       religion: "",
//       caste: "",
//       subCaste: "",
//       language: "",
//     },
//     astroDetails: {
//       dateOfBirth: "",
//       placeOfBirth: "",
//       timeOfBirth: "",
//       rashi: "",
//       nakshatra: "",
//       gotra: "",
//     },
//     familyDetails: {
//       fatherName: "",
//       motherName: "",
//       fatherOccupation: "",
//       motherOccupation: "",
//       noOfBrothers: "",
//       noOfSisters: "",
//     },
//     educationDetails: {
//       degree: "",
//       collegeName: "",
//     },
//     careerDetails: {
//       employedIn: "",
//       companyName: "",
//       designation: "",
//       income: "",
//     },
//     lifestyle: {
//       diet: "",
//     },
//     contactInformation: {
//       contactNumber: "",
//       address: {
//         country: "",
//         state: "",
//         district: "",
//         residentialAddress: "",
//         permanentAddress: "",
//       },
//       linkedInUrl: "",
//       instagramUrl: "",
//       facebookUrl: "",
//     },
//   });

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await ("GET", `http://localhost:4000/api/profile/viewProfile/${userId}`);
//         if (response.status === 200) {
//           setProfileData(response.data); // Assuming response data is in the correct format
//         }
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };
//     fetchProfileData();
//   }, [userId]);

//   const handleChange = (e, section) => {
//     const { name, value } = e.target;
//     setProfileData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [name]: value,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await ("PUT", `http://localhost:4000/api/profile/updateProfile/${userId}`, profileData);
//       if (response.status === 200) {
//         console.log("Profile updated successfully");
//         navigate(`/view-profile/${userId}`); // Redirect after update
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Update Profile</h2>
      
//       <div>
//         <h3>Personal Details</h3>
//         <label>First Name:</label>
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={profileData.personalDetails.firstName}
//           onChange={(e) => handleChange(e, 'personalDetails')}
//           required
//         />
//         <label>Last Name:</label>
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={profileData.personalDetails.lastName}
//           onChange={(e) => handleChange(e, 'personalDetails')}
//           required
//         />
//         <label>Age:</label>
//         <input
//           type="number"
//           name="age"
//           placeholder="Age"
//           value={profileData.personalDetails.age}
//           onChange={(e) => handleChange(e, 'personalDetails')}
//           required
//         />
//         <label>Gender:</label>
//         <select
//           name="gender"
//           value={profileData.personalDetails.gender}
//           onChange={(e) => handleChange(e, 'personalDetails')}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <label>Blood Group</label>
//         <select
//           name="bloodGroup"
//           value={profileData.personalDetails.bloodGroup}
//           onChange={(e) => handleChange(e, 'personalDetails')}
//           required
//         >
//           <option value="">Select Blood Group</option>
//           <option value="A Positive (A+)">A Positive (A+)</option>
//           <option value="A Negative (A-)">A Negative (A-)</option>
//           <option value="B Positive (B+)">B Positive (B+)</option>
//           <option value="B Negative (B-)">B Negative (B-)</option>
//           <option value="AB Positive (AB+)">AB Positive (AB+)</option>
//           <option value="AB Negative (AB-)">AB Negative (AB-)</option>
//           <option value="O Positive (O+)">O Positive (O+)</option>
//           <option value="O Negative (O-)">O Negative (O-)</option>
//         </select>
//         <label>Complexion</label>
//         <select
//           name="complexion"
//           value={profileData.personalDetails.complexion}
//           onChange={(e) => handleChange(e, 'personalDetails')}
//           required
//         >
//           <option value="">Select Complexion</option>
//           <option value="Fair">Fair</option>
//           <option value="Wheatish">Wheatish</option>
//           <option value="Dusky">Dusky</option>
//           <option value="Dark">Dark</option>
//         </select>
//         <label>Height</label>
//         <select
//           name="height"
//           value={profileData.personalDetails.height}
//           onChange={(e) => handleChange(e, 'personalDetails')}
//           required
//         >
//           <option value="">Select Height</option>
//             <option value="4'5''">4'5''</option>
//             <option value="4'6''">4'6''</option>
//             <option value="4'7''">4'7''</option>
//             <option value="4'8''">4'8''</option>
//             <option value="4'9''">4'9''</option>
//             <option value="4'10''">4'10''</option>
//             <option value="4'11''">4'11''</option>
//             <option value="5'0''">5'0''</option>
//             <option value="5'1''">5'1''</option>
//             <option value="5'2''">5'2''</option>
//             <option value="5'3''">5'3''</option>
//             <option value="5'4''">5'4''</option>
//             <option value="5'5''">5'5''</option>
//             <option value="5'6''">5'6''</option>
//             <option value="5'7''">5'7''</option>
//             <option value="5'8''">5'8''</option>
//             <option value="5'9''">5'9''</option>
//             <option value="5'10''">5'10''</option>
//             <option value="5'11''">5'11''</option>
//             <option value="6'1''">6'1''</option>
//             <option value="6'2''">6'2''</option>
//             <option value="6'3''">6'3''</option>
//             <option value="6'4''">6'4''</option>
//             <option value="6'5''">6'5''</option>
//           </select>
//         <label>Weight</label>
//         <input
//           type="number"
//           name="weight"
//           placeholder="Weight"
//           value={profileData.personalDetails.weight}
//           onChange={(e) => handleChange(e, 'personalDetails')}
//           required
//         />
//       </div>

//       <div>
//         <h3>Religious Background</h3>
//         <label>Religion:</label>
//         <input
//           type="text"
//           name="religion"
//           placeholder="Religion"
//           value={profileData.religiousBackground.religion}
//           onChange={(e) => handleChange(e, 'religiousBackground')}
//           required
//         />
//         <label>Caste:</label>
//         <input
//           type="text"
//           name="caste"
//           placeholder="Caste"
//           value={profileData.religiousBackground.caste}
//           onChange={(e) => handleChange(e, 'religiousBackground')}
//         />
//         <label>Sub Caste:</label>
//         <input
//           type="text"
//           name="subCaste"
//           placeholder="Sub Caste"
//           value={profileData.religiousBackground.subCaste}
//           onChange={(e) => handleChange(e, 'religiousBackground')}
//         />
//         <label>Language:</label>
//         <input
//           type="text"
//           name="language"
//           placeholder="Language"
//           value={profileData.religiousBackground.language}
//           onChange={(e) => handleChange(e, 'religiousBackground')}
//           required
//         />
//       </div>

//       <div>
//         <h3>Astrological Details</h3>
//         <label>Date Of Birth:</label>
//         <input
//           type="date"
//           name="dateOfBirth"
//           value={profileData.astroDetails.dateOfBirth}
//           onChange={(e) => handleChange(e, 'astroDetails')}
//           required
//         />
//         <label>Place Of Birth:</label>
//         <input
//           type="text"
//           name="placeOfBirth"
//           placeholder="Place of Birth"
//           value={profileData.astroDetails.placeOfBirth}
//           onChange={(e) => handleChange(e, 'astroDetails')}
//           required
//         />
//         <label>Time Of Birth:</label>
//         <input
//           type="text"
//           name="timeOfBirth"
//           placeholder="Time of Birth"
//           value={profileData.astroDetails.timeOfBirth}
//           onChange={(e) => handleChange(e, 'astroDetails')}
//         />
//         <label>Rashi:</label>
//         <input
//           type="text"
//           name="rashi"
//           placeholder="Rashi"
//           value={profileData.astroDetails.rashi}
//           onChange={(e) => handleChange(e, 'astroDetails')}
//           required
//         />
//         <label>Nakshatra:</label>
//         <input
//           type="text"
//           name="nakshatra"
//           placeholder="Nakshatra"
//           value={profileData.astroDetails.nakshatra}
//           onChange={(e) => handleChange(e, 'astroDetails')}
//         />
//         <label>Gotra:</label>
//         <input
//           type="text"
//           name="gotra"
//           placeholder="Gotra"
//           value={profileData.astroDetails.gotra}
//           onChange={(e) => handleChange(e, 'astroDetails')}
//           required
//         />
//       </div>

//       <div>
//         <h3>Family Details</h3>
//         <label>Father Name:</label>
//         <input
//           type="text"
//           name="fatherName"
//           placeholder="Father's Name"
//           value={profileData.familyDetails.fatherName}
//           onChange={(e) => handleChange(e, 'familyDetails')}
//           required
//         />
//         <label>Mother Name:</label>
//         <input
//           type="text"
//           name="motherName"
//           placeholder="Mother's Name"
//           value={profileData.familyDetails.motherName}
//           onChange={(e) => handleChange(e, 'familyDetails')}
//           required
//         />
//         <label>Father Occupation:</label>
//         <input
//           type="text"
//           name="fatherOccupation"
//           placeholder="Father's Occupation"
//           value={profileData.familyDetails.fatherOccupation}
//           onChange={(e) => handleChange(e, 'familyDetails')}
//         />
//         <label>Mother Occupation:</label>
//         <input
//           type="text"
//           name="motherOccupation"
//           placeholder="Mother's Occupation"
//           value={profileData.familyDetails.motherOccupation}
//           onChange={(e) => handleChange(e, 'familyDetails')}
//         />
//         <label>No Of Brothers:</label>
//         <input
//           type="number"
//           name="noOfBrothers"
//           placeholder="Number of Brothers"
//           value={profileData.familyDetails.noOfBrothers}
//           onChange={(e) => handleChange(e, 'familyDetails')}
//         />
//         <label>No Of Sisters:</label>
//         <input
//           type="number"
//           name="noOfSisters"
//           placeholder="Number of Sisters"
//           value={profileData.familyDetails.noOfSisters}
//           onChange={(e) => handleChange(e, 'familyDetails')}
//         />
//       </div>

//       <div>
//         <h3>Education Details</h3>
//         <label>Degree:</label>
//         <input
//           type="text"
//           name="degree"
//           placeholder="Degree"
//           value={profileData.educationDetails.degree}
//           onChange={(e) => handleChange(e, 'educationDetails')}
//         />
//         <label>Collage Name:</label>
//         <input
//           type="text"
//           name="collegeName"
//           placeholder="College Name"
//           value={profileData.educationDetails.collegeName}
//           onChange={(e) => handleChange(e, 'educationDetails')}
//         />
//       </div>

//       <div>
//         <h3>Career Details</h3>
//         <label>Employed In:</label>
//         <input
//           type="text"
//           name="employedIn"
//           placeholder="Employed In"
//           value={profileData.careerDetails.employedIn}
//           onChange={(e) => handleChange(e, 'careerDetails')}
//         />
//         <label>Company Name:</label>
//         <input
//           type="text"
//           name="companyName"
//           placeholder="Company Name"
//           value={profileData.careerDetails.companyName}
//           onChange={(e) => handleChange(e, 'careerDetails')}
//         />
//         <label>Designation:</label>
//         <input
//           type="text"
//           name="designation"
//           placeholder="Designation"
//           value={profileData.careerDetails.designation}
//           onChange={(e) => handleChange(e, 'careerDetails')}
//         />
//         <label>Income:</label>
//         <input
//           type="number"
//           name="income"
//           placeholder="Income"
//           value={profileData.careerDetails.income}
//           onChange={(e) => handleChange(e, 'careerDetails')}
//         />
//       </div>

//       <div>
//         <h3>Lifestyle</h3>
//         <label>Diet:</label>
//         <select
//           name="diet"
//           value={profileData.lifestyle.diet}
//           onChange={(e) => handleChange(e, 'lifestyle')}
//           required
//         >
//           <option value="">Select Diet</option>
//           <option value="Vegetarian">Vegetarian</option>
//           <option value="Non-Vegetarian">Non-Vegetarian</option>
//           <option value="Vegan">Vegan</option>
//         </select>
//       </div>

//       <div>
//         <h3>Contact Information</h3>
//         <label>Contact Number:</label>
//         <input
//           type="text"
//           name="contactNumber"
//           placeholder="Contact Number"
//           value={profileData.contactInformation.contactNumber}
//           onChange={(e) => handleChange(e, 'contactInformation')}
//           required
//         />
//         <h4>Address</h4>
//         <label>Country:</label>
//         <input
//           type="text"
//           name="country"
//           placeholder="Country"
//           value={profileData.contactInformation.address.country}
//           onChange={(e) => handleChange(e, 'contactInformation.address')}
//           required
//         />
//         <label>State:</label>
//         <input
//           type="text"
//           name="state"
//           placeholder="State"
//           value={profileData.contactInformation.address.state}
//           onChange={(e) => handleChange(e, 'contactInformation.address')}
//           required
//         />
//         <label>District:</label>
//         <input
//           type="text"
//           name="district"
//           placeholder="District"
//           value={profileData.contactInformation.address.district}
//           onChange={(e) => handleChange(e, 'contactInformation.address')}
//           required
//         />
//         <label>Residential Address:</label>
//         <input
//           type="text"
//           name="residentialAddress"
//           placeholder="Residential Address"
//           value={profileData.contactInformation.address.residentialAddress}
//           onChange={(e) => handleChange(e, 'contactInformation.address')}
//           required
//         />
//         <label>Paramanent Address:</label>
//         <input
//           type="text"
//           name="permanentAddress"
//           placeholder="Permanent Address"
//           value={profileData.contactInformation.address.permanentAddress}
//           onChange={(e) => handleChange(e, 'contactInformation.address')}
//           required
//         />
//         <label>LinkedIn Url:</label>
//         <input
//           type="text"
//           name="linkedInUrl"
//           placeholder="LinkedIn URL"
//           value={profileData.contactInformation.linkedInUrl}
//           onChange={(e) => handleChange(e, 'contactInformation')}
//         />
//         <label>Instagram Url:</label>
//         <input
//           type="text"
//           name="instagramUrl"
//           placeholder="Instagram URL"
//           value={profileData.contactInformation.instagramUrl}
//           onChange={(e) => handleChange(e, 'contactInformation')}
//         />
//         <label>Facebook Url:</label>
//         <input
//           type="text"
//           name="facebookUrl"
//           placeholder="Facebook URL"
//           value={profileData.contactInformation.facebookUrl}
//           onChange={(e) => handleChange(e, 'contactInformation')}
//         />
//       </div>

//       <CustomButton label="Update" type="primary">Update Profile</CustomButton>
//     </form>
//   );
// };

// export default UpdateProfile;


import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api'; // Utility function for API calls
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from "../../Atoms/ProgressBar";

const titles = [
  "personalDetails",
  "religiousBackground",
  "astroDetails",
  "familyDetails",
  "educationDetails",
  "careerDetails",
  "lifestyle",
  "contactInformation",
  "imagePreviews"
];

const formSteps = [
    {
        title: 'Personal Details',
        fields: [
            { label: 'First Name', name: 'personalDetails.first_name', type: 'text', placeholder: 'Enter first name' },
            { label: 'Last Name', name: 'personalDetails.last_name', type: 'text', placeholder: 'Enter last name' },
            { label: 'Age', name: 'personalDetails.age', type: 'number', placeholder: 'Enter age' },
            { label: 'Gender', name: 'personalDetails.gender', type: 'select', options: ['Male', 'Female', 'Other'] },
            { label: 'Blood Group', name: 'personalDetails.bloodGroup', type: 'text', placeholder: 'Enter blood group' },
            { label: 'Complexion', name: 'personalDetails.complexion', type: 'text', placeholder: 'Enter complexion' },
            { label: 'Height (cm)', name: 'personalDetails.height', type: 'number', placeholder: 'Enter height in cm' },
            { label: 'Weight (kg)', name: 'personalDetails.weight', type: 'number', placeholder: 'Enter weight in kg' },
        ],
    },
    {
        title: 'Religious Background',
        fields: [
            { label: 'Religion', name: 'religiousBackground.religion', type: 'text', placeholder: 'Enter religion' },
            { label: 'Caste', name: 'religiousBackground.caste', type: 'text', placeholder: 'Enter caste' },
            { label: 'Sub-Caste', name: 'religiousBackground.subCaste', type: 'text', placeholder: 'Enter sub-caste' },
            { label: 'Language', name: 'religiousBackground.language', type: 'text', placeholder: 'Enter language' },
        ],
    },
    {
        title: 'Astro Details',
        fields: [
            { label: 'Date of Birth', name: 'astroDetails.dateOfBirth', type: 'date' },
            { label: 'Place of Birth', name: 'astroDetails.placeOfBirth', type: 'text', placeholder: 'Enter place of birth' },
            { label: 'Time of Birth', name: 'astroDetails.timeOfBirth', type: 'time' },
            { label: 'Rashi', name: 'astroDetails.rashi', type: 'text', placeholder: 'Enter rashi' },
            { label: 'Nakshatra', name: 'astroDetails.nakshatra', type: 'text', placeholder: 'Enter nakshatra' },
            { label: 'Gotra', name: 'astroDetails.gotra', type: 'text', placeholder: 'Enter gotra' },
        ],
    },
    {
        title: 'Family Details',
        fields: [
            { label: "Father's Name", name: 'familyDetails.fatherName', type: 'text', placeholder: 'Enter father’s name' },
            { label: "Mother's Name", name: 'familyDetails.motherName', type: 'text', placeholder: 'Enter mother’s name' },
            { label: "Father's Occupation", name: 'familyDetails.fatherOccupation', type: 'text', placeholder: 'Enter father’s occupation' },
            { label: "Mother's Occupation", name: 'familyDetails.motherOccupation', type: 'text', placeholder: 'Enter mother’s occupation' },
            { label: 'No. of Brothers', name: 'familyDetails.noOfBrothers', type: 'number', placeholder: 'Enter number of brothers' },
            { label: 'No. of Sisters', name: 'familyDetails.noOfSisters', type: 'number', placeholder: 'Enter number of sisters' },
        ],
    },
    {
        title: 'Education Details',
        fields: [
            { label: 'Degree', name: 'educationDetails.degree', type: 'text', placeholder: 'Enter degree' },
            { label: 'College Name', name: 'educationDetails.collegeName', type: 'text', placeholder: 'Enter college name' },
        ],
    },
    {
        title: 'Career Details',
        fields: [
            { label: 'Employed In', name: 'careerDetails.employedIn', type: 'text', placeholder: 'Enter employment sector' },
            { label: 'Company Name', name: 'careerDetails.companyName', type: 'text', placeholder: 'Enter company name' },
            { label: 'Designation', name: 'careerDetails.designation', type: 'text', placeholder: 'Enter designation' },
            { label: 'Income', name: 'careerDetails.income', type: 'number', placeholder: 'Enter monthly income' },
        ],
    },
    {
        title: 'Lifestyle',
        fields: [
            { label: 'Diet', name: 'lifestyle.diet', type: 'select', options: ['Veg', 'Non-Veg', 'Vegan'] },
        ],
    },
    {
        title: 'Contact Information',
        fields: [
            { label: 'Contact Number', name: 'contactInformation.contactNumber', type: 'text', placeholder: 'Enter contact number' },
            { label: 'Country', name: 'contactInformation.country', type: 'text', placeholder: 'Enter country' },
            { label: 'State', name: 'contactInformation.state', type: 'text', placeholder: 'Enter state' },
            { label: 'District', name: 'contactInformation.district', type: 'text', placeholder: 'Enter district' },
            { label: 'Residential Address', name: 'contactInformation.residentialAddress', type: 'text', placeholder: 'Enter residential address' },
            { label: 'Permanent Address', name: 'contactInformation.permanentAddress', type: 'text', placeholder: 'Enter permanent address' },
            { label: 'LinkedIn URL', name: 'contactInformation.linkedInUrl', type: 'url', placeholder: 'Enter LinkedIn profile URL' },
            { label: 'Instagram URL', name: 'contactInformation.instagramUrl', type: 'url', placeholder: 'Enter Instagram profile URL' },
            { label: 'Facebook URL', name: 'contactInformation.facebookUrl', type: 'url', placeholder: 'Enter Facebook profile URL' },
        ],
    },
    {
        title: 'Image Previews',
        fields: [
            { label: 'Profile Images', name: 'imagePreviews.profileImages', type: 'file', multiple: true },
            { label: 'Kundali Images', name: 'imagePreviews.kundaliImages', type: 'file', multiple: true },
        ],
    },
];

const UpdateProfile = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        personalDetails: {
            first_name: '',
            last_name: '',
            age: '',
            gender: '',
            bloodGroup: '',
            complexion: '',
            height: '',
            weight: ''
        },
        religiousBackground: {
            religion: '',
            caste: '',
            subCaste: '',
            language: '',
        },
        astroDetails: {
            dateOfBirth: '',
            placeOfBirth: '',
            timeOfBirth: '',
            rashi: '',
            nakshatra: '',
            gotra: '',
        },
        familyDetails: {
            fatherName: '',
            motherName: '',
            fatherOccupation: '',
            motherOccupation: '',
            noOfBrothers: '',
            noOfSisters: '',
        },
        educationDetails: {
            degree: '',
            collegeName: '',
        },
        careerDetails: {
            employedIn: '',
            companyName: '',
            designation: '',
            income: '',
        },
        lifestyle: {
            diet: '',
        },
        contactInformation: {
            contactNumber: '',
            country: '',
            state: '',
            district: '',
            residentialAddress: '',
            permanentAddress: '',
            linkedInUrl: '',
            instagramUrl: '',
            facebookUrl: '',
        },
        imagePreviews: {
            profileImages: [],
            kundaliImages: [],
        }
    });

    useEffect(() => {
        // Fetch existing profile data when the component mounts
        const fetchProfileData = async () => {
            const response = await fetchData('http://localhost:8804/mate/api/v1/profile/get'); // Adjust this endpoint as necessary
            if (response) {
                setFormData(response.data); // Assuming response has a 'data' field containing the profile data
            }
        };
        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name.includes('imagePreviews')) {
            // Handling file inputs
            const key = name.split('.')[1];
            setFormData(prevData => ({
                ...prevData,
                imagePreviews: {
                    ...prevData.imagePreviews,
                    [key]: files ? Array.from(files) : [],
                }
            }));
        } else {
            // Handling other input types
            const keys = name.split('.');
            setFormData(prevData => {
                let nestedData = { ...prevData };
                keys.forEach((key, index) => {
                    if (index === keys.length - 1) {
                        nestedData[key] = value;
                    } else {
                        nestedData[key] = nestedData[key] || {};
                        nestedData = nestedData[key];
                    }
                });
                return nestedData;
            });
        }
    };

    const nextStep = () => setStep(prevStep => prevStep + 1);
    const prevStep = () => setStep(prevStep => prevStep - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { success } = await fetchData('http://localhost:8804/mate/api/v1/profile/update', 'PUT', formData);
        if (success) {
            toast.success('Profile updated successfully!');
            setFormData({
                personalDetails: {
                    first_name: '',
                    last_name: '',
                    age: '',
                    gender: '',
                    bloodGroup: '',
                    complexion: '',
                    height: '',
                    weight: ''
                },
                religiousBackground: {
                    religion: '',
                    caste: '',
                    subCaste: '',
                    language: '',
                },
                astroDetails: {
                    dateOfBirth: '',
                    placeOfBirth: '',
                    timeOfBirth: '',
                    rashi: '',
                    nakshatra: '',
                    gotra: '',
                },
                familyDetails: {
                    fatherName: '',
                    motherName: '',
                    motherOccupation: '',
                    fatherOccupation: '',
                    noOfBrothers: '',
                    noOfSisters: '',
                },
                educationDetails: {
                    degree: '',
                    collegeName: '',
                },
                careerDetails: {
                    employedIn: '',
                    companyName: '',
                    designation: '',
                    income: '',
                },
                lifestyle: {
                    diet: '',
                },
                contactInformation: {
                    contactNumber: '',
                    country: '',
                    state: '',
                    district: '',
                    residentialAddress: '',
                    permanentAddress: '',
                    linkedInUrl: '',
                    instagramUrl: '',
                    facebookUrl: '',
                },
                imagePreviews: {
                    profileImages: [],
                    kundaliImages: [],
                }
            });
            setStep(0);
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
                        <h5>{formSteps[step].title}</h5>
                        <ProgressBar currentStep={step} titles={titles} />
                        {formSteps[step].fields.map(field => (
                            <div className="mb-3" key={field.name}>
                                <label className="form-label">{field.label}</label>
                                {field.type === 'select' ? (
                                    <select
                                        className="form-control"
                                        name={field.name}
                                        value={formData[field.name.split('.')[0]][field.name.split('.')[1]] || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        {field.options.map(option => (
                                            <option key={option} value={option.toLowerCase()}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        className="form-control"
                                        placeholder={field.placeholder || ''}
                                        value={
                                            field.name.includes('.')
                                                ? formData[field.name.split('.')[0]][field.name.split('.')[1]] || ''
                                                : formData[field.name] || ''
                                        }
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        ))}
                        <div className="d-flex justify-content-between mt-4">
                            {step > 0 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous</button>}
                            {step < formSteps.length - 1 ? (
                                <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>
                            ) : (
                                <button type="submit" className="btn btn-success">Update</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
