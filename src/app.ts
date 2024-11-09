import express from 'express';
import userRoutes from './routes/userRoutes';
const app = express();
const PORT = process.env.PORT_NUMBER ?? 3000;
app.use(express.json());
app.use('/api', userRoutes);
app.listen(PORT, () => {
    console.log(`App running on Port : ${PORT}`);
});