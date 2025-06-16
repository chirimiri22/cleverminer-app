import { Button, Stack, Typography } from "@mui/material";
import { ROUTES } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import { uploadCsv } from "../../apiCalls/uploadCsv";
import { useCallback, useState } from "react";
import { useAppContext } from "../../context/AppContext";

export const LoadDatasetFirst = () => {
  const { setDatafile, setDatasetProcessed } = useAppContext();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isCSV = (file: File) => file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv");

  const handleChangeFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) {
        setDatafile(undefined);
        setDatasetProcessed(undefined);
        return;
      }

      const csvFiles = files.filter(isCSV);
      if (csvFiles.length === 0) {
        setError("Only CSV files are accepted.");
        return;
      }

      setError(undefined);
      setLoading(true);
      setDatafile(csvFiles[0]);
      const res = await uploadCsv(csvFiles[0]); // Assuming uploadCsv is available
      setLoading(false);
      setDatasetProcessed(res);
      // navigate(ROUTES.DATASET); // Navigate to dataset route after successful upload
    },
    [setDatafile, setDatasetProcessed, navigate]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(undefined);
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleChangeFiles(files);
    }
  };

  return (
    <Stack flexGrow={1} alignItems={"center"} gap={1}>
      <input
        type="file"
        multiple
        accept=".csv,text/csv"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant={"contained"} component="span" disabled={loading}>
          {loading ? "Loading..." : "Load Dataset First"}
        </Button>
      </label>
      {error && (
        <Typography color="error" mt={1}>
          {error}
        </Typography>
      )}
    </Stack>
  );
};
