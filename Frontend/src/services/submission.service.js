import api from './api.config';

export const submissionService = {
  // Submit a form
  submitForm: async (submissionData) => {
    const response = await api.post('/submissions', submissionData);
    return response.data;
  },

  // Get all submissions
  getSubmissions: async (params = {}) => {
    const response = await api.get('/submissions', { params });
    return response.data;
  },

  // Get a single submission
  getSubmission: async (submissionId) => {
    const response = await api.get(`/submissions/${submissionId}`);
    return response.data;
  },

  // Update submission status
  updateSubmissionStatus: async (submissionId, status) => {
    const response = await api.patch(`/submissions/${submissionId}/status`, { status });
    return response.data;
  },

  // Delete a submission
  deleteSubmission: async (submissionId) => {
    const response = await api.delete(`/submissions/${submissionId}`);
    return response.data;
  },

  // Export submissions
  exportSubmissions: async (params = {}) => {
    const response = await api.get('/submissions/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  }
}; 