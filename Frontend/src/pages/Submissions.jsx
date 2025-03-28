import React, { useState } from 'react';
import {
  HiSearch,
  HiFilter,
  HiTrash,
  HiDownload,
  HiEye,
  HiDocumentText,
} from 'react-icons/hi';

const Submissions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [filterForm, setFilterForm] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  const submissions = [
    {
      id: 1,
      formName: 'Customer Feedback Form',
      submitterName: 'John Doe',
      submitterEmail: 'john@example.com',
      submissionDate: '2024-03-15 14:30',
      status: 'new',
    },
    {
      id: 2,
      formName: 'Product Survey',
      submitterName: 'Jane Smith',
      submitterEmail: 'jane@example.com',
      submissionDate: '2024-03-15 13:45',
      status: 'reviewed',
    },
    {
      id: 3,
      formName: 'Support Ticket',
      submitterName: 'Mike Johnson',
      submitterEmail: 'mike@example.com',
      submissionDate: '2024-03-15 12:15',
      status: 'archived',
    },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubmissions(submissions.map(sub => sub.id));
    } else {
      setSelectedSubmissions([]);
    }
  };

  const handleSelectSubmission = (id) => {
    setSelectedSubmissions(prev =>
      prev.includes(id)
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    // Implement bulk delete logic
    console.log('Deleting submissions:', selectedSubmissions);
  };

  const handleExport = () => {
    // Implement export logic
    console.log('Exporting submissions:', selectedSubmissions);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text">Submissions</h1>
      </div>

      {/* Search and Filter Bar */}
      <div className="card flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search submissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterForm}
            onChange={(e) => setFilterForm(e.target.value)}
            className="input"
          >
            <option value="all">All Forms</option>
            <option value="feedback">Customer Feedback</option>
            <option value="survey">Product Survey</option>
            <option value="support">Support Ticket</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="input"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedSubmissions.length > 0 && (
        <div className="card flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedSubmissions.length} submissions selected
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
              onClick={handleExport}
              className="btn btn-secondary flex items-center"
            >
              <HiDownload className="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>
      )}

      {/* Submissions Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedSubmissions.length === submissions.length}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Form</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Submitter</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedSubmissions.includes(submission.id)}
                      onChange={() => handleSelectSubmission(submission.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <HiDocumentText className="w-5 h-5 text-primary mr-3" />
                      <span className="font-medium text-text">{submission.formName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{submission.submitterName}</td>
                  <td className="px-6 py-4 text-gray-600">{submission.submitterEmail}</td>
                  <td className="px-6 py-4 text-gray-600">{submission.submissionDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      submission.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      submission.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="text-gray-400 hover:text-primary">
                        <HiEye className="w-5 h-5" />
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

export default Submissions; 