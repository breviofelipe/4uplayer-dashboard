import React, { useState, useEffect } from 'react';

import {
  Box,
  Chip,
  Modal,
  Select,
  Slider,
  Button,
  MenuItem,
  Checkbox,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';

interface CampaignSegmentationEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
}

export default function CampaignSegmentationEditModal({
  open,
  onClose,
  onSave,
  initialData,
}: CampaignSegmentationEditModalProps) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (name: string) => (event: Event, newValue: number | number[]) => {
    setFormData({ ...formData, [name]: newValue });
  };

  const handleCheckboxChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: event.target.checked });
  };

  const handleMultiSelectChange = (name: string) => (event: any) => {
    setFormData({ ...formData, [name]: event.target.value as string[] });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Campaign Segmentation
        </Typography>

        <Box mb={2}>
          <Typography gutterBottom>Idade</Typography>
          <Slider
            value={formData.ageRange}
            onChange={handleSliderChange('ageRange')}
            valueLabelDisplay="auto"
            min={13}
            max={65}
          />
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel>Gênero</InputLabel>
          <Select
            multiple
            name="gender"
            value={formData.gender}
            onChange={handleMultiSelectChange('gender')}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Feminino">Feminino</MenuItem>
            <MenuItem value="Não-binário">Não-binário</MenuItem>
            <MenuItem value="Todos">Todos os gêneros</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          name="location"
          label="Localização geográfica"
          value={formData.location}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          name="language"
          label="Idioma"
          value={formData.language}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de Jogador</InputLabel>
          <Select
            multiple
            name="playerType"
            value={formData.playerType}
            onChange={handleMultiSelectChange('playerType')}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            <MenuItem value="Casual">Jogadores casuais</MenuItem>
            <MenuItem value="Hardcore">Jogadores hardcore</MenuItem>
            <MenuItem value="Streamer">Streamers e criadores de conteúdo</MenuItem>
            <MenuItem value="Competitive">Jogadores competitivos/esports</MenuItem>
          </Select>
        </FormControl>

        <Box mb={2}>
          <Typography gutterBottom>Horas jogadas por semana</Typography>
          <Slider
            value={formData.hoursPlayed}
            onChange={handleSliderChange('hoursPlayed')}
            valueLabelDisplay="auto"
            min={0}
            max={40}
          />
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel>Gêneros de jogo preferidos</InputLabel>
          <Select
            multiple
            name="gameGenres"
            value={formData.gameGenres}
            onChange={handleMultiSelectChange('gameGenres')}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            <MenuItem value="Ação">Ação</MenuItem>
            <MenuItem value="RPG">RPG</MenuItem>
            <MenuItem value="Estratégia">Estratégia</MenuItem>
            <MenuItem value="FPS">FPS</MenuItem>
            <MenuItem value="MOBA">MOBA</MenuItem>
            <MenuItem value="MMORPG">MMORPG</MenuItem>
            <MenuItem value="Simuladores">Simuladores</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Plataformas</InputLabel>
          <Select
            multiple
            name="platforms"
            value={formData.platforms}
            onChange={handleMultiSelectChange('platforms')}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            <MenuItem value="Console">Console</MenuItem>
            <MenuItem value="PC">PC</MenuItem>
            <MenuItem value="Mobile">Mobile</MenuItem>
            <MenuItem value="VR">VR</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          name="specificGames"
          label="Jogos Específicos"
          value={formData.specificGames}
          onChange={handleChange}
          helperText="Separe os jogos por vírgula"
        />

        <TextField
          fullWidth
          margin="normal"
          name="brands"
          label="Marcas preferidas"
          value={formData.brands}
          onChange={handleChange}
          helperText="Separe as marcas por vírgula"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Nível de engajamento</InputLabel>
          <Select
            name="engagementLevel"
            value={formData.engagementLevel}
            onChange={handleChange}
          >
            <MenuItem value="Alto">Alto</MenuItem>
            <MenuItem value="Médio">Médio</MenuItem>
            <MenuItem value="Baixo">Baixo</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.purchaseHistory}
              onChange={handleCheckboxChange('purchaseHistory')}
              name="purchaseHistory"
            />
          }
          label="Histórico de compra"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Gastos com jogos</InputLabel>
          <Select
            name="spendingHabits"
            value={formData.spendingHabits}
            onChange={handleChange}
          >
            <MenuItem value="Alto">Alto</MenuItem>
            <MenuItem value="Médio">Médio</MenuItem>
            <MenuItem value="Baixo">Baixo</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Faixa de preço preferida</InputLabel>
          <Select
            name="priceRange"
            value={formData.priceRange}
            onChange={handleChange}
          >
            <MenuItem value="Luxo">Produtos de luxo</MenuItem>
            <MenuItem value="Intermediário">Intermediários</MenuItem>
            <MenuItem value="Acessível">Acessíveis</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Frequência de uso da rede social</InputLabel>
          <Select
            name="accessFrequency"
            value={formData.accessFrequency}
            onChange={handleChange}
          >
            <MenuItem value="Diário">Diário</MenuItem>
            <MenuItem value="Semanal">Semanal</MenuItem>
            <MenuItem value="Mensal">Mensal</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Horários de pico de uso</InputLabel>
          <Select
            multiple
            name="peakHours"
            value={formData.peakHours}
            onChange={handleMultiSelectChange('peakHours')}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            <MenuItem value="Manhã">Manhã</MenuItem>
            <MenuItem value="Tarde">Tarde</MenuItem>
            <MenuItem value="Noite">Noite</MenuItem>
            <MenuItem value="Madrugada">Madrugada</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Objetivo da campanha</InputLabel>
          <Select
            name="campaignObjective"
            value={formData.campaignObjective}
            onChange={handleChange}
          >
            <MenuItem value="Reconhecimento">Reconhecimento de marca</MenuItem>
            <MenuItem value="Engajamento">Engajamento</MenuItem>
            <MenuItem value="Tráfego">Tráfego para website</MenuItem>
            <MenuItem value="Conversão">Conversão e vendas</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.retargeting}
              onChange={handleCheckboxChange('retargeting')}
              name="retargeting"
            />
          }
          label="Usuários que já interagiram com anúncios anteriores"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Comportamento In-Game</InputLabel>
          <Select
            multiple
            name="inGameBehavior"
            value={formData.inGameBehavior}
            onChange={handleMultiSelectChange('inGameBehavior')}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            <MenuItem value="Compras">Compra de itens in-game</MenuItem>
            <MenuItem value="Eventos">Participação em eventos especiais</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Competitividade</InputLabel>
          <Select
            name="competitiveness"
            value={formData.competitiveness}
            onChange={handleChange}
          >
            <MenuItem value="Alta">Alta</MenuItem>
            <MenuItem value="Média">Média</MenuItem>
            <MenuItem value="Baixa">Baixa</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.gamification}
              onChange={handleCheckboxChange('gamification')}
              name="gamification"
            />
          }
          label="Gamificação e recompensas"
        />

        <Box mt={2}>
          <Button onClick={handleSave} variant="contained" color="primary">
            Salvar
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary" sx={{ ml: 1 }}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

