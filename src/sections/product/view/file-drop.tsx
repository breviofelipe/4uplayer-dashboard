import { Box } from '@mui/material';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileDropzoneProps {
  onFilesAccepted: (files: File[]) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFilesAccepted }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAccepted(acceptedFiles);
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box border='2px dashed green'
    p="1rem"
    width="100%"
    sx={{ "&:hover": { cursor: "pointer" } }}>

    
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Solte a foto aqui ...</p> :
          <p>Arraste e solte uma foto, ou clique para selecionar</p>
      }
    </div>
    </Box>
  );
};

export default FileDropzone;