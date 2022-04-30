import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
  Circle,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAdminAddBalance } from "api/transactions";
import React, { useState, useEffect } from "react";
import { BsExclamationLg } from "react-icons/bs";

const ConfirmClearBalance = ({ isOpen, onClose, planID, closeParent }) => {
  const toast = useToast();
  const errorToast = () => {
    toast({
      title: "Try Again Later",
      description: "Error occurred while trying to clear balance",
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const successToast = () => {
    toast({
      title: "Balance Cleared",
      description: "You have successfully cleared this plan's balance",
      status: "success",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  // =====DELETE PLAN LOGIC =======
  const {
    data: clearData,
    mutate: clearBalance,
    isLoading: clearing,
  } = useAdminAddBalance();

  const deleteUserPlan = () => {
    const payload = {
      amount: 0,
      plan_id: planID,
      description: "Clear balance",
    };
    clearBalance(payload);
  };

  useEffect(() => {
    if (clearData !== undefined) {
      if (clearData.status === 200) {
        successToast();
        closeParent();
      } else {
        errorToast();
      }
    }
  }, [clearData]);

  console.log("ClearedResp: ", clearData);

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent py="14px" maxW="380px">
        <ModalBody color="text.black">
          <Flex justify="center">
            <Circle size="64px" bg="#F1F2F4">
              <BsExclamationLg size="24px" />
            </Circle>
          </Flex>
          <Text fontSize="20px" fontWeight={600} textAlign="center" my="32px">
            Clear Balance
          </Text>

          <Text
            fontSize={"14px"}
            color="text.grey"
            textAlign="center"
            mb="24px"
          >
            Are you sure you want to clear this balance?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button mr="16px" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={deleteUserPlan}
            isLoading={clearing}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
      {/* {children} */}
    </Modal>
  );
};

export default ConfirmClearBalance;
