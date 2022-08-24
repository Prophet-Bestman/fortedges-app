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
import React, { useState, useEffect } from "react";
import PedingVerificationRow from "./PendingVerificationRow";

const PendingVerifications = () => {
  const [verifications, setVerifications] = useState([]);
  const { data } = useAdminGetAllVerifications();

  useEffect(() => {
    if (!!data && data?.verifications.length > 0) {
      setVerifications(data?.verifications);
    }
  }, [data]);

  return (
    <Box>
      <Text fontSize="20px" fontWeight="600" mb="24px">
        All Pending Verifications
      </Text>
      <TableContainer bg="white" p="24px" pt="12" pb="32">
        <Table variant="unstyled" size="sm">
          <Thead bg="#fafafa">
            <Tr fontSize="14px" color="text.grey">
              <Td>Full Name</Td>
              <Td>Email</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          {!!verifications && verifications?.length > 0 && (
            <Tbody fontSize="20px" gap="80px">
              {verifications
                .filter((verification) => verification.status === "in-review")
                .map((verification) => (
                  <PedingVerificationRow
                    verification={verification}
                    key={verification._id}
                  />
                ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PendingVerifications;
