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
  useToast,
} from "@chakra-ui/react";
import { useVerifyLogIn } from "api/auth";
import { useRouter } from "next/router";
import { AuthContext, userActions } from "providers/AuthProvider";
import React, { useState, useEffect, useContext } from "react";
import { config } from "utils";

const VerifyAdminLogin = ({ isOpen, onClose, payload }) => {
  const { dispatch, getRedirect, clearRedirect } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const toast = useToast();

  const errorToast = () => {
    toast({
      title: "Validation Error",
      description: errorMessage,
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const nonAdminToast = () => {
    toast({
      title: "Invalid Admin",
      description: "You are not an admin. Login with an admin account",
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const successToast = () => {
    toast({
      title: "Validation Successful",
      description: "Redirecting to dashboard...",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const {
    mutate: verify,
    data: loginData,
    isLoading,
    error,
  } = useVerifyLogIn();

  const handleSubmit = (e) => {
    e.preventDefault();
    payload = {
      data: { ...payload },
      code: code,
    };
    verify(payload);
  };

  useEffect(() => {
    if (!!loginData && loginData?.status === 200) {
      if (loginData?.data?.user) {
        if (loginData?.data?.user?.access_level < 2) {
          nonAdminToast();
        } else {
          const token = config.key.token;
          const wallet = config.key.wallet;
          const userID = config.key.userID;
          const walletData = JSON.stringify(loginData?.data.wallet);
          localStorage.clear();
          dispatch({ type: userActions.LOGIN, payload: loginData?.data.user });
          localStorage.setItem(token, loginData?.data.user.access_token);
          localStorage.setItem(wallet, walletData);
          localStorage.setItem(userID, loginData?.data.user._id);
          successToast();

          const redirect = getRedirect();
          clearRedirect();
          !!redirect ? router.push(redirect) : router.push("/admin");
        }
      }
    }
  }, [loginData]);

  useEffect(() => {
    if (!!error) {
      if (error.message === "Request failed with status code 400") {
        setErrorMessage(
          "Incorrect code or password. Confirm them and try again"
        );
      } else if (
        error.message === "Request failed with status code 404" ||
        error.message === "Request failed with status code 500"
      ) {
        setErrorMessage("Incorrect password. Enter correct password and retry");
      }
    }
  }, [error]);

  useEffect(() => {
    if (!!errorMessage && errorMessage !== "") {
      errorToast();
      setErrorMessage("");
    }
  }, [errorMessage]);

  return (
    <>
      <Modal isOpen={isOpen}>
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
                <Text cursor="pointer" color="app.primary" onClick={onClose}>
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
                  " Security is critical at Ubassets. To help keep your account safe, we'll text you a verification code when you sign in"
                }
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerifyAdminLogin;
