import { useState, useEffect, useCallback } from 'react';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';
import { setUsers, moreUsers } from 'src/features/users/usersSlice';

import { Iconify } from 'src/components/iconify';

import DebounceInput from '../../components/debounce-input/DebounceInput';


// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  page: number;
  setFilterName: (value: string) => void;
  filterName: string;
  setUserPages: (value: string) => void;
  orderBy: string;
  setLoading: (value: boolean) => void;
};

export function UserTableToolbar({ numSelected, page, setFilterName, filterName, setUserPages, orderBy, setLoading }: UserTableToolbarProps) {
  const token = useAppSelector((state) => state.auth.token);
  const [pageCurrent, setPageCurrent] = useState(0);
  const dispatch = useAppDispatch();

  const fetchUsersByName = useCallback(async () => {
    if(filterName.length > 2 && pageCurrent <= page ){
      setLoading(true);
      setPageCurrent(page)
      const response = await fetch(`${CONFIG.urlUsers}/admin/users/${filterName}?page=${page}&sizePerPage=25&sortDirection=ASC&orderBy=${orderBy}`,{
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if(response.status === 200){
        const body = await response.json();  
        
        if(body.first){
          dispatch(setUsers({ users: body.content}))
          setUserPages(body);
        } else {
          const newUsers = body.content;
          dispatch(moreUsers({ users: newUsers }))
        }
        setLoading(false);
      }
    }
  }, [filterName, page, token, dispatch, setUserPages, orderBy, pageCurrent, setLoading]);

  useEffect(() => {
    fetchUsersByName();
  }, [fetchUsersByName, page, orderBy])

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
