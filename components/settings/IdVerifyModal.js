import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import IdPageOne from "./IdPageOne";
import IdPageTwo from "./IdPageTwo";

const IDVerifyModal = ({ isOpen, onClose }) => {
  const [IDPage, setIDPage] = useState(1);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay />
      <ModalContent maxW="380px">
        <ModalBody>
          <Box>
            {IDPage === 1 && (
              <IdPageOne
                setTitle={setTitle}
                onClose={onClose}
                setType={setType}
                setIDPage={setIDPage}
              />
            )}
            {IDPage === 2 && (
              <IdPageTwo title={title} setIDPage={setIDPage} type={type} />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IDVerifyModal;
