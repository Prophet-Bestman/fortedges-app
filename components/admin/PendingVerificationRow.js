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

      <ViewVerification
        isOpen={isPOPOpen}
        onClose={onPOPClose}
        verificationDetails={verificationDetails}
      />
    </Tr>
  );
};

export default PedingVerificationRow;
