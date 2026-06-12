import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import assignmentRoutes from './routes/assignments.js';
import examRoutes from './routes/exams.js';
import submissionRoutes from './routes/submissions.js';
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
console.log("SERVER KEY:", process.env.GEMINI_API_KEY);
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/submissions', submissionRoutes);
app.use("/api/ai" , aiRoutes);

// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));