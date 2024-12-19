import type { ChangeEvent} from 'react';

import { useState } from 'react';
import { Icon } from '@iconify/react';

import {
  Box,
  Chip,
  Select,
  Slider,
  Button,
  MenuItem,
  Checkbox,
  Accordion,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
} from '@mui/material';

import { useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';

import FileDropzone from './file-drop';

interface CampaignSegmentationFormProps {
  handleCloseModal: () => void
}

export default function CampaignSegmentationForm({ handleCloseModal } : CampaignSegmentationFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [description, setDescription] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = useAppSelector((state) => state.auth.token);



  const handleFilesAccepted = (files: File[]) => {
    console.log('Arquivos aceitos:', files);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = async function () { 
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

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    };

    const handleLinkChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setLink(e.target.value);
    };

  const [formData, setFormData] = useState({
    // Initialize your form state here
    position: '',
    ageRange: [13, 65],
    gender: [],
    location: '',
    language: '',
    playerType: [],
    hoursPlayed: [0, 40],
    gameGenres: [],
    platforms: [],
    interests: [],
    specificGames: '',
    brands: '',
    engagementLevel: '',
    contentType: [],
    purchaseHistory: false,
    spendingHabits: '',
    priceRange: '',
    accessFrequency: '',
    peakHours: [],
    device: [],
    operatingSystem: [],
    esportsTeams: [],
    influencers: [],
    campaignObjective: '',
    retargeting: false,
    inGameBehavior: [],
    competitiveness: '',
    gamification: false,
  });

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (name: string) => (event: any, newValue: any) => {
    setFormData({ ...formData, [name]: newValue });
  };

  const handleCheckboxChange = (name: string) => (event: { target: { checked: any; }; }) => {
    setFormData({ ...formData, [name]: event.target.checked });
  };

  const handleMultiSelectChange = (name: string) => (event: { target: { value: any; }; }) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();   

    if (formData.position && file && description.trim() && link.trim()) {
      const body = {
          imageBase64: image,
          description,
          link,
          position: formData.position,
          campaignSegmentation: formData
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
        setError('Por favor, selecione a possição do anúncio, uma imagem, uma descrição e um link');
      }
  };

  return (
    <form >
      <Box mt='0.5rem' display='flex' flexDirection='column' >       
        <FormControl fullWidth margin="normal">
            <Label mb='0.5rem'>Posição do anúcio</Label>
            <Select
              name="position"
              value={formData.position}
              onChange={handleMultiSelectChange('position')}
            >
              <MenuItem value="RIGHT_AD">Direita</MenuItem>
              <MenuItem value="LEFT_AD">Esquerda</MenuItem>
              <MenuItem value="BOTTOM_AD">Rodapé</MenuItem>
            </Select>
          </FormControl>
      </Box>
    <Box mb='1rem' display='flex' flexDirection='column'>
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
    <Box mt='0.5rem' display='flex' flexDirection='column' >
        <Label mb='0.5rem'>
            Link do anúncio
        </Label>
        
        <TextField
            id="link"
            fullWidth
            value={link}
            onChange={handleLinkChange}
            placeholder="Link do anuncio"
        />
    </Box>
    {error && <Typography color='error'>{error}</Typography>}
    <Box mt='0.5rem' display='flex' flexDirection='column' >
        <Label mb='0.5rem'>
          Detalhes Campanha Segmentada.
        </Label>
        <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>1. Demografia</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                  {selected.map((value) => (
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>2. Comportamento no Jogo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Jogador</InputLabel>
            <Select
              multiple
              name="playerType"
              value={formData.playerType}
              onChange={handleMultiSelectChange('playerType')}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
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
                  {selected.map((value) => (
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
                  {selected.map((value) => (
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>3. Interesses e Preferências</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth margin="normal">
            <InputLabel>Interesses gerais</InputLabel>
            <Select
              multiple
              name="interests"
              value={formData.interests}
              onChange={handleMultiSelectChange('interests')}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="Tecnologia">Tecnologia</MenuItem>
              <MenuItem value="Cultura geek">Cultura geek/nerd</MenuItem>
              <MenuItem value="Esports">Competição em esportes eletrônicos</MenuItem>
              <MenuItem value="Desenvolvimento">Desenvolvimento de jogos</MenuItem>
              <MenuItem value="Hardware">Equipamentos de jogos (hardware)</MenuItem>
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>4. Engajamento na Rede Social</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de conteúdo consumido</InputLabel>
            <Select
              multiple
              name="contentType"
              value={formData.contentType}
              onChange={handleMultiSelectChange('contentType')}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="Posts">Posts</MenuItem>
              <MenuItem value="Vídeos">Vídeos</MenuItem>
              <MenuItem value="Artigos">Artigos</MenuItem>
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>5. Poder Aquisitivo</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>6. Frequência e Horários de Acesso</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                  {selected.map((value) => (
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>7. Dispositivos e Sistemas Operacionais</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de dispositivo</InputLabel>
            <Select
              multiple
              name="device"
              value={formData.device}
              onChange={handleMultiSelectChange('device')}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="PC">PC</MenuItem>
              <MenuItem value="Mobile">Mobile</MenuItem>
              <MenuItem value="Tablet">Tablet</MenuItem>
              <MenuItem value="Console">Console</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Sistema operacional</InputLabel>
            <Select
              multiple
              name="operatingSystem"
              value={formData.operatingSystem}
              onChange={handleMultiSelectChange('operatingSystem')}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="Android">Android</MenuItem>
              <MenuItem value="iOS">iOS</MenuItem>
              <MenuItem value="Windows">Windows</MenuItem>
              <MenuItem value="PlayStation">PlayStation</MenuItem>
              <MenuItem value="Xbox">Xbox</MenuItem>
              <MenuItem value="Nintendo">Nintendo</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>8. Segmentação por Comportamento Social</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            margin="normal"
            name="esportsTeams"
            label="Times de eSports seguidos"
            value={formData.esportsTeams}
            onChange={handleChange}
            helperText="Separe os times por vírgula"
          />
          <TextField
            fullWidth
            margin="normal"
            name="influencers"
            label="Influenciadores e streamers"
            value={formData.influencers}
            onChange={handleChange}
            helperText="Separe os nomes por vírgula"
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>9. Objetivos de Campanha</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>10. Contexto de Anúncio (Retargeting)</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>11. Segmentação por Comportamento In-Game</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth margin="normal">
            <InputLabel>Comportamento In-Game</InputLabel>
            <Select
              multiple
              name="inGameBehavior"
              value={formData.inGameBehavior}
              onChange={handleMultiSelectChange('inGameBehavior')}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="Compras">Compra de itens in-game</MenuItem>
              <MenuItem value="Eventos">Participação em eventos especiais</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<Icon icon="flat-color-icons:expand" width="24" height="24" />}>
          <Typography>12. Filtros Exclusivos</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      <Box mt={2}>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Enviar
        </Button>
      </Box>

    </Box>

      
    </form>
  );
}

