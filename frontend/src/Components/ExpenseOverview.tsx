import React from 'react';

import BarChart from './Chart/BarChart';

interface ChartData {
   chart:any
}

const ExpenseOverview: React.FC<ChartData> = (props) => {
  

 

  return (
        <div className="p-4 m-2 bg-white shadow-lg rounded-md  dark:bg-gray-800">
             <h2 className=' mb-8 font-bold text-xl text-gray-500 dark:text-gray-300 cursor-pointer'>Last 30 Days Expense</h2>
        <BarChart data={props.chart} />
        </div>
  );
};

export default ExpenseOverview;
