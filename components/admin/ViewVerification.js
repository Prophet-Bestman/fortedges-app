import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { users } from "data";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import UserIDVerification from "./UserIDVerification";

const ViewVerification = ({ isOpen, onClose, verificationDetails }) => {
  const { emailVerification, idVerification, idVerificationDetails } =
    verificationDetails;
  const {
    isOpen: isVerifyOpen,
    onOpen: onVerifyOpen,
    onClose: onVerifyClose,
  } = useDisclosure();
  return (
    <Modal isOpen={isOpen} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt="24px" d="flex" justifyContent="space-between">
          <Text>User Verification</Text>
          <AiOutlineClose onClick={onClose} />
        </ModalHeader>
        <ModalBody px="24px" py="30px">
          <Box my="30px">
            <Flex
              py="16px"
              justifyContent="space-between"
              borderBottomWidth="1px"
              borderColor="#E2E0E0"
            >
              <Text>Email Verification</Text>

              {emailVerification ? (
                <Flex>
                  <Flex
                    color={"white"}
                    bg="green"
                    px="12px"
                    py="2px"
                    fontSize="12px"
                    rounded="full"
                  >
                    Verified
                  </Flex>
                  <Box display={["unset", , "none"]}>
                    <MdKeyboardArrowRight />
                  </Box>
                </Flex>
              ) : (
                <Flex alignItems="center" gap={[0, , "16px"]}>
                  <Flex
                    color={"white"}
                    bg="red.00"
                    px="12px"
                    py="2px"
                    fontSize="12px"
                    rounded="full"
                  >
                    Not Verified
                  </Flex>
                  {/* <Button
                    // onClick={onConfirmEmailOpen}
                    display={["none", , "unset"]}
                    variant="secondary"
                    size="sm"
                  >
                    Manage
                  </Button>
                  <Box display={["unset", , "none"]}>
                    <MdKeyboardArrowRight />
                  </Box> */}
                </Flex>
              )}
            </Flex>
            <Flex
              py="32px"
              justifyContent="space-between"
              borderBottomWidth="1px"
              borderColor="#E2E0E0"
            >
              <Text>ID Verification</Text>

              {idVerification ? (
                <Flex>
                  <Flex
                    color={"white"}
                    bg="green"
                    px="12px"
                    py="2px"
                    fontSize="12px"
                    rounded="full"
                  >
                    Verified
                  </Flex>
                  <Box display={["unset", , "none"]}>
                    <MdKeyboardArrowRight />
                  </Box>
                </Flex>
              ) : (
                <Flex alignItems="center" gap={[0, , "16px"]}>
                  <Flex
                    color={"white"}
                    bg="red.00"
                    px="12px"
                    py="2px"
                    fontSize="12px"
                    rounded="full"
                  >
                    Not Verified
                  </Flex>
                  <Button
                    onClick={onVerifyOpen}
                    display={["none", , "unset"]}
                    variant="secondary"
                    size="sm"
                  >
                    View
                  </Button>
                  <Box display={["unset", , "none"]}>
                    <MdKeyboardArrowRight />
                  </Box>
                </Flex>
              )}
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
      <UserIDVerification
        onClose={onVerifyClose}
        isOpen={isVerifyOpen}
        idVerificationDetails={idVerificationDetails}
      />
    </Modal>
  );
};

export default ViewVerification;
