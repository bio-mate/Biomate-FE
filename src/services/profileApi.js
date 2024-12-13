// src/features/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/mate/api/v1/", // Set your API base URL here
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Add token to Authorization header
      } else {
        console.error("Token is missing");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch user profile data
    fetchProfileData: builder.query({
      query: (id) => `profile/user-profile/${id}`,
    }),
  }),
});

export const { useFetchProfileDataQuery } = profileApi;
