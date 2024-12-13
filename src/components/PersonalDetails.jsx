import React from "react";
import { IoLanguageSharp } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { MdAccountCircle, MdOutlineCastForEducation, MdNightlife } from "react-icons/md";
import { FaStroopwafel } from "react-icons/fa";
import { RiHomeHeartFill } from "react-icons/ri";
import Tabs from "../Atoms/Tabs";
import SummaryDetails from "../Atoms/SummaryDetails";
import Section from "../Atoms/Section";


// Main component combining all sections with their respective data
const DetailsPage = ({
  summary,
  religion,
  height,
  language,
  location,
  fatherName,
  motherName,
  fatherOccupation,
  motherOccupation,
  phone,
  lifeStyle,
  address,
  degree,
  collegeName,
  position,
  CompanyName,
  income,
  dateOfBirth,
  companyName,
  Country,
  District,
  FacebookUrl,
  Gotra,
  Income,
  InstagramUrl,
  LinkedInUrl,
  Nakshatra,
  placeOfBirth,
  ResidentialAddress,
  Siblings,
  State,
  timeOfBirth,
  bloodGroup,
  caste,
  gender,
  rashi,
  complexion,
  nakshatra,
  gotra,
  weight,
  residentialAddress,
  country,
  district,
  state,
  noOfBrothers,
  noOfSisters,
  subCaste,
  workingWith,
  aboutMe,
  lookingFor,
  hobbies,
  parentNumber,
  selfNumber,
}) => {
  const personalDetails = [
    { label: "Gender", value: gender },
    { label: "Blood Group", value: bloodGroup },
    { label: "Complexion", value: complexion },
    { label: "Height", value: height },
    { label: "Weight", value: weight },
    { label: "Location", value: location },
  ];

  const religiousBackground = [
    { label: "Religion", value: religion },
    { label: "Caste", value: caste },
    { label: "Sub Caste", value: subCaste },
    { label: "Language", value: language },
  ];

  const astroDetails = [
    { label: "Date Of Birth", value: dateOfBirth },
    { label: "Place Of Birth", value: placeOfBirth },
    { label: "Time Of Birth", value: timeOfBirth },
    { label: "Rashi", value: rashi },
    { label: "Nakshatra", value: nakshatra },
    { label: "Gotra", value: gotra },
  ];

  const familyDetails = [
    { label: "Father's Name", value: fatherName },
    { label: "Mother's Name", value: motherName },
    { label: "Father's Occupation", value: fatherOccupation },
    { label: "Mother's Occupation", value: motherOccupation },
    { label: "No Of Brothers", value: noOfBrothers },
    { label: "No Of Sisters", value: noOfSisters },
  ];

  const educationDetails = [
    { label: "Degree", value: degree },
    { label: "College Name", value: collegeName },
  ];

  const careerDetails = [
    { label: "Working with", value: workingWith },
    { label: "Company Name", value: companyName },
    { label: "Position", value: position },
    { label: "Income", value: income },
  ];

  const lifeStyleDetails = [{ label: "LifeStyle", value: lifeStyle }];
  
  const contactDetails = [
    { label: "Parent Number", value: parentNumber },
    { label: "Self Number", value: selfNumber },
    { label: "Residential Address", value: residentialAddress },
    { label: "Country", value: country },
    { label: "State", value: state },
    { label: "District", value: district },
  ];

  return (
    <div className="container">
      <SummaryDetails details={aboutMe} title="About Me" />
      
      {/* Personal Details Section */}
      <Section icon={<MdAccountCircle />} title="Personal Details" details={personalDetails} />
      
      {/* Religious Background Section */}
      <Section icon={<IoLanguageSharp />} title="Religious Background" details={religiousBackground} />
      
      {/* Astro Details Section */}
      <Section icon={<FaStroopwafel />} title="Astro Details" details={astroDetails} />
      
      {/* Family Details Section */}
      <Section icon={<RiHomeHeartFill />} title="Family Details" details={familyDetails} />
      
      {/* Education Details Section */}
      <Section icon={<MdOutlineCastForEducation />} title="Education Details" details={educationDetails} />
      
      {/* Career Details Section */}
      <Section icon={<MdOutlineCastForEducation />} title="Career Details" details={careerDetails} />
      
      {/* LifeStyle Section */}
      <Section icon={<MdNightlife />} title="LifeStyle" details={lifeStyleDetails} />
      
      {/* Contact Details Section */}
      <Section icon={<IoMdCall />} title="Contact Details" details={contactDetails} />
      
      {/* Hobbies Section */}
      <div className="d-flex align-items-center mt-3 mb-3">
        <IoMdCall size={25} className="me-2" />
        <h3>Hobbies</h3>
      </div>
      <div className="mb-4">
        {hobbies.map((hobby, index) => (
          <Tabs key={index} type="primary" label={hobby} />
        ))}
      </div>
      
      {/* What I'm Looking For Section */}
      <SummaryDetails details={lookingFor} title="What I’m Looking For" />
    </div>
  );
};

export default DetailsPage;
