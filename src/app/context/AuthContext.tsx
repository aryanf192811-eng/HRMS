import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (employeeId: string, email: string, password: string, role: 'employee' | 'hr') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('dayflow_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string): boolean => {
    // Simple mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('dayflow_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dayflow_user');
  };

  const signup = (employeeId: string, email: string, password: string, role: 'employee' | 'hr'): boolean => {
    // Mock signup - in real app would call API
    const newUser: User = {
      id: Date.now().toString(),
      employeeId,
      name: email.split('@')[0],
      email,
      role,
      department: 'Not Set',
      position: 'Not Set',
      joinDate: new Date().toISOString().split('T')[0],
      profileCompleteness: 40,
    };
    setUser(newUser);
    localStorage.setItem('dayflow_user', JSON.stringify(newUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
