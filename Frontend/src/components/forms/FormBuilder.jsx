import React, { useState } from 'react';
import { HiPlus, HiTrash, HiSave } from 'react-icons/hi';
import { toast } from 'react-toastify';

const FormBuilder = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    fields: [],
    settings: {
      allowMultipleSubmissions: true,
      requireAuthentication: false,
      notificationEmail: '',
      redirectUrl: '',
      customCSS: '',
      customJS: ''
    }
  });

  const [loading, setLoading] = useState(false);

  const addField = () => {
    setForm(prev => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          type: 'text',
          label: 'New Field',
          name: `field_${prev.fields.length + 1}`,
          placeholder: '',
          required: false,
          options: []
        }
      ]
    }));
  };

  const updateField = (index, field) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.map((f, i) => 
        i === index ? { ...f, ...field } : f
      )
    }));
  };

  const removeField = (index) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };


  // Handle form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Details */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Form Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                className="input"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Form Fields</h2>
            <button
              type="button"
              onClick={addField}
              className="btn btn-primary flex items-center"
            >
              <HiPlus className="w-5 h-5 mr-2" />
              Add Field
            </button>
          </div>

          <div className="space-y-4">
            {form.fields.map((field, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field Type
                      </label>
                      <select
                        value={field.type}
                        onChange={(e) => updateField(index, { type: e.target.value })}
                        className="input"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                        <option value="textarea">Text Area</option>
                        <option value="select">Select</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                        <option value="date">Date</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(index, { label: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name (for form submission)
                      </label>
                      <input
                        type="text"
                        value={field.name}
                        onChange={(e) => updateField(index, { name: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Placeholder
                      </label>
                      <input
                        type="text"
                        value={field.placeholder}
                        onChange={(e) => updateField(index, { placeholder: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(index, { required: e.target.checked })}
                        className="h-4 w-4 text-primary"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Required field
                      </label>
                    </div>

                    {(field.type === 'select' || field.type === 'radio') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Options (one per line)
                        </label>
                        <textarea
                          value={field.options.map(opt => opt.label).join('\n')}
                          onChange={(e) => {
                            const options = e.target.value.split('\n').map(label => ({
                              label: label.trim(),
                              value: label.trim().toLowerCase().replace(/\s+/g, '_')
                            }));
                            updateField(index, { options });
                          }}
                          className="input"
                          rows="3"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Settings */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Form Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={form.settings.allowMultipleSubmissions}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    allowMultipleSubmissions: e.target.checked
                  }
                }))}
                className="h-4 w-4 text-primary"
              />
              <label className="ml-2 text-sm text-gray-700">
                Allow multiple submissions
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={form.settings.requireAuthentication}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    requireAuthentication: e.target.checked
                  }
                }))}
                className="h-4 w-4 text-primary"
              />
              <label className="ml-2 text-sm text-gray-700">
                Require authentication to submit
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notification Email
              </label>
              <input
                type="email"
                value={form.settings.notificationEmail}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    notificationEmail: e.target.value
                  }
                }))}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Redirect URL after submission
              </label>
              <input
                type="url"
                value={form.settings.redirectUrl}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    redirectUrl: e.target.value
                  }
                }))}
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex items-center"
          >
            <HiSave className="w-5 h-5 mr-2" />
            {loading ? 'Saving...' : 'Save Form'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilder; 