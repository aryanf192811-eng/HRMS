import React from 'react';
import { Download, BrainCircuit, Sparkles, Trophy, Target, LineChart as LineChartIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { attendanceChartData, leaveUsageData, workforceSignals, smartNudges, recognitionFeed } from '../data/mockData';
import { motion } from 'motion/react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

const personalTrend = [
  { month: 'Jul', productivity: 78, focus: 72 },
  { month: 'Aug', productivity: 80, focus: 74 },
  { month: 'Sep', productivity: 82, focus: 77 },
  { month: 'Oct', productivity: 79, focus: 75 },
  { month: 'Nov', productivity: 85, focus: 81 },
  { month: 'Dec', productivity: 87, focus: 83 },
];

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const isHR = user?.role === 'hr';

  if (isHR) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">People Intelligence & Reports</h1>
            <p className="text-sm text-gray-600 mt-1">Org-wide predictive insights for leadership and HR operations.</p>
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:opacity-95 transition-opacity shadow-md">
            <Download className="w-5 h-5" />
            Export Executive Pack
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-4 sm:mb-6">Attendance Summary (Org)</h3>
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={attendanceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#475569" tickMargin={8} />
              <YAxis stroke="#475569" tickMargin={8} />
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: 12 }} />
              <Line type="monotone" dataKey="present" stroke="#06b6d4" strokeWidth={2.5} name="Present" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2.5} name="Absent" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2.5} name="Late" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-6">Leave Usage Insights</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={leaveUsageData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={100} dataKey="value">
                  {leaveUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gradient-to-br from-cyan-50 to-indigo-50 rounded-xl p-4 sm:p-6 shadow-sm border border-cyan-200">
            <div className="flex items-center gap-2 mb-4"><Sparkles className="w-5 h-5 text-cyan-600" /><h3 className="font-semibold text-gray-900">Pulse Index Board</h3></div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workforceSignals} margin={{ top: 10, right: 12, left: -24, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                <XAxis dataKey="title" stroke="#334155" tick={{ fontSize: 12 }} interval={0} angle={-8} textAnchor="end" height={50} />
                <YAxis stroke="#334155" />
                <Tooltip />
                <Bar dataKey="score" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 rounded-xl p-4 sm:p-6 shadow-sm border border-indigo-200">
            <div className="flex items-center gap-2 mb-4"><BrainCircuit className="w-5 h-5 text-indigo-600" /><h4 className="font-semibold text-gray-900">Next Best HR Actions</h4></div>
            <div className="space-y-3">
              {smartNudges.map((nudge) => (
                <div key={nudge.id} className="bg-white rounded-lg border border-indigo-100 p-4">
                  <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-gray-900">{nudge.title}</p><span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 capitalize">{nudge.priority}</span></div>
                  <p className="text-xs text-gray-600 mt-2">{nudge.impact}</p>
                  <p className="text-xs text-indigo-700 mt-2">{nudge.owner} · {nudge.dueBy}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6 shadow-sm border border-amber-200">
            <div className="flex items-center gap-2 mb-4"><Trophy className="w-5 h-5 text-amber-600" /><h4 className="font-semibold text-gray-900">Recognition Heat</h4></div>
            <div className="space-y-3">
              {recognitionFeed.map((entry) => (
                <div key={entry.id} className="bg-white rounded-lg border border-amber-100 p-4">
                  <p className="text-sm font-semibold text-gray-900">{entry.employee} · {entry.team}</p>
                  <p className="text-xs text-gray-600 mt-1">{entry.reason}</p>
                  <p className="text-sm text-amber-700 font-semibold mt-2">+{entry.points} kudos</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Growth Insights</h1>
          <p className="text-sm text-gray-600 mt-1">Personal performance signals, workload balance, and development momentum.</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:opacity-95 transition-opacity shadow-md">
          <Download className="w-5 h-5" />
          Download My Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="rounded-xl p-5 bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200"><p className="text-sm text-gray-700">Growth Score</p><p className="text-3xl font-bold text-gray-900 mt-1">86</p><p className="text-xs text-green-700 mt-1">+4 from last month</p></div>
        <div className="rounded-xl p-5 bg-gradient-to-br from-blue-50 to-cyan-100 border border-blue-200"><p className="text-sm text-gray-700">Focus Index</p><p className="text-3xl font-bold text-gray-900 mt-1">83</p><p className="text-xs text-cyan-700 mt-1">Deep work improving</p></div>
        <div className="rounded-xl p-5 bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200"><p className="text-sm text-gray-700">Burnout Risk</p><p className="text-3xl font-bold text-gray-900 mt-1">Low</p><p className="text-xs text-amber-700 mt-1">Healthy workload trend</p></div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-blue-200">
        <div className="flex items-center gap-2 mb-4"><LineChartIcon className="w-5 h-5 text-blue-600" /><h3 className="font-semibold text-gray-900">Productivity vs Focus Trend</h3></div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={personalTrend} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#475569" />
            <YAxis stroke="#475569" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="productivity" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="focus" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-purple-200">
          <h3 className="font-semibold text-gray-900 mb-6">My Leave Utilization</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={leaveUsageData} cx="50%" cy="50%" outerRadius={95} dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                {leaveUsageData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl p-4 sm:p-6 border border-indigo-200 bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50">
          <div className="flex items-center gap-2 mb-4"><Target className="w-5 h-5 text-indigo-600" /><h3 className="font-semibold text-gray-900">Career Acceleration Plan</h3></div>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 rounded-lg bg-white border border-indigo-100">Complete leadership micro-certification (due in 18 days)</div>
            <div className="p-3 rounded-lg bg-white border border-indigo-100">Mentor 1 new joiner this quarter</div>
            <div className="p-3 rounded-lg bg-white border border-indigo-100">Improve sprint estimation accuracy target to 92%</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
