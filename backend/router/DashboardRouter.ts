const express = require('express');


import { Incomelast60Days, Last30daysExpenses, Last30daysExpenseTransaction, last60DaysIncomeTransaction,  TotalIncomeExpenseBalence} from "../controller/DashboardControler";
import authenticateJWT from "../middleware/authantication";
const dashboardRouter = express.Router();


dashboardRouter.get('/total-income/:id',authenticateJWT,TotalIncomeExpenseBalence);

dashboardRouter.get('/last60-days-income-transaction/:id',authenticateJWT,last60DaysIncomeTransaction);
dashboardRouter.get('/income-last-60Days/:id',authenticateJWT,Incomelast60Days);
dashboardRouter.get('/last-30days-expenses/:id',authenticateJWT,Last30daysExpenses);
dashboardRouter.get('/last-30days-expense-transaction/:id',authenticateJWT,Last30daysExpenseTransaction);


export default dashboardRouter;