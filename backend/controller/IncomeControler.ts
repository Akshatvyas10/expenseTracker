import connection from '../Database';
import { Request,Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import XLSX from 'xlsx';

interface incomestr{
    income_id :string, user_id:string, income_source:string, Amount:number, date:string, timestamps:boolean
}

export const addIncome =(req:Request,res:Response)=>{
    const {userId,Amount,income_source,date} = req.body;
    console.log(req.body)
    if(!userId && !Amount && !income_source){
        return res.status(404).json({ message: 'User income not Found' });
    }
    const newIncomeId = uuidv4();
    const sqlQuery = `insert into user_income (income_id, user_id, income_source, amount, date, timestamps) values('${newIncomeId}','${userId}','${income_source}',${Amount} ,'${date}', ${true})`
    connection.query(sqlQuery, (err, result) => {
        if (err) {
          // console.log('user income not saved');
          console.log(err);
          return res.status(400).json({ message: 'User income not saved' });
        } else {
          console.log('user income saved'); 
          return res.status(200).json({ message: 'User income saved' });
        }
      });
}

export const getUserIncome =(req:Request,res:Response)=>{
    const userId= req.params.id;
    
    if(!userId ){
        return res.status(404).json({ message: 'User id not Found' });
    }

   const sqlQuery = `SELECT * FROM user_income WHERE user_id = '${userId}' ORDER BY date asc`
    connection.query(sqlQuery, (err:Error, result:incomestr) => {
        if (err) {
          // console.log('User income not in DataBase Found');
          console.log(err);
          return res.status(400).json({ message: 'User income not in DataBase Found' });
        } else {
          // console.log('User income Found');
         
          res.status(200).json({message:"User income Found" ,data:result})
        }
      });
}

export const deleteIncome =(req:Request,res:Response)=>{
    const incomeId = req.params.id;
    console.log(req.params)
    if(!incomeId ){
      console.log('in not found '); 

        return res.status(404).json({ message: 'income id not Found' });
    }

    const sqlQuery = `delete from user_income where income_id = '${incomeId}' ORDER BY date asc`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
          // console.log('User income not in DataBase Found');
          console.log(err);
          return res.status(400).json({ message: 'income not deleted ]' });
        } else {
          // console.log('User income Found');
          return res.status(200).json({ message: 'income deleted' });
        }
      });
}

export const downloadIncome =(req:Request,res:Response)=>{
    const userId =req.params.id
    if(!userId ){
        return res.status(404).json({ message: 'User id not Found' });
    }

   const sqlQuery = `SELECT * FROM user_income WHERE user_id = '${userId}'  ORDER BY date ASC`
    connection.query(sqlQuery, (err:Error, result:incomestr[]) => {
        if (err) {
          // console.log('User income not in DataBase Found');
          console.log(err);
          return res.status(400).json({ message: 'User income not download Found' });
        } else {
          // console.log('User income Found');
          const data = result.map((item)=>({
            'income':item.Amount,
            'source':item.income_source,
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


