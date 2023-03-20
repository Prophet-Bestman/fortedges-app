import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useWithdraw } from "api/transactions";
import ErrorModal from "components/ErrorModal";
import React, { useState, useEffect } from "react";
import WithdrawalSuccess from "./WithdrawalSuccess";

const EnterVerificationCodeModal = ({ isOpen, onClose, payload }) => {
  const [code, setCode] = useState("");
  const [withdrawData, setWithdrawData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const toast = useToast();

  const invalidCodeToast = () => {
    toast({
      title: "Validation Error",
      description: "You entered a wrong code",
      status: "error",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();

  const closeParent = () => {
    onErrorClose();
    onSuccessClose();
    onClose();
  };

  const { mutate: withdraw, data, isLoading, error } = useWithdraw();

  const handleSubmit = (e) => {
    e.preventDefault();
    payload = {
      ...payload,
      code: code,
    };
    withdraw(payload);
  };

  useEffect(() => {
    if (data !== undefined) {
      if (data.toString().includes("Error")) {
        if (data.toString().includes("400")) {
          invalidCodeToast();
        } else onErrorOpen();
      } else {
        setWithdrawData(data);
        onSuccessOpen();
      }
    }
  }, [data]);

  useEffect(() => {
    if (!!error) {
      setErrorMessage("Invalid Code");
      onErrorOpen();
      return setErrorMessage("");
    }
  }, [error]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pos="absolute" bottom={0} py="30px" mb="0">
          <ModalBody>
            <Box>
              <Text fontSize="14px" textAlign="center">
                Enter the 2-step verification code we sent to your email
                <br />
                <strong>
                  {`If you haven’t recieved our email in 15 minutes. Please check your
            spam folder.`}
                </strong>
              </Text>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Flex
                  alignItems={"center"}
                  flexDir="column"
                  justifyContent={"center"}
                  my="8px"
                >
                  <HStack
                    borderRadius="8px"
                    borderWidth={"1px"}
                    borderColor={"#0000001A"}
                    px="12px"
                    py="4px"
                  >
                    <PinInput onChange={(e) => setCode(e)}>
                      <PinInputField required border="none" w="12px" />
                      <PinInputField required border="none" w="12px" />
                      <PinInputField required border="none" w="12px" />
                      <PinInputField required border="none" w="12px" />
                      <PinInputField required border="none" w="12px" />
                      <PinInputField required border="none" w="12px" />
                    </PinInput>
                  </HStack>
                </Flex>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  w="full"
                  size="sm"
                  my="20px"
                >
                  Next
                </Button>
              </form>
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

            <Box
              borderTopWidth="1px"
              borderColor={"#E2E0E0"}
              py="24px"
              mt="24px"
            >
              <Text textAlign="center" fontSize="14px">
                {
                  " Security is critical at Ubassets. To help keep your account safe, we'll text you a verification code when you sign in on a new device."
                }
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ErrorModal
        isOpen={isErrorOpen}
        closeParent={closeParent}
        msg={"An Error Occurred! Try Again Later."}
      />
      {!!withdrawData && Object.keys(withdrawData).length > 0 && (
        <WithdrawalSuccess
          isOpen={isSuccessOpen}
          onClose={closeParent}
          data={withdrawData}
        />
      )}
    </>
  );
};

export default EnterVerificationCodeModal;
