import { useState, useCallback } from "react";

import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { Box , Avatar, Popover, Checkbox, TableRow, MenuList, TableCell, IconButton } from "@mui/material";

import { Label } from "src/components/label";
import { Iconify } from "src/components/iconify";

import TransactionModal from "./view/transfer-detail";



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
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const transactionData = {
    "id": "66bbf22050236f63449706bd",
    "from": "65739e33e8c0935ec34d97a1",
    "to": "6573b6d9b6269e05054f1185",
    "firstName": "Felipe",
    "picturePath": "https://res.cloudinary.com/dosghtja7/image/upload/v1707926822/assets/profiles/b620db34-6dc8-420a-b53b-8c03148a4057.png.png",
    "firstNameTo": "Ana",
    "picturePathTo": "https://res.cloudinary.com/dosghtja7/image/upload/v1707926822/assets/profiles/b620db34-6dc8-420a-b53b-8c03148a4057.png.png",
    "amount": 10.0,
    "type": "TRANSFER",
    "when": "2024-08-13T23:54:08.881+00:00",
    "userId": "65739e40e8c0935ec34d97a2",
    "description": "Transferência de 10.0 foi enviado por Felipe Brevio"
  };

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
    return (<>
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
          <TableCell align="right">
            <IconButton onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        </TableRow>
        <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
            <MenuItem onClick={() => { setIsModalOpen(true) }}>
              <Iconify icon="ph:eye" />
              Details
            </MenuItem>
            <TransactionModal
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  id={row.id}
                />
        </MenuList>
      </Popover>
          </>
    );
  }
  

