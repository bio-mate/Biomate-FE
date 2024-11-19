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
  const token =
    "4128620278cbbe890dd486486bd202d3:e6f2076497a45c54ceabd228df60649af23936be949840e089016559d8b7680565c878bf7518ca0ce81e7d381942f53f6d65d703c7a2ffe4185185650b49b6ff702c579e38c153e8dbc7ddaecdbe1246f72097cb60b48c601a0dc93f7a05ee2b9d9b3b01ae6766c2d266cd7eb3904c9f8ca069ef02b359c953fbf27b8210be2c34a7342d187dc9fecbae0ea59fcf1d26f17ae144ec22b180e9be231ad7e33f10b95193e83fa063d435d415be13b4bcb27d848a9f9565caaabcf199c5ed18082ef1e9f476fa303707913321d0b4d96087be319cbd864ab9cd685fc70f02bee4f3af728b3c528e819a398a399d314caff0e972014252d8d2ae80bdb434df135e273b6998eca11eb4a8473f227d0cb80e29c4eb19de770c03ea9c1ceab146f31870391e6d2f6c0fa399cd50104f4a6d4aca40d7c2ea3556ce2a65f56ef1a25ff735de607eac29b9a145c0f4e50c982c0b4deff0473b313c3cab771f3e3bb5b9d327f3b743742b1a09e56076a319f7db2650377b3618e01dc4deadc7f1593f1195cfca12f51f6d431559947ac67a6316f7864d34a1b07e2044ce0168073907cb40af5c5eb903a4f8bc57a495355c22c0e7cf9e717faa473e13d661d1110165a03258d288005c39eab3ae57386dab2cded5cf1c21e407eff336da2235b91a8801eb4499c5bf9b37a314e7bbf8298b96c75ad90e202517d1e0507c2799842bce98b9be9887672617";

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!token) {
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
