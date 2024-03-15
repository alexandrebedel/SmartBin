"use client";
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';

export default function PieChart() {
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    // Ne pas exécuter ce code côté serveur
    if (typeof window !== 'undefined') {
      const options = {
        series: [44, 55, 13, 43, 22],
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
      setChartOptions(options);
    }
  }, []);
  return (
    <div>
      <div>
      {chartOptions && (
          <Chart options={chartOptions} series={chartOptions.series} type="pie" width={380} />
        )}
    </div>
    </div>
  );
}
