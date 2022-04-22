import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Flex,
  Circle,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useSendChangePasswordCode } from "api/auth";
import React, { useEffect, useState } from "react";
import { BsExclamationLg } from "react-icons/bs";
import ChangePassword from "./ChangePassword";

const ConfirmPasswordChange = ({ isOpen, onClose }) => {
  const {
    isOpen: isChangePasswordOpen,
    onOpen: onChangePasswordOpen,
    onClose: onChangePasswordClose,
  } = useDisclosure();

  const close = () => {
    onClose();
  };

  const closeParent = () => {
    close();
    onChangePasswordClose();
  };

  const toast = useToast();

  const errorToast = () => {
    toast({
      title: "An Error Occured",
      description: "Try again later",
      status: "error",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const {
    data,
    isFetching,
    error,
    refetch: sendEmail,
  } = useSendChangePasswordCode();

  const handleSendEmail = () => {
    sendEmail();
  };

  useEffect(() => {
    if (data !== undefined) {
      if (data.status === 200) {
        onChangePasswordOpen();
      } else if (data.data.toString().includes("Error")) {
        errorToast();
      }
    }
  }, [data]);

  useEffect(() => {
    if (!!error) {
      errorToast();
    }
  }, [error]);

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
            Are you sure you want to change password!
          </Text>

          <Text
            fontSize={"14px"}
            color="text.grey"
            textAlign="center"
            mb="24px"
          >
            Withdrawals will be disabled for 24 hours after you make this change
            to protect your account.
          </Text>

          <Flex>
            <Button mr="16px" variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSendEmail}
              isLoading={isFetching}
            >
              Confirm
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
      <ChangePassword
        isOpen={isChangePasswordOpen}
        onClose={onChangePasswordClose}
        closeParent={closeParent}
      />
    </Modal>
  );
};

export default ConfirmPasswordChange;
