"use client";
import { useState } from "react";

const DoctorSettings = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    profilePicture: "/path/to/dummy-pic.jpg",
    name: "Dr. John Doe",
    email: "johndoe@example.com",
    workNumber: "+1 234 567 890",
    specialization: "Cardiology",
    certificate: "/path/to/dummy-pic.jpg",
    hourlyRate: "150",
    bio: "Experienced cardiologist with over 20 years of practice in treating heart diseases. Dedicated to providing excellent care.",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e, field) => {
    setDoctorInfo({ ...doctorInfo, [field]: e.target.files[0] });
  };

  // Handle save action (you would integrate this with your database logic)
  const handleSave = () => {
    console.log("Updated doctor info:", doctorInfo);
    alert("Profile updated!");
    setIsEditing(false); // Disable editing after saving
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Doctor Profile</h2>
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
              value={doctorInfo.name}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
          ) : (
            <p className="mt-2 text-gray-700">{doctorInfo.name}</p>
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
              value={doctorInfo.email}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
          ) : (
            <p className="mt-2 text-gray-700">{doctorInfo.email}</p>
          )}
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Specialization
          </label>
          {isEditing ? (
            <input
              type="text"
              name="specialization"
              value={doctorInfo.specialization}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
          ) : (
            <p className="mt-2 text-gray-700">{doctorInfo.specialization}</p>
          )}
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          {isEditing ? (
            <textarea
              name="bio"
              value={doctorInfo.bio}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full h-32"
            />
          ) : (
            <p className="mt-2 text-gray-700">{doctorInfo.bio}</p>
          )}
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className="mt-6 text-center">
        <button
          onClick={toggleEditMode}
          className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default DoctorSettings;
