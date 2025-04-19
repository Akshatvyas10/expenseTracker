import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

interface LineChartInterface{
    chartName?: string,
    data: any
  }
// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart:React.FC<LineChartInterface> = (props) => {
  

  const options:any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem:any) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis from zero
      },
    },
  };

  return(
    <div className='h-[400px] w-'>
      <h2 className=' mb-8 font-bold text-xl text-gray-800 '>{props.chartName}</h2>
     <Line data={props.data} options={options} />;
     </div>
  )
};

export default LineChart;
