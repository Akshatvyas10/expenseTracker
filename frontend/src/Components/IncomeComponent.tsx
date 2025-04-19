import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../Interceptor/AxiosInterceptor';
import BarChart from './Chart/BarChart';
import AddIncome from './AddIncome';
import IncomeCard from './Card/IncomeCard';
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineFileDownload } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

interface IncomeData {
  income_id: string;
  income_source: string;
  amount: string;
  date: string;
}

const IncomeComponent: React.FC = () => {
  const userId = localStorage.getItem('user_id');

  // Fetch Income Data
  const fetchIncomeData = async () => {
    const response = await axiosInstance.get(`income/${userId}`);
    return response.data.data;
  };

  const { data: userIncome, isLoading, isError, refetch } = useQuery<IncomeData[]>({
    queryKey: ['userIncome', userId],
    queryFn: fetchIncomeData,
    staleTime: 10000,
    
    refetchOnWindowFocus: false,
  });

  // Delete Income Mutation
  const deleteIncome = async (incomeId: string) => {
    await axiosInstance.delete(`income/${incomeId}`);
  };

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteIncome,
    onSuccess: () => {
      toast.success('Income deleted successfully!');
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete income: ${error.message}`);
    },
  });

  // Download Income Details
  const downloadIncome = async () => {
    try {
      const res = await axiosInstance.post(`/income/download/${userId}`, {}, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute('download', 'income_details.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading income details:', err);
      toast.error('Failed to download income details.');
    }
  };

  if (isLoading) return <p>Loading income data...</p>;
  if (isError) return <p>Error loading income data.</p>;

  const chartData = {
    labels: userIncome?.map(item => item.income_source),
    datasets: [
      {
        data: userIncome?.map(item => item.amount),
        fill: false,
        borderColor: '#742774',
        backgroundColor: 'rgba(0, 0, 999, 0.46)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='dark:bg-gray-900'>
      {/* Income Bar Chart */}
      <section className="p-4 m-2 bg-white shadow-lg rounded-md h-[500px] dark:bg-gray-800 ">
        <h2 className="mb-8 font-bold text-xl text-gray-500 dark:text-gray-300 ">All Income in Bar Chart</h2>
        <div className="lg:w-1/2 m-auto">
          <BarChart data={chartData} />
        </div>
      </section>

      {/* Income List */}
      <section className="p-2 shadow-md pt-4 bg-white mt-4 dark:bg-gray-800">
        <div className="flex justify-between items-center px-2 mt-2">
          <h1 className="font-bold text-xl text-gray-600 dark:text-gray-300">All Incomes</h1>
          <Link
            to="/income"
            className="flex bg-slate-100 hover:shadow-md space-x-2 py-2 rounded-md px-4"
            onClick={downloadIncome}
          >
            <MdOutlineFileDownload className="mt-1" />
            <span>Download</span>
          </Link>
        </div>

        <div className="mb-10 ">
          {userIncome?.map(item => (
            <div key={item.income_id} className="m-auto px-8 flex  justify-between">
              <IncomeCard
                bgColor="bg-green-100 dark:text-green-800"
                textColor="text-green-500"
                income_source={item.income_source}
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
                  }).then(result => {
                    if (result.isConfirmed) {
                      deleteMutation.mutate(item.income_id);
                    }
                  })
                }
              >
                <RiDeleteBin5Line />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Income Form */}
      <AddIncome />
    </div>
  );
};

export default IncomeComponent;
