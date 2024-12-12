import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

import AddProfileCard from "../../components/AddProfileCard";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

const Profile = () => {
 
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!token) {
        setError("User is not authenticated. Please log in.");
        toast.error("User is not authenticated. Redirecting...");
        navigate("/unauthorized");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/mate/api/v1/profile/get-profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });

        if (response.data?.data?.profile) {
          const fetchedProfiles = response.data.data.profile;
          setProfiles(fetchedProfiles);
          toast.success("Profiles fetched successfully!");
        } else {
          setError("No profiles found.");
          toast.info("No profiles available.");
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          "Could not fetch profiles. Please try again later.";
        setError(errorMessage);
        toast.error(errorMessage);
        navigate("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [token, navigate]);

  const handleClick = () => {
    navigate("/addProfile");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading profiles...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            className="btn btn-success d-flex align-items-center"
            onClick={handleClick}
          >
            <FaPlus className="me-2" /> Create New Profile
          </button>
        </div>

        <div className="row">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <div className="col-md-4 mb-4" key={profile._id}>
                <AddProfileCard
                  userId={profile.id}
                  name={`${profile.personalDetails?.first_name || "N/A"} ${
                    profile.personalDetails?.last_name || "N/A"
                  }`}
                  age={profile.personalDetails?.age || "N/A"}
                  location={`${profile.address?.district || "N/A"}, ${
                    profile.address?.state || "N/A"
                  }, ${profile.contactInformation?.address?.country || "N/A"}`}
                  profession={profile.employmentDetails?.designation || "N/A"}
                  company={profile.employmentDetails?.companyName || "N/A"}
                  id={profile._id}
                  profileImage={profile.profileImages?.[0]?.name || ""}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No profiles available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
