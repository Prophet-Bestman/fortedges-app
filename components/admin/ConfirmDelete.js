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
import { useDeletPlan } from "api/plans";
import React, { useState, useEffect } from "react";
import { BsExclamationLg } from "react-icons/bs";

const ConfirmDeleteModal = ({ isOpen, onClose, planID, closeParent }) => {
  const toast = useToast();
  const errorToast = () => {
    toast({
      title: "Try Again Later",
      description: "Error occurred while trying to delete plan",
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const successToast = () => {
    toast({
      title: "Delete Successful",
      description: "You have successfully deleted this plan",
      status: "success",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  // =====DELETE PLAN LOGIC =======
  const {
    data: deleteData,
    mutate: deletePlan,
    isLoading: deleting,
  } = useDeletPlan();

  const deleteUserPlan = () => {
    deletePlan(planID);
  };

  useEffect(() => {
    if (deleteData !== undefined) {
      if (deleteData.status === 204) {
        successToast();
        closeParent();
      } else {
        errorToast();
      }
    }
  }, [deleteData]);

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
            Delete Plan
          </Text>

          <Text
            fontSize={"14px"}
            color="text.grey"
            textAlign="center"
            mb="24px"
          >
            Are you sure you want to delete this plan?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button mr="16px" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={deleteUserPlan}
            isLoading={deleting}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
      {/* {children} */}
    </Modal>
  );
};

export default ConfirmDeleteModal;
