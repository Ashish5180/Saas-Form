import mongoose from 'mongoose';

const integrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  status: { type: String, enum: ['connected', 'disconnected'], default: 'disconnected' },
  lastSync: { type: Date, default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Integration', integrationSchema);
