"use client";
import React, { useState, useEffect, FC } from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart: FC<{ data: any }> = ({ data }) => {
  const [chartData, setChartData] = useState<any>({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
        ],
      },
      yaxis: {},
      fill: {
        opacity: 1,
      },
      tooltip: {},
    },
  });

  useEffect(() => {
    setChartData((prevState: any) => ({
      ...prevState,
      series: [
        {
          name: "recyclabe",
          data: data.recyclable,
        },
        {
          name: "Organique",
          data: data.trash,
        },
        {
          name: "Verre",
          data: data.glass,
        },
      ],
    }));
  }, [data]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AreaChart;
