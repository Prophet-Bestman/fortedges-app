import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Text,
  PinInput,
  PinInputField,
  HStack,
  Input,
  Stack,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeEmailSchema } from "utils";
import { MdError } from "react-icons/md";
import VerifyEmail from "./VerifyEmail";

const ChangeEmail = ({ isOpen, onClose }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeEmailSchema),
  });

  const {
    isOpen: isVerifyOpen,
    onOpen: onVerifyOpen,
    onClose: onVerifyClose,
  } = useDisclosure();

  const handleChangeEmail = async (data) => {
    console.log(data);
    onVerifyOpen();
  };

  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay />
      <ModalContent py="24px" px="12px" maxW="380px">
        <ModalHeader>
          <Text>Change Email Address</Text>
        </ModalHeader>
        <ModalCloseButton
          mt="24px"
          rounded="full"
          _focus={{
            outline: "none",
          }}
        />
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
                  <PinInput>
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
                <Text cursor="pointer" color="app.primary">
                  Re-send
                </Text>
              </Box>
            </Box>
            <Flex mt="30px" gap="12px">
              <Button size="md" onClick={onClose} variant="secondary">
                Close
              </Button>
              <Button type="submit" size="md">
                Confirm
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
      <VerifyEmail
        email={"Bl **** @gmail.com"}
        isOpen={isVerifyOpen}
        onClose={onVerifyClose}
      />
    </Modal>
  );
};

export default ChangeEmail;
