import {
  Box,
  Circle,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { formatter } from "utils";

const statusColor = (status) => {
  if (status === "processing") return "#E9C46A";
  else if (status === "successful") return "green.400";
  else return "red.400";
};

const TransactionModal = ({ isOpen, onClose, transaction }) => {
  const { status, createdAt, type, amount, id, mode_of_payment } = transaction;
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
        minH="300px"
      >
        <Flex justifyContent="center">
          <Box w="full" maxW="500px">
            <Flex justifyContent="space-between" alignItems="center">
              <Text
                fontSize="20px"
                color="text.black"
                fontWeight={600}
                textTransform="capitalize"
              >
                {type} Details
              </Text>
              <Circle
                onClick={onClose}
                cursor="pointer"
                bg="#F1F2F4"
                size="40px"
              >
                <AiOutlineClose />
              </Circle>
            </Flex>
            <ModalBody my="32px">
              <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb="20px"
              >
                <Text color="text.grey" fontSize="13px">
                  Status
                </Text>
                <Text fontWeight={600} color="text.black" fontSize="14px">
                  <Flex alignItems="center" gap="12px">
                    <Circle size="8px" bg={statusColor(status)}></Circle>
                    <Text textTransform={"capitalize"}>{status}</Text>
                  </Flex>
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
                  {format(new Date(createdAt), "dd/MM/yyyy")}
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
                  {formatter.format(amount)}
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
                  {id}
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
                <Text
                  fontWeight={600}
                  color="text.black"
                  fontSize="14px"
                  textTransform="uppercase"
                >
                  {mode_of_payment}
                </Text>
              </Flex>
            </ModalBody>
          </Box>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
