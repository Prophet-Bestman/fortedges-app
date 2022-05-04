import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { ConfirmModal, TransactionHistoryTable } from "components";
import {
  SelectNewPlan,
  SelectPlan,
  UserDetails,
  UserPlans,
} from "components/admin";

import Link from "next/link";
import React from "react";
import ActionSuccessful from "./ActionSuccessful";
import ConfirmDeleteUser from "./ConfirmDeleteUser";

const UserDetailsPage = ({ userID }) => {
  const [action, setAction] = React.useState("");

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

      <TransactionHistoryTable />

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
      {/* <ConfirmModal
        isOpen={isConfirmOpen}
        openModal={onActionOpen}
        onClose={onConfirmClose}
        text="Are you sure you want to Delete Account"
        title={"Delete Account"}
      /> */}

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
