import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils/api"; // Utility function for API calls
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
  "imagePreviews",
];

const formSteps = [
  {
    title: "Personal Details",
    fields: [
      {
        label: "First Name",
        name: "personalDetails.first_name",
        type: "text",
        placeholder: "Enter first name",
      },
      {
        label: "Last Name",
        name: "personalDetails.last_name",
        type: "text",
        placeholder: "Enter last name",
      },
      {
        label: "Age",
        name: "personalDetails.age",
        type: "number",
        placeholder: "Enter age",
      },
      {
        label: "Gender",
        name: "personalDetails.gender",
        type: "select",
        options: ["Male", "Female", "Other"],
      },
      {
        label: "Blood Group",
        name: "personalDetails.bloodGroup",
        type: "text",
        placeholder: "Enter blood group",
      },
      {
        label: "Complexion",
        name: "personalDetails.complexion",
        type: "text",
        placeholder: "Enter complexion",
      },
      {
        label: "Height (cm)",
        name: "personalDetails.height",
        type: "number",
        placeholder: "Enter height in cm",
      },
      {
        label: "Weight (kg)",
        name: "personalDetails.weight",
        type: "number",
        placeholder: "Enter weight in kg",
      },
    ],
  },
  {
    title: "Religious Background",
    fields: [
      {
        label: "Religion",
        name: "religiousBackground.religion",
        type: "text",
        placeholder: "Enter religion",
      },
      {
        label: "Caste",
        name: "religiousBackground.caste",
        type: "text",
        placeholder: "Enter caste",
      },
      {
        label: "Sub-Caste",
        name: "religiousBackground.subCaste",
        type: "text",
        placeholder: "Enter sub-caste",
      },
      {
        label: "Language",
        name: "religiousBackground.language",
        type: "text",
        placeholder: "Enter language",
      },
    ],
  },
  {
    title: "Astro Details",
    fields: [
      {
        label: "Date of Birth",
        name: "astroDetails.dateOfBirth",
        type: "date",
      },
      {
        label: "Place of Birth",
        name: "astroDetails.placeOfBirth",
        type: "text",
        placeholder: "Enter place of birth",
      },
      {
        label: "Time of Birth",
        name: "astroDetails.timeOfBirth",
        type: "time",
      },
      {
        label: "Rashi",
        name: "astroDetails.rashi",
        type: "text",
        placeholder: "Enter rashi",
      },
      {
        label: "Nakshatra",
        name: "astroDetails.nakshatra",
        type: "text",
        placeholder: "Enter nakshatra",
      },
      {
        label: "Gotra",
        name: "astroDetails.gotra",
        type: "text",
        placeholder: "Enter gotra",
      },
    ],
  },
  {
    title: "Family Details",
    fields: [
      {
        label: "Father's Name",
        name: "familyDetails.fatherName",
        type: "text",
        placeholder: "Enter father’s name",
      },
      {
        label: "Mother's Name",
        name: "familyDetails.motherName",
        type: "text",
        placeholder: "Enter mother’s name",
      },
      {
        label: "Father's Occupation",
        name: "familyDetails.fatherOccupation",
        type: "text",
        placeholder: "Enter father’s occupation",
      },
      {
        label: "Mother's Occupation",
        name: "familyDetails.motherOccupation",
        type: "text",
        placeholder: "Enter mother’s occupation",
      },
      {
        label: "No. of Brothers",
        name: "familyDetails.noOfBrothers",
        type: "number",
        placeholder: "Enter number of brothers",
      },
      {
        label: "No. of Sisters",
        name: "familyDetails.noOfSisters",
        type: "number",
        placeholder: "Enter number of sisters",
      },
    ],
  },
  {
    title: "Education Details",
    fields: [
      {
        label: "Degree",
        name: "educationDetails.degree",
        type: "text",
        placeholder: "Enter degree",
      },
      {
        label: "College Name",
        name: "educationDetails.collegeName",
        type: "text",
        placeholder: "Enter college name",
      },
    ],
  },
  {
    title: "Career Details",
    fields: [
      {
        label: "Employed In",
        name: "careerDetails.employedIn",
        type: "text",
        placeholder: "Enter employment sector",
      },
      {
        label: "Company Name",
        name: "careerDetails.companyName",
        type: "text",
        placeholder: "Enter company name",
      },
      {
        label: "Designation",
        name: "careerDetails.designation",
        type: "text",
        placeholder: "Enter designation",
      },
      {
        label: "Income",
        name: "careerDetails.income",
        type: "number",
        placeholder: "Enter monthly income",
      },
    ],
  },
  {
    title: "Lifestyle",
    fields: [
      {
        label: "Diet",
        name: "lifestyle.diet",
        type: "select",
        options: ["Veg", "Non-Veg", "Vegan"],
      },
    ],
  },
  {
    title: "Contact Information",
    fields: [
      {
        label: "Contact Number",
        name: "contactInformation.contactNumber",
        type: "text",
        placeholder: "Enter contact number",
      },
      {
        label: "Country",
        name: "contactInformation.country",
        type: "text",
        placeholder: "Enter country",
      },
      {
        label: "State",
        name: "contactInformation.state",
        type: "text",
        placeholder: "Enter state",
      },
      {
        label: "District",
        name: "contactInformation.district",
        type: "text",
        placeholder: "Enter district",
      },
      {
        label: "Residential Address",
        name: "contactInformation.residentialAddress",
        type: "text",
        placeholder: "Enter residential address",
      },
      {
        label: "Permanent Address",
        name: "contactInformation.permanentAddress",
        type: "text",
        placeholder: "Enter permanent address",
      },
      {
        label: "LinkedIn URL",
        name: "contactInformation.linkedInUrl",
        type: "url",
        placeholder: "Enter LinkedIn profile URL",
      },
      {
        label: "Instagram URL",
        name: "contactInformation.instagramUrl",
        type: "url",
        placeholder: "Enter Instagram profile URL",
      },
      {
        label: "Facebook URL",
        name: "contactInformation.facebookUrl",
        type: "url",
        placeholder: "Enter Facebook profile URL",
      },
    ],
  },
  {
    title: "Image Previews",
    fields: [
      {
        label: "Profile Images",
        name: "imagePreviews.profileImages",
        type: "file",
        multiple: true,
      },
      {
        label: "Kundali Images",
        name: "imagePreviews.kundaliImages",
        type: "file",
        multiple: true,
      },
    ],
  },
];

const UpdateProfile = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    personalDetails: {
      first_name: "",
      last_name: "",
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
      country: "",
      state: "",
      district: "",
      residentialAddress: "",
      permanentAddress: "",
      linkedInUrl: "",
      instagramUrl: "",
      facebookUrl: "",
    },
    imagePreviews: {
      profileImages: [],
      kundaliImages: [],
    },
  });

  useEffect(() => {
    // Fetch existing profile data when the component mounts
    const fetchProfileData = async () => {
      const response = await fetchData(
        "http://localhost:8804/mate/api/v1/profile/get"
      ); // Adjust this endpoint as necessary
      if (response) {
        setFormData(response.data); // Assuming response has a 'data' field containing the profile data
      }
    };
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name.includes("imagePreviews")) {
      // Handling file inputs
      const key = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        imagePreviews: {
          ...prevData.imagePreviews,
          [key]: files ? Array.from(files) : [],
        },
      }));
    } else {
      // Handling other input types
      const keys = name.split(".");
      setFormData((prevData) => {
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

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success } = await fetchData(
      "http://localhost:3000/mate/api/v1/profile/update",
      "PUT",
      formData
    );
    if (success) {
      toast.success("Profile updated successfully!");
      setFormData({
        personalDetails: {
          first_name: "",
          last_name: "",
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
          motherOccupation: "",
          fatherOccupation: "",
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
          country: "",
          state: "",
          district: "",
          residentialAddress: "",
          permanentAddress: "",
          linkedInUrl: "",
          instagramUrl: "",
          facebookUrl: "",
        },
        imagePreviews: {
          profileImages: [],
          kundaliImages: [],
        },
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
            {formSteps[step].fields.map((field) => (
              <div className="mb-3" key={field.name}>
                <label className="form-label">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    className="form-control"
                    name={field.name}
                    value={
                      formData[field.name.split(".")[0]][
                        field.name.split(".")[1]
                      ] || ""
                    }
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {field.options.map((option) => (
                      <option key={option} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    className="form-control"
                    placeholder={field.placeholder || ""}
                    value={
                      field.name.includes(".")
                        ? formData[field.name.split(".")[0]][
                            field.name.split(".")[1]
                          ] || ""
                        : formData[field.name] || ""
                    }
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
            <div className="d-flex justify-content-between mt-4">
              {step > 0 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}
              {step < formSteps.length - 1 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={nextStep}
                >
                  Next
                </button>
              ) : (
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
