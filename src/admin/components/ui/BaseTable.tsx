import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

interface BaseTableProps {
  headCells: { id: string; label: string }[];
  children: React.ReactNode;
}

export const BaseTable = ({ headCells, children }: BaseTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "0px", boxShadow: "none", maxHeight: "calc(100vh - 200px)"}}>
      <Table stickyHeader sx={{borderCollapse: 'separate', borderSpacing: '0px 10px'}}>
        <TableHead>
          <TableRow sx={{ boxShadow: "none" }}>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id} sx={{ fontWeight: "bold", borderBottom: 'none'}}>
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  )
}
