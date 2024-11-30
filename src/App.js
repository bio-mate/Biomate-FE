// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home";
import MultiStepForm from "./Pages/Profile/AddProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./Pages/Profile/EditProfile";
import ViewProfile from "./Pages/Profile/ViewProfile";
import Payment from "./Pages/Payment/Payment";
import Profile from "./Pages/Profile/Profile";

import Register from "./Pages/Login/Register";
import AddProfile from "./Pages/Profile/AddProfile";
import { UserProvider } from "./context/userContext";
import Main from "./Pages/Login/Main";
import UserPreviewPage from "./Pages/Profile/UserPreviewPage";
import Error401 from "./Pages/StatusPages/Error401";
import Error404 from "./Pages/StatusPages/Error404";
import SuccessPage from "./Pages/StatusPages/Success";
import Error500 from "./Pages/StatusPages/Error500";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            {/* Login */}
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Error401 />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/home" element={<Home />} />
            <Route path="/error" element={<Error500 />} />

            {/* Private Routes */}
            {/* <Route
              path="/profile"
              element={<ProtectedRoute component={Profile} />}
            /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/addProfile" element={<AddProfile />} />
            <Route path="/user-profile/success/:id" element={<SuccessPage />} />
            <Route
              path="/user-profile/preview/:id"
              element={<UserPreviewPage edit={false} />}
            />
            <Route path="/view-profile/:id" element={<ViewProfile />} />
            <Route path="/edit-profile/:id" element={<UpdateProfile />} />
            <Route
              path="/view-profile/:id"
              element={<ViewProfile edit={true} />}
            />
            <Route
              path="/payment"
              element={<ProtectedRoute component={Payment} />}
            />

            {/* Public Routes */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
