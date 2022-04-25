import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Td,
  Text,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useConfirmTransaction, useDeclineTransaction } from "api/transactions";
import React, { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatter } from "utils";

const PendingWithdrawalRow = ({ withdrawal }) => {
  const { user, plan, mode_of_payment, amount, status, address, id } =
    withdrawal;
  const toast = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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
      title: "Withdrawal confirmed",
      description: "You have confimed this withdrwal successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const declineToast = () => {
    toast({
      title: "Withdrawal declined",
      description: "You have declined this withdrawal successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  // ======== CONFIRM WITHDRAWAL LOGIC =============

  const {
    mutate: confirmWithdrawal,
    isLoading,
    data: confirmData,
    error,
  } = useConfirmTransaction();

  const confirm = () => {
    confirmWithdrawal(id);
  };

  useEffect(() => {
    if (confirmData !== undefined && Object.keys(confirmData).length > 0) {
      confirmToast();
    }
  }, [confirmData]);

  useEffect(() => {
    if (
      error !== undefined &&
      error?.toString().includes("Request failed with status code 500")
    ) {
      insufficientBalanceToast();
    }
  }, [error]);

  // ======== CONFIRM WITHDRAWAL LOGIC =============

  const {
    mutate: declineWithdrwal,
    isLoading: isDeclineLoading,
    data: declineData,
  } = useDeclineTransaction();

  const decline = () => {
    declineWithdrwal(id);
  };

  useEffect(() => {
    if (declineData !== undefined && Object.keys(declineData).length > 0) {
      declineToast();
    }
  }, [declineData]);

  return (
    <Tr fontSize={"14px"} color="text.grey">
      <Td>{user.email || ""}</Td>
      <Td>{plan.name || ""}</Td>
      <Td color="text.black" fontWeight={"600"} textTransform="uppercase">
        {mode_of_payment || ""}
      </Td>
      <Td color="text.black" fontWeight={"600"}>
        {(amount && formatter.format(amount)) || ""}
      </Td>
      <Td>
        <Text
          textAlign="center"
          rounded="md"
          bg={"E9C46A33"}
          color={"#E9C46A"}
          fontWeight={600}
          fontSize="12px"
          textTransform={"capitalize"}
        >
          {status || ""}
        </Text>
      </Td>
      <Td color={copied ? "green.400" : "text.black"} fontWeight={"600"}>
        {copied ? "Copied!" : address || ""}
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
              <MenuItem onClick={handleCopy}>Copy Address</MenuItem>
              <MenuItem onClick={confirm}>Confirm</MenuItem>
              <MenuItem onClick={decline}>Decline</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Td>
    </Tr>
  );
};

export default PendingWithdrawalRow;
