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
import { deposits } from "data";
import React from "react";
import PendingDepositRow from "./PendingDepositRow";

const PendingDeposits = ({ deposits }) => {
  return (
    <Box>
      <Text fontSize="20px" fontWeight="600" mb="24px">
        All Pending Deposits
      </Text>
      <TableContainer bg="white" p="24px" pt="12" pb="32">
        <Table variant="unstyled" size={"sm"}>
          <Thead bg="#fafafa">
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
          {!!deposits && deposits?.length > 0 && (
            <Tbody fontSize="20px" gap="80px">
              {deposits?.map((deposit) => (
                <PendingDepositRow deposit={deposit} key={deposit.id} />
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PendingDeposits;
