import { useState } from "react";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { Navbar } from "./Navbar";

const ManageAccountActivation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [employees, setEmployees] = useState([
    {
      id: "EMP003",
      name: "Darlene Robertson",
      department: "Development",
      joinDate: "2024-02-15",
      status: "Pending",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: "EMP006",
      name: "Marvin McKinney",
      department: "Design",
      joinDate: "2024-02-19",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      id: "EMP007",
      name: "Sarah Johnson",
      department: "Marketing",
      joinDate: "2024-02-20",
      status: "Pending",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      action: "Account activation failed",
      employee: "Sarah Johnson",
      icon: <BsXCircleFill className="text-red-500 text-lg" />,
    },
    {
      action: "Account activated",
      employee: "John Smith",
      icon: <BsCheckCircleFill className="text-green-500 text-lg" />,
    },
    {
      action: "Batch email sent to 5 pending employees",
      employee: "",
      icon: <IoMdMail className="text-blue-500 text-lg" />,
    },
  ]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (empId) => {
    if (selectedEmployees.includes(empId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== empId));
    } else {
      setSelectedEmployees([...selectedEmployees, empId]);
    }
  };

  const handleBatchActivate = () => {
    if (selectedEmployees.length === 0) {
      alert("Please select employees to activate");
      return;
    }

    const updatedEmployees = employees.map(emp => {
      if (selectedEmployees.includes(emp.id)) {
        return { ...emp, status: "Active" };
      }
      return emp;
    });

    // Add to recent activities
    const newActivity = {
      action: `Batch activation completed`,
      employee: `${selectedEmployees.length} employees`,
      icon: <BsCheckCircleFill className="text-green-500 text-lg" />,
    };

    setEmployees(updatedEmployees);
    setRecentActivities([newActivity, ...recentActivities]);
    setSelectedEmployees([]);
  };

  const handleSendEmails = () => {
    if (selectedEmployees.length === 0) {
      alert("Please select employees to send emails");
      return;
    }

    // Add to recent activities
    const newActivity = {
      action: "Batch email sent",
      employee: `${selectedEmployees.length} employees`,
      icon: <IoMdMail className="text-blue-500 text-lg" />,
    };

    setRecentActivities([newActivity, ...recentActivities]);
    alert(`Activation emails sent to ${selectedEmployees.length} employees`);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || emp.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const stats = {
    pendingActivation: employees.filter(emp => emp.status === "Pending").length,
    activatedToday: employees.filter(emp => emp.status === "Active").length,
    failedActivation: 3,
    totalActive: employees.filter(emp => emp.status === "Active").length,
  };

  return (
    <div className="mb-8 min-h-screen">
      <Navbar heading="Account Management" />

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Pending Activation",
            count: stats.pendingActivation,
            color: "text-blue-500",
            icon: <MdGroupAdd className="text-2xl text-blue-500" />,
          },
          {
            title: "Activated Today",
            count: stats.activatedToday,
            color: "text-green-500",
            icon: <FaUserCheck className="text-2xl text-green-500" />,
          },
          {
            title: "Failed Activation",
            count: stats.failedActivation,
            color: "text-red-500",
            icon: <FaUserTimes className="text-2xl text-red-500" />,
          },
          {
            title: "Total Active Employee",
            count: stats.totalActive,
            color: "text-purple-500",
            icon: <HiUserGroup className="text-2xl text-purple-500" />,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-md flex items-center gap-4 bg-white shadow-md"
          >
            <div>{item.icon}</div>
            <div>
              <p className="text-gray-600">{item.title}</p>
              <p className="text-lg font-bold">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-md mb-6 shadow-md">
        <h3 className="font-semibold mb-4">Employee Account Activation</h3>
        <p className="text-sm text-gray-500 mb-4">
          Manage pending account activations for new employees
        </p>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, ID or email"
            className="p-2 border rounded-md flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="all">All Departments</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
          </select>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={handleBatchActivate}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <FaUserCheck /> Batch Activate
          </button>
          <button
            onClick={handleSendEmails}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <IoMdMail /> Send Activation Emails
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedEmployees.length === filteredEmployees.length}
                  onChange={handleSelectAll}
                  className="rounded"
                />
              </th>
              <th className="p-3 text-left">Employee Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Join Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(emp.id)}
                    onChange={() => handleSelectEmployee(emp.id)}
                    className="rounded"
                  />
                </td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{emp.name}</p>
                    <p className="text-sm text-gray-500">{emp.id}</p>
                  </div>
                </td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">{emp.joinDate}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 border-b pb-3">
              {activity.icon}
              <div>
                <p className="text-sm font-medium">
                  {activity.action}
                  {activity.employee && `: ${activity.employee}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageAccountActivation;