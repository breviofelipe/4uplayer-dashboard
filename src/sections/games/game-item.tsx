import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

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

  const render = (
    <>
      <Box display="flex" justifyContent="space-between">
      <Box
        component="img"
        alt={game.name}
        src={game.photoBlackBackground}
        sx={{
        width: '32%',
        height: 200,
        objectFit: 'cover',
        }}
      />
      <Box
        component="img"
        alt={game.name}
        src={game.photoNoBackground}
        sx={{
        width: '32%',
        height: 200,
        objectFit: 'cover',
        }}
      />
      <Box
        component="img"
        alt={game.name}
        src={game.photoWhiteBackground}
        sx={{
        width: '32%',
        height: 200,
        objectFit: 'cover',
        }}
      />
      </Box>
      <Box p={2}>
        <Typography variant="h6">{game.name}</Typography>
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
