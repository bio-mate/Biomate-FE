import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import ProfileCard from "../../components/ProfileCard";
import DetailsPage from "../../components/PersonalDetails";
import Footer from "../../components/Footer";
import KundaliCard from "../../components/KundaliCard";
import { useParams } from "react-router-dom";

const ViewProfile = ({ edit = true, isPreviewPage }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log("userID", id);
  const token =
    "e534555d00f37649827e53a1a8b7395b:9b51f399b15bbfe2aafd4f06f824700d0f1d4ceb5ab4cb870a0a3a754be03292154b632970ce76216a8220b0015e4bd062fe06ca46f61ed64781ab17da8554f90bf986e73273d2e6c2b1c84532cc8da7f46625f914b6407a944ec17fc9f33fef477ccb6a7a72d8ba3039fe42d51c99d65d649fc8b0a1838910d3d5d24a28419f445df6a908599adb30632610fddf697e707b610be041d49b8718120fc9c6589cdb89a076e833be4ce418d42a6ad147c19bb84e79f60eb3013a351d03741fa2c30ea7991c7d65804d410c57cc8ac633ed823a4cbb9a3513158f7a89cc737e006354cc24946a3d611416c780a6dc75751dd1d2049b465308bb98d39ee3b50d2c9df8bd275f2e14d2a26c8d677c09335feac957c35c32e99269d6ef5b18fc47cb01445663227f7b9b6fab1fc6a48b9b9bb036b5ea645845d55c0a8286d623ea70ba22698312056e84a4991ba12da1e6a7de10e9172104a242c81717e8aac9438aa6b2fd0e61f337bd488572acea84160a540bf7771e6f9fffd7540856ce7468d2ad0100cd9847d94490f71ae8eb7889982381717b4c0d038a0168ab30b41990e1ab571cb53ea6c81e260de331dd77bb58ef3b2eff22ced93f74f3bcf05d03fa7c4d85d8e0142b4968159241d6a515a9f6a4cf4c283eb3ad13ee06b4346090c7571189c2bbecad063fd7c29fddaf9218b83bc0f3bd0e39370ceeecb0865b96be8f5e9887672617";
  console.log("viewToken", token);
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return; // Avoid fetching if user is not available

      try {
        const response = await axios.get(
          `/mate/api/v1/profile/user-profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data.data.profile);
        console.log("resdata",response.data)
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
        // Personal Details
        gender={profile.personalDetails?.gender || "N/A"}
        bloodGroup={profile.personalDetails?.blood_group || "N/A"}
        complexion={profile.personalDetails?.complexion || "N/A"}
        height={profile.personalDetails?.height || "N/A"}
        weight={`${profile.personalDetails?.weight || "N/A"} kg`}
        // Religious Background
        religion={profile.religiousDetails?.religion || "N/A"}
        caste={profile.religiousDetails?.caste || "N/A"}
        subCaste={profile.religiousDetails?.subCaste || "N/A"}
        language={profile.religiousDetails?.language || "N/A"}
        // Astro Details
        dateOfBirth={profile.astroDetails?.dob || "N/A"}
        placeOfBirth={profile.astroDetails?.pob || "N/A"}
        timeOfBirth={profile.astroDetails?.tob || "N/A"}
        rashi={profile.astroDetails?.rashi || "N/A"}
        nakshatra={profile.astroDetails?.nakshatra || "N/A"}
        gotra={profile.religiousDetails?.gotra || "N/A"}
        location={`${profile.contactInformation?.address?.district || "N/A"}, ${
          profile.contactInformation?.address?.state || "N/A"
        }`}
        // Family Details
        fatherName={profile.familyDetails?.fatherName || "N/A"}
        motherName={profile.familyDetails?.motherName || "N/A"}
        fatherOccupation={profile.familyDetails?.fatherOccupation || "N/A"}
        motherOccupation={profile.familyDetails?.motherOccupation || "N/A"}
        noOfBrothers={profile.familyDetails?.noOfBrothers || "0"}
        noOfSisters={profile.familyDetails?.noOfSisters || "0"}
        // Education Details
        degree={profile.educationDetails?.degree || "N/A"}
        collegeName={profile.educationDetails?.collegeName || "N/A"}
        // Career Details
        workingWith={profile.employmentDetails?.employeeIn || "N/A"}
        companyName={profile.employmentDetails?.companyName || "N/A"}
        position={profile.employmentDetails?.designation || "N/A"}
        income={profile.employmentDetails?.income || "N/A"}
        // LifeStyle
        lifeStyle={profile.diet || "N/A"}
        // Contact Details
        country={profile.contactInformation?.address?.country || "N/A"}
        district={profile.contactInformation?.address?.district || "N/A"}
        state={profile.contactInformation?.address?.state || "N/A"}
        residentialAddress={
          profile.address?.residentialAddress || "N/A"
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
