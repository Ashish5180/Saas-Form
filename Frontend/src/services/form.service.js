import api from './api.config';

export const formService = {
  // Create a new form
  createForm: async (formData) => {
    const response = await api.post('/forms', formData);
    return response.data;
  },

  // Get all forms
  getForms: async () => {
    const response = await api.get('/forms');
    return response.data;
  },

  // Get single form
  getForm: async (formId) => {
    const response = await api.get(`/forms/${formId}`);
    return response.data;
  },

  // Update form
  updateForm: async (formId, formData) => {
    const response = await api.put(`/forms/${formId}`, formData);
    return response.data;
  },

  // Delete form
  deleteForm: async (formId) => {
    try {
      if (!formId) {
        throw new Error('Form ID is required');
      }

      const response = await api.delete(`/forms/${formId}`);
      return response;
    } catch (error) {
      console.error('Error deleting form:', error);
      throw error;
    }
  },

  // Submit form
  submitForm: async (formId, submissionData) => {
    const response = await api.post(`/submissions`, {
      form: formId,
      ...submissionData
    });
    return response.data;
  },

  // Get form submissions
  getSubmissions: async (formId) => {
    const response = await api.get(`/submissions?form=${formId}`);
    return response.data;
  },

  // Export form submissions
  exportSubmissions: async (formId) => {
    try {
      const response = await api.get(`/forms/${formId}/submissions/export`, {
        responseType: 'blob'
      });
      
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `submissions-${formId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return response;
    } catch (error) {
      console.error('Error exporting submissions:', error);
      throw error;
    }
  },

  // Export form as JSON
  exportForm: async (formId) => {
    try {
      const response = await api.get(`/forms/${formId}/export`, {
        responseType: 'blob'
      });
      
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `form-${formId}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return response;
    } catch (error) {
      console.error('Error exporting form:', error);
      throw error;
    }
  },

  // Update form status
  updateFormStatus: async (formId, status) => {
    const response = await api.patch(`/forms/${formId}/status`, { status });
    return response.data;
  },

  // Add webhook to form
  addWebhook: async (formId, webhookData) => {
    const response = await api.post(`/forms/${formId}/webhooks`, webhookData);
    return response.data;
  },

  // Remove webhook from form
  removeWebhook: async (formId, webhookId) => {
    const response = await api.delete(`/forms/${formId}/webhooks/${webhookId}`);
    return response.data;
  }
}; 