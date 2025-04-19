const express = require('express');


import { addExpense,getUserExpense,deleteExpense,downloadExpenses } from "../controller/ExpenseComponent";
import authenticateJWT from "../middleware/authantication";
const expenseRouter = express.Router();


expenseRouter.use('/add',authenticateJWT,addExpense);
expenseRouter.get('/:id',authenticateJWT,getUserExpense);

expenseRouter.delete('/:id',authenticateJWT,deleteExpense);
expenseRouter.use('/download',authenticateJWT,downloadExpenses);
// expenseRouter.use('/update-role',UpdateRole);

// expenseRouter.get("/google", googleAuth);
export default expenseRouter;