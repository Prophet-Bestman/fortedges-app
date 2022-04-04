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
import ViewVerification from "./ViewVerification";

const PedingVerificationRow = ({ verification }) => {
  const { fullName, email, verificationDetails } = verification;
  const {
    isOpen: isPOPOpen,
    onOpen: onPOPOpen,
    onClose: onPOPClose,
  } = useDisclosure();

  return (
    <Tr fontSize={"14px"} color="text.grey">
      <Td>{fullName}</Td>
      <Td>{email}</Td>
      <Td d="flex" gap="12px">
        <Button
          size="xs"
          px="8px"
          py="4px"
          variant="secondary"
          onClick={onPOPOpen}
        >
          View
        </Button>
        <Button
          size="xs"
          px="8px"
          py="4px"
          variant="outline"
          //   onClick={onPOPOpen}
        >
          Approve Verification
        </Button>
      </Td>
      {/* <Td>
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
      </Td> */}

      <ViewVerification
        isOpen={isPOPOpen}
        onClose={onPOPClose}
        verificationDetails={verificationDetails}
      />
    </Tr>
  );
};

export default PedingVerificationRow;
