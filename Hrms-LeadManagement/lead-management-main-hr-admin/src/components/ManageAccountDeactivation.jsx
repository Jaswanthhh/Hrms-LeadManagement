import { useState } from "react";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

const ManageAccountDeactivation = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "Ram Mahish",
      department: "Marketing",
      lastWorkingDate: "2024-02-28",
      status: "Pending",
      priority: "High",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "EMP004",
      name: "Ankush Singh",
      department: "IT",
      lastWorkingDate: "2024-02-20",
      status: "Deactivation Completed",
      priority: "Medium",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "EMP007",
      name: "Sarah Johnson",
      department: "HR",
      lastWorkingDate: "2024-03-15",
      status: "Pending",
      priority: "Low",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  ]);

  const [notes, setNotes] = useState([
    {
      author: "Rashmika (HR)",
      time: "2 hours ago",
      comment:
        "Employee has returned all company assets. Pending final clearance from IT department.",
    },
    {
      author: "John Anderson",
      time: "5 hours ago",
      comment: "Email account deactivation completed for Sarah Johnson.",
    },
  ]);

  const [newNote, setNewNote] = useState("");

  const handleDeactivateProcess = () => {
    if (selectedEmployees.length === 0) {
      alert("Please select employees to deactivate");
      return;
    }
    navigate("/process-deactivation");
  };

  const handleAddNote = () => {
    if (newNote.trim() === "") return;
    setNotes([
      { author: "You", time: "Just now", comment: newNote },
      ...notes,
    ]);
    setNewNote("");
  };

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

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || emp.status === selectedStatus;
    const matchesDate = !selectedDate || emp.lastWorkingDate === selectedDate;
    return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
  });

  return (
    <div className="mb-8 min-h-screen">
      {/* Header */}
      <Navbar heading="Employee Deactivation Management" />

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID or email"
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg p-2 w-full"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
          </select>
          <select
            className="border rounded-lg p-2 w-full"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Deactivation Completed">Completed</option>
          </select>
          <input
            type="date"
            className="border rounded-lg p-2 w-full"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Deactivation Queue</h3>
          <button
            onClick={handleDeactivateProcess}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            disabled={selectedEmployees.length === 0}
          >
            <FaPlay className="text-sm" />
            Start Deactivation Process
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === filteredEmployees.length}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-center">Department</th>
                <th className="p-3 text-center">Last Working Date</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Priority</th>
                <th className="p-3 text-center">Actions</th>
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
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.profilePic}
                        alt={emp.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{emp.name}</div>
                        <div className="text-sm text-gray-500">ID: {emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-center">{emp.department}</td>
                  <td className="p-3 text-center">{emp.lastWorkingDate}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-lg text-sm ${
                        emp.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-lg text-sm ${
                        emp.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : emp.priority === "Medium"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {emp.priority}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      <HiOutlinePencil size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to remove this employee?')) {
                          setEmployees(employees.filter(e => e.id !== emp.id));
                        }
                      }}
                    >
                      <HiOutlineTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Deactivation Checklist</h3>
          {[
            "Email Account",
            "System Credentials",
            "Building Access",
            "VPN Access",
            "Software Licenses",
            "Company Assets"
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input type="checkbox" className="rounded" />
              <label className="text-gray-700">{item}</label>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Notes & Comments</h3>
          <div className="mb-4">
            <textarea
              className="w-full border rounded-lg p-2 mb-2"
              rows={3}
              placeholder="Add a note here"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button
              onClick={handleAddNote}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Note
            </button>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {notes.map((note, index) => (
              <div key={index} className="border-t pt-2">
                <p className="text-sm font-semibold">{note.author}</p>
                <p className="text-xs text-gray-500">{note.time}</p>
                <p className="text-sm mt-1">{note.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccountDeactivation;