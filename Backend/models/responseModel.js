import mongoose from 'mongoose';

const formResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  response: { type: mongoose.Schema.Types.Mixed, required: true }, // Stores submitted data as an object
  submittedAt: { type: Date, default: Date.now }
});

const FormResponse = mongoose.model('FormResponse', formResponseSchema);

export default FormResponse;