import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../context/useAuth";
import AddProfileCard from "../../components/AddProfileCard";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const { user } = useAuth(); // Access user and token from context
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
console.log("useruser",user)
const token = localStorage.getItem("authToken");
// useEffect(() => {
//   // Fetch token from localStorage
//   const storedToken = localStorage.getItem("authToken");
//   if (storedToken) {
//     setToken(storedToken);
//   } else {
//     console.warn("No token found in localStorage");
//   }
// }, []); // Run once on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!token) {
        navigate('/unauthorized')
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/mate/api/v1/profile/get-profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });

        const fetchedProfiles = response.data?.data?.profile || [];
        console.log("response.data?.data?.profile",response.data?.data?.profile.profileImages[0].name)
        if (fetchedProfiles.length > 0) {
          setProfiles(fetchedProfiles);
        } else {
          setError("No profiles found.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Could not fetch profiles. Please try again later."
        );
        navigate(`/error`)
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [token]);

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
        {/* {user && (
          <div className="mb-4">
            <h2>Welcome, {user.firstName}!</h2>
            <p>Email: {user.email}</p>
          </div>
        )} */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* <h1>Profiles</h1> */}
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
              <div className="col-md-4 mb-4" key={profile.id}>
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
                  id = {profile._id}
                  profileImage = {profile.profileImages[0].name}
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
