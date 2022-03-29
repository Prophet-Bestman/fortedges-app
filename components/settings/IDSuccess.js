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

const IDSuccess = ({ isOpen, onClose }) => {
  const router = useRouter();
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent maxW="380px">
        <ModalBody mb="40px">
          <Flex justifyContent="center">
            <Circle mt="50px" mb="40px" size="100px" bg="#7950DA0D">
              <Image src="/img/ID_card.svg" />
            </Circle>
          </Flex>

          <Text
            color="text.bladk"
            my="24px"
            fontWeight="600"
            textAlign="center"
          >
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

export default IDSuccess;
