import { useNavigate, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FiBriefcase } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <RxDashboard size={20} />, path: "/" },
    { name: "Lead Management", icon: <HiOutlineUserGroup size={20} />, path: "/lead-management" },
    { name: "Manage Account", icon: <FiBriefcase size={20} />, path: "/manage-account" },
    { name: "Manage Work", icon: <FaTasks size={20} />, path: "/manage-work" },
    { name: "Settings", icon: <CiSettings size={30} />, path: "/setting" },
  ];

  return (
    <div className="h-full p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 flex items-center justify-center">
        <img src="/src/assets/hrms-logo.png" alt="HRMS Logo" className="w-8 h-8 rounded-full" />
        </div>
        <h2 className="text-l font-bold text-black">Lead Management</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-blue-50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[15px] font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
