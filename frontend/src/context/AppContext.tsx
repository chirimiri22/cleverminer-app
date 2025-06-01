import { createContext, ReactNode, useContext, useState } from "react";
import { DatasetProcessed } from "../model/dataset/DatasetProcessed";
import { CFResults } from "../model/cf/result/CFResults";

type AppContextType = {
  datafile?: File;
  setDatafile: (name?: File) => void;
  datasetProcessed?: DatasetProcessed;
  setDatasetProcessed: (dataset?: DatasetProcessed) => void;
  CFResults?: CFResults; // Adjust type as needed
  setCFResults: (results?: CFResults) => void; // Adjust type as needed
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [datafile, setDatafile] = useState<File | undefined>();
  const [datasetProcessed, setDatasetProcessed] = useState<DatasetProcessed | undefined>();
  const [CFResults, setCFResults] = useState<CFResults | undefined>();

  return (
    <AppContext.Provider
      value={{ CFResults, setCFResults, datafile, setDatafile, setDatasetProcessed, datasetProcessed }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
