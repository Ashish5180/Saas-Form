import api from './api.config';

export const webhookService = {
  // Add a webhook
  addWebhook: async (formId, webhookData) => {
    const response = await api.post('/webhooks', { formId, ...webhookData });
    return response.data;
  },

  // Get all webhooks for a form
  getWebhooks: async (formId) => {
    const response = await api.get('/webhooks', { params: { formId } });
    return response.data;
  },

  // Update a webhook
  updateWebhook: async (formId, webhookId, webhookData) => {
    const response = await api.patch(`/webhooks/${formId}/${webhookId}`, webhookData);
    return response.data;
  },

  // Delete a webhook
  deleteWebhook: async (formId, webhookId) => {
    const response = await api.delete(`/webhooks/${formId}/${webhookId}`);
    return response.data;
  },

  // Test a webhook
  testWebhook: async (formId, webhookId) => {
    const response = await api.post(`/webhooks/${formId}/${webhookId}/test`);
    return response.data;
  }
}; 