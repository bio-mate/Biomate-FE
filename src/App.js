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

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            {/* Login */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Private Routes */}
            <Route
              path="/profile"
              element={<ProtectedRoute component={Profile} />}
            />
            <Route path="/addProfile" element={<AddProfile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />

            {/* <Route
            path="/addPhoto"
            element={<ProtectedRoute component={AddPhoto} />}
          /> */}
            <Route
              path="/edit-profile/:id"
              element={<ProtectedRoute component={UpdateProfile} />}
            />
            <Route path="/view-profile" element={<ViewProfile />} />
            <Route
              path="/view-profile/:id"
              element={<ViewProfile edit={true} />}
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
    </UserProvider>
  );
};

export default App;
