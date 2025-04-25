import { useState } from "react";
import { FaUserCheck, FaUserTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import { BsCheckCircleFill, BsXCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { MdPerson, MdHourglassEmpty, MdPersonAdd } from "react-icons/md";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

const ManageAccount = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showStatusForm, setShowStatusForm] = useState(false);

  const [employees, setEmployees] = useState([
    {
      id: "EMP003",
      name: "Darlene Robertson",
      department: "Development",
      lastActive: "2024-02-20 9:30 AM",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: "EMP006",
      name: "Marvin McKinney",
      department: "Design",
      lastActive: "2024-02-19 3:45 PM",
      status: "Inactive",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      id: "EMP007",
      name: "Leslie Alexander",
      department: "Marketing",
      lastActive: "2024-02-21 11:15 AM",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      action: "Account Deactivated",
      employee: "Marvin McKinney",
      id: "EMP006",
      date: "2024-02-19 15:45 PM",
      reason: "Termination",
      icon: <BsXCircleFill className="text-red-500 text-lg" />,
    },
    {
      action: "Account Activated",
      employee: "John Smith",
      id: "EMP025",
      date: "2024-01-12 11:20 AM",
      reason: "New Employee Onboarding",
      icon: <BsCheckCircleFill className="text-green-500 text-lg" />,
    },
    {
      action: "Account Suspended",
      employee: "Michael Chen",
      id: "EMP013",
      date: "2024-11-02 12:42 PM",
      reason: "Security Policy Violation",
      icon: <BsExclamationCircleFill className="text-yellow-500 text-lg" />,
    },
  ]);

  const handleBatchActivateProcess = () => {
    navigate("/batch-activation");
  };

  const handleBatchDeactivateProcess = () => {
    navigate("/batch-deactivation");
  };

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const reason = form.reason.value;
    const effectiveDate = form.effectiveDate.value;
    const comments = form.comments.value;
    const confirmed = form.confirmAction.checked;

    if (!reason || !effectiveDate || !comments || !confirmed) {
      alert("Please fill in all fields and confirm the action");
      return;
    }

    // Update employee status
    const updatedEmployees = employees.map(emp => {
      if (emp.id === selectedEmployee.id) {
        return {
          ...emp,
          status: reason === "activation" ? "Active" : "Inactive"
        };
      }
      return emp;
    });

    // Add to recent activities
    const newActivity = {
      action: reason === "activation" ? "Account Activated" : "Account Deactivated",
      employee: selectedEmployee.name,
      id: selectedEmployee.id,
      date: new Date().toLocaleString(),
      reason: comments,
      icon: reason === "activation" 
        ? <BsCheckCircleFill className="text-green-500 text-lg" />
        : <BsXCircleFill className="text-red-500 text-lg" />
    };

    setEmployees(updatedEmployees);
    setRecentActivities([newActivity, ...recentActivities]);
    setShowStatusForm(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || emp.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="mb-8 min-h-screen">
      <Navbar heading="Lead Requirements" />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <MdPerson className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-600">Active Leads</p>
            <p className="text-xl font-semibold">
              {employees.filter(emp => emp.status === "Active").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <FaUserTimes className="text-red-500 text-3xl" />
          <div>
            <p className="text-gray-600">Inactive Leads</p>
            <p className="text-xl font-semibold">
              {employees.filter(emp => emp.status === "Inactive").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <MdHourglassEmpty className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-gray-600">Ongoing Leads</p>
            <p className="text-xl font-semibold">
              {employees.filter(emp => emp.status === "Pending").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
          <MdPersonAdd className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-600">New Leads (30d)</p>
            <p className="text-xl font-semibold">
              {employees.length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md mb-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Lead Status Control</h2>

        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Search by name, ID or email"
            className="px-4 py-2 border border-gray-300 rounded-md w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="px-6 py-3 font-medium text-gray-600">Client Name</th>
                <th className="px-6 py-3 font-medium text-gray-600 pl-20">Last Active</th>
                <th className="px-6 py-3 font-medium text-gray-600 pl-12">Status</th>
                <th className="px-6 py-3 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-8 h-8 rounded-full"
                      />
                      {emp.name}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-500 pr-10">{emp.lastActive}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setShowStatusForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this employee?')) {
                            setEmployees(employees.filter(e => e.id !== emp.id));
                          }
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {showStatusForm ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Lead Update Form</h3>
            <form onSubmit={handleStatusUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Action Type
                </label>
                <select
                  name="reason"
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Select action</option>
                  <option value="activation">Activation</option>
                  <option value="deactivation">Deactivation</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Effective Date
                </label>
                <input
                  type="date"
                  name="effectiveDate"
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Comments
                </label>
                <textarea
                  name="comments"
                  className="w-full border rounded-lg p-2"
                  rows="3"
                  placeholder="Add comments..."
                  required
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="confirmAction"
                  id="confirmAction"
                  className="mr-2"
                  required
                />
                <label htmlFor="confirmAction" className="text-sm text-gray-600">
                  I understand this action will affect user access to company resources.
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                  Submit Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowStatusForm(false);
                    setSelectedEmployee(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Lead Update Form</h3>
            <p className="text-gray-600">
              Select an employee from the table to update their status.
            </p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Activity Log</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 border-b pb-3">
                {activity.icon}
                <div>
                  <p className="text-sm font-medium">
                    {activity.employee}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
