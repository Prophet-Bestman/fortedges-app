import {
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const PendingWithdrawalRow = ({ withdrawal }) => {
  const { email, investmentPlan, mop, amount, status, walletAddress } =
    withdrawal;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const statusBg = () => {
    if (status === "Pending Confirmation") return "#E9C46A33";
    else if (status === "Confirmed") return "green.100";
    else return "red.100";
  };
  const statusColor = () => {
    if (status === "Pending Confirmation") return "#E9C46A";
    else if (status === "Confirmed") return "green.400";
    else return "red.400";
  };
  return (
    <Tr fontSize={"14px"} color="text.grey">
      <Td>{email}</Td>
      <Td>{investmentPlan}</Td>
      <Td color="text.black" fontWeight={"600"}>
        {mop.currency}({mop.number})
      </Td>
      <Td color="text.black" fontWeight={"600"}>
        {amount}
      </Td>
      <Td>
        <Text
          textAlign="center"
          rounded="md"
          bg={statusBg}
          color={statusColor}
          fontWeight={600}
          fontSize="12px"
        >
          {status}
        </Text>
      </Td>
      <Td color={copied ? "green.400" : "text.black"} fontWeight={"600"}>
        {copied ? "Copied!" : walletAddress}
      </Td>
      <Td>
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
            <MenuItem>Confirm</MenuItem>
            <MenuItem>Decline</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default PendingWithdrawalRow;
