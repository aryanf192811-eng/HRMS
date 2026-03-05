import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  Users,
  Calendar,
  UserX,
  Bot,
  CheckCircle,
  XCircle,
  Clock,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { mockLeaveRequests, LeaveRequest, smartNudges, workforceSignals } from '../data/mockData';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const HRDashboard: React.FC = () => {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const totalEmployees = 147;
  const pendingRequests = leaveRequests.filter((r) => r.status === 'pending').length;
  const absentToday = 8;

  const approveLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: 'approved' as const, reviewedDate: new Date().toISOString().split('T')[0] } : req
      )
    );
  };

  const rejectLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: 'rejected' as const, reviewedDate: new Date().toISOString().split('T')[0] } : req
      )
    );
  };

  const filteredRequests =
    selectedFilter === 'all' ? leaveRequests : leaveRequests.filter((r) => r.status === selectedFilter);

  const attendanceData = [
    { day: 'Mon', present: 142, absent: 5 },
    { day: 'Tue', present: 145, absent: 2 },
    { day: 'Wed', present: 140, absent: 7 },
    { day: 'Thu', present: 143, absent: 4 },
    { day: 'Fri', present: 139, absent: 8 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-2xl p-6 sm:p-8 text-white shadow-xl"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">HR Command Center</h1>
        <p className="text-blue-100">
          Welcome, {user?.name}. Real-time workforce intelligence with AI-driven interventions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-6 shadow-sm border border-blue-200"
        >
          <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-700" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Employees</p>
          <p className="text-3xl font-bold text-gray-900">{totalEmployees}</p>
          <p className="text-xs text-green-700 mt-2">5 new this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 shadow-sm border border-amber-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-700" />
            </div>
            <span className="text-xs font-medium text-orange-700 bg-orange-200 px-2 py-1 rounded-full">Pending</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Pending Leave Requests</p>
          <p className="text-3xl font-bold text-gray-900">{pendingRequests}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-rose-50 to-red-100 rounded-xl p-6 shadow-sm border border-rose-200"
        >
          <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center mb-4">
            <UserX className="w-6 h-6 text-red-700" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Employees Absent Today</p>
          <p className="text-3xl font-bold text-gray-900">{absentToday}</p>
          <p className="text-xs text-gray-600 mt-2">{((absentToday / totalEmployees) * 100).toFixed(1)}% of workforce</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 rounded-xl p-6 shadow-sm border border-cyan-200"
        >
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-5 h-5 text-cyan-600" />
            <h3 className="font-semibold text-gray-900">Retention Risk Radar</h3>
          </div>
          <div className="space-y-3">
            {workforceSignals.map((signal) => (
              <div key={signal.id} className="rounded-lg border border-cyan-100 bg-white p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-gray-900">{signal.title}</p>
                  <p className="text-xl font-bold text-cyan-700">{signal.score}</p>
                </div>
                <p className="text-xs text-gray-600 mt-2">{signal.insight}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 rounded-xl p-6 shadow-sm border border-indigo-200"
        >
          <div className="flex items-center gap-2 mb-5">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Intervention Queue</h3>
          </div>
          <div className="space-y-3">
            {smartNudges.map((nudge) => (
              <div key={nudge.id} className="rounded-lg border border-indigo-100 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-900">{nudge.title}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 capitalize">{nudge.priority}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">{nudge.impact}</p>
                <p className="text-xs text-indigo-700 mt-2">{nudge.owner} · Due {nudge.dueBy}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Auto-Decision Engine</h3>
            <p className="text-sm text-gray-600">AI-powered leave approval system</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-purple-900 font-medium">How it works</p>
              <p className="text-xs text-purple-700 mt-1">
                Dayflow analyzes team availability, leave balance, and historical patterns to auto-approve requests or flag edge-cases.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['all', 'pending', 'approved', 'rejected'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter as 'all' | 'pending' | 'approved' | 'rejected')}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                selectedFilter === filter ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Employee</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Dates</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">AI Decision</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-800">{request.employeeName}</p>
                    <p className="text-xs text-gray-500">{request.employeeId}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">{request.type}</span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-700">{request.startDate} to {request.endDate}</p>
                    <p className="text-xs text-gray-500">{request.days} day(s)</p>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : request.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {request.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                      {request.status === 'rejected' && <XCircle className="w-3 h-3" />}
                      {request.status === 'pending' && <Clock className="w-3 h-3" />}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {request.autoApproved !== undefined && (
                      <div className="max-w-xs">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium mb-1 ${
                            request.autoApproved ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                          }`}
                        >
                          <Bot className="w-3 h-3" />
                          {request.autoApproved ? 'Auto-Approved' : 'Needs Review'}
                        </span>
                        <p className="text-xs text-gray-500">{request.autoDecisionReason}</p>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {request.status === 'pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => approveLeave(request.id)}
                          className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => rejectLeave(request.id)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="font-semibold text-gray-800 mb-6">Weekly Attendance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#10b981" name="Present" radius={[8, 8, 0, 0]} />
            <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default HRDashboard;
