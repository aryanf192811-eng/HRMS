import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, CheckCircle, XCircle, Info, Sparkles, Activity, ShieldAlert, Users, Zap } from 'lucide-react';
import { mockLeaveBalances, mockLeaveRequests, smartNudges } from '../data/mockData';
import { motion } from 'motion/react';

const Leave: React.FC = () => {
  const { user } = useAuth();
  const isHR = user?.role === 'hr';
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Paid Leave',
    startDate: '',
    endDate: '',
    remarks: '',
  });

  const leaveBalance = user ? mockLeaveBalances[user.id] : null;
  const myRequests = mockLeaveRequests.filter((r) => r.employeeId === user?.id);

  const pending = mockLeaveRequests.filter((r) => r.status === 'pending').length;
  const approved = mockLeaveRequests.filter((r) => r.status === 'approved').length;
  const rejected = mockLeaveRequests.filter((r) => r.status === 'rejected').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Leave request submitted successfully!');
    setShowForm(false);
    setFormData({ type: 'Paid Leave', startDate: '', endDate: '', remarks: '' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
    }
  };

  if (isHR) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Leave Operations Hub</h1>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm">Run Auto-Approval Cycle</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-5 bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200">
            <p className="text-sm text-gray-700">Pending Requests</p><p className="text-3xl font-bold text-gray-900 mt-1">{pending}</p><p className="text-xs text-orange-700 mt-1">Needs review today</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl p-5 bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200">
            <p className="text-sm text-gray-700">Approved</p><p className="text-3xl font-bold text-gray-900 mt-1">{approved}</p><p className="text-xs text-green-700 mt-1">Avg SLA: 18 mins</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl p-5 bg-gradient-to-br from-rose-50 to-red-100 border border-rose-200">
            <p className="text-sm text-gray-700">Rejected</p><p className="text-3xl font-bold text-gray-900 mt-1">{rejected}</p><p className="text-xs text-red-700 mt-1">Policy conflict cases</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl p-5 bg-gradient-to-br from-cyan-50 to-blue-100 border border-cyan-200">
            <p className="text-sm text-gray-700">Coverage Risk</p><p className="text-3xl font-bold text-gray-900 mt-1">12%</p><p className="text-xs text-cyan-700 mt-1">Next 7 days</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm xl:col-span-2">
            <div className="flex items-center gap-2 mb-4"><Users className="w-5 h-5 text-indigo-600" /><h3 className="font-semibold text-gray-900">Team Leave Queue</h3></div>
            <div className="space-y-3">
              {mockLeaveRequests.map((request) => (
                <div key={request.id} className="p-4 rounded-lg border border-gray-200 bg-gradient-to-r from-white to-indigo-50/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{request.employeeName} · {request.type}</p>
                    <p className="text-sm text-gray-600">{request.startDate} to {request.endDate} ({request.days} days)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${request.status === 'approved' ? 'bg-green-100 text-green-700' : request.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{request.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl p-5 border border-indigo-200 bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50">
            <div className="flex items-center gap-2 mb-4"><Zap className="w-5 h-5 text-indigo-600" /><h3 className="font-semibold text-gray-900">Policy Nudges</h3></div>
            <div className="space-y-3">
              {smartNudges.slice(0, 3).map((nudge) => (
                <div key={nudge.id} className="p-3 bg-white border border-indigo-100 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">{nudge.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{nudge.impact}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 mt-0.5" />
              Spike alert: Support team has 3 overlapping leave requests next Monday.
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Leave & Time-Off</h1>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Calendar className="w-5 h-5" />Apply Leave
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Apply for Leave</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none">
                  <option>Paid Leave</option><option>Sick Leave</option><option>Unpaid Leave</option>
                </select>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label><input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">End Date</label><input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" required /></div>
              </div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label><textarea value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" rows={3} required /></div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Submit Request</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"><div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"><CheckCircle className="w-6 h-6 text-green-600" /></div><p className="text-sm text-gray-600 mb-1">Paid Leave</p><p className="text-3xl font-bold text-gray-800">{leaveBalance?.paid || 0}</p><p className="text-xs text-gray-500 mt-1">days available</p></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"><div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4"><Activity className="w-6 h-6 text-orange-600" /></div><p className="text-sm text-gray-600 mb-1">Sick Leave</p><p className="text-3xl font-bold text-gray-800">{leaveBalance?.sick || 0}</p><p className="text-xs text-gray-500 mt-1">days available</p></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"><div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4"><XCircle className="w-6 h-6 text-red-600" /></div><p className="text-sm text-gray-600 mb-1">Unpaid Leave</p><p className="text-3xl font-bold text-gray-800">{leaveBalance?.unpaid || 0}</p><p className="text-xs text-gray-500 mt-1">days available</p></motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4"><div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0"><Sparkles className="w-6 h-6 text-white" /></div><div><h4 className="font-semibold text-purple-900 mb-2">Smart Leave Approval</h4><p className="text-sm text-purple-700">Our AI-powered system auto-reviews requests based on team availability and policy rules.</p></div></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-6">My Leave Requests</h3>
        <div className="space-y-4">
          {myRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
              <div className="flex items-start justify-between mb-3 gap-3">
                <div><h4 className="font-medium text-gray-800">{request.type}</h4><p className="text-sm text-gray-600">{request.startDate} to {request.endDate} ({request.days} days)</p></div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${request.status === 'approved' ? 'bg-green-100 text-green-700' : request.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{getStatusIcon(request.status)}{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
              </div>
              {request.autoApproved && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3"><div className="flex items-start gap-2"><Info className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" /><div><p className="text-xs font-medium text-purple-900">Auto-Approved</p><p className="text-xs text-purple-700 mt-1">{request.autoDecisionReason}</p></div></div></div>
              )}
              <p className="text-sm text-gray-600 mt-2">{request.remarks}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Leave;
