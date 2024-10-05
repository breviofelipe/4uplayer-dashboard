import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';

import { useAppDispatch, useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { setHistories, moreHistories } from 'src/features/transfers/transfersSlice';

import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { TableEmptyRows } from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { TransfersHistoryTableRow } from '../transfers-history-table-row';
import { TransfersHistoryTableHead } from '../transfers-history-table-head';
import { TransfersHistoryTableToolbar } from '../transfer-history-table-toolbar';

import type { History } from '../transfers-history-table-row';



// ----------------------------------------------------------------------



export function TransferView() {

  const token = useAppSelector((state) => state.auth.token);
  const transfersHistories = useAppSelector((state) => state.transfers.histories);
  const dispatch = useAppDispatch();

  const [filterName, setFilterName] = useState('');
  const [historyPage, setHistoryPages] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const table = useTable();
  const [page, setPage] = useState(table.page);
  
  const dataFiltered: History[] = applyFilter({
    inputData: transfersHistories,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName; 

  const fetchTransfers = useCallback(async () => {
    if(filterName === '' && (page < table.page || table.page === 0)){
      setLoading(true);
      setPage(table.page);
      const response = await fetch(`${CONFIG.urlNotifications}/wallet/transfers-history-admin?page=${table.page}&sizePerPage=${table.rowsPerPage}&sortDirection=${table.order.toUpperCase()}&orderBy=${table.orderBy}`,{
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if(response.status === 200){
        const body = await response.json();
        if(body.first){
          dispatch(setHistories({ histories: body.content}))
        } else {
          const newHistories = body.content;
          dispatch(moreHistories({ histories: newHistories }))
        }
  
        setHistoryPages(body);
      }
      setLoading(false);
    }
  }, [token, table.page, dispatch, page, table.rowsPerPage, table.order, filterName, table.orderBy]);

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]); 

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Transfers
        </Typography>
        <Button onClick={() => {
          table.onResetPage();
          fetchTransfers();
        }}>Refresh</Button>
      </Box>

      <Card>        
        <TransfersHistoryTableToolbar
          setLoading={setLoading}
          setPages={setHistoryPages}
          filterName={filterName}
          numSelected={table.selected.length}
          page={table.page}
          setFilterName={(val : string) => {
              setFilterName(val);
              table.onResetPage()
          }}
          
          orderBy={table.orderBy}
        />
        { loading && <Box sx={{ width: '100%' }}>
                        <LinearProgress/>
                     </Box>
        }
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TransfersHistoryTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={historyPage.totalElements}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    transfersHistories.map((history) => history.id)
                  )
                }
                headLabel={[
                  { id: 'firstName', label: 'Name' },
                  { id: 'amount', label: 'Amount' },
                  { id: 'to', label: 'To'},
                  { id: 'description', label: 'Description', align: 'center' },
                  { id: 'type', label: 'Type' },
                  { id: 'when', label: 'When' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <TransfersHistoryTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, historyPage.totalElements)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={historyPage.totalElements}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
               
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const onSort = useCallback(
    (id: string) => {
      const isasc = orderBy === id && order === 'asc';
      setOrder(isasc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
