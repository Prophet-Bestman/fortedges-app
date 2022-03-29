import {
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Circle,
  Image,
  Text,
  Button,
  ModalBody,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

const AccountSuccess = ({ isOpen, onClose }) => {
  const router = useRouter();
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent maxW="380px">
        <ModalBody mb="40px">
          <Flex justifyContent="center">
            <Circle
              mt="50px"
              mb="40px"
              size="100px"
              bg="#7950DA0D"
              color="app.primary"
            >
              <AiOutlineCheck size="40px" />
            </Circle>
          </Flex>

          <Text color="text.black" my="8px" textAlign="center">
            Request Successful
          </Text>
          <Text color="text.grey" my="24px" textAlign="center">
            We will now confirm your identity. You will be notified when the
            Verification is complete
          </Text>

          <Button
            onClick={() => {
              router.push("/");
              onClose();
            }}
            w="full"
          >
            Go Home
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AccountSuccess;
