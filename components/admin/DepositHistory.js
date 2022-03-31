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
import { deposits } from "data";
import React from "react";
import DepositRow from "./DepositRow";
import PendingDepositRow from "./PendingDepositRow";

const DepositHistory = () => {
  return (
    <Box my="40px">
      <Text fontSize="20px" fontWeight="600" mb="24px">
        Deposit History
      </Text>
      <TableContainer bg="white" p="24px">
        <Table variant="unstyled">
          <Thead bg="#FAFAFA">
            <Tr fontSize="14px" color="text.grey">
              <Td>Email</Td>
              <Td>Investment plan</Td>
              <Td>M.O.P</Td>
              <Td>Amount</Td>
              <Td>Deposit Status</Td>
              <Td>P.O.P</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody fontSize="20px" gap="80px">
            {deposits.map((deposit, i) => (
              <DepositRow deposit={deposit} key={i} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DepositHistory;
