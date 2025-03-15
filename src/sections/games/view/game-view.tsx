import { useState } from "react";

import { Box , Tab , Link, Tabs, Button, Drawer, TextField, Typography } from "@mui/material";

import { useAppSelector } from "src/routes/hooks/hookes";

import { CONFIG } from "src/config-global";

import { Label } from "src/components/label";

import PhotoGallery from "./components/PhotoGallery";

import type { GameItemProps } from "../game-item";

export function GameView ({ game, fetchGames }: { game: GameItemProps, fetchGames: () => void }) {
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

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };
    
    const renderTabContent = () => {
        switch (tabIndex) {
            case 0:
                return (
                    <Box p={3}>
                        <Typography variant="h5">Details</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Imagens
                        </Typography>
                    </Box>
                );
            case 1:
                return (
                    <Box p={3}>
                        <Typography variant="h6">Attributes</Typography>
                        {/* <PhotoGallery data={data}  /> */}
                    </Box>
                );
            case 2:
                return (
                    <Box p={3}>
                        
                        <PhotoGallery game={game.name} />
                    </Box>
                );            
            default:
                return null;
        }
    };
    const token = useAppSelector((state) => state.auth.token);
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
    return <><Link onClick={handleOpen} variant="h6">{game.name}</Link>
    <Drawer anchor="bottom" open={open} onClose={handleClose} PaperProps={{ style: { height: '100vh' } }}>
      <Button onClick={handleClose} style={{ position: 'absolute', top: 10, right: 10 }}>exit</Button>
      <Box p={2} width="100vw">
        <Typography variant="h4">{game.name}</Typography>
        <Box flexDirection='row' display='flex' gap='0.5rem'>
        {game.provider.split(',').map((provider: string, index: number) => (
            <Label mt='0.5rem' color="secondary" variant="outlined">
                <Typography key={index}>{provider}</Typography>
            </Label>
        ))}
        </Box>
        <Typography variant="body2" color="text.secondary">
            <Label mt='0.5rem' color="warning" variant="filled">
                {game.category}
            </Label>
        </Typography>
        


    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Box>
     <Tabs value={tabIndex} onChange={handleTabChange} aria-label="game tabs">
          <Tab label="Details" />
          <Tab label="Attributs" />
          <Tab label="Public API" />
     </Tabs>
       {renderTabContent()}
    </Box>
    </Box>
        <Box role="tabpanel" hidden={tabIndex !== 0} id="tabpanel-0" aria-labelledby="tab-0">
            {tabIndex === 0 && (
                <Box>
                    <Box display="flex" justifyContent="space-between">
                        {renderImages('contain')}
                    </Box>
                    <Box p={3}>
                        <Box mt={2} display="flex" gap={2}>
                            {game.attributs.attributs && game.attributs.attributs.map((attribut: any) => (
                                <Box key={attribut.name} display="flex" flexDirection="column" gap={2}>
                                    <Typography>{attribut.name}: {attribut.value}</Typography>
                                    <img src={attribut.image} alt={attribut.name} style={{width: 200, height: 200}} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <form onSubmit={submitAttributs}>
                        <TextField name="name" label="Name" fullWidth margin="normal" />
                        <TextField name="value" label="Value" fullWidth margin="normal" />
                        <Button variant="contained" component="label">
                            Upload Image
                            <input type="file" name="image" hidden />
                        </Button>
                        <Button sx={{marginTop:"2rem"}} type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </form>
                </Box>

            )}
        </Box>
      </Box>
    </Drawer></>
}