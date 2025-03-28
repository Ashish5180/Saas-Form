import api from './api.config';

export const templateService = {
  // Create a new template
  createTemplate: async (templateData) => {
    const response = await api.post('/templates', templateData);
    return response.data;
  },

  // Get all templates
  getTemplates: async () => {
    const response = await api.get('/templates');
    return response.data;
  },

  // Get single template
  getTemplate: async (templateId) => {
    const response = await api.get(`/templates/${templateId}`);
    return response.data;
  },

  // Update template
  updateTemplate: async (templateId, templateData) => {
    const response = await api.put(`/templates/${templateId}`, templateData);
    return response.data;
  },

  // Delete template
  deleteTemplate: async (templateId) => {
    const response = await api.delete(`/templates/${templateId}`);
    return response.data;
  },

  // Use template to create form
  useTemplate: async (templateId) => {
    const response = await api.post(`/templates/${templateId}/use`);
    return response.data;
  }
}; 