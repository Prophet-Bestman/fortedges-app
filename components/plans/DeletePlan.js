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
import { useRouter } from "next/router";
import { PlanContext } from "providers/PlanProvider";
import React, { useEffect, useContext, useState } from "react";
import { BsExclamationLg } from "react-icons/bs";

const DeletePlan = ({ isOpen, onClose }) => {
  const { plan } = useContext(PlanContext);
  const [deleteError, setDeleteError] = useState("");

  const toast = useToast();

  const router = useRouter();

  const successToast = () => {
    toast({
      title: "Plan Deleted",
      description: "Redirecting...",
      status: "success",
      duration: 1400,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const errorToast = () => {
    toast({
      title: "Try Again Later",
      description: deleteError,
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const { mutate: deletePlan, data: deleteResp, isLoading } = useDeletPlan();

  const handleDeletePlan = () => {
    deletePlan(plan?._id);
  };

  useEffect(() => {
    if (!!deleteResp) {
      if (deleteResp?.status === 204) {
        onClose();
        successToast();
        router.push("/myplans");
      } else {
        setDeleteError("Error Occurred while trying to update plan");
      }
    }
  }, [deleteResp]);

  useEffect(() => {
    if (!!deleteError && deleteError !== "") {
      errorToast();
      setDeleteError("");
    }
  }, [deleteError]);

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
            Are you sure you want to delete this plan
          </Text>

          <Text
            fontSize={"14px"}
            color="text.grey"
            textAlign="center"
            mb="24px"
          >
            Once deleted, action cannot be reversed
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button mr="16px" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleDeletePlan}
            isLoading={isLoading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
      {/* {children} */}
    </Modal>
  );
};

export default DeletePlan;
