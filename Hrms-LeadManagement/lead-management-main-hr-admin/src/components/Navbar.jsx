import {
  FaBell,
  FaCaretDown,
  FaSearch,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Log out</h2>
        <p className="text-xl text-gray-600 text-center mb-8">Are you sure want to log out?</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Log Out
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const Navbar = ({ heading }) => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Try to get user data from localStorage first, then sessionStorage
    const storedData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleNotification = () => {
    navigate("/notification");
  };

  const handleLogoutClick = () => {
    setOpen(false); // Close the dropdown
    setShowLogoutModal(true); // Show the logout confirmation modal
  };

  const handleLogoutConfirm = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Clear both storage types to ensure complete logout
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('token');
      
      // Navigate to login page
      navigate("/login");
    } catch (err) {
      console.error('Error during logout:', err);
      // Even if there's an error, we should still clear local storage and redirect
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('token');
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 relative">
        <h2 className="text-2xl font-semibold text-gray-800">{heading}</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-[200px] bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          <button 
            onClick={handleNotification}
            className="p-2.5 bg-white border rounded-lg hover:bg-gray-50 transition-colors relative"
          >
            <FaBell className="text-gray-600 text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen(!isOpen)}
              className="flex items-center gap-3 bg-white border rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              {userData?.profilePhoto ? (
                <img 
                  src={userData.profilePhoto} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-2xl text-gray-600" />
              )}
              <div className="text-left">
                <p className="font-semibold text-gray-800">{userData?.name || 'User'}</p>
                <p className="text-sm text-gray-500">{userData?.role || 'Admin'}</p>
              </div>
              <FaCaretDown className="text-gray-600" />
            </button>

            {isOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg overflow-hidden w-48 z-50">
                <button 
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => navigate("/profile")}
                >
                  <FaUser className="text-gray-600" />
                  <span>Profile</span>
                </button>
                <button 
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
                  onClick={handleLogoutClick}
                >
                  <FaSignOutAlt className="text-red-600" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};