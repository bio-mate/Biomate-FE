import React, { useState } from "react";
import { GiBodyHeight } from "react-icons/gi";
import { IoLanguageSharp } from "react-icons/io5";
import { colors } from "../theme/theme";
import { MdAccountCircle } from "react-icons/md";
import { FaStroopwafel } from "react-icons/fa6";
import { RiHomeHeartFill } from "react-icons/ri";
import { MdOutlineCastForEducation } from "react-icons/md";
import { MdNightlife } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import CustomButton from "../Atoms/CustomButton";
import Tabs from "../Atoms/Tabs";

const SmallCard = ({ label, value }) => {
  return (
    <div style={{ margin: "5px", padding: "5px" }} className="card">
      <div>
        <div
          style={{
            display: "flex",
            padding: "2px",
          }}
        >
          <p
            className="card-title"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              width: "50%",
              color: colors.DarkGrey,
            }}
          >
            {label}
          </p>

          <p className="card-text" style={{ fontSize: "18px", width: "50%" }}>
            : {value}
          </p>
        </div>
      </div>
    </div>
  );
};

const SummaryDetails = ({ details, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Fallback for undefined or empty details
  const fullText = details || "Details not provided.";

  return (
    <div className="container mt-5">
      <h3 className="mb-4" style={{ color: "rgb(254, 114, 76)" }}>
        {title}
      </h3>
      <div className="card shadow-lg border-light">
        <div className="card-body" style={{ textAlign: "justify" }}>
          <p>
            {isExpanded ? fullText : `${fullText.slice(0, 200)}...`}
            {!isExpanded && fullText.length > 200 && (
              <span
                className="cursor-pointer"
                style={{ color: "rgb(254, 114, 76)" }}
                onClick={toggleExpand}
              >
                {" "}
                Read More
              </span>
            )}
          </p>
          {isExpanded && (
            <span
              className="text-primary cursor-pointer"
              onClick={toggleExpand}
            >
              {" "}
              Read Less
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Section component to render a section with a title and list of details
const Section = ({ title, details, icon }) => {
  return (
    <div className="container">
      <div
        style={{
          background: colors.PlainOrange,
          padding: "5px",
          marginTop: "15px",
          color: colors.White,
          display: "flex",
        }}
      >
        <div
          style={{ fontSize: "25px", marginTop: "-7px", marginRight: "5px" }}
        >
          {icon}
        </div>

        <h3 style={{color:'white'}}>{title}</h3>
      </div>

      <div className="row">
        {details.map((detail, index) => (
          <div key={index} className="col-12 col-md-3">
            <SmallCard
              icon={detail.icon}
              label={detail.label}
              value={detail.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

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
  Weight,
  bloodGroup,
  caste,
  gender,
  rashi,
  complexion,
  nakshatra,
  gotra,
  weight,
  siblings,
  residentialAddress,
  country,
  district,
  facebookUrl,
  instagramUrl,
  linkedInUrl,
  state,
  noOfBrothers,
  noOfSisters,
  subCaste,
  workingWith,
  aboutMe,
  lookingFor,
  hobbies,
  parentNumber,
  selfNumber
}) => {
  const personalDetails = [
    {
      label: "Gender",
      value: gender,
    },
    {
      label: "Blood Group",
      value: bloodGroup,
    },

    {
      label: "Complexion",
      value: complexion,
    },

    {
      label: "Height",
      value: height,
    },
    {
      label: "Weight",
      value: weight,
    },
    {
      label: "Location",
      value: location,
    },
  ];

  const religiousBackground = [
    {
      label: "Religion",
      value: religion,
    },
    {
      label: "Caste",
      value: caste,
    },
    {
      label: "Sub Caste",
      value: subCaste,
    },
    {
      label: "Language",
      value: language,
    },
  ];

  const astroDetails = [
    {
      label: "Date Of Birth",
      value: dateOfBirth,
    },
    {
      label: "Place Of Birth",
      value: placeOfBirth,
    },
    {
      label: "Time Of Birth",
      value: timeOfBirth,
    },
    {
      label: "Rashi",
      value: rashi,
    },
    {
      label: "Nakshatra",
      value: nakshatra,
    },
    {
      label: "Gotra",
      value: gotra,
    },
  ];

  const familyDetails = [
    {
      label: "Father's Name",
      value: fatherName,
    },
    {
      label: "Mother's Name",
      value: motherName,
    },
    {
      label: "Father's Occupation",
      value: fatherOccupation,
    },
    {
      label: "Mother's Occupation",
      value: motherOccupation,
    },
    {
      label: "No Of Brothers",
      value: noOfBrothers,
    },
    {
      label: "No Of Sisters",
      value: noOfSisters,
    },
  ];

  const educationDetails = [
    {
      label: "Degree",
      value: degree,
    },
    {
      label: "College Name",
      value: collegeName,
    },
  ];
  const careerDetails = [
    {
      label: "Working with",
      value: workingWith,
    },
    {
      label: "Company Name",
      value: companyName,
    },
    {
      label: "Position",
      value: position,
    },

    {
      label: "Income",
      value: income,
    },
  ];
  const lifeStyleDetails = [
    {
      label: "LifeStyle",
      value: lifeStyle,
    },
  ];
  const contactDetails = [
    {
      label: "Parent Number",
      value: parentNumber,
    },
    {
      label: "Self Number",
      value: selfNumber,
    },
    {
      label: "Residential Address",
      value: residentialAddress,
    },
    {
      label: "Country",
      value: country,
    },
    {
      label: "State",
      value: state,
    },

    {
      label: "District",
      value: district,
    },
  ];

  return (
    <div>
      <SummaryDetails details={aboutMe} title={'About Me'} />;
      <Section
        icon={<MdAccountCircle />}
        title="Personal Details"
        details={personalDetails}
      />
      <Section
        icon={<IoLanguageSharp />}
        title="Religious Background"
        details={religiousBackground}
      />
      <Section
        icon={<FaStroopwafel />}
        title="Astro Details"
        details={astroDetails}
      />
      <Section
        icon={<RiHomeHeartFill />}
        title="Family Details"
        details={familyDetails}
      />
      <Section
        icon={<MdOutlineCastForEducation />}
        title="Education Details"
        details={educationDetails}
      />
      <Section
        icon={<MdOutlineCastForEducation />}
        title="Career Details"
        details={careerDetails}
      />
      <Section
        icon={<MdNightlife />}
        title="LifeStyle"
        details={lifeStyleDetails}
      />
      <Section
        icon={<IoMdCall />}
        title="Contact Details"
        details={contactDetails}
      />
      <div
        style={{
          background: colors.White,
          padding: "5px",
          margin: "15px",
          color: colors.PlainOrange,
          display: "flex",
        }}
      >
        <div
          style={{ fontSize: "25px", marginTop: "-7px", marginRight: "5px" }}
        >
          <IoMdCall />
        </div>

        <h3 className="">Hobbbies</h3>
      </div>
      <div style={{ margin: "15px" }}>
        {hobbies.map((hobby, index) => (
          <Tabs key={index} type="primary" label={hobby} />
        ))}
      </div>
      <SummaryDetails details={lookingFor} title={'What I’m Looking For'}/>
    </div>
  );
};

export default DetailsPage;
