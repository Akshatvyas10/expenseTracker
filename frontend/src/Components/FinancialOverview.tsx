import React, { useEffect, useState } from 'react';
import PieChart from './Chart/PieChart';

interface paiChartStr {
  totelBalence: number;
  totelIncome: number;
  totelExpense: number;
}

const FinancialOverview: React.FC<paiChartStr> = (props) => {
  const [chartData, setChartData] = useState({
    labels: ['Totel Expense', ' Totel Balence', 'Totel Income'],
    datasets: [
      {
        data: [0, 0, 0], // Default data
        backgroundColor: ['#008400', '#FF0000', '#20008B'],
        borderWidth: 2,
        cutout: '49%',
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: ['Totel Balence', 'Totel Expense', 'Totel Income'],
      datasets: [
        {
          data: [
            props.totelBalence,
            props.totelExpense,
            props.totelIncome,
          ],
      
          backgroundColor: ['#008400', '#FF0000', '#20008B'],
          borderWidth: 2,
          cutout: '49%',
        },
      ],
    });
  }, [props.totelBalence, props.totelExpense, props.totelIncome]);

  return (
    <div className="p-4 m- bg-white shadow-md rounded-md h-auto dark:text-gray-300 dark:bg-gray-800">
      <h1 className=' mb-8 font-bold text-xl text-gray-500 dark:text-gray-300 cursor-pointer'>Financial Overview</h1>
      <div className='w-1/2 m-auto'>
      <PieChart
        data={chartData}
     
        

      />
      </div>
    </div>
  );
};

export default FinancialOverview;
