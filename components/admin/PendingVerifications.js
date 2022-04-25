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
import { useAdminGetAllVerifications } from "api/verification";
import { users } from "data";
import React from "react";
import PedingVerificationRow from "./PendingVerificationRow";

const PendingVerifications = () => {
  //   const { email, investmentPlan, date, mop, amount, status } = deposits;
  const { data } = useAdminGetAllVerifications();

  console.log(data);

  return (
    <Box>
      <Text fontSize="20px" fontWeight="600" mb="24px">
        All Pending Verifications
      </Text>
      <TableContainer bg="white" p="24px">
        <Table variant="unstyled">
          <Thead bg="#fafafa">
            <Tr fontSize="14px" color="text.grey">
              <Td>Full Name</Td>
              <Td>Email</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody fontSize="20px" gap="80px">
            {users
              .filter((verification) => verification.verification === "Pending")
              .map((verification, i) => (
                <PedingVerificationRow verification={verification} key={i} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PendingVerifications;
