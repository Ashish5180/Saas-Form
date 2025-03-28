import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Forms from './pages/Forms';
import FormBuilder from './components/forms/FormBuilder';
import Submissions from './pages/Submissions';
import Webhooks from './pages/Webhooks';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" />
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Routes with Sidebar */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/forms/new" element={<FormBuilder />} />
            <Route path="/submissions" element={<Submissions />} />
            <Route path="/webhooks" element={<Webhooks />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
