import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { ProcedureCFMiner } from "./components/cf/ProcedureCFMiner";
import { NotFoundPage } from "./components/NotFoundPage";
import { AppContainer } from "./components/app-layout/AppContainer";
import { ROUTES } from "./constants/routes";
import { Dataset } from "./components/preprocessing/Dataset";
import { Procedure4ftMiner } from "./components/4ft/Procedure4ftMiner";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { AppProvider } from "./context/AppContext";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataLabels,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path="/*" element={<WrappedRoutes />} />
    </Routes>
  );
};

const WrappedRoutes = () => {
  return (
    <AppProvider>
      <AppContainer>
        <Routes>
          <Route path={ROUTES.CF_MINER} element={<ProcedureCFMiner />} />
          <Route path={ROUTES["4FT_MINER"]} element={<Procedure4ftMiner />} />
          <Route path={ROUTES.DATASET} element={<Dataset />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </AppContainer>
    </AppProvider>
  );
};
