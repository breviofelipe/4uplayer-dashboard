import type { CardProps } from '@mui/material/Card';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { Link, Button, TextField, IconButton } from '@mui/material';

import { useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type GameItemProps = {
  id: string;
  category: string;
  name: string;
  photoBlackBackground: string;
  photoNoBackground: string;
  photoWhiteBackground: string;
  atributs: any;
};

export function GameItem({
  sx,
  game,
  latestPost,
  latestPostLarge,
  fetchGames,
  ...other
}: CardProps & {
  game: GameItemProps;
  latestPost: boolean;
  latestPostLarge: boolean;
  fetchGames: () => void;
}) {
  const [open, setOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const deleteGame = async () => {
    const response = await fetch(`${CONFIG.urlUsers}/games/${game.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    if(response.ok){
      fetchGames();
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const renderImages = (objectFit: string ) => <><Box
    component="img"
    alt={game.name}
    src={game.photoBlackBackground}
    sx={{
    width: '32%',
    height: 200,
    objectFit,
    padding: 0.5
    }}
  />
  <Box
    component="img"
    alt={game.name}
    src={game.photoNoBackground}
    sx={{
    width: '32%',
    height: 200,
    objectFit,
    padding: 0.5
    }}
  />
  <Box
    component="img"
    alt={game.name}
    src={game.photoWhiteBackground}
    sx={{
    width: '32%',
    height: 200,
    objectFit,
    padding: 0.5
    }}
  /></>

  const submitAttributs = async (event: any) => {
    
    event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        const imageFile = formData.get('image') as Blob | null;
        if (imageFile) {
          reader.readAsDataURL(imageFile);
        } else {
          reject(new Error('No image file selected'));
        }
      });

      const newAttribute = {
        name: formData.get('name'),
        value: formData.get('value'),
        image: imageBase64,
      };
      // game.atributs.push(newAttribute);
      
      const response = await fetch(`${CONFIG.urlUsers}/games/${game.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAttribute)
      });
      if(response.ok){
        fetchGames();
      }

    }
  const render = (
    <>
      <Box display="flex" justifyContent="space-between">
      {renderImages('cover')}
      </Box>
      <Box p={2}>
      <Link onClick={handleOpen} variant="h6">{game.name}</Link>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box p={2} width="80vw">
          <Typography variant="h6">{game.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {game.category}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            {renderImages('contain')}
          </Box>
          <Box mt={2}>
            <Typography>Attributes:</Typography>
            <pre>{JSON.stringify(game.atributs, null, 2)}</pre>
          </Box>
            <Box mt={2}>
            <Typography>Add New Attribute:</Typography>
            <form
              onSubmit={submitAttributs}
            >
              <Box display="flex" flexDirection="column" gap={2}>
              <TextField type="text" name="name" placeholder="Attribute Name" required />
              <TextField type="text" name="value" placeholder="Attribute Value" required />
              <TextField type="file" name="image" required />
              <Button type="submit">Add Attribute</Button>
              </Box>
            </form>
            </Box>
        </Box>
      </Drawer>
        
        <Typography variant="body2" color="text.secondary">
          {game.category}
        </Typography>
        <Box mt='1rem' flexDirection='row' display='flex' justifyContent='center'>
          <IconButton onClick={deleteGame}>
            <Iconify sx={{color: 'error.main', marginRight: 0.5}} width={18} icon="solar:trash-bin-trash-bold"/>
          </IconButton>
        </Box>
      </Box>
    </>
  );

  return (
    <Card sx={sx} {...other}>
      <Box>
        {render}
      </Box>
    </Card>
  );
}
