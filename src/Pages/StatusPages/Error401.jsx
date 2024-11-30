import StatusPage from "./StatusPage";

const Error401 = () => (
  <StatusPage
    title="401 - Unauthorized"
    message="You are not authorized to view this page. Please login to continue."
    buttonText="Go to Login"
    redirectUrl="/login"
    titleColor="#e74c3c"
    buttonColor="#e74c3c"
    hoverColor="#c0392b"
  />
);

export default Error401;
