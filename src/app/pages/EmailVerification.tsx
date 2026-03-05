import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Waves } from 'lucide-react';
import { motion } from 'motion/react';

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Email Verified Successfully!
          </h2>

          <p className="text-gray-600 mb-8">
            Your account has been created and email verified. You can now access all features of Dayflow.
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30"
          >
            Go to Dashboard
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2026 Dayflow. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
