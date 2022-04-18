import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Box,
  Button,
  Flex,
  Circle,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsExclamationLg } from "react-icons/bs";

const ConfirmEmailChange = ({ isOpen, onClose, openModal, text, title }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent py="14px" maxW="380px">
        <ModalBody color="text.black">
          <Flex justify="center">
            <Circle size="64px" bg="#F1F2F4">
              <BsExclamationLg size="24px" />
            </Circle>
          </Flex>
          <Text fontSize="20px" fontWeight={600} textAlign="center" my="32px">
            Change Email!
          </Text>

          <Text
            fontSize={"14px"}
            color="text.grey"
            textAlign="center"
            mb="24px"
          >
            Are you sure you want to change email
          </Text>

          <Box>
            <form></form>
          </Box>
          <Button mr="16px" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={async () => {
              openModal && (await openModal());
              onClose();
            }}
          >
            Confirm
          </Button>
        </ModalBody>
      </ModalContent>
      {/* {children} */}
    </Modal>
  );
};

export default ConfirmEmailChange;
