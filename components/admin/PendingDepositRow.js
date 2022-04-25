import {
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useConfirmTransaction, useDeclineTransaction } from "api/transactions";
import React, { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatter } from "utils";

const PendingDepositRow = ({ deposit }) => {
  const { user, plan, mode_of_payment, amount, status, pop, id } = deposit;
  const {
    isOpen: isPOPOpen,
    onOpen: onPOPOpen,
    onClose: onPOPClose,
  } = useDisclosure();

  const toast = useToast();

  const insufficientBalanceToast = () => {
    toast({
      title: "Cannot Confirm",
      description: "User has insufficient balance",
      status: "error",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const confirmToast = () => {
    toast({
      title: "Deposit confirmed",
      description: "You have confimed this deposit successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const declineToast = () => {
    toast({
      title: "Deposit declined",
      description: "You have declined this deposit successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  // ======== CONFIRM DEPOSIT LOGIC =============

  const {
    mutate: confirmDeposit,
    isLoading,
    data: confirmData,
    // error,
  } = useConfirmTransaction();

  const confirm = () => {
    confirmDeposit(id);
  };

  useEffect(() => {
    if (confirmData !== undefined && Object.keys(confirmData).length > 0) {
      confirmToast();
    }
  }, [confirmData]);

  // useEffect(() => {
  //   if (
  //     error !== undefined &&
  //     error?.toString().includes("Request failed with status code 500")
  //   ) {
  //     insufficientBalanceToast();
  //   }
  // }, [error]);

  // ======== DECLINE DEPOSIT LOGIC =============

  const {
    mutate: declineDeposit,
    isLoading: isDeclineLoading,
    data: declineData,
  } = useDeclineTransaction();

  const decline = () => {
    declineDeposit(id);
  };

  useEffect(() => {
    if (declineData !== undefined && Object.keys(declineData).length > 0) {
      declineToast();
    }
  }, [declineData]);

  return (
    <Tr fontSize={"14px"} color="text.grey">
      <Td>{user.email}</Td>
      <Td>{plan.name}</Td>
      <Td color="text.black" fontWeight={"600"}>
        {mode_of_payment}
      </Td>
      <Td color="text.black" fontWeight={"600"}>
        {formatter.format(amount)}
      </Td>
      <Td>
        <Text
          textAlign="center"
          rounded="md"
          bg={"#E9C46A33"}
          color={"#E9C46A"}
          fontWeight={600}
          fontSize="12px"
          textTransform="capitalize"
        >
          {status}
        </Text>
      </Td>
      <Td>
        <Button
          size="xs"
          px="8px"
          py="4px"
          variant="outline"
          onClick={onPOPOpen}
        >
          View POP
        </Button>
      </Td>
      <Td>
        {isLoading || isDeclineLoading ? (
          <Spinner
            thickness="4px"
            mx="auto"
            speed="0.65s"
            emptyColor="gray.200"
            color="app.primary"
            size="sm"
          />
        ) : (
          <Menu>
            <MenuButton
              w="40px"
              h="40px"
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical />}
              variant="secondary"
            />
            <MenuList>
              <MenuItem onClick={confirm}>Confirm</MenuItem>
              <MenuItem onClick={decline}>Decline</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Td>

      <Modal isOpen={isPOPOpen} onClose={onPOPClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody h="50vh">
            <Image src={pop.path} h="full" w="full" objectFit="contain" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Tr>
  );
};

export default PendingDepositRow;
