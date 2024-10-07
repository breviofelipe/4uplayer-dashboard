import { useState, useEffect, useCallback } from 'react';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';
import { setHistories, moreHistories } from 'src/features/transfers/transfersSlice';

import { Iconify } from 'src/components/iconify';

import DebounceInput from '../../components/debounce-input/DebounceInput';


// ----------------------------------------------------------------------

type TransfersHistoryTableToolbarProps = {
  numSelected: number;
  page: number;
  setFilterName: (value: string) => void;
  filterName: string;
  setPages: (value: string) => void;
  setLoading: (value: boolean) => void;
};

export function TransfersHistoryTableToolbar({ numSelected, page, setFilterName, filterName, setPages, setLoading }: TransfersHistoryTableToolbarProps) {
  const token = useAppSelector((state) => state.auth.token);
  const [pageCurrent, setPageCurrent] = useState(0);
  const dispatch = useAppDispatch();
  function validarEmail(email: string): boolean {
    const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}
  const fetchUsersByName = useCallback(async () => {
    if(validarEmail(filterName) && pageCurrent <= page ){
      setLoading(true);
      setPageCurrent(page)
      const response = await fetch(`${CONFIG.urlNotifications}/wallet/search-history-admin?email=${filterName}&page=${page}&sizePerPage=25&sortDirection=ASC`,{
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if(response.status === 200){
        const body = await response.json();  
        
        if(body.first){
          dispatch(setHistories({ histories: body.content}))
          setPages(body);
        } else {
          const news = body.content;
          dispatch(moreHistories({ histories: news }))
        }
      }
      setLoading(false);
    }
  }, [filterName, page, token, dispatch, setPages, pageCurrent, setLoading]);

  useEffect(() => {
    fetchUsersByName();
  }, [fetchUsersByName, page])

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
