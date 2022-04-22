import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import ConfirmModal from "components/ConfirmModal";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AiFillCheckCircle, AiOutlineMail } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import ConfirmEmailChange from "./ConfirmEmailChange";
import { getUserFromLocalStorage } from "api/config";
import ConfirmPasswordChange from "./ConfirmPasswordChange";

const SecurityTab = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [idVerified, setIdVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [email, setEmail] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = getUserFromLocalStorage();
    setUser(localUser);
    setEmailVerified(localUser.is_email_verified);
    setAuthenticated(localUser.is_email_verified);
    setIdVerified(localUser.is_verified);
    setEmail(localUser.email);
  }, []);

  const maskedEmail = email.substring(0, 2) + "*****" + email.substring(2 + 5);

  const {
    isOpen: isConfirmPasswordOpen,
    onOpen: onConfirmPasswordOpen,
    onClose: onConfirmPasswordClose,
  } = useDisclosure();

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

  const router = useRouter();

  return (
    <Box py="12px" color="text.black">
      <Box>
        <Flex alignItems="center" gap="24px">
          <Box w={["60%", , "unset"]}>
            <Text fontSize="17px" fontWeight={600}>
              Password
            </Text>
            <Text display={["none", , "block"]} fontSize="14px">
              {
                " Remember not to store your password in your email or cloud and don't share it with anyone"
              }
            </Text>
            <Text fontSize="12px" display={["block", , "none"]}>
              Remember not to share your password with anyone
            </Text>
          </Box>

          <Button
            onClick={onConfirmPasswordOpen}
            px="12px"
            size="sm"
            w="150px"
            variant="secondary"
          >
            Change password
          </Button>
        </Flex>
        <Box my="24px">
          <Flex mb="16px" gap="9px" alignItems="center">
            {authenticated ? (
              <AiFillCheckCircle color="green" />
            ) : (
              <MdCancel color="#aaa" />
            )}

            <Text fontSize="12px" textDecor={!authenticated && "underline"}>
              Two-factor Authentication
            </Text>
          </Flex>
          <Flex gap="9px" alignItems="center">
            {idVerified ? (
              <AiFillCheckCircle color="green" />
            ) : (
              <MdCancel color="#aaa" />
            )}

            <Text fontSize="12px" textDecor={!idVerified && "underline"}>
              Identity Verification
            </Text>
          </Flex>
        </Box>
      </Box>

      <Box my="64px">
        <Text
          pb="16px"
          borderBottomWidth="1px"
          borderColor={"#E2E0E0"}
          fontSize="18px"
          fontWeight={600}
          mb="39px"
        >
          Two-Factor Authentication (2FA)
        </Text>

        <Flex>
          <AiOutlineMail size={"24px"} />
          <Box mr="60px" ml="24px">
            <Text mb="8px" fontWeight={600}>
              Email Verification
            </Text>
            <Text mb="10px" color="text.grey" fontSize={"14px"}>
              Protect your account and transactions
            </Text>
            <Flex alignItems={"center"} gap="9px">
              {emailVerified ? (
                <AiFillCheckCircle color="green" />
              ) : (
                <MdCancel color="#aaa" />
              )}
              {!!maskedEmail && <Text>{maskedEmail}</Text>}
            </Flex>
          </Box>

          <Box>
            <Button
              onClick={onConfirmEmailOpen}
              variant="secondary"
              size={"sm"}
              px="12px"
              py="8px"
              mx="6px"
            >
              Change
            </Button>
          </Box>
        </Flex>
      </Box>

      <ConfirmPasswordChange
        isOpen={isConfirmPasswordOpen}
        onClose={onConfirmPasswordClose}
      />

      <ConfirmEmailChange
        isOpen={isConfirmEmailOpen}
        onClose={onConfirmEmailClose}
        openModal={onChangeEmailOpen}
      />

      <ChangeEmail
        isOpen={isChangeEmailOpen}
        onClose={onChangeEmailClose}
        openConfirmEmailChange={onConfirmEmailOpen}
      />
    </Box>
  );
};

export default SecurityTab;
