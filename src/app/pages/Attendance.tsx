import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle, Clock, Calendar, Building2, ShieldAlert } from 'lucide-react';
import { mockAttendanceRecords } from '../data/mockData';
import { motion } from 'motion/react';

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const isHR = user?.role === 'hr';

  const myRecords = mockAttendanceRecords.filter((record) => record.employeeId === user?.id);

  const teamAttendance = [
    { id: 'TA001', employee: 'Sarah Johnson', department: 'Engineering', date: '2026-03-05', checkIn: '09:02', checkOut: '18:08', status: 'present' },
    { id: 'TA002', employee: 'Emma Wilson', department: 'Design', date: '2026-03-05', checkIn: '09:36', checkOut: '18:02', status: 'late' },
    { id: 'TA003', employee: 'Alex Kumar', department: 'Support', date: '2026-03-05', checkIn: '-', checkOut: '-', status: 'absent' },
    { id: 'TA004', employee: 'Noah Brown', department: 'Sales', date: '2026-03-05', checkIn: '08:58', checkOut: '17:56', status: 'present' },
  ];

  const deptHealth = [
    { dept: 'Engineering', attendance: 96, risk: 'low' },
    { dept: 'Design', attendance: 92, risk: 'medium' },
    { dept: 'Support', attendance: 88, risk: 'high' },
    { dept: 'Sales', attendance: 94, risk: 'low' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      present: 'bg-green-100 text-green-700',
      absent: 'bg-red-100 text-red-700',
      late: 'bg-orange-100 text-orange-700',
      'half-day': 'bg-yellow-100 text-yellow-700',
      leave: 'bg-blue-100 text-blue-700',
    };

    const icons = {
      present: <CheckCircle className="w-4 h-4" />,
      absent: <XCircle className="w-4 h-4" />,
      late: <Clock className="w-4 h-4" />,
      'half-day': <Clock className="w-4 h-4" />,
      leave: <Calendar className="w-4 h-4" />,
    };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isHR) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Workforce Attendance Control</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-4 sm:p-6 border border-emerald-200">
            <p className="text-sm text-gray-700 mb-1">Present Today</p>
            <p className="text-3xl font-bold text-gray-900">142</p>
            <p className="text-xs text-green-700 mt-1">96.5% attendance</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-4 sm:p-6 border border-amber-200">
            <p className="text-sm text-gray-700 mb-1">Late Check-ins</p>
            <p className="text-3xl font-bold text-gray-900">11</p>
            <p className="text-xs text-orange-700 mt-1">4 from Support</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-rose-50 to-red-100 rounded-xl p-4 sm:p-6 border border-rose-200">
            <p className="text-sm text-gray-700 mb-1">Unplanned Absence</p>
            <p className="text-3xl font-bold text-gray-900">8</p>
            <p className="text-xs text-red-700 mt-1">Needs intervention</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-4 sm:p-6 border border-cyan-200">
            <p className="text-sm text-gray-700 mb-1">Anomaly Flags</p>
            <p className="text-3xl font-bold text-gray-900">3</p>
            <p className="text-xs text-cyan-700 mt-1">Geo / time mismatch</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 xl:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4">Live Attendance Stream</h3>
            <div className="space-y-3">
              {teamAttendance.map((row) => (
                <div key={row.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{row.employee} · {row.department}</p>
                    <p className="text-sm text-gray-600">{row.date} | In: {row.checkIn} | Out: {row.checkOut}</p>
                  </div>
                  {getStatusBadge(row.status)}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 rounded-xl p-4 sm:p-6 border border-indigo-200">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Department Health</h3>
            </div>
            <div className="space-y-3">
              {deptHealth.map((item) => (
                <div key={item.dept} className="rounded-lg bg-white border border-indigo-100 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">{item.dept}</p>
                    <p className="text-sm font-bold text-indigo-700">{item.attendance}%</p>
                  </div>
                  <p className={`text-xs mt-1 ${item.risk === 'high' ? 'text-red-600' : item.risk === 'medium' ? 'text-amber-600' : 'text-green-600'}`}>
                    Risk: {item.risk}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 mt-0.5" />
              Auto-flagging recommends manager check-in for Support team within 24h.
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Attendance Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"><CheckCircle className="w-6 h-6 text-green-600" /></div>
          <p className="text-sm text-gray-600 mb-1">Present Days</p>
          <p className="text-3xl font-bold text-gray-800">22</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4"><XCircle className="w-6 h-6 text-red-600" /></div>
          <p className="text-sm text-gray-600 mb-1">Absent Days</p>
          <p className="text-3xl font-bold text-gray-800">1</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4"><Clock className="w-6 h-6 text-orange-600" /></div>
          <p className="text-sm text-gray-600 mb-1">Late Check-ins</p>
          <p className="text-3xl font-bold text-gray-800">2</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4"><Calendar className="w-6 h-6 text-indigo-600" /></div>
          <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
          <p className="text-3xl font-bold text-gray-800">95.6%</p>
          <p className="text-xs text-green-600 mt-1">Excellent</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4 sm:mb-6">Attendance History</h3>

        <div className="space-y-3 md:hidden">
          {myRecords.map((record) => (
            <div key={record.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-800">{record.date}</p>
                  <p className="text-sm text-gray-600 mt-1">In: {record.checkIn || '-'} | Out: {record.checkOut || '-'}</p>
                  <p className="text-sm text-gray-600 mt-1">Hours: {record.checkIn && record.checkOut ? '9h 0m' : '-'}</p>
                </div>
                {getStatusBadge(record.status)}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Check-In</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Check-Out</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Working Hours</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {myRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4"><p className="font-medium text-gray-800">{record.date}</p></td>
                  <td className="py-4 px-4"><p className="text-sm text-gray-700">{record.checkIn || '-'}</p></td>
                  <td className="py-4 px-4"><p className="text-sm text-gray-700">{record.checkOut || '-'}</p></td>
                  <td className="py-4 px-4"><p className="text-sm text-gray-700">{record.checkIn && record.checkOut ? '9h 0m' : '-'}</p></td>
                  <td className="py-4 px-4">{getStatusBadge(record.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Attendance;
