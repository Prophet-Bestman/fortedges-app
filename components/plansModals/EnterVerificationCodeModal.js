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
} from "@chakra-ui/react";
import React from "react";

const EnterVerificationCodeModal = ({ isOpen, onClose, onSuccessOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccessOpen();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pos="absolute" bottom={0} py="30px" mb="0">
        <ModalBody>
          <Box>
            <Text fontSize="14px" textAlign="center">
              Enter the 2-step verification code we sent to your email
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
                  <PinInput>
                    <PinInputField required border="none" w="12px" />
                    <PinInputField required border="none" w="12px" />
                    <PinInputField required border="none" w="12px" />
                    <PinInputField required border="none" w="12px" />
                    <PinInputField required border="none" w="12px" />
                    <PinInputField required border="none" w="12px" />
                  </PinInput>
                </HStack>
              </Flex>

              <Button type="submit" w="full" size="sm" my="20px">
                Send
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

          <Box borderTopWidth="1px" borderColor={"#E2E0E0"} py="24px" mt="24px">
            <Text textAlign="center" fontSize="14px">
              Security is critical at FortEdges. To help keep your account safe,
              we'll text you a verification code when you sign in on a new
              device.
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EnterVerificationCodeModal;
