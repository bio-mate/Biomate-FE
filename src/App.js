// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Login/Signup";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import ResetPassword from "./Pages/Login/ResetPassword";
import Home from "./Pages/Home";
import MultiStepForm from "./Pages/Profile/AddProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./Pages/Profile/EditProfile";
import ViewProfile from "./Pages/Profile/ViewProfile";
import Payment from "./Pages/Payment/Payment";
import Profile from "./Pages/Profile/Profile";
import Main from "./Pages/Login/main";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Login */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Private Routes */}
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="/addProfile"
            element={<ProtectedRoute component={MultiStepForm} />}
          />
          {/* <Route
            path="/addPhoto"
            element={<ProtectedRoute component={AddPhoto} />}
          /> */}
          <Route
            path="/edit-profile/:id"
            element={<ProtectedRoute component={UpdateProfile} />}
          />
          <Route
            path="/view-profile"
            element={<ProtectedRoute component={ViewProfile} />}
          />
          <Route
            path="/view-profile/:id"
            element={<ProtectedRoute component={<ViewProfile edit={true} />} />}
          />
          <Route
            path="/payment"
            element={<ProtectedRoute component={Payment} />}
          />

          {/* Public Routes */}
          <Route
            path="/user-profile/:id"
            element={<ViewProfile edit={false} />}
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
