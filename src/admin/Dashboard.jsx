import React from 'react';
import { Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import useKeyMetrics from './adminHooks/useKeyMetrics';
import useCallRecords from './adminHooks/useCallRecords';
const IntialCalls = [
  { name: 'Mark Johnson', date: '2025-04-01', time: '10:00 AM', telecaller: 'Tom', status: 'Discussed' },
  { name: 'Mark Brown', date: '2025-04-02', time: '02:30 PM', telecaller: 'Sara', status: 'Callback' },
  { name: 'Rachel Green', date: '2025-04-03', time: '04:00 PM', telecaller: 'John', status: 'Interested' },
];

const Dashboard = () => {

  const { data, loading: metricsLoading, error: metricsError } = useKeyMetrics();
  const { callData, loading: callsLoading, error: callsError } = useCallRecords();

  const [keyMetrics, setKeyMetrics] = useState({
    totalTelecallers: 0,
    totalCallMade: 0,
    totalCustomer: 0,
  });
  const [connectedCallRecords, setConnectedCallRecords] = useState([]);

  useEffect(() => {
    setKeyMetrics(data);

    setConnectedCallRecords(callData);

  }, [data, callData]);
  console.log("call", connectedCallRecords);
  const recentActivities = [
    { id: 1, activity: 'Call made to John Doe' },
    { id: 2, activity: 'New lead added: Jane Smith' },
    { id: 3, activity: 'Call scheduled with Bob Lee' },
  ];

  const callTrends = [
    { day: 'Mon', calls: 30 },
    { day: 'Tue', calls: 45 },
    { day: 'Wed', calls: 50 },
    { day: 'Thu', calls: 40 },
    { day: 'Fri', calls: 60 },
    { day: 'Sat', calls: 20 },
    { day: 'Sun', calls: 35 },
  ];



  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-15">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {metricsLoading ? (Object.entries(keyMetrics).map(([key, value]) => (
          <Card key={key} className="shadow-xl">
            <CardContent>
              <div className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
              <h2 className="text-2xl font-semibold">{value}</h2>
            </CardContent>
          </Card>
        ))) : (<div>No data found</div>)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <ul className="list-disc list-inside">
              {recentActivities.map(item => (
                <li key={item.id}>{item.activity}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Call Trends (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={callTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="calls" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Connected Call Records</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left py-2 px-2">Customer Name</th>
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Time</th>
                  <th className="text-left py-2 px-4">Telecaller</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">response</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(connectedCallRecords) && connectedCallRecords.map((record, index) => {
                  const isoString = record.updatedAt;
                  const dateObj = new Date(isoString);

                  const date = dateObj.toLocaleDateString(); // "4/6/2025" (depends on locale)
                  const time = dateObj.toLocaleTimeString();
                  const { name } = record;

                  return (
                    <tr key={record._id} className="border-b">
                      <td className="py-2 px-4">{name}</td>
                      <td className="py-2 px-4">{date}</td>
                      <td className="py-2 px-4">{time}</td>

                      <td className="py-2 px-4">{record.telecaller?.name || 'N/A'}</td>

                      <td className="py-2 px-4">{record.status || 'N/A'}</td>
                      <td className="py-2 px-4">{record.response || 'N/A'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
