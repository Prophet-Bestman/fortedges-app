import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ConfirmModal from "components/ConfirmModal";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import ChangeEmail from "./ChangeEmail";
import IDVerifyModal from "./IdVerifyModal";
import VerifyEmail from "./VerifyEmail";
import { getUserFromLocalStorage } from "api/config";

const IDVerificationTab = () => {
  const [user, setUser] = useState();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isIdVerified, setIdVerified] = useState(false);

  useEffect(() => {
    const userDetails = getUserFromLocalStorage();
    setUser(userDetails);
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      setIsEmailVerified(user?.is_email_verified);
      setIdVerified(user?.is_verified);
    }
  }, [user]);

  console.log("user: ", user);
  console.log(isIdVerified);

  const {
    isOpen: isConfirmEmailOpen,
    onOpen: onConfirmEmailOpen,
    onClose: onConfirmEmailClose,
  } = useDisclosure();

  const {
    isOpen: isChangeEmailOpen,
    onOpen: onChangeEmailOpen,
    onClose: onChangeEmailClose,
  } = useDisclosure();
  const {
    isOpen: isVerifyOpen,
    onOpen: onVerifyOpen,
    onClose: onVerifyClose,
  } = useDisclosure();

  return (
    <Box>
      <Text
        color={["text.grey", , "text.black"]}
        fontWeight={["14px", , "16px"]}
      >
        The security and Exchange commission(SEC) requires that we verify a
        valid means of identification
      </Text>

      <Box my="30px">
        <Flex
          py="16px"
          maxW="448px"
          justifyContent="space-between"
          borderBottomWidth="1px"
          borderColor="#E2E0E0"
        >
          <Text>Email Verification</Text>

          {isEmailVerified ? (
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
                onClick={onConfirmEmailOpen}
                display={["none", , "unset"]}
                variant="secondary"
                size="sm"
              >
                Manage
              </Button>
              <Box display={["unset", , "none"]}>
                <MdKeyboardArrowRight />
              </Box>
            </Flex>
          )}
        </Flex>
        <Flex
          py="32px"
          maxW="448px"
          justifyContent="space-between"
          borderBottomWidth="1px"
          borderColor="#E2E0E0"
        >
          <Text>ID Verification</Text>

          {isIdVerified ? (
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
                Manage
              </Button>
              <Box display={["unset", , "none"]}>
                <MdKeyboardArrowRight />
              </Box>
            </Flex>
          )}
        </Flex>
      </Box>
      <ConfirmModal
        isOpen={isConfirmEmailOpen}
        onClose={onConfirmEmailClose}
        openModal={onChangeEmailOpen}
        title="Are you sure you want to change your Email?"
        text="Withdrawals will be disabled for 24 hours after you make this change
            to protect your account."
      />

      <ChangeEmail isOpen={isChangeEmailOpen} onClose={onChangeEmailClose} />

      <IDVerifyModal isOpen={isVerifyOpen} onClose={onVerifyClose} />
    </Box>
  );
};

export default IDVerificationTab;
