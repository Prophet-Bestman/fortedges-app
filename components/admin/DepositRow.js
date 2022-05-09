import {
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
  useToast,
} from "@chakra-ui/react";
import {
  useConfirmTransaction,
  useDeclineTransaction,
  useDeleteTransaction,
} from "api/transactions";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatter } from "utils";

const DepositRow = ({ deposit }) => {
  const { user, plan, mode_of_payment, createdAt, amount, status, pop, id } =
    deposit;

  const statusBg = () => {
    if (status === "processing") return "#E9C46A33";
    else if (status === "successful") return "green.100";
    else return "red.100";
  };
  const statusColor = () => {
    if (status === "processing") return "#E9C46A";
    else if (status === "successful") return "green.400";
    else return "red.400";
  };

  const toast = useToast();

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

  const deleteToast = () => {
    toast({
      title: "Deposit deleted",
      description: "You have deleted this deposit successfully",
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

  // ======== DELETE WITHDRAWAL LOGIC =============

  const {
    mutate: deleteDeposit,
    isLoading: isDeletLoading,
    data: deleteData,
  } = useDeleteTransaction();

  const deleteDepositReq = () => {
    deleteDeposit(id);
  };

  useEffect(() => {
    if (deleteData !== undefined && deleteData.status) {
      deleteToast();
    }
  }, [deleteData]);

  return (
    <Tr fontSize={"14px"} color="text.grey">
      <Td>{user?.email}</Td>
      <Td>{plan?.name}</Td>
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
          bg={statusBg}
          color={statusColor}
          fontWeight={600}
          fontSize="12px"
          textTransform="capitalize"
        >
          {status}
        </Text>
      </Td>
      <Td color="text.black" fontWeight={"600"}>
        {format(new Date(createdAt), "dd/MM/yyyy")}
      </Td>
      <Td>
        {isLoading || isDeclineLoading || isDeletLoading ? (
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
              {status === "processing" && (
                <>
                  <MenuItem onClick={confirm}>Confirm</MenuItem>
                  <MenuItem onClick={decline}>Decline</MenuItem>
                </>
              )}
              {status !== "processing" && (
                <MenuItem onClick={deleteDepositReq}>Delete</MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
      </Td>

      {/* <Modal isOpen={isPOPOpen} onClose={onPOPClose}>
        <ModalOverlay />
        <ModalBody>
          <ModalContent>
            <Image src={pop} w="full" objectFit="contain" />
          </ModalContent>
        </ModalBody>
      </Modal> */}
    </Tr>
  );
};

export default DepositRow;
