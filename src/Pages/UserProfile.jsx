import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import NotFound from "./NotFound";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { token, backend_url } = useContext(ShopContext);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  const getUser = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`${backend_url}users/myprofile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]); // Adding token as a dependency


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return token ? (
    <div className="min-h-[32rem] bg-white p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
        My Profile
      </h1>
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10">
        <div className="space-y-4">
          {/* Name */}
          <div className="flex items-center">
            <span className="font-medium text-gray-600 w-28">Name:</span>
            <span className="text-gray-900">{userData.name || "N/A"}</span>
          </div>
          {/* Phone */}
          <div className="flex items-center">
            <span className="font-medium text-gray-600 w-28">Phone:</span>
            <span className="text-gray-900">{userData.phone || "N/A"}</span>
          </div>
          {/* Email */}
          <div className="flex items-center">
            <span className="font-medium text-gray-600 w-28">Email:</span>
            <span className="text-gray-900">{userData.email || "N/A"}</span>
          </div>
          {/* Address */}
          <div>
            <span className="font-medium text-gray-600 block mb-2">
              Address:
            </span>
            {userData.address ? (
              <div className="pl-6 text-gray-900 space-y-1">
                {Object.entries(userData.address).map(([key, value]) => (
                  <div key={key}>
                    {`${key
                      .charAt(0)
                      .toUpperCase()}${key.slice(1)}: ${value || "N/A"}`}
                  </div>
                ))}
              </div>
            ) : (
              <div className="pl-6 text-gray-900">N/A</div>
            )}
          </div>
        </div>
      </div>
    </div>
  ):(
      <NotFound />
  );
};

export default UserProfile;
