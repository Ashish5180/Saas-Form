import Integration from '../models/IntegrationModel.js';

// Get integrations
export const getIntegrations = async (req, res) => {
  try {
    const integrations = await Integration.find({ user: req.user.id });
    res.json(integrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching integrations', error: error.message });
  }
};

// Connect an integration
export const connectIntegration = async (req, res) => {
  try {
    const integration = await Integration.findByIdAndUpdate(req.params.id, { status: 'connected', lastSync: new Date() }, { new: true });
    res.json(integration);
  } catch (error) {
    res.status(500).json({ message: 'Error connecting integration', error: error.message });
  }
};

// Disconnect an integration
export const disconnectIntegration = async (req, res) => {
  try {
    const integration = await Integration.findByIdAndUpdate(req.params.id, { status: 'disconnected' }, { new: true });
    res.json(integration);
  } catch (error) {
    res.status(500).json({ message: 'Error disconnecting integration', error: error.message });
  }
};
