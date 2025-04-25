import { useState, useEffect } from "react";
import { Card, CardContent } from "./Card";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { FaUsers, FaProjectDiagram } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { Navbar } from "./Navbar";

const initialData = [
  { name: "Mon", Sales: 20, Marketing: 30 },
  { name: "Tue", Sales: 40, Marketing: 20 },
  { name: "Wed", Sales: 35, Marketing: 40 },
  { name: "Thu", Sales: 50, Marketing: 30 },
  { name: "Fri", Sales: 60, Marketing: 50 },
  { name: "Sat", Sales: 90, Marketing: 70 },
  { name: "Sun", Sales: 100, Marketing: 80 },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("today");
  const [data, setData] = useState(initialData);
  const [stats, setStats] = useState({
    totalLead: 560,
    activeLead: 1050,
    inactiveLead: 250,
    closeLead: 470,
  });

  // Simulate data update when time range changes
  useEffect(() => {
    const multiplier =
      timeRange === "today" ? 1 : timeRange === "week" ? 1.5 : 2;
    const newData = initialData.map((item) => ({
      ...item,
      Sales: Math.round(item.Sales * multiplier),
      Marketing: Math.round(item.Marketing * multiplier),
    }));
    setData(newData);
  }, [timeRange]);

  return (
    <div className="space-y-8">
      <Navbar heading="Dashboard" />

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Leads</span>
                <FaUsers className="text-blue-500 text-xl" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-semibold">
                  {stats.totalLead}
                </span>
                <span className="text-xs text-green-500">+12%</span>
              </div>
              <span className="text-xs text-gray-400 mt-1">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Active Leads</span>
                <IoIosPeople className="text-green-500 text-xl" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-semibold">
                  {stats.activeLead}
                </span>
                <span className="text-xs text-green-500">+5%</span>
              </div>
              <span className="text-xs text-gray-400 mt-1">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Inactive Leads</span>
                <IoIosPeople className="text-red-500 text-xl" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-semibold">
                  {stats.inactiveLead}
                </span>
                <span className="text-xs text-red-500">+12%</span>
              </div>
              <span className="text-xs text-gray-400 mt-1">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Closed Leads</span>
                <FaProjectDiagram className="text-purple-500 text-xl" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-semibold">
                  {stats.closeLead}
                </span>
                <span className="text-xs text-red-500">-8%</span>
              </div>
              <span className="text-xs text-gray-400 mt-1">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Lead Overview</h2>
            <select
              className="border rounded-lg px-3 py-1.5 text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorMarketing"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Sales"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  name="Sales Team"
                />
                <Area
                  type="monotone"
                  dataKey="Marketing"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorMarketing)"
                  name="Marketing Team"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span className="text-sm text-gray-600">Sales Team</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span className="text-sm text-gray-600">Marketing Team</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}