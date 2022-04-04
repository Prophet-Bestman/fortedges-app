import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { deposits, withdrawals } from "data";
import React from "react";
import PendingDepositRow from "./PendingDepositRow";
import PendingWithdrawalRow from "./PendingWithdrawalRow";

const PendingWithdrawals = () => {
  //   const { email, investmentPlan, date, mop, amount, status } = deposits;
  return (
    <Box>
      <Text fontSize="20px" fontWeight="600" mb="24px">
        All Pending Wihdrawals
      </Text>
      <Box>
        <TableContainer bg="white" p="24px">
          <Table variant="unstyled" w="full">
            <Thead bg="#fafafa">
              <Tr fontSize="14px" color="text.grey">
                <Td>Email</Td>
                <Td>Investment plan</Td>
                <Td>M.O.P</Td>
                <Td>Amount</Td>
                <Td>Withdrawal Status</Td>
                <Td>Wallet Address</Td>
                <Td>Actions</Td>
              </Tr>
            </Thead>
            <Tbody fontSize="20px" gap="80px">
              {withdrawals
                .filter(
                  (withdrawal) => withdrawal.status === "Pending Confirmation"
                )
                .map((withdrawal, i) => (
                  <PendingWithdrawalRow withdrawal={withdrawal} key={i} />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PendingWithdrawals;
