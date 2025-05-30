import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { HiSave, HiTrash } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState([]);
  const [formId, setFormId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fieldTypes = ['text', 'textarea', 'number', 'email', 'date'];

  const addField = () => {
    setFields([...fields, {
      id: uuidv4(),
      label: 'New Field',
      type: 'text',
      required: false,
    }]);
  };

  const updateField = (id, key, value) => {
    setFields(fields.map(field =>
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  const removeField = id => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleSaveForm = async () => {
    const formPayload = {
      title: formTitle,
      description: formDescription,
      fields: fields.map(({ id, ...rest }) => rest), // Remove local-only `id`
    };

    try {
      setIsSaving(true);
      let response;
      if (formId) {
        // UPDATE existing form
        response = await axios.put(`http://localhost:5000/api/forms/${formId}`, formPayload);
        alert('Form updated successfully!');
      } else {
        // CREATE new form
        response = await axios.post('http://localhost:5000/api/forms', formPayload);
        setFormId(response.data.form.formId); // ✅ Set correct formId from backend
        alert('Form created successfully!');
      }
    } catch (error) {
      console.error('Failed to save form:', error);
      alert('Failed to save form.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteForm = async () => {
    if (!formId) return;
    if (!window.confirm('Are you sure you want to delete this form?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/forms/${formId}`);
      alert('Form deleted.');
      setFormId(null);
      setFormTitle('Untitled Form');
      setFormDescription('');
      setFields([]);
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete form.');
    }
  };

  const loadForm = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/forms/${id}`);
      const { title, description, fields, formId } = res.data;
      setFormTitle(title);
      setFormDescription(description);
      setFields(fields.map(field => ({ ...field, id: uuidv4() }))); // Create local-only ID
      setFormId(formId); // ✅ Set correct ID
    } catch (err) {
      console.error('Failed to load form:', err);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromURL = urlParams.get('id');
    if (idFromURL) {
      loadForm(idFromURL);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <input
        type="text"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        placeholder="Form Title"
        className="w-full text-2xl font-bold p-2 border border-gray-300 rounded mb-2"
      />
      <textarea
        value={formDescription}
        onChange={(e) => setFormDescription(e.target.value)}
        placeholder="Form Description"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      {fields.map((field) => (
        <div key={field.id} className="mb-4 border p-4 rounded shadow-sm bg-white">
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField(field.id, 'label', e.target.value)}
            placeholder="Field Label"
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <select
            value={field.type}
            onChange={(e) => updateField(field.id, 'type', e.target.value)}
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          >
            {fieldTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => updateField(field.id, 'required', e.target.checked)}
              className="mr-2"
            />
            Required
          </label>
          <button
            onClick={() => removeField(field.id)}
            className="mt-2 text-red-500 hover:underline"
          >
            <HiTrash className="inline mr-1" />
            Delete Field
          </button>
        </div>
      ))}
      <div className="flex gap-4 mt-6">
        <button
          onClick={addField}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Add Field
        </button>
        <button
          onClick={handleSaveForm}
          disabled={isSaving}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <HiSave className="w-5 h-5 mr-2" />
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        {formId && (
          <button
            onClick={handleDeleteForm}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <HiTrash className="w-5 h-5 mr-2" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
