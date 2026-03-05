import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit } from 'lucide-react';
import { motion } from 'motion/react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const profileFields = [
    { label: 'Employee ID', value: user?.employeeId, icon: Briefcase },
    { label: 'Email', value: user?.email, icon: Mail },
    { label: 'Phone', value: user?.phoneNumber || 'Not set', icon: Phone },
    { label: 'Department', value: user?.department, icon: Briefcase },
    { label: 'Position', value: user?.position, icon: Briefcase },
    { label: 'Join Date', value: user?.joinDate, icon: Calendar },
    { label: 'Address', value: user?.address || 'Not set', icon: MapPin },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">My Profile</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="font-semibold text-gray-800">Profile Completeness</h3>
            <p className="text-sm text-gray-600">Complete your profile to unlock all features</p>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-indigo-600">{user?.profileCompleteness}%</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${user?.profileCompleteness}%` }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="h-24 sm:h-32 bg-gradient-to-r from-indigo-600 to-indigo-700" />
        <div className="px-4 sm:px-8 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 -mt-12 sm:-mt-16">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl border-4 border-white shadow-xl flex items-center justify-center">
              <User className="w-10 h-10 sm:w-16 sm:h-16 text-indigo-600" />
            </div>
            <div className="sm:mb-4 flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{user?.name}</h2>
              <p className="text-gray-600 text-sm sm:text-base truncate">{user?.position}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                {user?.role === 'hr' ? 'HR Manager' : 'Employee'}
              </span>
            </div>
            <button className="sm:mb-4 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200"
      >
        <h3 className="font-semibold text-gray-800 mb-6">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {profileFields.map((field, index) => (
            <div key={index} className="flex items-start gap-4 min-w-0">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <field.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">{field.label}</p>
                <p className="font-medium text-gray-800 mt-1 break-words">{field.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200"
      >
        <h3 className="font-semibold text-gray-800 mb-6">Job Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-medium text-gray-800 mt-1 break-words">{user?.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Position</p>
            <p className="font-medium text-gray-800 mt-1 break-words">{user?.position}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Employment Type</p>
            <p className="font-medium text-gray-800 mt-1">Full-time</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200"
      >
        <h3 className="font-semibold text-gray-800 mb-6">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Resume.pdf', 'ID Proof.pdf', 'Address Proof.pdf', 'Education Certificate.pdf'].map(
            (doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
              >
                <span className="text-sm text-gray-700 truncate">{doc}</span>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex-shrink-0">
                  View
                </button>
              </div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
