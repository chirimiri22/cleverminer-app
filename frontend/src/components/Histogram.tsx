import { Bar } from "react-chartjs-2";
import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ChartOptions } from "chart.js";
import { Category } from "../model/Category";
import { Colors } from "../styles/colors";
import { getCategoriesLabelsArray } from "../helpers/getCategoriesLabelsArray";
import { getCategoriesCountsArray } from "../helpers/getCategoriesCountsArray";
import { SxProps } from "@mui/material";
import { Categorization } from "./OrdinalPreprocessing";

type Props = {
  categories: Category[];
  title?: string;
  mode?: "simple" | "complex";
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

export const Histogram = ({
  categories,
  title,
  mode = "simple",
  color,
  onClick,
  groupingMode,
  groupingCount = 1,
}: Props) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  const isComplex = mode === "complex";

  const colors = [Colors.primary, Colors.warning, Colors.info, Colors.success, Colors.error];

  const getGroupColor = (index: number) => {
    const totalPoints = categories.length;
    let group: number;

    if (groupingMode === Categorization.Equidistant) {
      group = Math.floor(index / groupingCount);
    } else {
      group = Math.floor((index / totalPoints) * groupingCount);
    }

    return colors[group % colors.length];
  };

  const backgroundColors = categories.map((_, index) => color ?? getGroupColor(index));

  const data = {
    labels: getCategoriesLabelsArray(categories),
    datasets: [
      {
        label: title,
        data: getCategoriesCountsArray(categories),
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: !!title,
        text: title,
      },
      tooltip: {
        displayColors: !!groupingMode,
        callbacks: {
          label: (context) => `${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        display: isComplex,
        type: "category" as const,
      },
      y: {
        display: isComplex,
        type: "linear" as const,
        beginAtZero: true,
      },
    },
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const chart = chartRef.current;
    if (!chart) return;

    const elements = chart.getElementsAtEventForMode(event.nativeEvent, "nearest", { intersect: true }, true);

    if (elements.length > 0) {
      const { index } = elements[0];
      const label = data.labels[index];
      const value = data.datasets[0].data[index];
      onClick && onClick(label);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (chartRef.current) {
  //       chartRef.current.destroy();
  //     }
  //   };
  // }, []);

  return (
    <Bar
      id={`bar-chart-${title || Math.random()}`}
      ref={chartRef}
      data={data}
      options={options}
      onClick={handleClick}
    />
  );
};
