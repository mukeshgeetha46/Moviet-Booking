import React from "react";

export default function ProfilePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-start py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-md"
            />
            <p className="mt-2 text-sm text-gray-500 cursor-pointer hover:text-blue-600">
              Change Photo
            </p>
          </div>

          {/* Details */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-lg font-medium text-gray-800">Mukesh Kumar</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-lg font-medium text-gray-800">
                mukesh@example.com
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-medium text-gray-800">Admin</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-medium text-gray-800">+91 9876543210</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Bio</p>
              <p className="text-base text-gray-700">
                Passionate about movies and technology. Managing the BookMyShow
                application to bring the best cinema experience.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-10 flex justify-end gap-4">
          <button className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            Cancel
          </button>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
