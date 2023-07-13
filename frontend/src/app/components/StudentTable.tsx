import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Button } from './Button'

interface Column {
  id: 'id' | 'matricula' | 'nome' | 'email' | 'admin' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'matricula', label: 'Matrícula', minWidth: 100 },
  {
    id: 'nome',
    label: 'Nome',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'email',
    label: 'E-mail)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'admin',
    label: 'Admin',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'actions',
    label: 'Ação',
    minWidth: 30,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
]

interface Data {
  id: number
  matricula: string
  nome: string
  email: string
  admin: string
}

const rows: Data[] = [
  {
    id: 1,
    nome: 'Cássio Borges',
    email: 'cassiocvtb2003@gmail.com',
    matricula: '211036141',
    admin: 'true',
  },
  {
    id: 2,
    nome: 'Cássio Borges',
    email: 'cassiocvtb2003@gmail.com',
    matricula: '211036141',
    admin: 'true',
  },
  {
    id: 3,
    nome: 'Cássio Borges',
    email: 'cassiocvtb2003@gmail.com',
    matricula: '211036141',
    admin: 'true',
  },
  {
    id: 4,
    nome: 'Cássio Borges',
    email: 'cassiocvtb2003@gmail.com',
    matricula: '211036141',
    admin: 'true',
  },
  {
    id: 5,
    nome: 'Cássio Borges',
    email: 'cassiocvtb2003@gmail.com',
    matricula: '211036141',
    admin: 'true',
  },
]

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      if (column.id === 'actions') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button>Editar</Button>
                            <Button>Apagar</Button>
                          </TableCell>
                        )
                      }
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
