import React, { useState, useCallback } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, Stack, LinearProgress } from "@mui/material";
import { Colors } from "../../../styles/colors";
import { Description } from "@mui/icons-material";
import { RemoveButton } from "../RemoveButton";
import { useAppContext } from "../../../context/AppContext";
import { mockDataset } from "../../../model/dataset/DatasetProcessed";
import { uploadCsv } from "../../../apiCalls/uploadCsv";
import { loadMockDataset } from "../../../helpers/loadMockDataset";

type Props = {
  onLoadingChange?: (loading: boolean) => void;
};

export const FileDropzone = ({ onLoadingChange }: Props) => {
  const { datafile, setDatafile, setDatasetProcessed } = useAppContext();
  const [droppedFiles, setDroppedFiles] = useState<File[]>(datafile ? [datafile] : []);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const changeLoadingState = (loading: boolean) => {
    setLoading(loading);
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  };

  const handleChangeFiles = async (files: File[]) => {
    if (files.length === 0) {
      setDatafile(undefined);
      setDroppedFiles([]);
      setDatasetProcessed(undefined);
      return;
    }
    setDroppedFiles(files);
    setDatafile(files[0]);
    changeLoadingState(true);
    const res = await uploadCsv(files[0]);
    changeLoadingState(false);
    setDatasetProcessed(res);
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
          <RemoveButton onRemove={() => handleChangeFiles([])} />
        </Stack>
      </Box>
    );
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files);
    const csvFiles = files.filter(isCSV);

    if (csvFiles.length === 0) {
      setError("Only CSV files are accepted.");
      return;
    }

    handleChangeFiles(csvFiles);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const csvFiles = files.filter(isCSV);

      if (csvFiles.length === 0) {
        setError("Only CSV files are accepted.");
        return;
      }

      handleChangeFiles(csvFiles);
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
      {droppedFiles.length === 0 && (
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
            onChange={handleFileChange}
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
                await handleChangeFiles([file]);
              }}
            >
              Use Mock Dataset
            </Button>
          </Stack>

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </>
      )}

      {droppedFiles.length > 0 && (
        <Stack direction={"row"} justifyContent={"center"} flexGrow={1}>
          <Stack>
            <Typography variant="h6" gutterBottom>
              Selected CSV File:
            </Typography>
            {droppedFiles.map((file, i) => (
              <FileCard key={i} file={file} />
            ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};
