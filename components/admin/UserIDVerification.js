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
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";

const UserIDVerification = ({ isOpen, onClose, idVerificationDetails }) => {
  return (
    <Modal isOpen={isOpen} size="full" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxW={"500px"}>
        <ModalHeader mt="24px" d="flex" justifyContent="space-between">
          <Text>User Verification</Text>
          <AiOutlineClose onClick={onClose} />
        </ModalHeader>
        <ModalBody px="24px" py="30px">
          {idVerificationDetails.length > 0 ? (
            <Box>
              {idVerificationDetails.map((item, i) => (
                <Flex justifyContent="center">
                  <Image src={item.img} w="400px" mb="4" objectFit="contain" />
                </Flex>
              ))}
              <Button onClick={onClose} w="full">
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
