import { Bar } from "react-chartjs-2";
import { AttributeData } from "../model/AttributeData";

import React, { useEffect, useRef } from "react";

import { Chart as ChartJS, ChartOptions } from "chart.js";
import { getCategoriesLabelsArray } from "../helpers/getCategoriesLabelsArray";
import { getCategoriesCountsArray } from "../helpers/getCategoriesCountsArray";
import { Stack, SxProps } from "@mui/material";
import { Category } from "../model/Category";

type Props = {
  categories: Category[];
  title?: string;
  mode?: "simple" | "complex"; // todo: make enum of it - simple is for cards
  color?: string;
  sx?: SxProps;
};

export const Histogram = ({ categories, mode = "simple", title, color, sx }: Props) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  // Sample data for the histogram
  const data = {
    labels: getCategoriesLabelsArray(categories), // Bin ranges
    datasets: [
      {
        label: title,
        data: getCategoriesCountsArray(categories), // Frequency in each bin
        backgroundColor: color ?? "rgba(75, 192, 192, 0.6)",
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
        display: false,
        text: "Sample Histogram",
      },
      tooltip: {
        displayColors: false,
        // position: "nearest"
      },
    },
    scales: {
      x: {
        display: false,
        type: "category" as const, // Use 'as const' to ensure literal type
        title: {
          display: false,
          text: "Value Bins",
        },
      },
      y: {
        display: false,
        type: "linear" as const, // Explicitly specify y-axis type
        title: {
          display: false,
          // text: 'Frequency',
        },
        beginAtZero: true,
      },
    },
  };

  // Cleanup chart instance on component unmount
  // useEffect(() => {
  //     return () => {
  //         if (chartRef.current) {
  //             chartRef.current.destroy(); // Destroy the chart instance
  //         }
  //     };
  // }, []);

  return (
    // <div style={{width: '200px', margin: '0 auto'}}>

      <Bar
        // ref={chartRef}

        data={data}
        options={options}
      />

  );
};
