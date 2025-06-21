import { createContext, ReactNode, useContext, useState } from "react";
import { DatasetProcessed } from "../model/dataset/DatasetProcessed";
import { CFResults } from "../model/cf/results/CFResults";
import { AttributeData } from "../model/dataset/AttributeData";
import { CFProcedure } from "../model/cf/condition/CFProcedure";

type AppContextType = {
  datafile?: File;
  setDatafile: (name?: File) => void;
  setDatasetProcessed: (dataset?: DatasetProcessed) => void;
  CFProcedure?: CFProcedure;
  setCFProcedure: (data: CFProcedure) => void;
  CFResults?: CFResults;
  setCFResults: (results?: CFResults) => void;
  changeHiddenState: (attributeName: string) => boolean | undefined;
  getDatasetProcessed: (includeHidden?: boolean) => DatasetProcessed | undefined;
  updateProcessedAttributeData: (attributeName: string, data: AttributeData) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [datafile, setDatafile] = useState<File | undefined>();
  const [datasetProcessed, setDatasetProcessed] = useState<DatasetProcessed | undefined>();
  const [CFResults, setCFResults] = useState<CFResults | undefined>();
  const [CFProcedure, setCFProcedure] = useState<CFProcedure | undefined>();

  const updateProcessedAttributeData = (attributeName: string, data: AttributeData) => {
    if (datasetProcessed) {
      const updatedData = datasetProcessed.data.map((a) => {
        return a.title === attributeName ? data : a;
      });
      setDatasetProcessed({ ...datasetProcessed, data: updatedData });
    }
  };

  const changeHiddenState = (attributeName: string) => {
    const attributeData = datasetProcessed?.data.find((a) => a.title === attributeName);
    if (attributeData && datasetProcessed) {
      const newState = !attributeData.hidden;
      updateProcessedAttributeData(attributeName, { ...attributeData, hidden: newState });
      return newState;
    }
    return undefined;
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
        CFProcedure,
        setCFProcedure,
        datafile,
        setDatafile,
        setDatasetProcessed,
        changeHiddenState,
        updateProcessedAttributeData,
        getDatasetProcessed,
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
