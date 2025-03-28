import React, { useState } from 'react';
import {
  HiPlus,
  HiTrash,
  HiCheck,
  HiX,
  HiDocumentText,
  HiArrowUp,
  HiArrowDown,
  HiCog,
  HiEye,
  HiSave,
  HiTemplate,
} from 'react-icons/hi';

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState([]);
  const [showFieldSettings, setShowFieldSettings] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const fieldTypes = [
    { id: 'text', label: 'Text Input', icon: <HiDocumentText className="w-5 h-5" /> },
    { id: 'textarea', label: 'Text Area', icon: <HiDocumentText className="w-5 h-5" /> },
    { id: 'select', label: 'Dropdown', icon: <HiDocumentText className="w-5 h-5" /> },
    { id: 'radio', label: 'Radio Buttons', icon: <HiDocumentText className="w-5 h-5" /> },
    { id: 'checkbox', label: 'Checkboxes', icon: <HiDocumentText className="w-5 h-5" /> },
    { id: 'date', label: 'Date Picker', icon: <HiDocumentText className="w-5 h-5" /> },
    { id: 'file', label: 'File Upload', icon: <HiDocumentText className="w-5 h-5" /> },
  ];

  const templates = [
    {
      id: 'contact',
      name: 'Contact Form',
      description: 'Basic contact form with name, email, and message fields',
      fields: [
        { type: 'text', label: 'Name', required: true },
        { type: 'text', label: 'Email', required: true },
        { type: 'textarea', label: 'Message', required: true },
      ],
    },
    {
      id: 'registration',
      name: 'Registration Form',
      description: 'User registration form with common fields',
      fields: [
        { type: 'text', label: 'Full Name', required: true },
        { type: 'text', label: 'Email', required: true },
        { type: 'text', label: 'Password', required: true },
        { type: 'text', label: 'Confirm Password', required: true },
      ],
    },
    {
      id: 'feedback',
      name: 'Feedback Survey',
      description: 'Customer feedback form with rating and comments',
      fields: [
        { type: 'radio', label: 'Rating', options: ['1', '2', '3', '4', '5'], required: true },
        { type: 'textarea', label: 'Comments', required: true },
        { type: 'checkbox', label: 'Categories', options: ['Product', 'Service', 'Support'], required: true },
      ],
    },
  ];

  const handleAddField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: `New ${type} field`,
      required: false,
      placeholder: '',
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : [],
    };
    setFields([...fields, newField]);
  };

  const handleFieldSettings = (field) => {
    setSelectedField(field);
    setShowFieldSettings(true);
  };

  const handleUpdateField = (updatedField) => {
    setFields(fields.map(field => 
      field.id === updatedField.id ? updatedField : field
    ));
    setShowFieldSettings(false);
  };

  const handleDeleteField = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const handleMoveField = (index, direction) => {
    const newFields = [...fields];
    const temp = newFields[index];
    if (direction === 'up' && index > 0) {
      newFields[index] = newFields[index - 1];
      newFields[index - 1] = temp;
    } else if (direction === 'down' && index < fields.length - 1) {
      newFields[index] = newFields[index + 1];
      newFields[index + 1] = temp;
    }
    setFields(newFields);
  };

  const handleApplyTemplate = (template) => {
    setFields(template.fields.map(field => ({
      ...field,
      id: Date.now() + Math.random(),
    })));
    setShowTemplates(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Form Builder */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="text-2xl font-bold bg-transparent border-none focus:ring-0 p-0 text-gray-900 dark:text-white"
                placeholder="Form Title"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowTemplates(true)}
                className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <HiTemplate className="w-5 h-5 mr-2" />
                Templates
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <HiEye className="w-5 h-5 mr-2" />
                Preview
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <HiSave className="w-5 h-5 mr-2" />
                Save
              </button>
            </div>
          </div>

          <textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="w-full p-2 mb-6 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Form Description"
            rows="2"
          />

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleMoveField(index, 'up')}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        disabled={index === 0}
                      >
                        <HiArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveField(index, 'down')}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        disabled={index === fields.length - 1}
                      >
                        <HiArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {fieldTypes.find(t => t.id === field.type)?.icon}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {field.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleFieldSettings(field)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <HiCog className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteField(field.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Field Types Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Field Types</h3>
        <div className="space-y-2">
          {fieldTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleAddField(type.id)}
              className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {type.icon}
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Field Settings Modal */}
      {showFieldSettings && selectedField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Field Settings</h3>
              <button
                onClick={() => setShowFieldSettings(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={selectedField.label}
                  onChange={(e) => handleUpdateField({ ...selectedField, label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Placeholder
                </label>
                <input
                  type="text"
                  value={selectedField.placeholder}
                  onChange={(e) => handleUpdateField({ ...selectedField, placeholder: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedField.required}
                  onChange={(e) => handleUpdateField({ ...selectedField, required: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Required field</label>
              </div>
              {(selectedField.type === 'select' || selectedField.type === 'radio' || selectedField.type === 'checkbox') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Options
                  </label>
                  <div className="space-y-2">
                    {selectedField.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...selectedField.options];
                            newOptions[index] = e.target.value;
                            handleUpdateField({ ...selectedField, options: newOptions });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        <button
                          onClick={() => {
                            const newOptions = selectedField.options.filter((_, i) => i !== index);
                            handleUpdateField({ ...selectedField, options: newOptions });
                          }}
                          className="text-red-400 hover:text-red-600"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        handleUpdateField({
                          ...selectedField,
                          options: [...selectedField.options, 'New Option'],
                        });
                      }}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <HiPlus className="w-4 h-4 mr-1" />
                      Add Option
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowFieldSettings(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <HiCheck className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Form Templates</h3>
              <button
                onClick={() => setShowTemplates(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => handleApplyTemplate(template)}
                >
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {template.description}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {template.fields.length} fields
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Form Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{formTitle}</h2>
              {formDescription && (
                <p className="text-gray-500 dark:text-gray-400">{formDescription}</p>
              )}
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.type === 'text' && (
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  )}
                  {field.type === 'textarea' && (
                    <textarea
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      rows="3"
                    />
                  )}
                  {field.type === 'select' && (
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option value="">Select an option</option>
                      {field.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {field.type === 'radio' && (
                    <div className="space-y-2">
                      {field.options.map((option, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="radio"
                            name={`radio-${field.id}`}
                            value={option}
                            className="mr-2"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {field.type === 'checkbox' && (
                    <div className="space-y-2">
                      {field.options.map((option, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            value={option}
                            className="mr-2"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {field.type === 'date' && (
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  )}
                  {field.type === 'file' && (
                    <input
                      type="file"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder; 