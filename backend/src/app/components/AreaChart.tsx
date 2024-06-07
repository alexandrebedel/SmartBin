"use client";
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const AreaChart = ({data}) => {

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
      },
      yaxis: {},
      fill: {
        opacity: 1
      },
      tooltip: {}
    }
  });

  useEffect(() => {
    setChartData(prevState => ({
      ...prevState,
      series: [
        {
          name: 'recyclabe',
          data: data.recyclable
        },
        {
          name: 'Organique',
          data: data.trash
        },
        {
          name: 'Verre',
          data: data.glass
        }
      ]
    }));
  }, [data]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AreaChart;