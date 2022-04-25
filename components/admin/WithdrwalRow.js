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
import {
  useConfirmTransaction,
  useDeclineTransaction,
  useDeleteTransaction,
} from "api/transactions";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatter } from "utils";

const statusBg = (status) => {
  if (status === "processing") return "#E9C46A33";
  else if (status === "successful") return "green.100";
  else return "red.100";
};
const statusColor = (status) => {
  if (status === "processing") return "#E9C46A";
  else if (status === "successful") return "green.400";
  else return "red.400";
};

const WithdrawalRow = ({ withdrawal }) => {
  const {
    user,
    plan,
    mode_of_payment,
    createdAt,
    amount,
    status,
    address,
    id,
  } = withdrawal;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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

  const deleteToast = () => {
    toast({
      title: "Withdrawal deleted",
      description: "You have deleted this withdrawal successfully",
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

  // ======== DECLINE WITHDRAWAL LOGIC =============

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

  // ======== DELETE WITHDRAWAL LOGIC =============

  const {
    mutate: deleteWithdrawal,
    isLoading: isDeletLoading,
    data: deleteData,
  } = useDeleteTransaction();

  const deleteWithdrawalReq = () => {
    deleteWithdrawal(id);
  };

  useEffect(() => {
    if (deleteData !== undefined && deleteData.status) {
      deleteToast();
    }
  }, [deleteData]);

  return (
    <Tr fontSize={"14px"} color="text.grey">
      <Td>{user.email}</Td>
      <Td>{plan.name}</Td>
      <Td color="text.black" fontWeight={"600"} textTransform="uppercase">
        {mode_of_payment}
      </Td>
      <Td color="text.black" fontWeight={"600"}>
        {formatter.format(amount)}
      </Td>
      <Td>
        <Text
          textAlign="center"
          rounded="md"
          bg={() => statusBg(status)}
          color={() => statusColor(status)}
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
      <Td color={copied ? "green.400" : "text.black"} fontWeight={"600"}>
        {copied ? "Copied!" : address}
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
              <MenuItem onClick={handleCopy}>Copy Address</MenuItem>
              {status === "processing" && (
                <>
                  <MenuItem onClick={confirm}>Confirm</MenuItem>
                  <MenuItem onClick={decline}>Decline</MenuItem>
                </>
              )}
              {status !== "processing" && (
                <MenuItem onClick={deleteWithdrawalReq}>Delete</MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
      </Td>
    </Tr>
  );
};

export default WithdrawalRow;
