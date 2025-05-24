import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// User Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// User Login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
