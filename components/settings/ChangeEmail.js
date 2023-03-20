import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Button,
  Text,
  PinInput,
  PinInputField,
  HStack,
  Input,
  Stack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeEmailSchema } from "utils";
import { MdError } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useChangeEmail } from "api/auth";
import { useRouter } from "next/router";

const ChangeEmail = ({ isOpen, onClose, openConfirmEmailChange }) => {
  const [code, setCode] = useState("");
  const [emailChangeError, setEmailChangeError] = useState("");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeEmailSchema),
  });

  const router = useRouter();

  const {
    mutate: changeEmail,
    isLoading,
    data: emailChngeResp,
    error,
  } = useChangeEmail();

  const toast = useToast();

  const emailChangedToast = () => {
    toast({
      title: "Email Changed",
      description: "Your email has been successfully changed!",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const invalidCodeToast = () => {
    toast({
      title: "Invalid Code",
      description: "Check your old password or verification code",
      status: "error",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  // CHANGE EMAIL LOGIC
  const handleChangeEmail = async (data) => {
    const payload = {
      new_email: data.newEmail,
      code: code,
    };
    changeEmail(payload);
  };

  useEffect(() => {
    if (emailChngeResp !== undefined) {
      if (!emailChngeResp.toString().includes("Error")) {
        emailChangedToast();
        router.push("/");
        setTimeout(() => {
          onClose();
        }, 1000);
      }
      if (emailChngeResp.toString().includes("Invalid code")) {
        setEmailChangeError(error);
      }
    }
  }, emailChngeResp);

  const handleResend = () => {
    openConfirmEmailChange();
    setTimeout(() => {
      onClose();
    }, 400);
  };

  useEffect(() => {
    setEmailChangeError(error);
  }, [error]);

  useEffect(() => {
    if (!!emailChangeError && emailChangeError.toString().includes("Invalid"))
      invalidCodeToast();
  }, [emailChangeError]);

  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay />
      <ModalContent py="24px" px="12px" maxW="380px">
        <ModalHeader d="flex" justifyContent="space-between">
          <Text>Change Email Address</Text>
          <AiOutlineClose onClick={onClose} />
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit(handleChangeEmail)}>
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

            <Box>
              <Text fontSize="14px" textAlign="center">
                Enter the 2-step verification code we sent to your email
                <br />
                {`If you haven’t recieved our email in 15 minutes. Please check your
            spam folder.`}
              </Text>
              <Flex
                alignItems={"center"}
                flexDir="column"
                justifyContent={"center"}
                my="8px"
              >
                <HStack
                  borderRadius="8px"
                  borderWidth={"1px"}
                  borderColor={errors.authCode ? "red" : "#0000001A"}
                  px="12px"
                  py="4px"
                >
                  <PinInput
                    onChange={(e) => setCode(e)}
                    otp
                    mask
                    type="alphanumeric"
                  >
                    <PinInputField required border="none" w="12px" />
                    <PinInputField required border="none" w="12px" />
                    <PinInputField required border="none" w="12px" />
                    <PinInputField required border="none" w="12px" />
                    <PinInputField required border="none" w="12px" />
                    <PinInputField required border="none" w="12px" />
                  </PinInput>
                </HStack>
                {errors.authCode && (
                  <Text
                    display="flex"
                    color="red"
                    fontSize={"12px"}
                    alignItems="center"
                    gap="4px"
                  >
                    <MdError size="16px" /> {errors.authCode.message}
                  </Text>
                )}
              </Flex>
              <Box display="flex" justifyContent="center">
                <Text
                  fontSize="14px"
                  textAlign="center"
                  mr="8px"
                  _hover={{
                    textDecor: "underline",
                  }}
                >
                  {"Didn’t recieve the code? "}
                </Text>
                <Box></Box>
                <Text
                  cursor="pointer"
                  color="app.primary"
                  onClick={handleResend}
                >
                  Re-send
                </Text>
              </Box>
            </Box>

            <Flex mt="30px" gap="12px">
              <Button size="md" onClick={onClose} variant="secondary">
                Close
              </Button>
              <Button type="submit" size="md" isLoading={isLoading}>
                Confirm
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChangeEmail;
