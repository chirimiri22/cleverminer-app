import { createContext, ReactNode, useContext, useState } from "react";
import { DatasetProcessed } from "../model/DatasetProcessed";

type AppContextType = {
  datafile?: File;
  setDatafile: (name?: File) => void;
  datasetProcessed?: DatasetProcessed;
  setDatasetProcessed: (dataset?: DatasetProcessed) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [datafile, setDatafile] = useState<File | undefined>();
  const [datasetProcessed, setDatasetProcessed] = useState<DatasetProcessed | undefined>();

  return (
    <AppContext.Provider value={{ datafile, setDatafile, setDatasetProcessed, datasetProcessed }}>
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
