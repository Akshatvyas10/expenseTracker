import connection from '../Database';
import { Request,Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import XLSX from 'xlsx';

interface Expensestr{
    income_id :string, user_id:string, category:string, Amount:number, date:string, timestamps:boolean
}

export const addExpense =(req:Request,res:Response)=>{
    const {userId,Amount,category,date} = req.body;
    
    if(!userId && !Amount && !category){
        return res.status(404).json({ message: 'User id not Found' });
    }
    const expense_id = uuidv4();
    const sqlQuery = `insert into user_expense (expense_id, user_id, category, amount, date, timestamps) values('${expense_id}','${userId}','${category}',${Amount} ,'${date}', ${true})`
    connection.query(sqlQuery, (err, result) => {
        if (err) {
          // console.log('user income not saved');
          console.log(err);
          return res.status(400).json({ message: 'User Expenses not saved' });
        } else {
          // console.log('user income saved');
          return res.status(200).json({ message: 'User Expenses saved' });
        }
      });
}

export const getUserExpense =(req:Request,res:Response)=>{
    const userId = req.params.id;
    
    if(!userId ){
        return res.status(404).json({ message: 'User id not Found' });
    }

   const sqlQuery = `SELECT * FROM user_expense WHERE user_id = '${userId}' ORDER BY date asc  `
    connection.query(sqlQuery, (err:Error, result:Expensestr) => {
        if (err) {
          // console.log('User income not in DataBase Found');
          console.log(err);
          return res.status(400).json({ message: 'User Expenses not in DataBase Found' });
        } else {
          // console.log('User income Found');
         
          res.status(200).json({message:"User Expenses Found" ,data:result})
        }
      });
}

export const  deleteExpense =(req:Request,res:Response)=>{
    const ExpenseId = req.params.id;
    
    if(!ExpenseId ){
        return res.status(404).json({ message: 'Expenses id not Found' });
    }

    const sqlQuery = `delete from user_expense where expense_id = '${ExpenseId}'`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
          // console.log('User income not in DataBase Found');
          // console.log(err);
          return res.status(400).json({ message: 'ExpenseId not deleted ]' });
        } else {
          // console.log('User income Found');
          return res.status(200).json({ message: 'ExpenseId deleted' });
        }
      });
}

export const downloadExpenses =(req:Request,res:Response)=>{
    const {userId} =req.body
    if(!userId ){
        return res.status(404).json({ message: 'User id not Found' });
    }

   const sqlQuery = `SELECT * FROM user_expense WHERE user_id = '${userId}'`
    connection.query(sqlQuery, (err:Error, result:Expensestr[]) => {
        if (err) {
          // console.log('User income not in DataBase Found');
          // console.log(err);
          return res.status(400).json({ message: 'User income not download Found' });
        } else {
          // console.log('User income Found');
          const data = result.map((item)=>({
            'income':item.Amount,
            'category':item.category,
            'date':item.date

          }))
          const workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.json_to_sheet(result as any);
          XLSX.utils.book_append_sheet(workbook, worksheet, 'income');
      
          // Generate Excel Buffer
          const excelBuffer = XLSX.writeFile(workbook,'income_detail.xlsx');
          res.status(200).download('income_detail.xlsx')
        }
      });
}


