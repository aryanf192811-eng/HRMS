import React, { useMemo } from "react";
import { motion } from "motion/react";
import {
  Activity,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileClock,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  mockAttendanceRecords,
  mockLeaveBalances,
  mockLeaveRequests,
  mockNotifications,
  recognitionFeed,
  mockSalaryStructure,
  workforceSignals,
  smartNudges,
} from "../data/mockData";
import HonorBadge from "./ui/HonorBadge";
import { calculateSustainabilityScore } from "../utils/sustainabilityScore";

const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const leaveBalance = user ? mockLeaveBalances[user.id] : null;
  const salary = user ? mockSalaryStructure[user.id] : null;

  const myAttendance = useMemo(
    () => mockAttendanceRecords.filter((r) => r.employeeId === user?.id),
    [user?.id]
  );

  const myLeaveRequests = useMemo(
    () => mockLeaveRequests.filter((r) => r.employeeId === user?.id),
    [user?.id]
  );

  const presentCount = myAttendance.filter((r) => r.status === "present").length;
  const absentCount = myAttendance.filter((r) => r.status === "absent").length;
  const lateCount = myAttendance.filter((r) => r.status === "late").length;
  const attendanceRate =
    myAttendance.length > 0
      ? ((presentCount / myAttendance.length) * 100).toFixed(1)
      : "0.0";

  const sustainabilityScore = useMemo(() => {
    return calculateSustainabilityScore({
      lateCheckIns: lateCount,
      unpaidLeaveRatio: (leaveBalance?.unpaid || 0) / 30,
      sickLeaveFreq: leaveBalance?.sick || 0,
      workStreak: presentCount,
      attendanceRate: Number(attendanceRate),
    });
  }, [lateCount, leaveBalance?.sick, leaveBalance?.unpaid, presentCount, attendanceRate]);

  const latestNotifications = mockNotifications.slice(0, 3);
  const recentAttendance = myAttendance.slice(0, 4);
  const pendingLeaves = myLeaveRequests.filter((r) => r.status === "pending").length;

  const statusBadge = (status: "present" | "absent" | "late" | "half-day" | "leave") => {
    if (status === "present") {
      return "bg-green-100 text-green-700";
    }
    if (status === "absent") {
      return "bg-red-100 text-red-700";
    }
    if (status === "late") {
      return "bg-orange-100 text-orange-700";
    }
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-2xl p-5 sm:p-6 lg:p-8 text-white shadow-xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-indigo-100">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="self-start lg:self-auto">
            <HonorBadge score={sustainabilityScore} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-5 border border-emerald-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
          onClick={() => navigate("/attendance")}
        >
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Present Days</p>
          <p className="text-2xl font-bold text-gray-800">{presentCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-5 border border-orange-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
          onClick={() => navigate("/attendance")}
        >
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
            <Clock3 className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600">Late Check-ins</p>
          <p className="text-2xl font-bold text-gray-800">{lateCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-rose-50 to-red-100 rounded-xl p-5 border border-rose-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
          onClick={() => navigate("/attendance")}
        >
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-3">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-sm text-gray-600">Absent Days</p>
          <p className="text-2xl font-bold text-gray-800">{absentCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-5 border border-indigo-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
          onClick={() => navigate("/attendance")}
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-3">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">Attendance Rate</p>
          <p className="text-2xl font-bold text-gray-800">{attendanceRate}%</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm xl:col-span-2"
        >
          <h3 className="font-semibold text-gray-800 mb-5">Recent Attendance</h3>
          {recentAttendance.length === 0 ? (
            <p className="text-sm text-gray-500">No attendance records available.</p>
          ) : (
            <div className="space-y-3">
              {recentAttendance.map((record) => (
                <div
                  key={record.id}
                  className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">{record.date}</p>
                    <p className="text-sm text-gray-500">
                      In: {record.checkIn || "-"} | Out: {record.checkOut || "-"}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${statusBadge(
                      record.status
                    )}`}
                  >
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all"
          onClick={() => navigate("/leave")}
        >
          <h3 className="font-semibold text-gray-800 mb-5">Leave Snapshot</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
              <span className="text-sm text-gray-700">Paid Leave</span>
              <span className="font-semibold text-gray-900">{leaveBalance?.paid || 0} days</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
              <span className="text-sm text-gray-700">Sick Leave</span>
              <span className="font-semibold text-gray-900">{leaveBalance?.sick || 0} days</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
              <span className="text-sm text-gray-700">Unpaid Leave</span>
              <span className="font-semibold text-gray-900">{leaveBalance?.unpaid || 0} days</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-indigo-50">
              <span className="text-sm text-gray-700">Pending Requests</span>
              <span className="font-semibold text-indigo-700">{pendingLeaves}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all"
          onClick={() => navigate("/payroll")}
        >
          <div className="flex items-center gap-2 mb-5">
            <CircleDollarSign className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-800">Payroll Overview</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-indigo-50">
              <span className="text-sm text-gray-700">Net Salary</span>
              <span className="font-semibold text-indigo-700">
                ${salary?.netSalary?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm text-gray-700">Base</span>
              <span className="font-medium text-gray-900">
                ${salary?.baseSalary?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm text-gray-700">Deductions</span>
              <span className="font-medium text-red-600">
                -${salary?.deductions?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-5">
            <FileClock className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-800">Latest Notifications</h3>
          </div>
          <div className="space-y-3">
            {latestNotifications.map((note) => (
              <div key={note.id} className="p-3 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-gray-800 text-sm">{note.title}</p>
                  {!note.read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">{note.message}</p>
                <p className="text-xs text-gray-400 mt-2">{note.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-6 border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 shadow-sm xl:col-span-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-cyan-600" />
            <h3 className="font-semibold text-gray-900">Workforce Pulse Signals</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {workforceSignals.map((signal) => (
              <div key={signal.id} className="rounded-xl border border-cyan-100 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{signal.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{signal.score}</p>
                <p className="text-xs text-gray-500 mt-1">Trend: {signal.trend}</p>
                <p className="text-xs text-gray-600 mt-2">{signal.insight}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl p-6 border border-indigo-200 bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">AI Action Center</h3>
          </div>
          <div className="space-y-3">
            {smartNudges.slice(0, 3).map((nudge) => (
              <div key={nudge.id} className="p-3 rounded-lg border border-indigo-100 bg-white/90">
                <p className="text-sm font-semibold text-gray-900">{nudge.title}</p>
                <p className="text-xs text-gray-600 mt-1">{nudge.impact}</p>
                <p className="text-xs text-indigo-700 mt-2">
                  {nudge.owner} · Due {nudge.dueBy}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-gray-900">Recognition Momentum Wall</h3>
          <Sparkles className="w-4 h-4 text-rose-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recognitionFeed.map((event) => (
            <div key={event.id} className="p-4 rounded-xl bg-white border border-amber-100">
              <p className="text-sm font-semibold text-gray-900">{event.employee}</p>
              <p className="text-xs text-amber-700">{event.team}</p>
              <p className="text-xs text-gray-600 mt-2">{event.reason}</p>
              <p className="text-sm text-amber-700 font-semibold mt-3">+{event.points} Kudos</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeDashboard;
