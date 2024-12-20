import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard";
import DetailsPage from "../../components/PersonalDetails";
import Footer from "../../components/Footer";
import KundaliCard from "../../components/KundaliCard";
import { useParams } from "react-router-dom";

const ViewProfile = ({ edit = true, isPreviewPage }) => {
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  console.log("profile", profile);
  useEffect(() => {
    const fetchProfile = async () => {
      if (!id || !token) {
        setError("Missing user ID or authentication token.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true); // Reset loading state
        const response = await axios.get(
          `/mate/api/v1/profile/user-profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data.data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(
          error.response?.data?.message ||
            "Could not fetch profile. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, token]); // Trigger when `id` or `token` changes

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div>No profile available.</div>;
  }

  const formatDate = (date) => {
    if (!date) return "N/A"; // Handle empty or undefined date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return "N/A"; // Handle invalid date format
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };
  console.log("profileData", profile);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <ProfileCard
        profileData={profile}
        isUser={true}
        userId={profile._id}
        isPreview={edit}
        name={`${profile.personalDetails?.first_name || "N/A"} ${
          profile.personalDetails?.last_name || "N/A"
        }`}
        age={profile.personalDetails?.age || "N/A"}
        location={`${profile.address?.district || "N/A"}, ${
          profile.address?.state || "N/A"
        }, ${profile.contactInformation?.address?.country || "N/A"}`}
        profession={profile.careerDetails?.designation || "N/A"}
        company={profile.careerDetails?.companyName || "N/A"}
        images={profile.profileImages?.imageUrl || []}
        facebookUrl={profile.contactInformation?.facebookUrl}
        instagramUrl={profile.contactInformation?.instagramUrl}
        linkedInUrl={profile.contactInformation?.linkedInUrl}
      />

      <DetailsPage
        gender={profile.personalDetails?.gender || "N/A"}
        bloodGroup={profile.personalDetails?.blood_group || "N/A"}
        complexion={profile.personalDetails?.complexion || "N/A"}
        height={profile.personalDetails?.height || "N/A"}
        weight={`${profile.personalDetails?.weight || "N/A"} kg`}
        religion={profile.religiousDetails?.religion || "N/A"}
        caste={profile.religiousDetails?.caste || "N/A"}
        subCaste={profile.religiousDetails?.subCaste || "N/A"}
        language={profile.religiousDetails?.language || "N/A"}
        dateOfBirth={formatDate(profile.astroDetails?.dob) || "N/A"}
        placeOfBirth={profile.astroDetails?.pob || "N/A"}
        timeOfBirth={profile.astroDetails?.tob || "N/A"}
        rashi={profile.astroDetails?.rashi || "N/A"}
        nakshatra={profile.astroDetails?.nakshatra || "N/A"}
        gotra={profile.religiousDetails?.gotra || "N/A"}
        location={`${profile.address?.permanent?.district || "N/A"}, ${
          profile.address?.permanent?.state || "N/A"
        }`}
        fatherName={profile.familyDetails?.fatherName || "N/A"}
        motherName={profile.familyDetails?.motherName || "N/A"}
        fatherOccupation={profile.familyDetails?.fatherOccupation || "N/A"}
        motherOccupation={profile.familyDetails?.motherOccupation || "N/A"}
        noOfBrothers={profile.familyDetails?.noOfBrothers || "0"}
        noOfSisters={profile.familyDetails?.noOfSisters || "0"}
        degree={profile.educationDetails?.degree || "N/A"}
        collegeName={profile.educationDetails?.collegeName || "N/A"}
        workingWith={profile.employmentDetails?.employeeIn || "N/A"}
        companyName={profile.employmentDetails?.companyName || "N/A"}
        position={profile.employmentDetails?.designation || "N/A"}
        income={profile.employmentDetails?.income || "N/A"}
        lifeStyle={profile.diet || "N/A"}
        country={profile.contactInformation?.address?.country || "N/A"}
        district={profile.contactInformation?.address?.district || "N/A"}
        state={profile.contactInformation?.address?.state || "N/A"}
        residentialAddress={profile.address?.residentialAddress || "N/A"}
        permanentAddress={
          profile.contactInformation?.address?.permanentAddress || "N/A"
        }
        parentNumber={profile.contactDetails?.parentNumber || "N/A"}
        selfNumber={profile.contactDetails?.selfNumber || "N/A"}
        facebookUrl={profile.contactInformation?.facebookUrl || "N/A"}
        instagramUrl={profile.contactInformation?.instagramUrl || "N/A"}
        linkedInUrl={profile.contactInformation?.linkedInUrl || "N/A"}
        hobbies={profile.personalDetails.hobbies}
        aboutMe={profile.personalDetails?.aboutMe}
        lookingFor={profile.personalDetails?.lookingFor}
      />

      <KundaliCard
        userId={profile._id}
        preloadedImages={profile.kundaliImages[0].name}
      />

      {edit && !isPreviewPage && (
        <Link to={`/update-profile/${profile._id}`}>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </Link>
      )}
      {!edit && <Footer />}
    </div>
  );
};

export default ViewProfile;
