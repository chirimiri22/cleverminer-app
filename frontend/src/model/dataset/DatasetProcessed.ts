import { AttributeData } from "./AttributeData";

import { Metadata } from "./Metadata";

export type DatasetProcessed = {
  data: AttributeData[];
  metadata: Metadata;
};



const mockData: AttributeData[] = [
  {
    title: "City",
    categories: [
      { label: "New York", count: 150 },
      { label: "Los Angeles", count: 100 },
      { label: "Chicago", count: 200 },
      { label: "Houston", count: 50 },
      { label: "Phoenix", count: 80 },
      { label: "Philadelphia", count: 60 },
      { label: "San Antonio", count: 40 },
      { label: "San Diego", count: 30 },
      { label: "Dallas", count: 20 },
      { label: "San Jose", count: 10 },
      { label: "Austin", count: 50 },
      { label: "Fort Worth", count: 30 },
      { label: "Jacksonville", count: 20 },
      { label: "Columbus", count: 78 },
      { label: "Charlotte", count: 145 },
      { label: "San Francisco", count: 10 },
      { label: "Indianapolis", count: 15 },
      { label: "Seattle", count: 100 },
      { label: "Denver", count: 100 },
      { label: "Washington", count: 10 },
    ],
  },
  {
    title: "Age",
    categories: [
      { label: "10-18", count: 150 },
      { label: "18-25", count: 100 },
      { label: "26-35", count: 200 },
      { label: "36-45", count: 50 },
      { label: "46-55", count: 80 },
      { label: "56-65", count: 60 },
      { label: "65+", count: 40 },
    ],
  },
  {
    title: "Income",
    categories: [
      { label: "<$20k", count: 150 },
      { label: "$20k-$50k", count: 100 },
      { label: "$50k-$100k", count: 200 },
      { label: ">$100k", count: 50 },
    ],
  },
  {
    title: "Gender",
    categories: [
      { label: "male", count: 100 },
      { label: "female", count: 200 },
    ],
  },
];

export const mockDataset: DatasetProcessed = {
  data: mockData,
  metadata: {
    name: "Sample Dataset",
    format: "CSV",
    size: 1024,
    rows: 10000,
    columns: 5,
    date: new Date().toDateString(),
  },
};

