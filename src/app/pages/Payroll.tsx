import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DollarSign, Download, TrendingUp, Wallet, ShieldCheck, CalendarDays, AlertTriangle } from 'lucide-react';
import { mockSalaryStructure } from '../data/mockData';
import { motion } from 'motion/react';

const Payroll: React.FC = () => {
  const { user } = useAuth();
  const isHR = user?.role === 'hr';
  const salary = user ? mockSalaryStructure[user.id] : null;

  const payrollOps = [
    { cycle: 'March 2026', employees: 147, gross: 1284000, deductions: 143200, net: 1140800, status: 'In Progress' },
    { cycle: 'February 2026', employees: 146, gross: 1269000, deductions: 139800, net: 1129200, status: 'Closed' },
    { cycle: 'January 2026', employees: 145, gross: 1252000, deductions: 137100, net: 1114900, status: 'Closed' },
  ];

  if (isHR) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Payroll Command Center</h1>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm">Lock Current Payroll Run</button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <p className="text-cyan-100 mb-2">Current Run Forecast</p>
          <p className="text-4xl sm:text-5xl font-bold mb-4">$1,140,800</p>
          <div className="flex items-center gap-2 text-cyan-100"><TrendingUp className="w-5 h-5" /><span className="text-sm">Variance within threshold (+0.8% MoM)</span></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-xl p-5 bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200"><p className="text-sm text-gray-700">Payroll Accuracy</p><p className="text-3xl font-bold text-gray-900 mt-1">99.2%</p><p className="text-xs text-green-700 mt-1">Last 3 cycles</p></div>
          <div className="rounded-xl p-5 bg-gradient-to-br from-blue-50 to-cyan-100 border border-blue-200"><p className="text-sm text-gray-700">Payout Success</p><p className="text-3xl font-bold text-gray-900 mt-1">145/147</p><p className="text-xs text-cyan-700 mt-1">2 awaiting bank ACK</p></div>
          <div className="rounded-xl p-5 bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200"><p className="text-sm text-gray-700">Compliance Tasks</p><p className="text-3xl font-bold text-gray-900 mt-1">4</p><p className="text-xs text-amber-700 mt-1">Due this week</p></div>
          <div className="rounded-xl p-5 bg-gradient-to-br from-rose-50 to-red-100 border border-rose-200"><p className="text-sm text-gray-700">Exception Alerts</p><p className="text-3xl font-bold text-gray-900 mt-1">3</p><p className="text-xs text-red-700 mt-1">Need HR + Finance review</p></div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Payroll Cycles</h3>
          <div className="space-y-3">
            {payrollOps.map((cycle) => (
              <div key={cycle.cycle} className="p-4 rounded-lg border border-gray-200 bg-gradient-to-r from-white to-indigo-50/40">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{cycle.cycle}</p>
                    <p className="text-sm text-gray-600">Employees: {cycle.employees} | Gross: ${cycle.gross.toLocaleString()} | Net: ${cycle.net.toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cycle.status === 'Closed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{cycle.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-xl p-5 border border-indigo-200 bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50">
            <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-5 h-5 text-indigo-600" /><h3 className="font-semibold text-gray-900">Compliance Monitor</h3></div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>PF filing due: 2026-03-10</li>
              <li>TDS statement draft generated</li>
              <li>2 contractor GST mismatches flagged</li>
            </ul>
          </div>
          <div className="rounded-xl p-5 border border-rose-200 bg-gradient-to-br from-rose-50 to-red-50">
            <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-5 h-5 text-rose-600" /><h3 className="font-semibold text-gray-900">Risk Alerts</h3></div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Overtime spike in Support (+18%)</li>
              <li>Missing bank KYC for 1 new hire</li>
              <li>Bonus variance above policy in Sales</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Payroll & Salary</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <p className="text-indigo-200 mb-2">Net Monthly Salary</p>
        <p className="text-4xl sm:text-5xl font-bold mb-4">${salary?.netSalary.toLocaleString() || 0}</p>
        <div className="flex items-center gap-2 text-indigo-200"><TrendingUp className="w-5 h-5" /><span className="text-sm">Updated January 2026</span></div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 xl:col-span-2">
          <h3 className="font-semibold text-gray-800 mb-6">Salary Structure</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg"><span className="text-gray-700">Base Salary</span><span className="font-semibold text-gray-800">${salary?.baseSalary.toLocaleString()}</span></div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"><span className="text-gray-700">HRA</span><span className="font-semibold text-gray-800">${salary?.hra.toLocaleString()}</span></div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg"><span className="text-gray-700">Transport Allowance</span><span className="font-semibold text-gray-800">${salary?.transport.toLocaleString()}</span></div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg"><span className="text-gray-700">Bonus</span><span className="font-semibold text-gray-800">${salary?.bonus.toLocaleString()}</span></div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg"><span className="text-gray-700">Deductions</span><span className="font-semibold text-red-600">-${salary?.deductions.toLocaleString()}</span></div>
            <div className="flex items-center justify-between p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg"><span className="font-semibold text-gray-800">Net Salary</span><span className="text-xl font-bold text-indigo-600">${salary?.netSalary.toLocaleString()}</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-6 border border-cyan-200">
          <div className="flex items-center gap-2 mb-4"><Wallet className="w-5 h-5 text-cyan-700" /><h3 className="font-semibold text-gray-900">Personal Payroll Insights</h3></div>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 rounded-lg bg-white border border-cyan-100">Projected annual net: ${(Number(salary?.netSalary || 0) * 12).toLocaleString()}</div>
            <div className="p-3 rounded-lg bg-white border border-cyan-100">Next payout date: 2026-03-31</div>
            <div className="p-3 rounded-lg bg-white border border-cyan-100">Tax-saving declaration window closes in 12 days</div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-6">Recent Payslips</h3>
        <div className="space-y-3">
          {['December 2025', 'November 2025', 'October 2025'].map((month, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
              <div className="flex items-center gap-3"><div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"><DollarSign className="w-5 h-5 text-indigo-600" /></div><div><p className="font-medium text-gray-800">{month}</p><p className="text-sm text-gray-600">${salary?.netSalary.toLocaleString()}</p></div></div>
              <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Download className="w-4 h-4" /><span className="text-sm font-medium">Download</span></button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Payroll;
