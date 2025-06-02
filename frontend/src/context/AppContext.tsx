import { createContext, ReactNode, useContext, useState } from "react";
import { DatasetProcessed } from "../model/dataset/DatasetProcessed";
import { CFResults } from "../model/cf/result/CFResults";

type AppContextType = {
  datafile?: File;
  setDatafile: (name?: File) => void;
  datasetProcessed?: DatasetProcessed;
  setDatasetProcessed: (dataset?: DatasetProcessed) => void;
  CFResults?: CFResults;
  setCFResults: (results?: CFResults) => void;
  changeHiddenState: (attributeName: string) => void;
  getDatasetProcessed: (includeHidden?: boolean) => DatasetProcessed | undefined;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [datafile, setDatafile] = useState<File | undefined>();
  const [datasetProcessed, setDatasetProcessed] = useState<DatasetProcessed | undefined>();
  const [CFResults, setCFResults] = useState<CFResults | undefined>();

  const changeHiddenState = (attributeName: string) => {
    if (datasetProcessed) {
      const updatedData = datasetProcessed.data.map((a) => {
        return a.title === attributeName ? { ...a, hidden: !a.hidden } : a;
      });
      setDatasetProcessed({ ...datasetProcessed, data: updatedData });
    }
  };

  const getDatasetProcessed = (includeHidden = false): DatasetProcessed | undefined => {
    if (includeHidden || !datasetProcessed) return datasetProcessed;
    return {
      ...datasetProcessed,
      data: datasetProcessed.data.filter((a) => !a.hidden),
    };
  };

  return (
    <AppContext.Provider
      value={{
        CFResults,
        setCFResults,
        datafile,
        setDatafile,
        setDatasetProcessed,
        datasetProcessed,
        changeHiddenState,
        getDatasetProcessed
      }}
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
