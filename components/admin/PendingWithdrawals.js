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
import React from "react";
import PendingWithdrawalRow from "./PendingWithdrawalRow";

const PendingWithdrawals = ({ withdrawals }) => {
  //   const { email, investmentPlan, date, mop, amount, status } = deposits;

  return (
    <Box>
      <Text fontSize="20px" fontWeight="600" mb="24px">
        All Pending Wihdrawals
      </Text>
      <Box>
        <TableContainer bg="white" p="24px" pt="12" pb="32">
          <Table variant="unstyled" w="full" size="sm">
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
            {!!withdrawals && withdrawals?.length > 0 && (
              <Tbody fontSize="20px" gap="80px">
                {withdrawals?.map((withdrawal) => (
                  <PendingWithdrawalRow
                    withdrawal={withdrawal}
                    key={withdrawal._id}
                  />
                ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PendingWithdrawals;
