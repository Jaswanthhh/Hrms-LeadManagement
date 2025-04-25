import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaKey,
  FaPaperPlane,
  FaRedo,
} from "react-icons/fa";
import { Navbar } from "./Navbar";

// import * as Yup from "yup";
import * as Yup from "yup";

const initialInterns = [
  {
    id: 1,
    name: "Arpit Deshpande",
    department: "Sales",
    joinDate: "Jan 15, 2025",
    status: "Completed",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Ali Alhamdan",
    department: "Marketing",
    joinDate: "Dec 22, 2024",
    status: "Pending",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Mona Alghafar",
    department: "IT",
    joinDate: "Nov 10, 2024",
    status: "Completed",
    img: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Moustafa Adel",
    department: "React JS Developer",
    joinDate: "Sep 02, 2024",
    status: "In Progress",
    img: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

export default function ToggleButton() {
  const [selected, setSelected] = useState("Intern");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [interns, setInterns] = useState(initialInterns);
  const [formData, setFormData] = useState({
    fullName: "Prakash Sinha",
    employeeId: "EMP001",
    department: "Development",
    position: "Intern Position",
    email: "prakashsinha09@company.com",
    contact: "+1(555)000-0000",
    joinDate: "",
    username: "intern.user",
    password: "temp#Pass123",
  });
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      fullName: "",
      employeeId: "",
      department: "",
      position: "",
      email: "",
      contact: "",
      joinDate: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      employeeId: Yup.string().required("Required"),
      department: Yup.string().required("Required"),
      position: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      contact: Yup.string().required("Required"),
      joinDate: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const generateCredentials = () => {
    setCredentials({
      username: `intern${Math.floor(Math.random() * 1000)}`,
      password: `Temp#${Math.random().toString(36).slice(-8)}`,
    });
  };

  const resetCredentials = () => {
    setCredentials({ username: "", password: "" });
  };

  const saveAndSendEmail = () => {
    alert(
      `Saving and sending email for: \nUsername: ${credentials.username} \nPassword: ${credentials.password}`
    );
  };

   const handleReset = () => {
    setFormData({
      fullName: "",
      employeeId: "",
      department: "",
      position: "",
      email: "",
      contact: "",
      joinDate: "",
      username: "",
      password: "",
    });
  };
  return (
    <div class="w-[100%] h-[100%]">
      {/* Header */}
      <div className="mb-8 rounded-lg">
        <Navbar heading="Intern Onboarding" />
      </div>

      {/* Main Content Box */}
      <div className="border border-gray-200 rounded-lg p-6">
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <div className="space-x-2">
            <button
              className={`px-4 py-2 rounded-lg transition ${
                selected === "Senior Employee"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent border border-gray-400 text-black"
              }`}
              onClick={() => {
                setSelected("Senior Employee");
                formik.resetForm();
                navigate("/employee-onboarding")
              }}
            >
              Senior Employee
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition ${
                selected === "Intern"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent border border-gray-400 text-black"
              }`}
              onClick={() => {
                setSelected("Intern");
                formik.resetForm();
              }}
            >
              Intern
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="mt-5 p-4 border rounded-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3 w-full">
              <label htmlFor="fullName" className="block text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter full name"
                className={`mt-2 p-2 w-full border ${
                  formik.touched.fullName && formik.errors.fullName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md`}
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.fullName}
                </div>
              )}
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="EmployeeID" className="block text-gray-700">
                Employee ID
              </label>
              <input
                type="text"
                id="EmployeeID"
                name="EmployeeID"
                placeholder="EMP004"
                className={`mt-2 p-2 w-full border ${
                  formik.touched.EmployeeID && formik.errors.EmployeeID
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md`}
                value={formik.values.EmployeeID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.EmployeeID && formik.errors.EmployeeID && (
                <div className="text-red-500 text-sm">
                  {formik.errors.EmployeeID}
                </div>
              )}
            </div>

            <div className="mb-3 w-full">
              <label htmlFor="Department" className="block text-gray-700">
                Department
              </label>
              <select
                id="Department"
                name="Department"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                value={formik.values.Department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled>
                  Development
                </option>
                <option value="Java">Java</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </select>
              {formik.touched.Department && formik.errors.Department && (
                <div className="text-red-500 text-sm">
                  {formik.errors.Department}
                </div>
              )}
            </div>

            {/* Position */}
            <div className="mb-3 w-full">
              <label htmlFor="Position" className="block text-gray-700">
                Position/Role
              </label>
              <input
                type="text"
                id="Position"
                name="Position"
                placeholder="Java Developer"
                className={`mt-2 p-2 w-full border ${
                  formik.touched.Position && formik.errors.Position
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md`}
                value={formik.values.Position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Position && formik.errors.Position && (
                <div className="text-red-500 text-sm">
                  {formik.errors.Position}
                </div>
              )}
            </div>

            <div className="mb-3 w-full">
              <label htmlFor="email" className="block text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                name="email"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-3 w-full">
              <label htmlFor="Position" className="block text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                id="ContactNumber"
                name="ContactNumber"
                placeholder="+1(555)000-0000"
                className={`mt-2 p-2 w-full border ${
                  formik.touched.ContactNumber && formik.errors.ContactNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md`}
                value={formik.values.ContactNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ContactNumber && formik.errors.ContactNumber && (
                <div className="text-red-500 text-sm">
                  {formik.errors.ContactNumber}
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Join Date
              </label>
              <input
                type="date"
                name="JoinDate"
                value={formik.values.JoinDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.JoinDate && formik.errors.JoinDate && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.JoinDate}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 mt-[20px]">
            <h2 className="text-lg font-semibold mb-4">
              Intern Account Credentials
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium mb-1">User Name</label>
              <input
                type="text"
                name="UserName"
                value={formik.values.UserName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter User Name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  placeholder="temp#Pass123"
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <button
              onClick={generateCredentials}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            >
              <FaKey />
              Generate Credentials
            </button>
            
            <div className="flex gap-4">
              <button
                onClick={resetCredentials}
                className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow hover:bg-gray-100"
              >
                <FaRedo />
                Reset
              </button>

              <button
                onClick={saveAndSendEmail}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                <FaPaperPlane />
                Save & Send Email
              </button>
            </div>
          </div>
        </form>

        {/* Recent Onboarding Table */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Intern Onboarding</h2>
            <button className="border px-3 py-1 text-sm rounded-lg hover:bg-gray-100">
              View All
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="py-2">Employee Name</th>
                  <th className="py-2">Department</th>
                  <th className="py-2">Join Date</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {interns.map((emp) => (
                  <tr key={emp.id} className="border-b">
                    <td className="py-3 flex items-center gap-3">
                      <img src={emp.img} className="w-8 h-8 rounded-full" />{" "}
                      {emp.name}
                    </td>
                    <td>{emp.department}</td>
                    <td>{emp.joinDate}</td>
                    <td
                      className={`text-sm ${
                        emp.status === "Completed"
                          ? "text-green-600"
                          : emp.status === "In Progress"
                          ? "text-orange-600"
                          : "text-orange-600"
                      }`}
                    >
                      {emp.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
