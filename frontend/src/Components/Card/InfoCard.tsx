import React from 'react'

interface TotelAmount{
    
    totelBalence:number,
    totelIncome:number,
    totelExpense:number
}
const InfoCard:React.FC<TotelAmount> = (props) => {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 w-full">
    <div className={` dark:bg-gray-800 dark:shadow-gray-700  p-6 rounded-lg shadow-md flex flex-col items-center w-full justify-center px-32 cursor-pointer`}>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">Total Balance</h2>
      <p className={`text-2xl md:text-3xl mt-2 ${props.totelBalence<=0?'text-red-500':'text-green-700'}`}>${props.totelBalence}</p>
    </div>
  
    <div className="dark:bg-gray-800 dark:shadow-gray-700  p-6 rounded-lg shadow-lg flex flex-col items-center w-full justify-center cursor-pointer">
      <h2 className="text-xl md:text-2xl font-semibold  dark:text-gray-300 text-gray-700">Total Income</h2>
      <p className="text-2xl md:text-3xl mt-2 text-blue-600">${props.totelIncome}</p>
    </div>

    <div className="dark:bg-gray-800 dark:shadow-gray-700  bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-full justify-center cursor-pointer">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">Total Expense</h2>
      <p className="text-2xl md:text-3xl mt-2 text-red-600">${props.totelExpense}</p>
    </div>
  
  </div>
  
  )
}

export default InfoCard