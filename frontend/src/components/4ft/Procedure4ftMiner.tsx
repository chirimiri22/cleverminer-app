import { PageHeading } from "../common/PageHeading";
import { PageContainer } from "../app-layout/PageContainer";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

// TODO names and Icons should be saved as a constats

export const Procedure4ftMiner = () => {
  return (
    <PageContainer>
      <PageHeading icon={<SwapHorizIcon fontSize={"large"} />} title={"4ft Miner"} />
    </PageContainer>
  );
};
