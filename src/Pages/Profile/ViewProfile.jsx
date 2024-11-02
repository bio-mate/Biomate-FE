import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import ProfileCard from "../../components/ProfileCard";
import DetailsPage from "../../components/PersonalDetails";
import Footer from "../../components/Footer";
import KundaliCard from "../../components/KundaliCard";

const ViewProfile = ({ edit = true, isPreviewPage }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded ID for fetching profile data
  const id = "6723dc4fad99431d3c359914";
  const token =
    "18df68359fbef5047b03501aa8ecf465:7ce454f3c536cc51f912102e8904da7f92abb465ce60c1a51cd6ccec917bdff96a32a02e094111ea5e0884edd1909b21a7c85d7263245fe8f1a527e09bef1af5eb0a93e3a88f4425c00f306d33298b433f5fe1cdc5343d9a8fa51d44e7a0c3dd1a956a253411d179a209d9acb67671ee9205ff35172463338cd08f01b0f2525369d2093078ed159bc79311a07b3f438494e04f2476dfac9a646f678e6e2c4355f4e88724493cd91514d5cbfe359ab62d2d9a6f801543e5ec2832261c2134033e4f6e065e9554c29066b0077711863b7757a6356b09b44e955893c54fa8426b3fbfc1db1f441328d358db6c5beaeb51e7e93e312974dbd167ac9c4092cec56ffceacbb1d3768e2b30888da8c92c1f42414d9e6046b94c947ee0270e9568fdaa1b7e83e6be1fb37de9f63088e3dddfadb03ef50b177421dda0c489b9dd54f14d7bd4ca0a0ee804e6b59c713da2a64e619e4414d310bd49c5ad70e9d5f76252314ad98a36f4715b9cab1bf1e04788968cc2db23a41d09bfe2fbea6f97e970bd9555974f644de03bb9035fadb74f978970992c22074df2be4392d6028c98633ffeaa122ba689c9b617cfffb1181fe8a908d96d3420059b46cc5ea8c111cfb3cbb3c0f11b2efe9ae74726ffffc563fbfd97953a277f8ebaa649d53b8e4b33e66df1cdb3f254d3cd58901bfcf9b0bc50d6087b0725e595c8a4bca7e321e0d7857aa73d9887672617";
  console.log("viewToken", token);
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return; // Avoid fetching if user is not available

      try {
        const response = await axios.get(
          `/mate/api/v1/profile/get-profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        console.error(
          "Error response:",
          error.response ? error.response.data : error.message
        );
        setError("Could not fetch profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>No profile available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <ProfileCard
        userId={profile.userId}
        isPreview={edit}
        name={`${profile.personalDetails?.first_name || "N/A"} ${
          profile.personalDetails?.last_name || "N/A"
        }`}
        age={profile.personalDetails?.age || "N/A"}
        location={`${profile.contactInformation?.address?.district || "N/A"}, ${
          profile.contactInformation?.address?.state || "N/A"
        }, ${profile.contactInformation?.address?.country || "N/A"}`}
        profession={profile.careerDetails?.designation || "N/A"}
        company={profile.careerDetails?.companyName || "N/A"}
        images={profile.profileImages?.imageUrl || []}
        facebookUrl={profile.contactInformation?.facebookUrl}
        instagramUrl={profile.contactInformation?.instagramUrl}
        linkedInUrl={profile.contactInformation?.linkedInUrl}
      />

      <DetailsPage
        // Personal Details
        gender={profile.personalDetails?.gender || "N/A"}
        bloodGroup={profile.personalDetails?.bloodGroup || "N/A"}
        complexion={profile.personalDetails?.complexion || "N/A"}
        height={profile.personalDetails?.height || "N/A"}
        weight={`${profile.personalDetails?.weight || "N/A"} kg`}
        // Religious Background
        religion={profile.religiousBackground?.religion || "N/A"}
        caste={profile.religiousBackground?.caste || "N/A"}
        subCaste={profile.religiousBackground?.subCaste || "N/A"}
        language={profile.religiousBackground?.language || "N/A"}
        // Astro Details
        dateOfBirth={profile.astroDetails?.dateOfBirth || "N/A"}
        placeOfBirth={profile.astroDetails?.placeOfBirth || "N/A"}
        timeOfBirth={profile.astroDetails?.timeOfBirth || "N/A"}
        rashi={profile.astroDetails?.rashi || "N/A"}
        nakshatra={profile.astroDetails?.nakshatra || "N/A"}
        gotra={profile.astroDetails?.gotra || "N/A"}
        location={`${profile.contactInformation?.address?.district || "N/A"}, ${
          profile.contactInformation?.address?.state || "N/A"
        }`}
        // Family Details
        fatherName={profile.familyDetails?.fatherName || "N/A"}
        motherName={profile.familyDetails?.motherName || "N/A"}
        fatherOccupation={profile.familyDetails?.fatherOccupation || "N/A"}
        motherOccupation={profile.familyDetails?.motherOccupation || "N/A"}
        noOfBrothers={profile.familyDetails?.noOfBrothers || "N/A"}
        noOfSisters={profile.familyDetails?.noOfSisters || "N/A"}
        // Education Details
        degree={profile.educationDetails?.degree || "N/A"}
        collegeName={profile.educationDetails?.collegeName || "N/A"}
        // Career Details
        employedIn={profile.careerDetails?.employedIn || "N/A"}
        companyName={profile.careerDetails?.companyName || "N/A"}
        position={profile.careerDetails?.designation || "N/A"}
        income={profile.careerDetails?.income || "N/A"}
        // LifeStyle
        lifeStyle={profile.lifestyle?.diet || "N/A"}
        // Contact Details
        country={profile.contactInformation?.address?.country || "N/A"}
        district={profile.contactInformation?.address?.district || "N/A"}
        state={profile.contactInformation?.address?.state || "N/A"}
        residentialAddress={
          profile.contactInformation?.address?.residentialAddress || "N/A"
        }
        permanentAddress={
          profile.contactInformation?.address?.permanentAddress || "N/A"
        }
        phone={profile.contactInformation?.contactNumber || "N/A"}
        facebookUrl={profile.contactInformation?.facebookUrl || "N/A"}
        instagramUrl={profile.contactInformation?.instagramUrl || "N/A"}
        linkedInUrl={profile.contactInformation?.linkedInUrl || "N/A"}
      />

      <KundaliCard userId={profile.userId} />

      {edit && !isPreviewPage && (
        <Link to={`/edit-profile/${profile.userId}`}>
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
