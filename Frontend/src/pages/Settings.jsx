import React, { useState } from 'react';
import {
  HiUser,
  HiMail,
  HiLockClosed,
  HiBell,
  HiGlobe,
  HiShieldCheck,
  HiSave,
} from 'react-icons/hi';

const Settings = () => {
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Inc.',
      role: 'Administrator',
    },
    notifications: {
      emailNotifications: true,
      formSubmissions: true,
      statusUpdates: true,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: false,
      loginNotifications: true,
      sessionTimeout: 30,
    },
    preferences: {
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
    },
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Implement profile update logic
    console.log('Updating profile:', settings.profile);
  };

  const handleNotificationToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleSecurityUpdate = (e) => {
    e.preventDefault();
    // Implement security settings update logic
    console.log('Updating security settings:', settings.security);
  };

  const handlePreferencesUpdate = (e) => {
    e.preventDefault();
    // Implement preferences update logic
    console.log('Updating preferences:', settings.preferences);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text">Settings</h1>
        <button className="btn btn-primary flex items-center">
          <HiSave className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Profile Settings */}
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4">
            <HiUser className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text">Profile Settings</h2>
            <p className="text-sm text-gray-600">Update your personal information</p>
          </div>
        </div>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={settings.profile.name}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  profile: { ...prev.profile, name: e.target.value }
                }))}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={settings.profile.email}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  profile: { ...prev.profile, email: e.target.value }
                }))}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={settings.profile.company}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  profile: { ...prev.profile, company: e.target.value }
                }))}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={settings.profile.role}
                disabled
                className="input bg-gray-50"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4">
            <HiBell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text">Notification Settings</h2>
            <p className="text-sm text-gray-600">Manage your notification preferences</p>
          </div>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-text">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </h3>
                <p className="text-sm text-gray-600">
                  Receive notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                </p>
              </div>
              <button
                onClick={() => handleNotificationToggle(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  value ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4">
            <HiShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text">Security Settings</h2>
            <p className="text-sm text-gray-600">Manage your account security</p>
          </div>
        </div>
        <form onSubmit={handleSecurityUpdate} className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-text">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings(prev => ({
                  ...prev,
                  security: {
                    ...prev.security,
                    twoFactorAuth: !prev.security.twoFactorAuth
                  }
                }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  settings.security.twoFactorAuth ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-text">Login Notifications</h3>
                <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings(prev => ({
                  ...prev,
                  security: {
                    ...prev.security,
                    loginNotifications: !prev.security.loginNotifications
                  }
                }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  settings.security.loginNotifications ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.security.loginNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  security: {
                    ...prev.security,
                    sessionTimeout: parseInt(e.target.value)
                  }
                }))}
                className="input"
                min="5"
                max="120"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Preferences */}
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4">
            <HiGlobe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text">Preferences</h2>
            <p className="text-sm text-gray-600">Customize your application experience</p>
          </div>
        </div>
        <form onSubmit={handlePreferencesUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, language: e.target.value }
                }))}
                className="input"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, timezone: e.target.value }
                }))}
                className="input"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="CST">Central Time</option>
                <option value="PST">Pacific Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Format
              </label>
              <select
                value={settings.preferences.dateFormat}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, dateFormat: e.target.value }
                }))}
                className="input"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings; 