import { createContext, ReactNode, useContext, useState } from "react";

type AppContextType = {
  selectedDataset: File | null;
  setSelectedDataset: (name: File | null) => void;
  // datasetStats? :
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDataset, setSelectedDataset] = useState<File | null>(null);

  return <AppContext.Provider value={{ selectedDataset, setSelectedDataset }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
