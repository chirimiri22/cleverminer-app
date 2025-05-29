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

  const data = {
    labels: categories.map((c) => c.label),
    datasets: [
      {
        label: title || "Data",
        data: categories.map((c) => c.count),

        // backgroundColor: Colors.black, // transparent fill
        fill: true,
        tension: 0.3,
        segment: {
          borderColor: (ctx: any) => {
            const index = ctx.p1DataIndex; // Index of the second point in the segment
            const totalPoints = ctx.chart.data.datasets[ctx.datasetIndex].data.length;
            let group: number = 1;

            if (groupingMode === Categorization.Equidistant) {
              group = Math.floor(index / groupingCount); // Group every `pointsPerGroup` points
            }
            if (groupingMode === Categorization.Equifrequent) {
              // Equifrequent: Divide into `numberOfGroups` groups
              group = Math.floor((index / totalPoints) * groupingCount);
            }

            const colors = [
              Colors.warning,
              Colors.info, // Purple
            ];
            return colors[group % colors.length]; // Cycle through colors
          },
        },
      },
    ],
  };

  type SegmentCtx = {
    p0: { parsed: { y: number } };
    p1: { parsed: { y: number } };
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
