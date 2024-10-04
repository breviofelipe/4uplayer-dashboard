import { Box, Avatar, Checkbox, TableRow, TableCell } from "@mui/material";
import { Label } from "src/components/label";



export interface History {
  id: string;
  firstName: string;
  picturePath: string;
  from: string;
  to: string;
  amount: number;
  type: string;
  when: Date;
  userId: string;
  description: string;
}

type HistoryTableRowProps = {
    row: History;
    selected: boolean;
    onSelectRow: () => void;
  };

export function TransfersHistoryTableRow({ row, selected, onSelectRow }: HistoryTableRowProps) {
   

    function formatDate(date: Date): string {
      const dateN = new Date(date.toString());
      const formattedDate = dateN.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short' // para incluir a zona de tempo, se necessário
      });
      return formattedDate;
    }
    return (
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
          </TableCell>
  
          <TableCell component="th" scope="row">
            <Box gap={2} display="flex" alignItems="center">
              <Avatar alt={row.firstName} src={row.picturePath} />
              {row.firstName}
            </Box>
          </TableCell>
  
          <TableCell>{row.amount}</TableCell>

          <TableCell>{row.to}</TableCell>

          <TableCell align="center">          
            <Label color={(row.description === 'undefined' ? 'error' : 'success')}>{(row.description === 'undefined' ? 'Fail' : row.description )}</Label>
          </TableCell>
         
          <TableCell>{row.type}</TableCell>
  
          <TableCell>{formatDate(row.when)}</TableCell>

        </TableRow>
    );
  }
  