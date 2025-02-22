"use client";
import { useState } from "react";

const PatientSettings = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1 234 567 890",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  const handleSave = () => {
    console.log("Updated patient info:", patientInfo);
    alert("Profile updated!");
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Patient Preferences</h2>
      <p className="text-gray-600 mb-6">
        Manage personal details, medical history, etc.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={patientInfo.name}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
          ) : (
            <p className="mt-2 text-gray-700">{patientInfo.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={patientInfo.email}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
          ) : (
            <p className="mt-2 text-gray-700">{patientInfo.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="text"
              name="phoneNumber"
              value={patientInfo.phoneNumber}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
          ) : (
            <p className="mt-2 text-gray-700">{patientInfo.phoneNumber}</p>
          )}
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className="mt-6 text-center">
        <button
          onClick={toggleEditMode}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default PatientSettings;
