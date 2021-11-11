import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ chartLabels, chartValues }) {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Coin price',
        data: chartValues,
        fill: false,
        backgroundColor: 'rgb(245, 176, 65)',
        borderColor: 'rgba(244, 208, 63, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
