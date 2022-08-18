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
  Flex,
} from "@chakra-ui/react";
// import { users } from "data";
import Link from "next/link";
import { useGetAllUsers } from "api/user";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useState, useEffect } from "react";
import { formatter } from "utils";

import { MdOutlineArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const statusBg = (status) => {
  if (!status) return "red.100";
  else return "green.100";
};
const statusColor = (status) => {
  if (!status) return "red.400";
  else return "green.400";
};

const Users = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.users,
    });
  }, []);

  const { data: userData, refetch } = useGetAllUsers(page);
  useEffect(() => {
    if (userData !== undefined) setUsers(userData);
  }, [userData]);

  useEffect(() => {
    if (users !== undefined) {
      if (users?.total_documents >= 10) {
        setPages(Math.ceil(users?.total_documents / 10));
      } else setPages(1);
      refetch();
    }
  }, [users]);

  return (
    <Box px="24px">
      <TableContainer bg="white" p="24px">
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr fontSize="14px" color="text.grey" bg="#FAFAFA">
              <Td>Fullname</Td>
              <Td>Email</Td>
              <Td>Status</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          {!!users.users && users.users?.length > 0 && (
            <Tbody fontSize={"14px"} color="text.grey">
              {users.users.map((user, i) => (
                <Tr key={i}>
                  <Td>{`${user.firstname} ${user.lastname}`}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Text
                      py="3px"
                      px="12px"
                      textAlign="center"
                      rounded="md"
                      fontSize="12px"
                      bg={statusBg(user.is_verified)}
                      color={statusColor(user.is_verified)}
                    >
                      {user.is_verified ? "Verified" : "Not Verified"}
                    </Text>
                  </Td>
                  <Td>
                    <Link href={`/admin/users/${user._id}`}>
                      <Button size="xs" variant={"outline"}>
                        View
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>

      <Flex color="white" justifyContent="center" gap="12px" my="48px">
        <Button
          size="sm"
          px="4px"
          py="12px"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <MdOutlineArrowBackIos size="24px" />
        </Button>
        <Button
          size="sm"
          px="4px"
          py="12px"
          disabled={page === pages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <MdArrowForwardIos size="24px" color="white" />
        </Button>
      </Flex>
    </Box>
  );
};

export default Users;

Users.isAdmin = true;
