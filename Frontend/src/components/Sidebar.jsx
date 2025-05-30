import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HiHome,
  HiDocumentText,
  HiPlus,
  HiClipboardList,
  HiShare,
  HiCog,
} from 'react-icons/hi';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <HiHome className="w-5 h-5" /> },
    { path: '/forms', label: 'Forms', icon: <HiDocumentText className="w-5 h-5" /> },
    { path: '/forms/new', label: 'New Form', icon: <HiPlus className="w-5 h-5" /> },
    { path: '/submissions', label: 'Submissions', icon: <HiClipboardList className="w-5 h-5" /> },
    { path: '/webhooks', label: 'Webhooks', icon: <HiShare className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <HiCog className="w-5 h-5" /> },
    { path: '/login', label: 'Login', icon: <HiCog className="w-5 h-5" /> },
    { path: '/signup', label: 'Signup', icon: <HiCog className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-card h-screen fixed left-0 top-0 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-8">Formily</h1>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 