import { Bar } from "react-chartjs-2";
import { AttributeData } from "../model/AttributeData";

import React, { useEffect, useRef } from "react";

import { Chart as ChartJS, ChartOptions } from "chart.js";
import { getCategoriesLabelsArray } from "../helpers/getCategoriesLabelsArray";
import { getCategoriesCountsArray } from "../helpers/getCategoriesCountsArray";
import { Stack, SxProps } from "@mui/material";
import { Category } from "../model/Category";
import { Colors } from "../styles/colors";

type Props = {
  categories: Category[];
  title?: string;
  mode?: "simple" | "complex"; // todo: make enum of it - simple is for cards
  color?: string;
  sx?: SxProps;
  onClick?: (categoryName?: string) => void;
};

export const Histogram = ({ categories, mode = "simple", title, color, onClick }: Props) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  const isComplex = mode === "complex";

  // Sample data for the histogram
  const data = {
    labels: getCategoriesLabelsArray(categories), // Bin ranges
    datasets: [
      {
        label: title,
        data: getCategoriesCountsArray(categories), // Frequency in each bin
        backgroundColor: color ?? Colors.histogram,
      },
    ],
  };

  // Todo: customize histograms accordingly to the mode
  const options: ChartOptions<"bar"> = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
        // position: 'top',
      },
      title: {
        display: !!title,
        text: title,
      },
      tooltip: {
        displayColors: false,
        // position: "nearest"
      },
    },
    scales: {
      x: {
        display: isComplex,
        type: "category" as const, // Use 'as const' to ensure literal type
      },
      y: {
        display: isComplex,
        type: "linear" as const, // Explicitly specify y-axis type
        beginAtZero: true,
      },
    },
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const chart = chartRef.current;

    if (!chart) return;
    console.log("chart is read");

    // Get elements at event using the instance method
    const elements = chart.getElementsAtEventForMode(event.nativeEvent, "nearest", { intersect: true }, true);

    if (elements.length > 0) {
      const { index } = elements[0];
      const label = data.labels[index];
      const value = data.datasets[0].data[index];
      console.log(label, value);

      onClick && onClick(label);

      console.log("Clicked category:", label, "Value:", value);
    }
  };

  // Cleanup chart instance on component unmount
  useEffect(() => {
      return () => {
          if (chartRef.current) {
              chartRef.current.destroy(); // Destroy the chart instance
          }
      };
  }, []);

  return (
    // <div style={{width: '200px', margin: '0 auto'}}>

    <Bar id={`bar-chart-${title || Math.random()}`} ref={chartRef} data={data} options={options} onClick={handleClick} />
  );
};
