import React, { useState } from 'react';
import {
  HiPlus,
  HiTrash,
  HiPlay,
  HiCheck,
  HiX,
  HiLink,
  HiDocumentText,
  HiCog,
} from 'react-icons/hi';

const Webhooks = () => {
  const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [],
  });

  const integrations = [
    {
      id: 1,
      name: 'Slack',
      icon: '💬',
      status: 'connected',
      lastSync: '2 minutes ago',
    },
    {
      id: 2,
      name: 'Microsoft Teams',
      icon: '💼',
      status: 'connected',
      lastSync: '5 minutes ago',
    },
    {
      id: 3,
      name: 'Email',
      icon: '📧',
      status: 'disconnected',
      lastSync: 'Never',
    },
  ];

  const webhooks = [
    {
      id: 1,
      name: 'Form Submissions',
      url: 'https://api.example.com/webhook',
      events: ['form.submitted', 'form.updated'],
      status: 'active',
      lastTriggered: '2024-03-15 14:30',
    },
    {
      id: 2,
      name: 'Status Updates',
      url: 'https://api.example.com/status',
      events: ['submission.status_changed'],
      status: 'inactive',
      lastTriggered: '2024-03-15 13:45',
    },
  ];

  const handleAddWebhook = () => {
    // Implement webhook creation logic
    console.log('Adding webhook:', newWebhook);
    setShowAddWebhook(false);
    setNewWebhook({ name: '', url: '', events: [] });
  };

  const handleTestWebhook = (id) => {
    // Implement webhook testing logic
    console.log('Testing webhook:', id);
  };

  const handleDeleteWebhook = (id) => {
    // Implement webhook deletion logic
    console.log('Deleting webhook:', id);
  };

  const handleConnect = (id) => {
    // Implement integration connection logic
    console.log('Connecting integration:', id);
  };

  const handleDisconnect = (id) => {
    // Implement integration disconnection logic
    console.log('Disconnecting integration:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text">Webhooks & Integrations</h1>
        <button
          onClick={() => setShowAddWebhook(true)}
          className="btn btn-primary flex items-center"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          Add Webhook
        </button>
      </div>

      {/* Connected Services */}
      <div className="card">
        <h2 className="text-lg font-semibold text-text mb-4">Connected Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{integration.icon}</span>
                  <span className="font-medium text-text">{integration.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  integration.status === 'connected'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                Last synced: {integration.lastSync}
              </div>
              {integration.status === 'connected' ? (
                <button
                  onClick={() => handleDisconnect(integration.id)}
                  className="btn btn-secondary w-full"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() => handleConnect(integration.id)}
                  className="btn btn-primary w-full"
                >
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks */}
      <div className="card">
        <h2 className="text-lg font-semibold text-text mb-4">Webhooks</h2>
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <HiLink className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium text-text">{webhook.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTestWebhook(webhook.id)}
                    className="btn btn-secondary flex items-center"
                  >
                    <HiPlay className="w-4 h-4 mr-1" />
                    Test
                  </button>
                  <button
                    onClick={() => handleDeleteWebhook(webhook.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                URL: {webhook.url}
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-600">Events:</span>
                {webhook.events.map((event, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-light text-primary rounded-full text-xs"
                  >
                    {event}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Last triggered: {webhook.lastTriggered}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  webhook.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {webhook.status.charAt(0).toUpperCase() + webhook.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Webhook Modal */}
      {showAddWebhook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-text mb-4">Add New Webhook</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Webhook Name
                </label>
                <input
                  type="text"
                  value={newWebhook.name}
                  onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                  className="input"
                  placeholder="Enter webhook name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                  className="input"
                  placeholder="https://api.example.com/webhook"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Events
                </label>
                <div className="space-y-2">
                  {['form.submitted', 'form.updated', 'submission.status_changed'].map((event) => (
                    <label key={event} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newWebhook.events.includes(event)}
                        onChange={(e) => {
                          const events = e.target.checked
                            ? [...newWebhook.events, event]
                            : newWebhook.events.filter((e) => e !== event);
                          setNewWebhook({ ...newWebhook, events });
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddWebhook(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddWebhook}
                  className="btn btn-primary"
                >
                  Add Webhook
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Webhooks; 