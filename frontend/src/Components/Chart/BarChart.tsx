import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartInterface{

    data: any
  }

const BarChart:React.FC<BarChartInterface> = (props) => {
 
    const options:any = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount ($)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Months',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      };
    

  return(
    <div className=''>
     
      <Bar data={props.data} options={options} />
    </div>
  );
};

export default BarChart;
