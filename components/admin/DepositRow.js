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
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const DepositRow = ({ deposit }) => {
  const { email, investmentPlan, date, mop, amount, status, pop } = deposit;
  const {
    isOpen: isPOPOpen,
    onOpen: onPOPOpen,
    onClose: onPOPClose,
  } = useDisclosure();
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
      <Td color="text.black" fontWeight={"600"}>
        {date}
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
            <MenuItem>Confirm</MenuItem>
            <MenuItem>Decline</MenuItem>
          </MenuList>
        </Menu>
      </Td>

      <Modal isOpen={isPOPOpen} onClose={onPOPClose}>
        <ModalOverlay />
        <ModalBody>
          <ModalContent>
            <Image src={pop} w="full" objectFit="contain" />
          </ModalContent>
        </ModalBody>
      </Modal>
    </Tr>
  );
};

export default DepositRow;
