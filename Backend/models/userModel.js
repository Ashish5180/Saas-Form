import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  forms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: false // Optional, if you want to link forms to users
  }],
  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
