import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
interface paiChartInterface{
 
  data: any
}
const PieChart:React.FC<paiChartInterface> = (props) => {
  const options :any= {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: { label: any; raw: any; }) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className=''>
     
      <Pie options={options} data={props.data}/>
    </div>
  );
};

export default PieChart;
