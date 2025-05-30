import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiTrash,
  HiDownload,
  HiPencil,
  HiEye,
  HiDocumentText,
} from 'react-icons/hi';
import { toast } from 'react-toastify';

const Forms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForms, setSelectedForms] = useState([]);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/forms', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch forms');
    const data = await response.json();
setForms(data || []);

  } catch (error) {
    console.error('Error loading forms:', error);
    toast.error('Failed to load forms');
  } finally {
    setLoading(false);
  }
};


  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedForms(forms.map(form => form._id));
    } else {
      setSelectedForms([]);
    }
  };

  const handleSelectForm = (id) => {
    setSelectedForms(prev =>
      prev.includes(id)
        ? prev.filter(formId => formId !== id)
        : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
  if (selectedForms.length === 0) {
    toast.error('Please select at least one form to delete');
    return;
  }

  try {
    const token = localStorage.getItem('token');

    for (const formId of selectedForms) {
      const response = await fetch(`http://localhost:5000/api/forms/${formId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete form: ${formId}`);
      }
    }

    toast.success('Forms deleted successfully');
    loadForms(); // refresh forms
    setSelectedForms([]); // clear selection
  } catch (error) {
    console.error('Error deleting forms:', error);
    toast.error('Failed to delete forms');
  }
};


  const handleExport = async (formId) => {
    try {
      // Backend logic to export form
      // await formService.exportForm(formId);
      
      // Placeholder: Success message
      toast.success('Form exported successfully');
    } catch (error) {
      console.error('Error exporting form:', error);
      toast.error('Failed to export form');
    }
  };

  const handleExportSubmissions = async (formId) => {
    try {
      // Backend logic to export submissions
      // await formService.exportSubmissions(formId);
      
      // Placeholder: Success message
      toast.success('Submissions exported successfully');
    } catch (error) {
      console.error('Error exporting submissions:', error);
      toast.error('Failed to export submissions');
    }
  };

  const handleBulkExport = async () => {
    if (selectedForms.length === 0) {
      toast.error('Please select at least one form to export');
      return;
    }

    try {
      // Backend logic to export each selected form
      // for (const formId of selectedForms) {
      //   await formService.exportForm(formId);
      // }

      // Placeholder: Success message
      toast.success('Forms exported successfully');
    } catch (error) {
      console.error('Error exporting forms:', error);
      toast.error('Failed to export forms');
    }
  };

  const filteredForms = forms.filter(form =>
    form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text">Forms</h1>
        <Link to="/forms/new" className="btn btn-primary flex items-center">
          <HiPlus className="w-5 h-5 mr-2" />
          Create New Form
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="card flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <button className="btn btn-secondary flex items-center">
          <HiFilter className="w-5 h-5 mr-2" />
          Filter
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedForms.length > 0 && (
        <div className="card flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedForms.length} forms selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              className="btn btn-secondary flex items-center text-red-600 hover:text-red-700"
            >
              <HiTrash className="w-5 h-5 mr-2" />
              Delete Selected
            </button>
            <button
              onClick={handleBulkExport}
              className="btn btn-secondary flex items-center"
            >
              <HiDownload className="w-5 h-5 mr-2" />
              Export Selected
            </button>
          </div>
        </div>
      )}

      {/* Forms Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedForms.length === forms.length && forms.length > 0}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Form Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Submissions</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Last Modified</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredForms.map((form) => (
                <tr key={form._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedForms.includes(form._id)}
                      onChange={() => handleSelectForm(form._id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <HiDocumentText className="w-5 h-5 text-primary mr-3" />
                      <span className="font-medium text-text">{form.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{form.submissions?.length || 0}</td>
                  <td className="px-6 py-4">
                    {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      form.status === 'active' ? 'bg-green-100 text-green-800' :
                      form.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {forms.map((form) => (
  <div>{typeof form.name === 'string' ? form.name.charAt(0) : 'N/A'}</div>
))}
                    </span> */}
                  </td>
                  {/* <td className="px-6 py-4 text-gray-600">
                    {new Date(form.updatedAt).toLocaleDateString()}
                  </td> */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => handleExport(form._id)}
                        className="text-gray-400 hover:text-primary"
                        title="Export Form"
                      >
                        <HiDownload className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleExportSubmissions(form._id)}
                        className="text-gray-400 hover:text-primary"
                        title="Export Submissions"
                      >
                        <HiDocumentText className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-primary">
                        <HiEye className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-primary">
                        <HiPencil className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Forms;
