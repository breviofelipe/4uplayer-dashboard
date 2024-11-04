import type { FormEvent, ChangeEvent } from 'react';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Dialog, TextField, DialogContent } from '@mui/material';

import { useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import FileDropzone from './file-drop';

interface UploadFormProps {
  onSubmit: (file: File, description: string) => void;
}

interface FileDropzoneProps {
    onFilesAccepted: (files: File[]) => void;
  }
const UploadForm: React.FC<UploadFormProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [description, setDescription] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = useAppSelector((state) => state.auth.token);

 
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file && description.trim()) {
    const body = {
        imageBase64: image, description
    }
    const url = CONFIG.urlPosts;
    const response = await fetch(`${url}/ads`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
     if(response.ok){
        handleCloseModal();
     }
      setFile(null);
      setDescription('');
      setPreviewUrl(null);
    } else {
      setError('Por favor, selecione uma imagem e forneça uma descrição.');
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handleFilesAccepted = (files: File[]) => {
    
        
        

    console.log('Arquivos aceitos:', files);
    const reader = new FileReader();
   reader.readAsDataURL(files[0]);
   reader.onload = async function () {
     // TODO fetch

     const selectedFile = files[0];

     
     if (selectedFile.type.startsWith('image/')) {
        setImage(reader.result)
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setError(null);
      } else {
        setError('Por favor, selecione um arquivo de imagem válido.');
        setFile(null);
        setPreviewUrl(null);
      }

   };
   reader.onerror = function (errorReader) {
     console.log('Error: ', errorReader);
    };
  };
  
  return <><Button
  variant="contained"
  color="inherit"
  startIcon={<Iconify sx={{width:"144", height:"144"}} icon="mingcute:add-line" />}
  onClick={handleOpenModal}
>
  Novo Anuncio
</Button>
<Dialog
  open={isModalOpen}
  onClose={handleCloseModal}
>
  <DialogContent >
  <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
    <Box mb='1rem'>
        <Label mb='0.5rem'>
            Selecione uma foto
        </Label>
        <FileDropzone onFilesAccepted={handleFilesAccepted}/>        
    </Box>
    {previewUrl && (
        <div>
        <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg" />
        </div>
    )}
    <Box mt='0.5rem' display='flex' flexDirection='column' >
        <Label mb='0.5rem'>
            Descrição
        </Label>
        
        <TextField
            id="description"
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Digite uma pequena descrição para a anuncio..."
        />
    </Box>
    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    <Button
        type="submit"
    >
        Enviar
    </Button>
    </form>
  </DialogContent>
  </Dialog>
</>

};

export default UploadForm;