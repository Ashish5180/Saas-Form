import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import formRoutes from './router/formRoutes.js';



// Import DB connection function
import connectDB from './database/db.js';


 //Auth Routes
import userRoutes from './router/authRoutes.js';



const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Built-in middleware to parse JSON requests
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use(express.static(path.join(__dirname, "public")));  



// Home route
app.get("/", (req, res) => {
    res.send("Serverless Form Builder API");
});



// Form Routes
app.use('/api/forms', formRoutes);

// Auth Routes
app.use('/api/auth', userRoutes);


//  Database Connection
connectDB();

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
