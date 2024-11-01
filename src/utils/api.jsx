import axios from 'axios';

  const apiRequest = async (method, url, data) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    handleError(error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const handleError = (error) => {
  if (error.response) {
    console.error(error.response.data.message || 'An error occurred during the request.');
  } else if (error.request) {
    console.error('No response received from the server.');
  } else {
    console.error('Error: ' + error.message);
  }
};

export default apiRequest