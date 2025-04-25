import { FaBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Navbar } from "./Navbar";
import { useState } from "react";

const Notification = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [deleteMode, setDeleteMode] = useState(false);
  const [priorityAlerts, setPriorityAlerts] = useState([
    {
      title: "New Sales Target Assigned",
      time: "Assigned 2 hours ago",
      background: "bg-yellow-100",
      read: false,
    },
    {
      title: "Client Meeting Scheduled",
      time: "Scheduled 30 minutes ago",
      background: "bg-red-100",
      read: true,
    },
    {
      title: "New Product Update Shared",
      time: "Notified yesterday",
      background: "bg-blue-100",
      read: false,
    },
    {
      title: "Training Session Reminder",
      time: "Happening tomorrow at 10AM",
      background: "bg-green-100",
      read: true,
    },
  ]);

  return (
    <div className="mb-8 min-h-screen">
      <Navbar heading="Notification" />
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Notification"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="space-x-2">
          <button
            className={`px-4 py-2 border rounded-md ${activeTab === 'all' ? 'bg-blue-100' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>

          <button
            className={`px-4 py-2 border rounded-md relative ${activeTab === 'unread' ? 'bg-blue-100' : ''}`}
            onClick={() => setActiveTab('unread')}
          >
            Unread
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button
            className={`px-4 py-2 border rounded-md ${activeTab === 'markRead' ? 'bg-blue-100' : ''}`}
            onClick={() => {
              const updatedAlerts = priorityAlerts.map(alert => ({ ...alert, read: true }));
              setPriorityAlerts(updatedAlerts);
              setActiveTab('markRead');
            }}
          >
            Mark as read
          </button>

          {!deleteMode ? (
            <button
              className="px-4 py-2 border rounded-md bg-red-100 hover:bg-red-200"
              onClick={() => setDeleteMode(true)}
            >
              Delete
            </button>
          ) : (
            <div className="inline-flex items-center space-x-2">
              <button
                className="px-3 py-1 border border-gray-400 rounded-md"
                onClick={() => setDeleteMode(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        {priorityAlerts
          .filter(alert => activeTab !== 'unread' || !alert.read)
          .map((alert, index) => (
            <div
              key={index}
              className={`p-4 mb-3 rounded-lg ${alert.read ? 'bg-gray-100' : alert.background} flex justify-between items-center`}
            >
              <div>
                <p className="font-semibold">{alert.title}</p>
                <p className="text-xs text-gray-500">{alert.time}</p>
              </div>
              {deleteMode && (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => {
                    const updatedAlerts = [...priorityAlerts];
                    updatedAlerts.splice(index, 1);
                    setPriorityAlerts(updatedAlerts);
                    setDeleteMode(false);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
      </div>

      {activeTab === "all" && !deleteMode && (
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <p className="text-sm">System Status - Online</p>
          </div>
          <p className="text-sm text-gray-500">Last Sync: 5 minutes ago</p>
          <p className="text-sm text-gray-500">{priorityAlerts.filter(alert => !alert.read).length} Unread</p>
        </div>
      )}
    </div>
  );
};

export default Notification;