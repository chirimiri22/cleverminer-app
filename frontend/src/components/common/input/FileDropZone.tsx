import React, { useState, useCallback } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, Stack, LinearProgress } from "@mui/material";
import { Colors } from "../../../styles/colors";
import { Description } from "@mui/icons-material";
import { RemoveButton } from "../RemoveButton";
import { useAppContext } from "../../../context/AppContext";
import { mockDataset } from "../../../model/dataset/DatasetProcessed";
import { uploadCsv } from "../../../apiCalls/uploadCsv";
import { loadMockDataset } from "../../../helpers/loadMockDataset";
import { apiCallWrapper } from "../../../apiCalls/apiCallWrapper";

type Props = {
  onLoadingChange?: (loading: boolean) => void;
  setError: (error?: string) => void;
};

export const FileDropzone = ({ onLoadingChange, setError }: Props) => {
  const { datafile, setDatafile, setDatasetProcessed, setCFResults } = useAppContext();

  const [isDragging, setIsDragging] = useState(false);

  const changeLoadingState = (loading: boolean) => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  };

  const removeFile = () => {
    setDatafile(undefined);
    setDatasetProcessed(undefined);
    changeLoadingState(false);
    setError(undefined);
    setCFResults(undefined);
  };

  const handleChangeFiles = async (file: File) => {
    removeFile();
    changeLoadingState(true);
    setDatafile(file);

    const result = await apiCallWrapper(
      () => uploadCsv(file),
      (error) => {
        setDatafile(undefined);
        setError(error);
      }
    );
    setDatasetProcessed(result);

    changeLoadingState(false);
  };

  const isCSV = (file: File) => file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv");

  type FileCardProps = {
    file: File;
  };

  const FileCard = ({ file }: FileCardProps) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: Colors.background,
          borderRadius: 2,
          p: 1.5,
          mb: 1.5,
          width: "100%",
          maxWidth: 400,
        }}
      >
        {/* White rectangle with file icon */}
        <Box
          sx={{
            bgcolor: "white",
            width: 48,
            height: 48,
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 2,
          }}
        >
          {/* Simple file icon SVG */}
          <Description />
        </Box>

        {/* File name and size */}
        <Stack direction={"row"} gap={2} justifyContent={"space-between"} alignItems={"center"} flexGrow={1}>
          <Stack alignItems={"start"}>
            <Typography variant="body1" fontWeight="bold">
              {file.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(file.size / 1024)} KB
            </Typography>
          </Stack>
          <RemoveButton onRemove={removeFile} />
        </Stack>
      </Box>
    );
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      removeFile();
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const csvFiles = files.filter(isCSV);

      if (csvFiles.length === 0) {
        setError("Only CSV files are accepted.");
        return;
      }

      await handleChangeFiles(csvFiles[0]);
    },
    [setError]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const csvFiles = files.filter(isCSV);

      if (csvFiles.length === 0) {
        setError("Only CSV files are accepted.");
        return;
      }

      await handleChangeFiles(csvFiles[0]);
    }
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      position={"relative"}
      sx={{
        borderRadius: 2,
        p: 4,
        textAlign: "center",
        cursor: "pointer",
        bgcolor: isDragging ? Colors.background : Colors.white,
        transition: "background-color 0.3s ease",
      }}
    >
      {!datafile && (
        <>
          <Typography variant="h6" gutterBottom>
            Drag & drop CSV files here, or click to select
          </Typography>

          <input
            type="file"
            multiple
            accept=".csv,text/csv"
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileSelected}
          />
          <Stack direction={"row"} justifyContent={"center"} gap={2}>
            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                Browse CSV Files
              </Button>
            </label>
            <Button
              variant="outlined"
              component="span"
              onClick={async () => {
                const file = await loadMockDataset();
                await handleChangeFiles(file);
              }}
            >
              Use Mock Dataset
            </Button>
          </Stack>
        </>
      )}

      {datafile && (
        <Stack direction={"row"} justifyContent={"center"} flexGrow={1}>
          <Stack>
            <Typography variant="h6" gutterBottom>
              Selected CSV File:
            </Typography>
            <FileCard file={datafile} />
          </Stack>
        </Stack>
      )}
    </Box>
  );
};
