import React from 'react';
import InfoCard from './Card/InfoCard';
import FinancialOverview from './FinancialOverview';
import { axiosInstance } from '../Interceptor/AxiosInterceptor';
import RecentTransaction from './RecentTransactionCard';
import RecentExpenseCard from './Card/ExpenseCard';
import ExpenseOverview from './ExpenseOverview';
import IncomeCard from './Card/IncomeCard';
import { FaArrowRight } from 'react-icons/fa6';
import PieChart from './Chart/PieChart';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface TotalAmount {
  total_balence: number;
  total_expense: number;
  total_income: number;
}

interface IncomeCardTransaction {
  id: string;  // Added for unique key
  income_source: string;
  amount: string;
  date: string;
}

interface ExpensesTransaction {
  id: string;  // Added for unique key
  category: string;
  amount: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const userId = localStorage.getItem('user_id');

  const fetchTotalAmount = async () => {
    const response = await axiosInstance.get(`dashboard/total-income/${userId}`);
    return response.data.data;
  };

  const fetchIncomeTransactions = async () => {
    const response = await axiosInstance.get(`dashboard/last60-days-income-transaction/${userId}`);
    return response.data.data;
  };

  const fetchExpenseTransactions = async () => {
    const response = await axiosInstance.get(`dashboard/last-30days-expense-transaction/${userId}`);
    return response.data.data;
  };

  const { data: totalAmount, isLoading: isTotalAmountLoading, isError: isTotalAmountError } = useQuery<TotalAmount>({
    queryKey: ['totalAmount'],
    queryFn: fetchTotalAmount,
    staleTime: 10000,
  });

  const { data: incomeTransactions, isError: isIncomeError } = useQuery<IncomeCardTransaction[]>({
    queryKey: ['incomeTransactions'],
    queryFn: fetchIncomeTransactions,
    staleTime: 10000,
  });

  const { data: expenseTransactions, isError: isExpenseError } = useQuery<ExpensesTransaction[]>({
    queryKey: ['expenseTransactions'],
    queryFn: fetchExpenseTransactions,
    staleTime: 10000,
  });

  if (isTotalAmountLoading) return <p>Loading dashboard data...</p>;
  if (isIncomeError || isExpenseError || isTotalAmountError) {
    return <p>Error loading data. Please try again later.</p>;
  }

  const chartData = {
    labels: incomeTransactions?.map((item) => item.income_source),
    datasets: [
      {
        data: incomeTransactions?.map((item) => parseFloat(item.amount)),
        backgroundColor: ['#20008B'],
        borderWidth: 2,
        cutout: '49%',
      },
    ],
  };

  const chartDataForExpense = {
    labels: expenseTransactions?.map((item) => item.category),
    datasets: [
      {
        label: 'Expenses Amount',
        data: expenseTransactions?.map((item) => parseFloat(item.amount)),
        fill: false,
        borderColor: '#FF0000',
        backgroundColor: '#FF5464',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className=" pb-5 bg-white dark:bg-gray-900">
      <InfoCard
        totelBalence={totalAmount?.total_balence || 0}
        totelIncome={totalAmount?.total_income || 0}
        totelExpense={totalAmount?.total_expense || 0}
      />

      <div className="h-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5 pb-12 dark:text-gray-300 dark:bg-gray-900">
        <div className="p-2 shadow-md pt-4 bg-white dark:bg-gray-800 mt-2">
          <div className="flex justify-between px-2 mt-2">
            <h1 className="font-bold text-xl text-gray-600 dark:text-gray-100 cursor-pointer">Recent Incomes</h1>
            <Link to="/income" className="flex bg-slate-100 hover:shadow-md hover:cursor-pointer dark:text-gray-300 dark:bg-gray-800 space-x-2 py-1 rounded-md px-4">
              <span>See All</span> <FaArrowRight className="mt-1" />
            </Link>
          </div>
          {incomeTransactions?.map((item) => (
            <RecentTransaction key={item.id} income_source={item.income_source} amount={item.amount} date={item.date} />
          ))}
        </div>

        <FinancialOverview
          totelBalence={totalAmount?.total_balence || 0}
          totelIncome={totalAmount?.total_income || 0}
          totelExpense={totalAmount?.total_expense || 0}
        />

        <div className="p-2 shadow-md pt-6 bg-white dark:bg-gray-800 mt-2 ">
          <div className="flex justify-between px-2 mt-2">
            <h1 className="font-bold text-xl text-gray-600 dark:text-gray-100">Expenses</h1>
            <Link to="/expense" className="flex bg-slate-100 hover:shadow-md dark:text-gray-300 dark:bg-gray-800 hover:cursor-pointer space-x-2 py-1 rounded-md px-4">
              <span>See All</span> <FaArrowRight className="mt-1" />
            </Link>
          </div>
          {expenseTransactions?.map((item) => (
            <RecentExpenseCard key={item.id} category={item.category} amount={item.amount} date={item.date} />
          ))}
        </div>

        <ExpenseOverview chart={chartDataForExpense} />

        <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md h-auto">
          <h1 className="mb-8 font-bold text-xl text-gray-500 dark:text-gray-100">Financial Overview</h1>
          <div className="w-1/2 m-auto">
            <PieChart data={chartData} />
          </div>
        </div>

        <div className="p-2 shadow-md pt-4 bg-white dark:bg-gray-800 mt-2">
          <div className="flex justify-between px-2 mt-2">
            <h1 className="font-bold text-xl text-gray-600 dark:text-gray-100">Income Source</h1>
            <Link to="/income" className="flex bg-slate-100 hover:shadow-md space-x-2 py-1 rounded-md px-4 dark:text-gray-300 dark:bg-gray-800">
              <span>See All</span> <FaArrowRight className="mt-1" />
            </Link>
          </div>
          {incomeTransactions?.map((item) => (
            <IncomeCard
              key={item.id}
              bgColor="bg-green-100 dark:bg-green-600"
              textColor="text-green-500 dark:text-green-200"
              income_source={item.income_source}
              amount={item.amount}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
