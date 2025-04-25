import { useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Navbar } from "./Navbar";

const ManageWork = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Anjali Mehta",
      designation: "UI/UX Designer Intern",
      project: "E-commerce site",
      lead: "Kadi Manela",
    },
    {
      id: 2,
      name: "Ali Alhamdan",
      designation: "Graphic Designer",
      project: "Food App Design",
      lead: "Kadi Manela",
    },
    {
      id: 3,
      name: "Mona Alghafoor",
      designation: "Graphic Designer",
      project: "IT Department",
      lead: "Kadi Manela",
    },
    {
      id: 4,
      name: "Moustafa Adel",
      designation: "Graphic Designer",
      project: "HR Department",
      lead: "Kadi Manela",
    },
    {
      id: 5,
      name: "Jhon Neleson",
      designation: "Graphic Designer",
      project: "HR Department",
      lead: "Kadi Manela",
    },
    {
      id: 6,
      name: "Kadi Manela",
      designation: "Graphic Designer",
      project: "HR Department",
      lead: "Kadi Manela",
    },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editedData, setEditedData] = useState(null);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditClick = (emp) => {
    setEditedData(emp);
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updated = employees.map((emp) =>
      emp.id === editedData.id ? editedData : emp
    );
    setEmployees(updated);
    setEditModalOpen(false);
  };

  const handleDelete = (id) => {
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
  };

  const handleViewClick = (emp) => {
    setSelectedEmployee(emp);
    setViewModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar heading="Intern Work Management" />

      <div className="mb-8 border border-gray-200 rounded-lg bg-white shadow-md">
        <div className="p-6">
          {/* Search + Heading */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl text-gray-800 font-semibold">
              Intern Management & Client Details 
            </h1>
            <div className="relative w-[300px]">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search Here"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-4  font-semibold">Intern Full Name</th>
                  <th className="p-4  font-semibold">Client Project Name</th>
                  <th className="p-4 font-semibold">Team Lead</th>
                  <th className="p-4 font-semibold pr-10">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No data found.
                    </td>
                  </tr>
                ) : (
                  paginatedEmployees.map((emp) => (
                    <tr key={emp.id} className="border-b text-sm text-gray-700">
                      <td className="p-4">{emp.name}</td>
                      <td className="p-4">{emp.project}</td>
                      <td className="p-4">{emp.lead}</td>
                      <td className="p-4 flex gap-4 pl-10">
                        <FaEye
                          className="cursor-pointer text-gray-500 hover:text-blue-600"
                          onClick={() => handleViewClick(emp)}
                        />
                        <FaEdit
                          className="cursor-pointer text-gray-500 hover:text-yellow-500"
                          onClick={() => handleEditClick(emp)}
                        />
                        <FaTrash
                          className="cursor-pointer text-gray-500 hover:text-red-500"
                          onClick={() => handleDelete(emp.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Edit Modal */}
          {editModalOpen && editedData && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg relative">
                <h3 className="text-lg font-semibold text-[#697D95]">
                  Edit Employee
                </h3>
                <div className="h-[1px] bg-[#697D95] opacity-20 mt-1 mb-4 w-full" />
                <div className="grid grid-cols-2 gap-4">
                  {["name", "designation", "project", "lead"].map((field) => (
                    <div key={field}>
                      <label className="text-sm font-medium capitalize mb-1 block text-left">
                        {field}
                      </label>
                      <input
                        type="text"
                        value={editedData?.[field] || ""}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            [field]: e.target.value,
                          })
                        }
                        className="border p-2 rounded w-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 rounded text-white"
                    style={{ backgroundColor: "#3293E7" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* View Modal */}
          {viewModalOpen && selectedEmployee && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
                <button
                  onClick={() => setViewModalOpen(false)}
                  className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                >
                  &times;
                </button>
                <h3 className="text-lg font-semibold text-[#697D95]">
                  Employee Details
                </h3>
                <div className="h-[1px] bg-[#697D95] opacity-20 mt-1 mb-4 w-full" />
                <div className="space-y-3 text-gray-700">
                  {["name", "designation", "project", "lead"].map((field) => (
                    <div key={field} className="flex justify-between">
                      <label className="text-sm font-semibold capitalize w-[100px]">
                        {field}:
                      </label>
                      <span>{selectedEmployee?.[field]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageWork;