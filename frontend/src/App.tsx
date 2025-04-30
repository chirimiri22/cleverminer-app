import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {ProcedureCFMiner} from "./pages/ProcedureCFMiner";
import {NotFoundPage} from "./pages/NotFoundPage";
import {Datasets} from "./pages/Datasets";
import {DatasetDetail} from "./pages/DatasetDetail";
import {AppContainer} from "./components/AppContainer";
import {ROUTES} from "./constants/routes";

export const App = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Home/>}/>
            <Route path="/*" element={<WrappedRoutes/>}/>
        </Routes>
    );
};

const WrappedRoutes = () => {
    return (
        <AppContainer>
            <Routes>
                <Route path={ROUTES.CF_MINER} element={<ProcedureCFMiner/>}/>
                <Route path={ROUTES["4FT_MINER"]} element={<ProcedureCFMiner/>}/>
                <Route path={ROUTES.DATASET_DETAIL()} element={<DatasetDetail/>}/>
                <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>}/>
            </Routes>
        </AppContainer>
    )
}


