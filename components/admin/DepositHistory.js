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
import DepositRow from "./DepositRow";

const DepositHistory = ({ deposits }) => {
  return (
    <Box my="40px">
      <Text fontSize="20px" fontWeight="600" mb="24px">
        Deposit History
      </Text>
      <TableContainer bg="white" p="24px">
        <Table variant="unstyled" size={"sm"}>
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
          {!!deposits && deposits?.length > 0 && (
            <Tbody fontSize="20px" gap="80px">
              {deposits?.map((deposit) => (
                <DepositRow deposit={deposit} key={deposit.id} />
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DepositHistory;
