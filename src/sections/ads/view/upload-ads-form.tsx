
import { useState } from 'react';

import { Button, Dialog, DialogContent } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import CampaignSegmentationForm from './CampaignSegmentationForm';


const UploadForm = () => {
  



  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
   
  
  return <><Button
  variant="contained"
  color="inherit"
  startIcon={<Iconify sx={{width:"144", height:"144"}} icon="mingcute:add-line" />}
  onClick={handleOpenModal}
>
  Novo Anúncio
</Button>
<Dialog
  open={isModalOpen}
  onClose={handleCloseModal}
>
  <DialogContent >
  <form className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
     <CampaignSegmentationForm handleCloseModal={handleCloseModal}  />
  </form>
  </DialogContent>
  </Dialog>
</>

};

export default UploadForm;