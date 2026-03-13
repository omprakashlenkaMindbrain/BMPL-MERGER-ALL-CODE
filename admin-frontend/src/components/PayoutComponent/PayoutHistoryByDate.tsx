import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePayoutHistory } from "../../hooks/payout/usePayoutHistory";

interface PayoutHistory {
  id: number;
  payoutId: number;
  userId: number;
  totalAmount: string;
  tdsAmount: string;
  adminCharges: string;
  netAmount: string;
  status: string;
  createdAt: string;
}

function PayoutHistoryByDate() {
  const { date } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = usePayoutHistory(page, limit);

  const historyData: PayoutHistory[] = data?.data?.data || [];
  const totalPages = data?.data?.totalpage || 1;

  console.log(historyData);

  // Filter payouts by selected date
  const filteredPayouts = useMemo(() => {
    if (!date) return [];

    const selectedDate = new Date(date).toDateString();

    return historyData.filter((item) => {
      return new Date(item.createdAt).toDateString() === selectedDate;
    });
  }, [historyData, date]);

  return (
    <Box p={4}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          ← Back
        </Button>

        <Typography variant="h6" fontWeight={600}>
          Payout History –{" "}
          {date ? new Date(date).toLocaleDateString() : ""}
        </Typography>
      </Stack>

      {/* LOADING */}
      {isLoading && (
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <CircularProgress />
          <Typography mt={2}>Loading payout history...</Typography>
        </Paper>
      )}

      {/* EMPTY */}
      {!isLoading && filteredPayouts.length === 0 && (
        <Paper sx={{ p: 6 }}>
          <Typography>No payouts found for this date.</Typography>
        </Paper>
      )}

      {/* TABLE */}
      {!isLoading && filteredPayouts.length > 0 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl No</TableCell>
                  <TableCell>Payout Date</TableCell>
                  <TableCell>Payout ID</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>TDS</TableCell>
                  <TableCell>Admin Charges</TableCell>
                  <TableCell>Net Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredPayouts.map((row, index) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      {new Date(row.createdAt).toLocaleString()}
                    </TableCell>

                    <TableCell>{row.payoutId}</TableCell>

                    <TableCell>
                      ₹{Number(row.totalAmount).toFixed(2)}
                    </TableCell>

                    <TableCell>
                      ₹{Number(row.tdsAmount).toFixed(2)}
                    </TableCell>

                    <TableCell>
                      ₹{Number(row.adminCharges).toFixed(2)}
                    </TableCell>

                    <TableCell>
                      ₹{Number(row.netAmount).toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={row.status}
                        color={
                          row.status === "ACTIVE"
                            ? "success"
                            : "default"
                        }
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* PAGINATION */}
      {!isLoading && totalPages > 1 && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
}

export default PayoutHistoryByDate;