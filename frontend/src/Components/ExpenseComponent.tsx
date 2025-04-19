import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../Interceptor/AxiosInterceptor';
import IncomeCard from './Card/IncomeCard';
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineFileDownload } from 'react-icons/md';
import LineChart from './Chart/LineChart';
import AddExpenses from './AddExpenses';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

interface ExpenseData {
  expense_id: string;
  category: string;
  amount: string;
  date: string;
}

const ExpenseComponent: React.FC = () => {
  const userId = localStorage.getItem('user_id');

  const deleteExpenseAPI = async (id: string)=> {
  
    await axiosInstance.delete(`expense/${id}`);
  };

  const fetchExpenses = async () => {
   
    const response = await axiosInstance.get<{ data: ExpenseData[] }>(`expense/${userId}`);
    return response.data.data;
  };
  // React Query: Fetch Expenses
  const { data: userExpense, isLoading, isError, refetch } = useQuery<ExpenseData[]>({
    queryKey:['expenses'],
    refetchOnWindowFocus:false,
    staleTime:10000,
    queryFn: fetchExpenses},
    
    
  );

  // React Query: Delete Expense Mutation
  const deleteMutation = useMutation<void, Error, string>( {
  mutationFn:deleteExpenseAPI,
    onSuccess: () => {
      refetch()
      toast.success('Expense deleted successfully!');
    },
    onError: (error:any) => {
      toast.error(`Failed to delete expense: ${error.message}`);
      console.error(error);
    }
  });

  // Download Expenses
  const downloadExpense = async () => {
  
   
    try {
      const res = await axiosInstance.post(`expense/download/${ userId }`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading expense details:', err);
    }
  };

 
  if (isLoading) return <p className='font-bold m-auto justify-center dark:bg-gray-900 text-xl cursor-wait'>Loading...</p>;
  if (isError) return <p className='font-bold m-auto justify-center dark:bg-gray-900 text-xl cursor-wait'>loading expenses...</p>;

  const chartData = {
    labels: userExpense!.map((item) => item.category),
    datasets: [
      {
        label: 'Total Expenses by Category',
        data: userExpense!.map((item) => parseFloat(item.amount)),
        fill: false,
        borderColor: '#FF0000',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className='dark:bg-gray-900'>
      <div className="p-4 bg-white shadow-lg rounded-md mb-6 dark:bg-gray-800">
        <h2 className="text-xl font-bold dark:text-gray-300 text-gray-600 mb-4 text-center">All Expenses in Bar Chart</h2>
        <LineChart data={chartData} />
      </div>

      <div className="p-2 shadow-md pt-4 bg-white mt-2 dark:bg-gray-800">
        <div className="flex justify-between px-2 mt-2">
          <h1 className="font-bold text-xl text-gray-600 dark:text-gray-300">All Expenses</h1>
          <div
            className="flex bg-slate-100 hover:shadow-md hover:cursor-pointer space-x-2 py-2 rounded-md px-4"
            onClick={downloadExpense}
          >
            <MdOutlineFileDownload className="mt-1" />
            <span>Download</span>
          </div>
        </div>

        <div className="mb-10 ">
          {userExpense!.map((item) => (
            <div key={item.expense_id} className="m-auto px-8 flex justify-between">
              <IncomeCard
                bgColor="bg-red-100"
                textColor="text-red-500"
                income_source={item.category}
                amount={item.amount}
                date={item.date}
              />
              <div
                className="mt-4 text-3xl inline m-auto text-left cursor-pointer text-gray-200 hover:text-gray-900 p-4 rounded-lg"
                onClick={() =>
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                  }).then((result) => {
                    if (result.isConfirmed) {
      

                      deleteMutation.mutate(item.expense_id);
                    }
                  })
                }
              >
                <RiDeleteBin5Line />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddExpenses />
    </div>
  );
};

export default ExpenseComponent;
