import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './router/Authrouter';

import incomeRouter from './router/IncomeRouter';
import expenseRouter from './router/ExpenseRouter';
import dashboardRouter from './router/DashboardRouter';


dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173'
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); 

app.use('/user', router);
app.use('/income', incomeRouter);
app.use('/expense', expenseRouter);
app.use('/dashboard', dashboardRouter);

app.listen(Port, () => {
  console.log(`Server started at http://localhost:${Port}`);
});
