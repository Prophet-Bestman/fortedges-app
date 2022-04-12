import {
  Box,
  Circle,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SuccessModalContext } from "providers/SuccessModalProvider";
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

const SuccessModal = ({ isOpen, msg }) => {
  //   const { successModalState, dispatch: setOpen } =
  //     useContext(SuccessModalContext);
  //   const isOpen = successModalState.isOpen;
  //   const msg = successModalState.msg;
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent py="14px" px="24px" w="full">
        <Box w="full" h="full" position="relative">
          <Circle
            pos="absolute"
            right={0}
            onClick={() => router.reload()}
            cursor="pointer"
            size="40px"
          >
            <AiOutlineClose />
          </Circle>
        </Box>

        <ModalBody px="0">
          <Flex
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            mb="20px"
          >
            <Image src="/img/success.svg" mb="20px" />

            <Box w="full" maxW={"380px"}>
              <Text
                textAlign="center"
                fontWeight="600"
                mb="40px"
                fontSize={"20px"}
              >
                {msg}
              </Text>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
