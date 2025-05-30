import { Bar, Line } from "react-chartjs-2";
import { AttributeData } from "../model/AttributeData";

import React, { useEffect, useRef } from "react";

import { Chart as ChartJS, ChartOptions } from "chart.js";
import { Stack, SxProps } from "@mui/material";
import { Category } from "../model/Category";
import { Colors } from "../styles/colors";
import { Categorization } from "./OrdinalPreprocessing";

type Props = {
  categories: Category[];
  title?: string;
  mode?: "simple" | "complex"; // todo: make enum of it - simple is for cards
  color?: string;
  sx?: SxProps;
  onClick?: (categoryName?: string) => void;
} & (
  | {
      groupingMode: Categorization.Equidistant;
      groupingCount: number;
    }
  | {
      groupingMode: Categorization.Equifrequent;
      groupingCount: number;
    }
  | {
      groupingMode?: Categorization;
      groupingCount?: number;
    }
);

export const LineChart = ({
  categories,
  mode = "simple",
  title,
  color,
  onClick,
  groupingMode,
  groupingCount = 1, // in case it is not needed
}: Props) => {
  const chartRef = useRef<ChartJS<"line"> | null>(null);
  const isComplex = mode === "complex";

  const colors = [
    Colors.warning, // Red
    Colors.info, // Blue
  ];

  const getGroupColor = (ctx: any) => {
    const index = ctx.dataIndex;
    if (index === undefined) return "rgba(75, 192, 192, 0.2)"; // Fallback
    const totalPoints = ctx.chart.data.datasets[ctx.datasetIndex].data.length;
    let group: number;

    if (groupingMode === Categorization.Equidistant) {
      group = Math.floor(index / groupingCount); // Group every `groupingCount` points
    } else {
      group = Math.floor((index / totalPoints) * groupingCount); // Divide into `groupingCount` groups
    }

    return colors[group % colors.length];
  };

  const data = {
    labels: categories.map((c) => c.label),
    datasets: [
      {
        label: title || "Data",
        data: categories.map((c) => c.count),
        fill: true,
        tension: 0.3,
        backgroundColor: getGroupColor,
      },
    ],
  };

  // Todo: customize histograms accordingly to the mode
  const options = {
    responsive: true,
    plugins: {
      legend: mode === "simple" ? { display: false } : { display: true },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        display: false,
        title: mode !== "simple" ? { display: true, text: "Category" } : undefined,
      },
      y: {
        display: true,
        beginAtZero: true,
        title: isComplex ? { display: true, text: "Count" } : undefined,
      },
    },
    onClick: (_e: any, elements: any[]) => {
      if (!onClick || elements.length === 0) return;
      const index = elements[0].index;
      const label = categories[index]?.label;
      onClick(label);
    },
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
    // <>nothin</>

    <Line ref={chartRef} id={`line-chart-${title || Math.random()}`} data={data} options={options} />
  );
};
