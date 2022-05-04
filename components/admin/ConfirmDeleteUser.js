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
import { useDeleteUser } from "api/user";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsExclamationLg } from "react-icons/bs";

const ConfirmDeleteUser = ({ isOpen, onClose, userID }) => {
  const router = useRouter();

  const toast = useToast();
  const errorToast = () => {
    toast({
      title: "Try Again Later",
      description: "Error occurred while trying to delete user",
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const successToast = () => {
    toast({
      title: "User Delted Successfully",
      description: "Redirecting to users list",
      status: "success",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  // =====DELETE USER LOGIC =======
  const {
    data: deleteData,
    mutate: deleteUser,
    isLoading: deleting,
  } = useDeleteUser();

  const handleDeleteUser = () => {
    deleteUser(userID);
  };

  useEffect(() => {
    if (deleteData !== undefined) {
      if (deleteData.status === 200) {
        successToast();
        onClose();
        router.push("/admin/users");
      } else {
        errorToast();
      }
    }
  }, [deleteData]);

  console.log(deleteData);

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
            Delete User
          </Text>

          <Text
            fontSize={"14px"}
            color="text.grey"
            textAlign="center"
            mb="24px"
          >
            Are you sure you want to delete this user?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button mr="16px" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleDeleteUser}
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

export default ConfirmDeleteUser;
