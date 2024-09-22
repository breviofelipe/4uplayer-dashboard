import { useCallback, useEffect } from 'react';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';
import { setUsers } from 'src/features/users/usersSlice';

import { Iconify } from 'src/components/iconify';

import DebounceInput from './view/DebounceInput';


// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  page: number;
  rowsPerPage: number;
  setFilterName: (value: string) => void;
  filterName: string;
  setUserPages: (value: string) => void;
};

export function UserTableToolbar({ numSelected, page, rowsPerPage, setFilterName, filterName, setUserPages }: UserTableToolbarProps) {
  const token = useAppSelector((state) => state.auth.token);
  
  const dispatch = useAppDispatch();

  const fetchUsersByName = useCallback(async () => {
    console.log('Debounced value:', filterName);
    if(filterName.length > 2){
      
      const response = await fetch(`${CONFIG.urlUsers}/admin/users/${filterName}?page=${page}&sizePerPage=${rowsPerPage}&sortDirection=ASC`,{
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if(response.status === 200){
        const body = await response.json();      
        dispatch(setUsers({ users: body.content}))
        console.log(body);
        setUserPages(body);
      }
    }
  }, [filterName, page, rowsPerPage, token, dispatch, setUserPages]);

  useEffect(() => {
    fetchUsersByName();
  }, [fetchUsersByName])

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        
        <DebounceInput onDebouncedChange={setFilterName} />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
