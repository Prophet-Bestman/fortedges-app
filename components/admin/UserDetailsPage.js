import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useGetAllMyTransactions } from "api/transactions";
import { ConfirmModal, TransactionHistoryTable } from "components";
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
      <Flex justify="space-evenly" mb="30px">
        <Button
          onClick={() => openSelectModal("DEPOSIT")}
          size="sm"
          variant="outline"
          w="auto"
        >
          Add Deposit
        </Button>
        <Button
          onClick={() => openSelectModal("WITHDRAW")}
          size="sm"
          variant="outline"
          w="auto"
        >
          Withdraw
        </Button>
        <Button
          onClick={() => openSelectModal("ADD_BALANCE")}
          size="sm"
          variant="outline"
          w="auto"
        >
          Add Balance
        </Button>
        <Button
          onClick={() => openSelectModal("CLEAR_BALANCE")}
          size="sm"
          variant="outline"
          w="auto"
        >
          Clear Balance
        </Button>
        <Button
          onClick={() => openSelectModal("ADD_BONUS")}
          size="sm"
          variant="outline"
          w="auto"
        >
          Add bonus
        </Button>
        <Link href={`/admin/users/${userID}/createplan`}>
          <Button size="sm" variant="outline" w="auto">
            Create new plan
          </Button>
        </Link>
        <Button
          onClick={() => openSelectModal("DELETE_PLAN")}
          size="sm"
          variant="outline"
          w="auto"
        >
          Delete Plan
        </Button>
        <Button
          size="sm"
          variant="outline"
          w="auto"
          color="red"
          borderColor="red"
          onClick={onConfirmOpen}
        >
          Delete Account
        </Button>
      </Flex>

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
