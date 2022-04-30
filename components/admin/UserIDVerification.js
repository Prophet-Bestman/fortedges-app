import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useAdminVerifyID } from "api/verification";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const UserIDVerification = ({ isOpen, onClose, idVerificationDetails }) => {
  const { image, user } = idVerificationDetails;
  const { front, back } = image;

  const toast = useToast();

  const successToast = () => {
    toast({
      title: "User Verified",
      description: "You have verified this user successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const {
    mutate: verifyUser,
    data: verifyData,
    isLoading,
  } = useAdminVerifyID();

  const handleVerified = () => {
    const data = {
      user_id: user._id,
      payload: {
        status: "accepted",
      },
    };

    verifyUser(data);
  };

  useEffect(() => {
    if (verifyData !== undefined && Object.keys(verifyData).length > 0)
      successToast();
    onClose();
  }, [verifyData]);

  return (
    <Modal isOpen={isOpen} size="full" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxW={"500px"}>
        <ModalHeader mt="24px" d="flex" justifyContent="space-between">
          <Text>User Verification</Text>
          <AiOutlineClose onClick={onClose} />
        </ModalHeader>
        <ModalBody px="24px" py="30px">
          {idVerificationDetails !== undefined &&
          Object.keys(idVerificationDetails).length > 0 ? (
            <Box>
              <Flex justifyContent="center" h="350px" bg="gray.100" mb="20px">
                <Image src={front.path} w="full" mb="4" objectFit="contain" />
              </Flex>
              <Flex justifyContent="center" h="450px" bg="gray.100">
                <Image src={back.path} w="full" mb="4" objectFit="contain" />
              </Flex>
              <Button onClick={handleVerified} w="full" isLoading={isLoading}>
                Verify
              </Button>
            </Box>
          ) : (
            <Text
              textAlign="center"
              fontWeight={600}
              fontSize={"30px"}
              color="red.500"
            >
              No ID Submited
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserIDVerification;
