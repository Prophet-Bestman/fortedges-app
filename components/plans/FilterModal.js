import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Circle,
  Select,
  Stack,
  Button,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

const FilterModal = ({ onClose, isOpen }) => {
  return (
    <Modal size="full" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent py="14px" px="24px" left="0" w="full">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="20px" color="text.black" fontWeight={600}>
            Deposit Details
          </Text>
          <Circle onClick={onClose} cursor="pointer" bg="#F1F2F4" size="40px">
            <AiOutlineClose />
          </Circle>
        </Flex>
        <ModalBody my="32px">
          <form>
            <Stack mb="32px">
              <Text fontSize="14px" color="text.grey">
                Time
              </Text>
              <Select
                h={["48px", , "56px"]}
                _focus={{
                  outline: "none",
                  borderColor: "app.primary",
                }}
              >
                <option value="Past 30 days">Past 30 days</option>
                <option value="Past 3 months">Past 3 months</option>
                <option value="Past 1 year">Past 1 year</option>
                <option value="All time">All times</option>
              </Select>
            </Stack>
            <Stack mb="32px">
              <Text fontSize="14px" color="text.grey">
                Status
              </Text>
              <Select
                h={["48px", , "56px"]}
                _focus={{
                  outline: "none",
                  borderColor: "app.primary",
                }}
              >
                <option value="Successful">Successful</option>
                <option value="Pending">Pending</option>
              </Select>
            </Stack>

            <Flex gap="12px">
              <Button w="full" variant="secondary">
                Reset
              </Button>
              <Button w="full">Search</Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
