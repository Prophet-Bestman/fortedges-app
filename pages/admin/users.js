import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Text,
  Button,
} from "@chakra-ui/react";
import { users } from "data";
import Link from "next/link";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";
import { formatter, statusBg, statusColor } from "utils";

const Users = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.users,
    });
  }, []);
  return (
    <Box px="24px">
      <TableContainer bg="white" p="24px">
        <Table variant="unstyled">
          <Thead>
            <Tr fontSize="14px" color="text.grey" bg="#FAFAFA">
              <Td>Fullname</Td>
              <Td>Email</Td>
              <Td>Total Balance</Td>
              <Td>Verification</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody fontSize={"14px"} color="text.grey">
            {users.map((user, i) => (
              <Tr key={i}>
                <Td>{user.fullName}</Td>
                <Td>{user.email}</Td>
                <Td color="text.black" fontWeight="600">
                  {formatter.format(user.totalBalance)}
                </Td>
                <Td>
                  <Text
                    py="3px"
                    textAlign="center"
                    rounded="md"
                    fontSize="12px"
                    bg={statusBg(user.verification)}
                    color={statusColor(user.verification)}
                  >
                    {user.verification}
                  </Text>
                </Td>
                <Td>
                  <Link href="/admin/users/user">
                    <Button size="xs" variant={"outline"}>
                      View
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;

Users.isAdmin = true;
