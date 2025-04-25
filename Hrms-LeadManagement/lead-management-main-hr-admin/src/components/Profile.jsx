import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileModal = ({ isOpen, onClose }) => {
  const [newName, setNewName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add save logic here
    console.log("Saved:", { newName, updatedEmail });
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-600">
            Edit Personal Information
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 text-xl hover:text-gray-600 focus:outline-none"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col items-center mt-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
            <FaUpload className="text-gray-500 text-xl" />
          </div>
          <p className="text-sm text-gray-500">
            Upload Your Profile picture{" "}
            <span className="italic">(Optional)</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value="Mahi Sharma"
              disabled
              className="border rounded-md px-4 py-2 w-full bg-white text-gray-800"
            />
            <input
              type="text"
              placeholder="Enter New Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            />
            <input
              type="email"
              value="mahisharma01@gmail.com"
              disabled
              className="border rounded-md px-4 py-2 w-full bg-white text-gray-800"
            />
            <input
              type="email"
              placeholder="Updated Email ID"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            />
            <input
              type="text"
              value="1234567890"
              disabled
              className="border rounded-md px-4 py-2 w-full bg-white text-gray-800"
            />
            <input
              type="text"
              placeholder="Cannot be Updated"
              disabled
              className="border rounded-md px-4 py-2 w-full bg-gray-100 text-gray-400"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Profile = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  
  const handleClose = () => {
    setIsOpen(false);
    // Navigate back to previous page
    navigate(-1);
  };

  return (
    <div>
      <ProfileModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default Profile;