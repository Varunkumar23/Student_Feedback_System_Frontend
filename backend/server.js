import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

import courseRoutes from './routes/courseRoute.js';
import feedbackRoutes from './routes/feedbackRoute.js';

const app = express();
dotenv.config();

connectDB();


app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/courses', courseRoutes);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});