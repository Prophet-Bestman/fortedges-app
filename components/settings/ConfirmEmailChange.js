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
  Stack,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeEmailSchema } from "utils";
import { MdError } from "react-icons/md";
import { useSendChangeEmailCode } from "api/auth";
import ErrorModal from "components/ErrorModal";
import { useToast } from "@chakra-ui/react";

const ConfirmEmailChange = ({ isOpen, onClose, openModal }) => {
  const [sendCodeResponse, setSendCodeResponse] = useState({});
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeEmailSchema),
  });

  const { isOpen: isErrorOpen, onOpen: onErrorOpen } = useDisclosure();

  const toast = useToast();
  const emailSentToast = () => {
    toast({
      title: "Confirmation Code Sent",
      description: "Check your email and copy confirmation code",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const {
    mutate: sendCode,
    data: sendCodeResp,
    isLoading,
  } = useSendChangeEmailCode();

  const sendEmailChangeCode = (data) => {
    const payload = {
      new_email: data.newEmail,
    };

    sendCode(payload);
  };

  useEffect(() => {
    if (sendCodeResp !== undefined) {
      if (sendCodeResp.toString().includes("Error")) {
        onErrorOpen();
      } else {
        setSendCodeResponse(sendCodeResp);
        emailSentToast();
        openModal();
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    }
  }, [sendCodeResp]);

  const close = () => {
    reset();
    setSendCodeResponse({});
    onClose();
  };

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
            <form onSubmit={handleSubmit(sendEmailChangeCode)}>
              <Stack mb="32px">
                <Text fontWeight="400" color="text.grey" fontSize="14px">
                  New Email Address
                </Text>
                <Input
                  {...register("newEmail")}
                  type="email"
                  control={control}
                  // required
                  size="sm"
                  variant={errors.newEmail ? "error" : "outline"}
                />
                {errors.newEmail && (
                  <Text
                    display="flex"
                    color="red"
                    fontSize={"12px"}
                    alignItems="center"
                    gap="4px"
                  >
                    <MdError size="16px" /> {errors.newEmail.message}
                  </Text>
                )}
              </Stack>

              <Flex gap="16px">
                <Button mr="16px" variant="secondary" onClick={close}>
                  Cancel
                </Button>
                <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                  Confirm
                </Button>
              </Flex>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
      <ErrorModal
        isOpen={isErrorOpen}
        msg={"An Error Occurred. Try Again Later "}
      />
    </Modal>
  );
};

export default ConfirmEmailChange;
