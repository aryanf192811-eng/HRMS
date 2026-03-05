import React from 'react';
import { useAuth } from '../context/AuthContext';
import EmployeeDashboard from '../components/EmployeeDashboard';
import HRDashboard from '../components/HRDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return user?.role === 'hr' ? <HRDashboard /> : <EmployeeDashboard />;
};

export default Dashboard;
