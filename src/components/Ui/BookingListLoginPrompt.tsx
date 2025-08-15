import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookingListLoginPrompt() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full p-6 text-center bg-white rounded-lg shadow">
        {/* Icon */}
        <div className="flex justify-center">
          <img
            src="https://in.bmscdn.com/webin/common/icons/no-bookings.png"
            alt="No Bookings"
            className="w-24 h-24"
          />
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          Login to view your bookings
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1">
          Please login to see your past and upcoming movie bookings.
        </p>

        {/* Login Button */}
        <button
          className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
          onClick={() => navigate('/auth')}
        >
          Login to Continue
        </button>
      </div>
    </div>
  );
}
