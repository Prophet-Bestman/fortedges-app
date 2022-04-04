import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { deposits, withdrawals } from "data";
import React from "react";
import WithdrawalRow from "./WithdrwalRow";

const WithdrwalHistory = () => {
  return (
    <Box my="80px">
      <Text fontSize="20px" fontWeight="600" mb="24px">
        Withdrawal History
      </Text>
      <TableContainer bg="white" p="24px">
        <Table variant="unstyled">
          <Thead bg="#FAFAFA">
            <Tr fontSize="14px" color="text.grey">
              <Td>Email</Td>
              <Td>Investment plan</Td>
              <Td>M.O.P</Td>
              <Td>Amount</Td>
              <Td>Withdrwal Status</Td>
              <Td>Date</Td>
              <Td>Wallet Address</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody fontSize="20px" gap="80px">
            {withdrawals.map((withdrawal, i) => (
              <WithdrawalRow withdrawal={withdrawal} key={i} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WithdrwalHistory;
