import mongoose from 'mongoose';

const webhookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  events: { type: [String], required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  lastTriggered: { type: Date, default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Webhook', webhookSchema);
