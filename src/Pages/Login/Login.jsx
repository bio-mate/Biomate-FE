// // src/Login.js
// import React, { useState } from "react";
// import { fetchData } from "../../utils/api";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Login = () => {
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   // Validate the mobile number
//   const validateMobile = () => {
//     if (!mobile) {
//       setError("Mobile number is required");
//       return false;
//     } else if (!/^\d{10}$/.test(mobile)) {
//       setError("Mobile number must be 10 digits");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   // Send OTP to the user's mobile number
//   const handleSendOtp = async () => {
//     if (!validateMobile()) {
//       toast.error("Please enter a valid mobile number");
//       return;
//     }

//     try {
//       const { success } = await fetchData(
//         "/mate/api/v1/auth/otp/send",
//         "POST",
//         { mobile }
//       );
//       if (success) {
//         toast.success("OTP sent successfully!");
//         setOtpSent(true); // Enable OTP input and submit button
//       } else {
//         toast.error("Failed to send OTP. Please try again.");
//       }
//     } catch (error) {
//       toast.error("Error sending OTP. Please try again later.");
//     }
//   };

//   // Verify OTP and log in the user
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (!otp || otp.length !== 4) {
//       setError("OTP must be 4 digits");
//       return;
//     }

//     try {
//       const { success } = await fetchData(
//         "/mate/api/v1/users/generate-token",
//         "POST",
//         { mobile, code: otp }
//       );
//       if (success) {
//         toast.success("Login successful!");
//         setMobile("");
//         setOtp("");
//         setOtpSent(false);
//       } else {
//         toast.error("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       toast.error("Error verifying OTP. Please try again later.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <ToastContainer />
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <h3 className="text-center">Login</h3>
//           <form
//             onSubmit={handleVerifyOtp}
//             className="p-4 border rounded bg-light"
//           >
//             {/* Mobile Number Input */}
//             <div className="mb-3">
//               <label htmlFor="mobile" className="form-label">
//                 Mobile Number
//               </label>
//               <input
//                 type="text"
//                 className={`form-control ${error ? "is-invalid" : ""}`}
//                 id="mobile"
//                 name="mobile"
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 disabled={otpSent} // Disable if OTP is sent
//               />
//               {error && <div className="invalid-feedback">{error}</div>}
//             </div>

//             {/* Send OTP Button */}
//             {!otpSent && (
//               <button
//                 type="button"
//                 className="btn btn-secondary w-100 mb-3"
//                 onClick={handleSendOtp}
//               >
//                 Send OTP
//               </button>
//             )}

//             {/* OTP Input Field */}
//             {otpSent && (
//               <div className="mb-3">
//                 <label htmlFor="otp" className="form-label">
//                   Enter OTP
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="otp"
//                   name="otp"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                 />
//               </div>
//             )}

//             {/* Verify OTP and Login Button */}
//             {otpSent && (
//               <button type="submit" className="btn btn-primary w-100">
//                 Submit OTP
//               </button>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// src/Login.js
import React, { useState } from "react";
import { fetchData } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../../context/userContext"; // Import the context

const Login = () => {
  const { login } = useUserContext(); // Get the login function from context
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const validateMobile = () => {
    if (!mobile) {
      setError("Mobile number is required");
      return false;
    } else if (!/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be 10 digits");
      return false;
    }
    setError("");
    return true;
  };

  const handleSendOtp = async () => {
    if (!validateMobile()) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    try {
      const { success } = await fetchData(
        "/mate/api/v1/auth/otp/send",
        "POST",
        { mobile }
      );
      if (success) {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again later.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 4) {
      setError("OTP must be 4 digits");
      return;
    }

    try {
      const { success, token } = await fetchData(
        "/mate/api/v1/users/generate-token",
        "POST",
        { mobile, code: otp }
      );
      if (success) {
        toast.success("Login successful!");
        login({ mobile, token }); // Store user credentials in context
        setMobile("");
        setOtp("");
        setOtpSent(false);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error verifying OTP. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center">Login</h3>
          <form
            onSubmit={handleVerifyOtp}
            className="p-4 border rounded bg-light"
          >
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={otpSent}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>

            {!otpSent && (
              <button
                type="button"
                className="btn btn-secondary w-100 mb-3"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            )}

            {otpSent && (
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            {otpSent && (
              <button type="submit" className="btn btn-primary w-100">
                Submit OTP
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
