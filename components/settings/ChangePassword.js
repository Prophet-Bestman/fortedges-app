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
} from "@chakra-ui/react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordSchema } from "utils";
import { MdError } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const ChangePassword = ({ isOpen, onClose }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const handleChangePassword = (data) => {
    console.log(data);
    console.log("Password", errors.oldPassword);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <ModalContent py="24px" px="12px" maxW="380px">
          <ModalHeader d="flex" justifyContent="space-between">
            <Text>Change Email Address</Text>
            <AiOutlineClose onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <Stack mb="32px">
              <Text fontWeight="400" color="text.grey" fontSize="14px">
                Old password
              </Text>
              <Input
                {...register("oldPassword")}
                type="password"
                control={control}
                size="sm"
                variant={errors.oldPassword ? "error" : "outline"}
              />
              {errors.oldPassword && (
                <Text
                  display="flex"
                  color="red"
                  fontSize={"12px"}
                  alignItems="center"
                  gap="4px"
                >
                  <MdError size="16px" /> {errors.oldPassword.message}
                </Text>
              )}
            </Stack>
            <Stack mb="32px">
              <Text fontWeight="400" color="text.grey" fontSize="14px">
                New password
              </Text>
              <Input
                size="sm"
                {...register("newPassword")}
                control={control}
                type="password"
                variant={errors.newPassword ? "error" : "outline"}
              />
              {errors.newPassword && (
                <Text
                  display="flex"
                  color="red"
                  fontSize={"12px"}
                  alignItems="center"
                  gap="4px"
                >
                  <MdError size="16px" /> {errors.newPassword.message}
                </Text>
              )}
            </Stack>
            <Stack mb="32px" borderBottomWidth="1px" borderColor="#E2E0E0">
              <Text fontWeight="400" color="text.grey" fontSize="14px">
                Confirm password
              </Text>
              <Input
                size="sm"
                {...register("confirmPassword")}
                control={control}
                type="password"
                variant={errors.confirmPassword ? "error" : "outline"}
              />
              {errors.confirmPassword && (
                <Text
                  display="flex"
                  color="red"
                  fontSize={"12px"}
                  alignItems="center"
                  gap="4px"
                >
                  <MdError size="16px" /> {errors.confirmPassword.message}
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
          </ModalBody>
          <ModalFooter display="flex" gap="12px" justifyContent="space-between">
            <Button size="md" onClick={onClose} variant="secondary">
              Close
            </Button>
            <Button type="submit" size="md">
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ChangePassword;
