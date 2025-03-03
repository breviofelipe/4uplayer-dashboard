import { useDropzone } from 'react-dropzone';
import React, { useState, useCallback } from 'react';

import { Box } from '@mui/material';

interface FileDropzoneProps {
  onFilesAccepted: (files: File[], setImage: (param: string | ArrayBuffer | null) => void) => void;
  setImage: (param: string | ArrayBuffer | null) => void;
}

const FileDropzoneGame: React.FC<FileDropzoneProps> = ({ onFilesAccepted, setImage }) => {
  
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
        onFilesAccepted(acceptedFiles, setImage);
    }, [onFilesAccepted, setImage]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box border='2px dashed green'
    p="1rem"
    width="100%"
    sx={{ "&:hover": { cursor: "pointer" } }}>    
    {previewUrl ? (
          <div>
            <img style={{padding: 10}} width="200px" src={previewUrl} alt="Preview" />
          </div>
        ) : <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Solte a foto aqui ...</p> :
            <p>Arraste e solte uma foto, ou clique para selecionar</p>
        }
      </div>}
    </Box>
  );
};

export default FileDropzoneGame;