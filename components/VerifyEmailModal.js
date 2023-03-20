import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Box,
  Button,
  Flex,
  Circle,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSendEmailVerification } from "api/auth";
import { getUserFromLocalStorage } from "api/config";
import React, { useEffect, useState } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { setLocale } from "yup";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";

const ConfirmModal = ({ isOpen, onClose }) => {
  const [verifiedData, setVerifiedData] = useState();
  const [user, setUser] = useState();

  const { isOpen: isSuccessOpen, onOpen: onSuccessOpen } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen } = useDisclosure();

  useEffect(() => {
    const localUser = getUserFromLocalStorage();
    setUser(localUser);
  }, []);

  const {
    mutate: sendVerification,
    isLoading,
    data: verificationData,
  } = useSendEmailVerification();

  const handleVerifyEmail = () => {
    const email = user.email;
    const payload = {
      email: email,
    };
    sendVerification(payload);
  };

  useEffect(() => {
    if (verificationData !== undefined) {
      if (verificationData.toString().includes("Error")) {
        onErrorOpen();
      } else {
        setVerifiedData(verificationData);
        onSuccessOpen();
      }
    }
  }, [verificationData]);

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
            Proceed to Verify Your Email
          </Text>

          <Text
            fontSize={"14px"}
            color="text.grey"
            textAlign="center"
            mb="24px"
          >
            A verification link will be sent to your registered email. Click the
            link to verify your email.
            <br />
            {`If you haven’t recieved our email in 15 minutes. Please check your
            spam folder.`}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button mr="16px" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleVerifyEmail}
            isLoading={isLoading}
          >
            Verify
          </Button>
        </ModalFooter>
      </ModalContent>
      {/* {children} */}
      <SuccessModal
        isOpen={isSuccessOpen}
        msg={"Email Verification Code sent. Check your email"}
      />
      <ErrorModal
        isOpen={isErrorOpen}
        msg={"An Error Occurred. Try Again Later "}
      />
    </Modal>
  );
};

export default ConfirmModal;
