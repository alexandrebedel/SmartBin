"use client";
import Chart from "react-apexcharts";
import { FC, useEffect, useState } from "react";

export default function PieChart({ data }: { data: any }) {
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {
    // Ne pas exécuter ce code côté serveur
    if (typeof window !== "undefined") {
      const options = {
        series: data,
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["recyclabe", "Organique", "Verre"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };
      setChartOptions(options);
    }
  }, [data]);
  return (
    <div>
      <div>
        {chartOptions && (
          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="pie"
            width={380}
          />
        )}
      </div>
    </div>
  );
}
