import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDateWiseIncome } from "../../hooks/Income/useDateWiseIncome";

function DateWiseUserIncome() {
  const { date } = useParams<{ date: string }>();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading } = useDateWiseIncome(
    date,
    page + 1,
    rowsPerPage
  );


  const formatIndianDate = (dateString?: string) => {
    if (!dateString) return "";

    const dateObj = new Date(dateString);

    return dateObj.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const rows = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Date Wise User Income
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        Income details for date: <b>{formatIndianDate(date)}</b>
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>User Info</TableCell>
              <TableCell>Binary Income</TableCell>
              <TableCell>Royalty Income</TableCell>
              <TableCell>TDS</TableCell>
              <TableCell>Admin Charges</TableCell>
              <TableCell>Net Income</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row: any, index: number) => {
                const netIncome =
                  row.totalIncome -
                  row.totalTds -
                  row.totalAdminCharges;

                return (
                  <TableRow key={row.userId}>
                    <TableCell>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>
                        {row.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.memId}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.binaryIncome}</TableCell>
                    <TableCell>{row.royaltyIncome}</TableCell>
                    <TableCell>{row.totalTds}</TableCell>
                    <TableCell>{row.totalAdminCharges}</TableCell>
                    <TableCell>
                      <b>{netIncome}</b>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
    </Box>
  );
}

export default DateWiseUserIncome;