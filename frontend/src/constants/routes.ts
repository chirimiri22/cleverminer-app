export const ROUTES = {
  HOME: "/",
  NOT_FOUND: "*",

  DATASET: "/dataset",
  DATASET_DETAIL: (id: string | number = ":id") => `/datasets/${id}`,
  CF_MINER: "/cf-miner",
  "4FT_MINER": "/4ft-miner",
};
