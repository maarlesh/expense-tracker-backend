import express from 'express';
import userRoutes from './routes/userRoutes';
import expenseRoutes from './routes/accountRoutes';
const app = express();
const PORT = process.env.PORT_NUMBER ?? 3000;
app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/account', expenseRoutes);
app.listen(PORT, () => {
    console.log(`App running on Port : ${PORT}`);
});