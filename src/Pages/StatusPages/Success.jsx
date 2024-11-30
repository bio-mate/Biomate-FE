import React from "react";
import { useParams } from "react-router-dom";
import StatusPage from "./StatusPage";

const Success201 = () => {
  const { id } = useParams();

  return (
    <StatusPage
      title="Profile Created Successfully!"
      message="Your profile has been successfully created. Welcome aboard!"
      buttonText="Preview"
      redirectUrl={`/user-profile/preview/${id}`}
      titleColor="#2ecc71"
      buttonColor="#27ae60"
      hoverColor="#1e8449"
    />
  );
};

export default Success201;
