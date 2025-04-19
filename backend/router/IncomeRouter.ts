const express = require('express');


import { addIncome,getUserIncome,deleteIncome,downloadIncome } from "../controller/IncomeControler";
import authenticateJWT from "../middleware/authantication";
const incomeRouter = express.Router();



incomeRouter.use('/add',authenticateJWT,addIncome);
incomeRouter.get('/:id',authenticateJWT,getUserIncome);

incomeRouter.delete('/:id',authenticateJWT,deleteIncome);
incomeRouter.use('/download/:id',authenticateJWT,downloadIncome);
// incomeRouter.use('/update-role',UpdateRole);

// incomeRouter.get("/google", googleAuth);
export default incomeRouter;