import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {isSidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
        <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-blue-100/80 bg-white/70 backdrop-blur-xl">
          <p className="text-center text-xs sm:text-sm text-gray-600">
            Copyright © {new Date().getFullYear()} aryanidkbihari. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
