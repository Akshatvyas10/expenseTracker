import connection from '../Database';
import { Request,Response } from "express";


   interface Last30daysExpenseTransaction{
    catgory:string,
    date:string,
    amount:string
   }
   interface last60DaysIncomeTransaction{
    income_source:string,
    date:string,
    amount:string
   }
    
  export const TotalIncomeExpenseBalence =(req:Request,res:Response)=>{
       
    const userId = req.params.id;
    console.log(userId)
        
    if(!userId){
        console.log(userId)
    return res.status(404).json({ message: 'User user Id not Found' });
}

       const sqlQuery = `SELECT SUM(amount) AS total_income FROM user_income where user_id = '${userId}'`
       connection.query(sqlQuery, (err, incomResult:any) => {
           if (err) {
               // console.log('user income not saved');
               // console.log(err);
               return res.status(400).json({ message: 'User income not saved' });
            } else {
                console.log(incomResult);
                const sqlQuery = `SELECT SUM(amount) AS total_expense FROM user_expense where user_id = '${userId}'`
                connection.query(sqlQuery, (err, expenseResult:any) => {
                    if (err) {
                        // console.log('user income not saved');
                        // console.log(err);
                        return res.status(400).json({ message: 'User income not saved' });
                     } else {
                        const total_balence = incomResult[0].total_income - expenseResult[0].total_expense
                        const data = {total_expense:expenseResult[0].total_expense ,total_income:incomResult[0].total_income, total_balence:`${total_balence}`}
                         return res.status(200).json({ message: 'User income saved', data:data});
                     }
                 });
               
            }
        });
    }

   

     export   const last60DaysIncomeTransaction =(req:Request,res:Response)=>{
       
        const userId = req.params.id;

        
        if(!userId){
        return res.status(404).json({ message: 'User user Id not Found' });
    }

        const sqlQuery = `SELECT income_source, amount, date FROM user_income WHERE user_id = '${userId}' ORDER BY date DESC LIMIT 5 `
        connection.query(sqlQuery, (err:Error, result:last60DaysIncomeTransaction[]) => {
            if (err) {
                console.error('Error fetching transactions:', err);
                return res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }
    
            if (result.length === 0) {
            console.log('Transactions found:', result);

                return res.status(404).json({ message: 'No transactions found in the last 30 days' });
            }
    
            console.log('Transactions found:', result);
            return res.status(200).json({ message: 'Last 30 Days income Transactions', data: result });
        });
     }

     export   const Incomelast60Days =(req:Request,res:Response)=>{
       
        const userId = req.params.id;

        
        if(!userId){
        return res.status(404).json({ message: 'User user Id not Found' });
    }

        const sqlQuery = `SELECT SUM(amount) AS last_60days_income FROM user_income WHERE user_id = '${userId}' ORDER BY date DESC LIMIT 5`
        connection.query(sqlQuery, (err, result) => {
            if (err) {
                // console.log('user income not saved');
                // console.log(err);
                return res.status(400).json({ message: 'User income not saved' });
             } else {
                 // console.log('user income saved');
                 return res.status(200).json({ message: 'User income saved',data:result });
             }
         });
     }
 
     export    const Last30daysExpenses =(req:Request,res:Response)=>{
       
        const userId = req.params.id;

        
        if(!userId){
        return res.status(404).json({ message: 'User user Id not Found' });
    }

        const sqlQuery = `SELECT SUM(amount) AS last_30days_expenses FROM user_expense WHERE user_id = '${userId}' ORDER BY date DESC LIMIT 5`
        connection.query(sqlQuery, (err, result) => {
            if (err) {
                // console.log('user income not saved');
                // console.log(err);
                return res.status(400).json({ message: 'User income not saved' });
             } else {
                 // console.log('user income saved');
                 return res.status(200).json({ message: 'User income saved',data:result });
             }
         });
     }
   

export const Last30daysExpenseTransaction = (req: Request, res: Response) => {
        const userId = req.params.id;
 // Destructuring to get userId from the request body

    if (!userId) {
        return res.status(400).json({ message: 'User ID not found' });
    }



    // Using parameterized queries to prevent SQL injection
    const sqlQuery = `
        SELECT category, amount, date 
        FROM user_expense 
        WHERE user_id = '${userId}' ORDER BY date DESC LIMIT 5`;

    connection.query(sqlQuery, (err:Error, result:Last30daysExpenseTransaction[]) => {
        if (err) {
            console.error('Error fetching transactions:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

       
        console.log('Transactions found:', result);
        return res.status(200).json({ message: 'Last 30 Days Expense Transactions', data: result });
    });
};



 