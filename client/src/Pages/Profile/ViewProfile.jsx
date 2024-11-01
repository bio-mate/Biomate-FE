import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import ProfileCard from "../../components/ProfileCard";
import DetailsPage from "../../components/PersonalDetails";
import Footer from "../../components/Footer";
import KundaliCard from "../../components/KundaliCard";

const ViewProfile = ({ edit = true, isPreviewPage }) => {
  const { user } = useAuth(); // Get the logged-in user from context
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const profileId = "670a7ed298b8c120621d87a0";
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

  if (loading) {
    return <div>Loading profiles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div>
      {profiles.length === 0 ? (
        <p>No profiles available.</p>
      ) : (
        profiles.map((profile) => (
          <div key={profile.userId}>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <ProfileCard
                userId="670be21366eb9770ed8867c1"
                isPreview={edit}
                name={
                  profile.personalDetails?.firstName ||
                  "N/A" + profile.personalDetails?.lastName ||
                  "N/A"
                }
                age={profile.personalDetails?.age || "N/A"}
                location={`${
                  profile.contactInformation?.address.district || "N/A"
                }, ${profile.contactInformation?.address.state || "N/A"}, ${
                  profile.contactInformation?.address.country || "N/A"
                }`}
                profession={profile.careerDetails?.desiganation || "N/A"}
                company={profile.careerDetails?.companyName || "N/A"}
                images={profile.profileImages.imageUrl} // Use the fetched images here
                facebookUrl={profile.contactInformation?.facebookUrl}
                instagramUrl={profile.contactInformation?.instagramUrl}
                linkedInUrl={profile.contactInformation?.linkedInUrl}
              />
            </div>
            <DetailsPage
              // Personal Details
              gender={profile.personalDetails?.gender || "N/A"}
              bloodGroup={profile.personalDetails?.bloodGroup || "N/A"}
              complexion={profile.personalDetails?.complexion}
              height={profile.personalDetails?.height || "N/A"}
              weight={`${profile.personalDetails?.weight} kg` || "N/A"}
              // Religious Background
              religion={profile.religiousBackground?.religion || "N/A"}
              cast={profile.religiousBackground?.caste || "N/A"}
              subCaste={profile.religiousBackground?.subCaste || "N/A"}
              language={profile.religiousBackground?.language || "N/A"}
              // Astro Details
              dateOfBirth={profile.astroDetails?.dateOfBirth || "N/A"}
              placeOfBirth={profile.astroDetails?.placeOfBirth || "N/A"}
              timeOfBirth={profile.astroDetails?.timeOfBirth || "N/A"}
              rashi={profile.astroDetails?.rashi || "N/A"}
              nakshatra={profile.astroDetails?.nakshatra || "N/A"}
              gotra={profile.astroDetails?.gotra || "N/A"}
              location={`${
                profile.contactInformation?.address.district || "N/A"
              }, ${profile.contactInformation?.address.state || "N/A"}`}
              //Family Details
              fatherName={profile.familyDetails?.fatherName || "N/A"}
              motherName={profile.familyDetails?.motherName || "N/A"}
              fatherOccupation={
                profile.familyDetails?.fatherOccupation || "N/A"
              }
              motherOccupation={
                profile.familyDetails?.motherOccupation || "N/A"
              }
              noOfBrothers={profile.familyDetails?.noOfBrothers || "N/A"}
              noOfSisters={profile.familyDetails?.noOfSisters || "N/A"}
              // Education Details
              degree={
                profile.educationDetails?.educationDetails.degree || "N/A"
              }
              collegeName={profile.personalDetails?.CollegeName || "N/A"}
              // Career Details
              EmployedIn={profile.careerDetails?.employedIn || "N/A"}
              companyName={profile.careerDetails?.companyName || "N/A"}
              position={profile.careerDetails?.designation || "N/A"}
              income={profile.careerDetails?.income || "N/A"}
              //LifeStyle
              lifeStyle={profile.lifestyle?.diet || "N/A"}
              // Contact Details
              country={profile.contactInformation?.address.country || "N/A"}
              district={profile.contactInformation?.address.district || "N/A"}
              state={profile.contactInformation?.address.State || "N/A"}
              residentialAddress={
                profile.contactInformation?.address.residentialAddress || "N/A"
              }
              ParemamnetAddress={
                profile.contactInformation?.address.paremamnetAddress || "N/A"
              }
              phone={profile.contactInformation?.contactNumber || "N/A"}
              facebookUrl={profile.contactInformation?.FacebookUrl || "N/A"}
              instagramUrl={profile.contactInformation?.InstagramUrl || "N/A"}
              linkedInUrl={profile.contactInformation?.LinkedInUrl || "N/A"}
            />
            <KundaliCard userId="670be21366eb9770ed8867c1" />
            {edit && !isPreviewPage ? (
              <Link to={`/edit-profile/670a7ed298b8c120621d87a0`}>
                <button>Edit</button>
              </Link>
            ) : (
              ""
            )}
          </div>
        ))
      )}
      {!edit ? <Footer /> : ""}
    </div>
  );
};

export default ViewProfile;
