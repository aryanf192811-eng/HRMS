import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  Clock, 
  DollarSign, 
  BarChart3,
  LogOut,
  Waves,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const employeeLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/attendance', icon: Clock, label: 'Attendance' },
    { to: '/leave', icon: Calendar, label: 'Leave & Time-Off' },
    { to: '/payroll', icon: DollarSign, label: 'Payroll' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const hrLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/attendance', icon: Clock, label: 'Attendance' },
    { to: '/leave', icon: Calendar, label: 'Leave Management' },
    { to: '/payroll', icon: DollarSign, label: 'Payroll' },
    { to: '/analytics', icon: BarChart3, label: 'Reports' },
  ];

  const links = user?.role === 'hr' ? hrLinks : employeeLinks;

  return (
    <aside
      className={`h-screen w-64 bg-gradient-to-b from-indigo-950 via-indigo-900 to-blue-900 text-white flex flex-col fixed left-0 top-0 z-40 transform transition-transform duration-200 shadow-2xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-indigo-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Dayflow</h1>
              <p className="text-xs text-indigo-300">Perfectly Aligned</p>
            </div>
          </div>
          <button
            className="lg:hidden p-1 rounded-md hover:bg-indigo-700"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 shadow-lg'
                  : 'hover:bg-indigo-700/50'
              }`
            }
            onClick={onClose}
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-indigo-700">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user?.name}</p>
            <p className="text-xs text-indigo-300 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
