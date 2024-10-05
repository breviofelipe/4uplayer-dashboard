import { Icon } from '@iconify/react';
import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Grid,
  Dialog,
  Avatar,
  Divider,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  LinearProgress
} from '@mui/material';

import { useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';


interface TransactionData {
  id: string;
  from: string;
  to: string;
  firstName: string;
  picturePath: string;
  firstNameTo: string;
  picturePathTo: string;
  amount: number;
  type: string;
  when: string;
  userId: string;
  description: string;
}

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

export default function TransactionModal({ open, onClose, id }: TransactionModalProps) {
  const [ transaction, setTransaction ] = useState<TransactionData>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const token = useAppSelector((state) => state.auth.token);
  const fetchDetails = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`${CONFIG.urlNotifications}/wallet/detail-history-admin?id=${id}`,{
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    if(response.status === 200){
      const body = await response.json();
      setTransaction(body);
    } else {
      alert("Erro ao consultar transation, entre em contato com o suporte.")
    }
      
    
    setLoading(false);
  },[id, token]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Detalhes da Transação
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Icon icon="material-symbols:close" />
        </IconButton>
      </DialogTitle>
      { isLoading && <Box sx={{ width: '100%' }}>
                        <LinearProgress/>
                     </Box>
        }
      <DialogContent dividers>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item>
            <Avatar src={transaction?.picturePath} alt={transaction?.firstName} sx={{ width: 56, height: 56 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">{transaction?.firstName}</Typography>
            <Typography variant="body2" color="textSecondary">De</Typography>
          </Grid>
         {transaction && transaction.picturePathTo && <Grid item>
            <Avatar src={transaction.picturePathTo} alt={transaction?.firstNameTo} sx={{ width: 56, height: 56 }} />
          </Grid>}
          <Grid item xs>
            <Typography variant="subtitle1">{transaction?.firstNameTo}</Typography>
            <Typography variant="body2" color="textSecondary">Para</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            <strong>Valor:</strong> {transaction?.amount.toFixed(2)} PLC
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            <strong>Tipo:</strong> {transaction?.type}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            <strong>Data:</strong> {transaction && new Date(transaction.when).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short' // para incluir a zona de tempo, se necessário
      })}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            <strong>Descrição:</strong> {transaction && (transaction.description === 'undefined' ? 'Transação falhou' : transaction.description)}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="textSecondary">
            <strong>ID da Transação:</strong> {transaction?.id}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}