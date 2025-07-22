import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function StatsOverview() {
  const [stats, setStats] = useState({
    learners: 0,
    trainers: 0,
    bookings: 0,
    revenue: 0
  });

  const [monthlyData, setMonthlyData] = useState([
    { month: 'Jan', bookings: 0, revenue: 0 },
    { month: 'Feb', bookings: 0, revenue: 0 },
    { month: 'Mar', bookings: 0, revenue: 0 },
    { month: 'Apr', bookings: 0, revenue: 0 },
    { month: 'May', bookings: 0, revenue: 0 },
    { month: 'Jun', bookings: 0, revenue: 0 },
    { month: 'Jul', bookings: 0, revenue: 0 },
    { month: 'Aug', bookings: 0, revenue: 0 },
    { month: 'Sep', bookings: 0, revenue: 0 },
    { month: 'Oct', bookings: 0, revenue: 0 },
    { month: 'Nov', bookings: 0, revenue: 0 },
    { month: 'Dec', bookings: 0, revenue: 0 },
  ]);

  useEffect(() => {
    // 🧪 Replace with real API call
    setStats({
      learners: 125,
      trainers: 38,
      bookings: 212,
      revenue: 18750
    });

    setMonthlyData([
      { month: 'Jan', bookings: 10, revenue: 1000 },
      { month: 'Feb', bookings: 12, revenue: 1200 },
      { month: 'Mar', bookings: 20, revenue: 1800 },
      { month: 'Apr', bookings: 15, revenue: 1400 },
      { month: 'May', bookings: 25, revenue: 2200 },
      { month: 'Jun', bookings: 18, revenue: 1600 },
      { month: 'Jul', bookings: 30, revenue: 2700 },
      { month: 'Aug', bookings: 22, revenue: 1900 },
      { month: 'Sep', bookings: 17, revenue: 1500 },
      { month: 'Oct', bookings: 26, revenue: 2300 },
      { month: 'Nov', bookings: 28, revenue: 2500 },
      { month: 'Dec', bookings: 34, revenue: 2850 }
    ]);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📊 Stats Overview</h2>

      {/* Stat Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Learners" value={stats.learners} bg="bg-blue-100" />
        <StatCard title="Total Trainers" value={stats.trainers} bg="bg-green-100" />
        <StatCard title="Total Bookings" value={stats.bookings} bg="bg-yellow-100" />
        <StatCard title="Total Revenue (SAR)" value={`SAR ${stats.revenue}`} bg="bg-purple-100" />
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">📅 Monthly Bookings & Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#4F46E5" radius={[5, 5, 0, 0]} />
            <Bar dataKey="revenue" fill="#22C55E" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value, bg }) {
  return (
    <div
      className={`p-4 rounded-xl shadow hover:shadow-xl transition duration-300 ${bg} dark:bg-gray-700`}
    >
      <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
    </div>
  );
}
