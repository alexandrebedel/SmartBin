"use client";
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';

export default function PieChart({ data }) {
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    // Ne pas exécuter ce code côté serveur
    if (typeof window !== 'undefined') {
      const options = {
        series: data,
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['recyclabe', 'dechets', 'Verre'],
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
  }, [data]);
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