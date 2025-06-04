import { Bar } from "react-chartjs-2";
import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ChartOptions } from "chart.js";
import { Category } from "../model/dataset/Category";
import { Colors } from "../styles/colors";
import { getCategoriesLabelsArray } from "../helpers/getCategoriesLabelsArray";
import { getCategoriesCountsArray } from "../helpers/getCategoriesCountsArray";
import { IconButton, Stack, SxProps } from "@mui/material";
import { Categorization } from "./OrdinalPreprocessing";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BootstrapTooltip } from "./BootstrapTooltip";

type Props = {
  categories: Category[];
  title?: string;
  mode?: "simple" | "complex";
  color?: string;
  sx?: SxProps;
  onClick?: (categoryName?: string) => void;
  datalabels?: boolean;
  divisionRanges?: [number, number][];
  showYAxis?: boolean;
  max?: number;
};

export const Histogram = ({
  categories,
  title,
  mode = "simple",
  color,
  onClick,
  datalabels,
  divisionRanges,
  showYAxis,
  max

}: Props) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  const isComplex = mode === "complex";

  const getLighterColor = (color: string, shouldBeLighter: boolean) => {
    return shouldBeLighter ? color + "70" : color; // Add transparency to the color
  };
  const [showLabels, setShowLabels] = useState(false);

  const colors = [
    getLighterColor(Colors.primary, showLabels),
    getLighterColor(Colors.warning, showLabels),
    getLighterColor(Colors.info, showLabels),
    getLighterColor(Colors.success, showLabels),
    getLighterColor(Colors.error, showLabels),
  ];

  const getGroupColor = (index: number) => {
    if (!divisionRanges || divisionRanges.length === 0) {
      return colors[0]; // default color if no ranges are defined
    }

    for (let i = 0; i < divisionRanges.length; i++) {
      const [start, end] = divisionRanges[i];
      if (index >= start && index <= end) {
        return colors[i % colors.length];
      }
    }
  };

  const backgroundColors = categories.map((_, index) =>
    color ? getLighterColor(color, showLabels) : getGroupColor(index)
  );

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
        enabled: !showLabels,
        displayColors: !!divisionRanges,
        callbacks: {
          label: (context) => `${context.parsed.y}`,
        },
      },
      datalabels: {
        display: !!datalabels && showLabels,
        color: Colors.black, // label text color (adjust to your bar colors)
        // backgroundColor: Colors.white,
        anchor: "start", // position relative to the bar
        align: "end",
        rotation: 90, // rotate 90 degrees
        font: {
          weight: "bold",
          size: categories.length > 15 ? 8 : 12, // adjust size based on number of categories
        },
        formatter: (value: any, context: any) => {
          // This will show the label inside the bar; customize as needed
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
    scales: {
      x: {
        display: isComplex,
        type: "category" as const,
      },
      y: {
        display: isComplex || showYAxis,
        type: "linear" as const,
        beginAtZero: true,
        max: max
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
    <Stack width={"100%"} height={"100%"} sx={{ position: "relative" }}>
      {datalabels && (
        <BootstrapTooltip title={showLabels ? "Hide Labels" : "Show Labels"} placement="right">
          <IconButton
            sx={{ position: "absolute", top: -10, right: "50%", zIndex: 1, transform: "translateX(50%)", opacity: 0.2 }}
            size="small"
            onClick={() => setShowLabels(!showLabels)}
          >
            {showLabels ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </BootstrapTooltip>
      )}
      <Bar
        id={`bar-chart-${title || Math.random()}`}
        ref={chartRef}
        data={data}
        options={options}
        onClick={handleClick}
      />
    </Stack>
  );
};
