import mongoose from 'mongoose';

// MongoDB connection function

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/SAAS-Form', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
