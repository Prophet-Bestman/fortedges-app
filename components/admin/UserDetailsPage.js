import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetAllMyTransactions } from "api/transactions";
import { TransactionHistoryTable } from "components";
import {
  SelectNewPlan,
  SelectPlan,
  UserDetails,
  UserPlans,
} from "components/admin";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import ActionSuccessful from "./ActionSuccessful";
import ConfirmDeleteUser from "./ConfirmDeleteUser";
import { MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

const UserDetailsPage = ({ userID }) => {
  const [action, setAction] = React.useState("");
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState();

  const {
    isOpen: isSelectOpen,
    onOpen: onSelectOpen,
    onClose: onSelectClose,
  } = useDisclosure();

  const {
    isOpen: isSelectNewOpen,
    onOpen: onSelectNewOpen,
    onClose: onSelectNewClose,
  } = useDisclosure();

  const { isOpen: isActionOpen, onOpen: onActionOpen } = useDisclosure();

  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const openSelectModal = (action) => {
    setAction(action);
    onSelectOpen();
  };

  const { data: transData, refetch } = useGetAllMyTransactions(
    "",
    page,
    30,
    userID
  );

  useEffect(() => {
    if (transData !== undefined) {
      setTransactions(transData);
    }
  }, [transData]);

  useEffect(() => {
    if (transactions !== undefined) {
      if (transactions?.total_documents >= 30) {
        setPages(Math.ceil(transactions?.total_documents / 30));
        refetch();
      } else setPages(1);
    }
  }, [page, transactions]);

  return (
    <Box px="24px">
      <UserDetails userID={userID} />
      <UserPlans userID={userID} />
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(6, 1fr)",
          "repeat(12, 1fr)",
        ]}
        rowGap="3"
        columnGap="2"
        mb="30px"
      >
        <GridItem colSpan={1}>
          <Button
            onClick={() => openSelectModal("DEPOSIT")}
            size="sm"
            variant="outline"
            w="full"
          >
            Add Deposit
          </Button>
        </GridItem>

        <GridItem colSpan={1}>
          <Button
            onClick={() => openSelectModal("WITHDRAW")}
            size="sm"
            variant="outline"
            w="full"
          >
            Withdraw
          </Button>
        </GridItem>

        <GridItem colSpan={1}>
          <Button
            onClick={() => openSelectModal("ADD_BALANCE")}
            size="sm"
            variant="outline"
            w="full"
          >
            Add Balance
          </Button>
        </GridItem>

        <GridItem colSpan={1}>
          <Button
            onClick={() => openSelectModal("CLEAR_BALANCE")}
            size="sm"
            variant="outline"
            w="full"
          >
            Clear Balance
          </Button>
        </GridItem>

        <GridItem colSpan={1}>
          <Button
            onClick={() => openSelectModal("ADD_BONUS")}
            size="sm"
            variant="outline"
            w="full"
          >
            Add bonus
          </Button>
        </GridItem>

        <GridItem colSpan={1}>
          <Link href={`/admin/users/${userID}/createplan`}>
            <Button size="sm" variant="outline" w="full">
              Create new plan
            </Button>
          </Link>
        </GridItem>

        <GridItem colSpan={1}>
          <Button
            onClick={() => openSelectModal("DELETE_PLAN")}
            size="sm"
            variant="outline"
            w="full"
          >
            Delete Plan
          </Button>
        </GridItem>
        <GridItem colSpan={1}>
          <Button
            size="sm"
            variant="outline"
            w="full"
            color="red"
            borderColor="red"
            onClick={onConfirmOpen}
          >
            Delete Account
          </Button>
        </GridItem>
      </Grid>

      {!!transactions && (
        <TransactionHistoryTable transactions={transactions} />
      )}

      <Flex color="white" justifyContent="center" gap="12px" mb="48px">
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
      {/* MODALS */}
      <SelectPlan
        isOpen={isSelectOpen}
        onClose={onSelectClose}
        action={action}
        userID={userID}
      />

      <SelectNewPlan
        isOpen={isSelectNewOpen}
        onClose={onSelectNewClose}
        action={action}
      />

      <ConfirmDeleteUser
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        userID={userID}
      />
      <ActionSuccessful isOpen={isActionOpen} />
    </Box>
  );
};

export default UserDetailsPage;
