import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProcedureCFMiner } from "./pages/ProcedureCFMiner";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DatasetDetail } from "./pages/DatasetDetail";
import { AppContainer } from "./layout/AppContainer";
import { ROUTES } from "./constants/routes";
import { Dataset } from "./pages/Dataset";
import { Procedure4ftMiner } from "./pages/Procedure4ftMiner";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,

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
    <AppContainer>
      <Routes>
        <Route path={ROUTES.CF_MINER} element={<ProcedureCFMiner />} />
        <Route path={ROUTES["4FT_MINER"]} element={<Procedure4ftMiner />} />
        <Route path={ROUTES.DATASET} element={<Dataset />} />
        <Route path={ROUTES.DATASET_DETAIL()} element={<DatasetDetail />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </AppContainer>
  );
};
