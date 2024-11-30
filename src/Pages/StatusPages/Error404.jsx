import StatusPage from "./StatusPage";

const Error404 = () => (
  <StatusPage
    title="404 - Page Not Found"
    message="The page you are looking for does not exist."
    buttonText="Back to Home"
    redirectUrl="/"
    titleColor="#3498db"
    buttonColor="#3498db"
    hoverColor="#2980b9"
  />
);

export default Error404;
