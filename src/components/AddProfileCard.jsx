import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import { FaEdit, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFetchProfileDataQuery } from '../services/profileApi'; // Import the query hook

const AddProfileCard = ({
  userId,
  name,
  age,
  location,
  profession,
  company,
  id,
  profileImage,
}) => {
  const navigate = useNavigate();

  // Use the RTK Query hook for fetching data
  const { data, error, isLoading } = useFetchProfileDataQuery(id);
console.log("AddProfileCard", data)
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Failed to load profile data. Please try again later.</div>;
  }

  // If no profile data is found, handle accordingly
  const profileData = data || {};

  const handleEdit = () => {
    navigate(`/update-profile/${id}`);
  };

  const handleView = () => {
    navigate(`/view-profile/${id}`);
  };

  return (
    <div className="mb-4 d-flex justify-content-center">
      <div className="card shadow p-4 w-75" style={{ borderRadius: '10px' }}>
        <div className="text-center">
          {/* Profile Image */}
          {profileData.profileImage && (
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          )}
          <h2 className="card-title mb-1">
            {name}, {age}
          </h2>
          <p className="card-text mb-1">
            <img
              src="../placeholder.png"
              width="20"
              height="20"
              className="me-2"
              alt="location"
            />
            {location}
          </p>
          <p className="card-text">
            <img
              src="../office.png"
              width="20"
              height="20"
              className="me-2"
              alt="profession"
            />
            {profession} at {company}
          </p>

          {/* Action Buttons */}
          <div className="mt-3 d-flex justify-content-center">
            <button className="btn btn-primary me-2" onClick={handleEdit}>
              <FaEdit />
            </button>
            <button className="btn btn-secondary" onClick={handleView}>
              <FaEye />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProfileCard;
