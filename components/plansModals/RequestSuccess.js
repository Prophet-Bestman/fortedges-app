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
import { transactionHistory } from "data";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const RequestSuccess = ({ isOpen }) => {
  const { date, modeOfPayment, status, transactionRef, amount } =
    transactionHistory[0];

  const router = useRouter();

  return (
    <Modal isOpen={isOpen} size>
      <ModalOverlay />
      <ModalContent
        py="14px"
        px="24px"
        m="0"
        pos="absolute"
        bottom={0}
        left="0"
        w="full"
        minH="400px"
      >
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
                Deposit Request <br /> Submitted
              </Text>

              <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb="20px"
                w="full"
              >
                <Text color="text.grey" fontSize="13px">
                  Status
                </Text>
                <Text fontWeight={600} color="text.black" fontSize="14px">
                  {status === "Pending" ? (
                    <Flex alignItems="center" gap="12px">
                      <Circle size="6px" bg="yellow.400"></Circle> System
                      Processing
                    </Flex>
                  ) : (
                    <Flex alignItems="center" gap="12px">
                      <Circle size="6px" bg="green.300"></Circle> Successful
                    </Flex>
                  )}
                </Text>
              </Flex>
              <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb="20px"
              >
                <Text color="text.grey" fontSize="13px">
                  Date
                </Text>
                <Text fontWeight={600} color="text.black" fontSize="14px">
                  {date}
                </Text>
              </Flex>
              <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb="20px"
              >
                <Text color="text.grey" fontSize="13px">
                  Amount
                </Text>
                <Text fontWeight={600} color="text.black" fontSize="14px">
                  {amount}
                </Text>
              </Flex>
              <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb="20px"
              >
                <Text color="text.grey" fontSize="13px">
                  Transaction Ref
                </Text>
                <Text fontWeight={600} color="text.black" fontSize="14px">
                  {transactionRef}
                </Text>
              </Flex>
              <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb="20px"
              >
                <Text color="text.grey" fontSize="13px">
                  Payment Method
                </Text>
                <Text fontWeight={600} color="text.black" fontSize="14px">
                  {modeOfPayment}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RequestSuccess;
