import { useState } from "react";

import { Alert , Button, Dialog, TextField, Typography, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";

import { CONFIG } from "src/config-global";

import LoadingComponent from "src/components/loading/Loading";


interface NewCofuderProps {
    email: string,
    token: string | null;
}


export default function NewCofunderModal  ({ email, token } : NewCofuderProps) {

    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [amountStack, setAmountStake] = useState('');
    const [isLoading, setLoading] = useState<boolean>(false);

        const handleClose = () => {
            setSuccess(false);
            setOpen(false);
        };
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setAmountStake(value);
        };

    return <><Button onClick={() => setOpen(true)}>Tornar Co-fundador</Button>
    <Dialog open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ display: success ? 'flex' : 'none', borderRadius: 0 }}>
          Co-fundador criado com sucesso!
        </Alert>
        <DialogTitle>Tornar Co-fundador</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Quantidade de PLCs a serem bloqueadas.
            </DialogContentText>                    
            <TextField
              margin="dense"
              id="amountStake"
              name="amountStake"
              label="Hold PLC Value"
              type="text"
              fullWidth
              variant="outlined"
              value={amountStack}
              onChange={handleInputChange}
              helperText="120000.00"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={async () => {
              setLoading(true);
              const request = {
                email,
                amountStake: amountStack
              };
              const response = await fetch(`${CONFIG.urlUsers}/admin/new-cofunder`,{
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(request)
              });

              if(response.status === 200){
                setSuccess(true);
              } else {
                alert("Erro ao enviar transação, entre em contato com o suporte.")
              }
              setLoading(false);
            }} >
              {isLoading ? <LoadingComponent /> : <Typography>Enviar</Typography>}
            </Button>
            <Button disabled={isLoading} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
    </Dialog>
    </>
}