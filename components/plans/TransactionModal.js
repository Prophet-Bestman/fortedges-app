import {
  Circle,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const TransactionModal = ({ isOpen, onClose, transaction }) => {
  const { status, date, amount, transactionRef, modeOfPayment } = transaction;
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
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="20px" color="text.black" fontWeight={600}>
            Deposit Details
          </Text>
          <Circle onClick={onClose} cursor="pointer" bg="#F1F2F4" size="40px">
            <AiOutlineClose />
          </Circle>
        </Flex>
        <ModalBody my="32px">
          <Flex justifyContent={"space-between"} alignItems="center" mb="20px">
            <Text color="text.grey" fontSize="13px">
              Status
            </Text>
            <Text fontWeight={600} color="text.black" fontSize="14px">
              {status === "Pending" ? (
                <Flex alignItems="center" gap="12px">
                  <Circle size="6px" bg="yellow.400"></Circle> System Processing
                </Flex>
              ) : (
                <Flex alignItems="center" gap="12px">
                  <Circle size="6px" bg="green.300"></Circle> Successful
                </Flex>
              )}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems="center" mb="20px">
            <Text color="text.grey" fontSize="13px">
              Date
            </Text>
            <Text fontWeight={600} color="text.black" fontSize="14px">
              {date}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems="center" mb="20px">
            <Text color="text.grey" fontSize="13px">
              Amount
            </Text>
            <Text fontWeight={600} color="text.black" fontSize="14px">
              {amount}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems="center" mb="20px">
            <Text color="text.grey" fontSize="13px">
              Transaction Ref
            </Text>
            <Text fontWeight={600} color="text.black" fontSize="14px">
              {transactionRef}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems="center" mb="20px">
            <Text color="text.grey" fontSize="13px">
              Payment Method
            </Text>
            <Text fontWeight={600} color="text.black" fontSize="14px">
              {modeOfPayment}
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
