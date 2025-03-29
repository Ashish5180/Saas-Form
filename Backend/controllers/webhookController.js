import Webhook from '../models/Webhook.js';

// Create a new webhook
export const createWebhook = async (req, res) => {
  try {
    const { name, url, events } = req.body;
    const webhook = await Webhook.create({ name, url, events, user: req.user.id });
    res.status(201).json(webhook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating webhook', error: error.message });
  }
};

// Get all webhooks
export const getWebhooks = async (req, res) => {
  try {
    const webhooks = await Webhook.find({ user: req.user.id });
    res.json(webhooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching webhooks', error: error.message });
  }
};

// Update a webhook
export const updateWebhook = async (req, res) => {
  try {
    const { name, url, events, status } = req.body;
    const webhook = await Webhook.findByIdAndUpdate(req.params.id, { name, url, events, status }, { new: true });
    if (!webhook) return res.status(404).json({ message: 'Webhook not found' });
    res.json(webhook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating webhook', error: error.message });
  }
};

// Delete a webhook
export const deleteWebhook = async (req, res) => {
  try {
    await Webhook.findByIdAndDelete(req.params.id);
    res.json({ message: 'Webhook deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting webhook', error: error.message });
  }
};
