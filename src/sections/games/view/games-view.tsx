import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { Drawer, LinearProgress } from '@mui/material';

import { useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { GameItem } from '../game-item';
import { GameSearch } from '../game-search';
import FileDropzoneGame from './components/FIleDropZone';

// ----------------------------------------------------------------------

interface Game {
  id: string;
  category: string;
  name: string;
  photoBlackBackground: string;
  photoNoBackground: string;
  photoWhiteBackground: string;
  attributs: any;
  provider: string;
}

interface GameResponse {
  content: Game[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export function GamesView() {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('_id');
  const [page, setPage] = useState(0);
  const token = useAppSelector((state) => state.auth.token);
  const [gamesResponse, setGamesResponse] = useState<GameResponse>();
  const getGames = useCallback(async () => {
      setLoading(true);
      const response = await fetch(`${CONFIG.urlUsers}/games?page=${page}&sortBy=${sortBy}`,{
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if(response.status === 200){
        const body = await response.json();
        console.log("response", body);
        setGamesResponse(body);
       }
  
      setLoading(false);
    }
  ,[token, page, sortBy]);

  useEffect(() => {
    getGames();
  }, [getGames]); 


  const defaultValues = {
    name: '',
    category: '',
    photoNoBackground: null,
    photoWhiteBackground: null,
    photoBlackBackground: null,
    provider: []
  };
  
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  
  const [image1, setImage1] = useState<string | ArrayBuffer | null>(null);
  
  const [image2, setImage2] = useState<string | ArrayBuffer | null>(null);
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm({ defaultValues });


  const handleFilesAccepted = (files: File[], setImageTarget: (param: string | ArrayBuffer | null) => void) => {
    console.log('Arquivos aceitos:', files);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = async function () { 
      const selectedFile = files[0];
      if(selectedFile.type.startsWith('image/')) {
        setImageTarget(reader.result)
      } else {
        console.log('Arquivo inválido');
      }
  
    };
     reader.onerror = function (errorReader) {
       console.log('Error: ', errorReader);
      };
  };
  const onSubmit = (data: any) => {
    if (!data.name || !data.category || !image || !image1 || !image2) {
      alert('All fields are required.');
      setLoading(false);
      return;
    }
    setLoading(true);
    const body = {
      name: data.name,
      category: data.category,
      photoNoBackground: image,
      photoWhiteBackground: image1,
      photoBlackBackground: image2,
      provider: data.provider
    }

    console.log("formdata", body);
    
    fetch(`${CONFIG.urlUsers}/games`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, "Content-Type": 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => {if(response.status === 201) {
        getGames();
        reset();
        setOpen(false);
      }})
      .catch((error) => {
        console.error('Error:', error);
      });
    
      
  };
  const formNewGame = () => (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
        <TextField {...field} label="Name" fullWidth margin="normal" />
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
        <TextField
          {...field}
          label="Category"
          fullWidth
          margin="normal"
         />
          )}
        />
        <Controller
          name="provider"
          control={control}
          render={({ field }) => (
        <TextField
          {...field}
          label="Provider"
          fullWidth
          margin="normal"
        />
          )}
        />
        <Controller
          name="provider"
          control={control}
          render={({ field }) => (
        <TextField
          {...field}
          label="Provider"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          placeholder="Enter providers separated by commas"
        />
          )}
        />
        <Box display="flex" justifyContent="space-around">
          <Controller
        name="photoNoBackground"
        control={control}
        render={() => (
          <Box sx={{
            width: '32%',
            height: 300,
            padding: 1
            }}><Label>No Background</Label>
          <FileDropzoneGame onFilesAccepted={handleFilesAccepted} setImage={setImage}/></Box>
        )}
          />
          <Controller
        name="photoWhiteBackground"
        control={control}
        render={() => (
          <Box sx={{
            width: '32%',
            height: 300,
            padding: 1
            }}>
          <Label>White Background</Label>
          <FileDropzoneGame onFilesAccepted={handleFilesAccepted} setImage={setImage1}/>
          </Box>
        )}
          />
          <Controller
        name="photoBlackBackground"
        control={control}
        render={() => (
          <Box sx={{
            width: '32%',
            height: 300,
            padding: 1
            }}>
          <Label>Black Background</Label>
          <FileDropzoneGame onFilesAccepted={handleFilesAccepted} setImage={setImage2}/>
          </Box>
        )}
          />
         </Box>
        
        <Button disabled={loading} sx={{mt: 2}} fullWidth type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    )
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Games
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify sx={{ width: "144", height: "144" }} icon="mingcute:add-line" />}
          onClick={() => setOpen(true)}
        >
          New game
        </Button>
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: '70vw', p: 2 }}>
            <Typography variant="h6">New Game</Typography>
            {formNewGame()}
          </Box>
        </Drawer>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
       {gamesResponse && <GameSearch games={gamesResponse.content} />}
      </Box>
      { loading && <Box sx={{ width: '100%', marginBottom: '2rem' }}>
                        <LinearProgress />
                     </Box>
        }
      <Grid container spacing={3}>
        {gamesResponse && gamesResponse.content.map(( gameResponse ) => {
                  const latestPostLarge = false;
                  const latestPost = false
                  return (
                    <Grid key={gameResponse.id} xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
                      <GameItem fetchGames={getGames} game={gameResponse} latestPost={latestPost} latestPostLarge={latestPostLarge} />
                    </Grid>
                  );
                })}
      </Grid>

      <Pagination onChange={(e, newPage) => {
          setLoading(true);
          setPage(newPage - 1);
      }} count={gamesResponse ? gamesResponse.totalPages : 10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}
