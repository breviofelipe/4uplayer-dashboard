import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';

import { useAppDispatch, useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { setUsers, moreUsers } from 'src/features/users/usersSlice';

import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import FormModal from './new-user-cofunder-modal';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { User } from '../user-table-row';



// ----------------------------------------------------------------------



export function UserView() {

  const token = useAppSelector((state) => state.auth.token);
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();

  const [filterName, setFilterName] = useState('');
  const [usersPage, setUserPages] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const table = useTable();
  const [page, setPage] = useState(table.page);
  
  const dataFiltered: User[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName; 

  const fetchUsers = useCallback(async () => {
    if(filterName === '' && (page < table.page || table.page === 0)){
      setLoading(true);
      setPage(table.page);
      const response = await fetch(`${CONFIG.urlUsers}/admin/users?page=${table.page}&sizePerPage=${table.rowsPerPage}&sortDirection=${table.order.toUpperCase()}&orderBy=${table.orderBy}`,{
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if(response.status === 200){
        const body = await response.json();
        if(body.first){
          dispatch(setUsers({ users: body.content}))
        } else {
          const newUsers = body.content;
          dispatch(moreUsers({ users: newUsers }))
        }
  
        setUserPages(body);
      }
      setLoading(false);
    }
  }, [token, table.page, dispatch, page, table.rowsPerPage, table.order, filterName, table.orderBy]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); 

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
        <FormModal />
      </Box>

      <Card>        
        <UserTableToolbar
          setLoading={setLoading}
          setUserPages={setUserPages}
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
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={usersPage.totalElements}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'firstName', label: 'Name' },
                  { id: 'lastName', label: 'E-mail' },
                  { id: 'role', label: 'Role' },
                  { id: 'emailCheck', label: 'Verified', align: 'center' },
                  { id: 'credentialsNonExpired', label: 'Status' },
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
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, usersPage.totalElements)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={usersPage.totalElements}
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
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

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
