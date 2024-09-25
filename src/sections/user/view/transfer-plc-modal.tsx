import { useState } from "react";

import { Alert, Button, Dialog, TextField, DialogTitle, DialogActions, DialogContent, DialogContentText, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@mui/material";

import { CONFIG } from "src/config-global";


interface NewCofuderProps {
    email: string,
    token: string | null;
}


export default function TransferPLCModal  ({ email, token } : NewCofuderProps) {

    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [amountStack, setAmountStake] = useState('');
    const [transaction, setTransaction] = useState('TRANSFER');

    
        const handleClose = () => {
            setSuccess(false);
            setOpen(false);
        };
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if(name === 'radio-buttons-group'){
              setTransaction(value);
            } else {
              setAmountStake(value);
            }
        };


        function RadioButtonsGroupType() {
          return (
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Tipo de transação</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={transaction}
                onChange={handleInputChange}
              >
                <FormControlLabel value="TRANSFER" control={<Radio />} label="Creditar" />
                <FormControlLabel value="TAX" control={<Radio />} label="Taxar" />
              </RadioGroup>
            </FormControl>
          );
        }
    return <><Button onClick={() => setOpen(true)}>Enviar PLC</Button>
    <Dialog open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ display: success ? 'flex' : 'none', borderRadius: 0 }}>
          Transação enviado com sucesso!
        </Alert>
        <DialogTitle>Transferir ou taxar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Quantidade de PLCs.
            </DialogContentText>                    
            <TextField
              margin="dense"
              id="amountStake"
              name="amountStake"
              label="PLC Value"
              type="text"
              fullWidth
              variant="outlined"
              value={amountStack}
              onChange={handleInputChange}
              helperText="120000.00"
            />
            <RadioButtonsGroupType />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={async () => {
              const request = {
                toEmail : email,
                amount: amountStack,
                typeTransaction: transaction
              };
              const response = await fetch(`${CONFIG.urlNotifications}/wallet/send-admin`,{
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(request)
              });

              if(response.status === 200){
                setSuccess(true);
              } else {
                alert("Erro ao enviar transação, entre em contato com o suporte.")
              }

            }} >
              Enviar
            </Button>
          </DialogActions>
    </Dialog>
    </>
}