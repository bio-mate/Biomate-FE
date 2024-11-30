import StatusPage from "./StatusPage";

const Error500 = () => (
  <StatusPage
    title="500 - Internal Server Error"
    message="Something went wrong. Please try again later."
    buttonText="Reload"
    redirectUrl="/"
    titleColor="#e67e22"
    buttonColor="#e67e22"
    hoverColor="#d35400"
  />
);

export default Error500;
