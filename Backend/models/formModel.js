import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


const optionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

const fieldSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'email', 'number', 'textarea', 'select', 'checkbox', 'radio', 'date'],
  },
  label: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: String,
  required: { type: Boolean, default: false },
  options: [optionSchema] // Used for select, checkbox, and radio fields
});

const settingsSchema = new mongoose.Schema({
  allowMultipleSubmissions: { type: Boolean, default: true },
  requireAuthentication: { type: Boolean, default: false },
  notificationEmail: String,
  redirectUrl: String,
  customCSS: String,
  customJS: String
});

const formSchema = new mongoose.Schema({
  formId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  title: { type: String, required: true },
  description: String,
  fields: [fieldSchema],
  settings: settingsSchema
});

const Form = mongoose.model('Form', formSchema);

export default Form;
