import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { GameView } from './view/game-view';

// ----------------------------------------------------------------------

export type GameItemProps = {
  id: string;
  category: string;
  name: string;
  photoBlackBackground: string;
  photoNoBackground: string;
  photoWhiteBackground: string;
  attributs: any;
  provider: string;
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



  const renderImages = (objectFit: string ) => <><Box
    component="img"
    alt={game.name}
    src={game.photoBlackBackground}
    sx={{
    width: '32%',
    height: 200,
    objectFit,
    padding: 0.5,
    backgroundColor: 'black'
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

  
  const render = (
    <>
      <Box display="flex" justifyContent="space-between">
      {renderImages('cover')}
      </Box>
      <Box p={2}>
      
        <GameView game={game} fetchGames={fetchGames}/>
        <Typography variant="body2" color="text.secondary">
          <Label mt='0.5rem' color="warning" variant="filled">
            {game.category}
          </Label>
        </Typography>
        <Box mt='1rem' gap='0.5rem' flexDirection='row' display='flex' >
        {game.provider.split(',').map((provider: string, index: number) => (
            <Label color="secondary" variant="outlined">
                <Typography key={index}>{provider}</Typography>
            </Label>
        ))}
        </Box>
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
