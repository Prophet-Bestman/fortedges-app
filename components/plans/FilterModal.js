import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Circle,
  Select,
  Stack,
  Button,
  Box,
  FormLabel,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

const FilterModal = ({
  onClose,
  isOpen,
  plans,
  setPlan,
  plan,
  status,
  setStatus,
}) => {
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
            <Box w="full" mb="16px">
              <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
                Status
              </FormLabel>
              <Select
                fontSize={["14px", , "14px", "16px"]}
                h={["50px"]}
                w="full"
                placeholder="All"
                _focus={{ ringColor: "none", borderColor: "app.primary" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="processing">Processing</option>
                <option value="successfull">Successfull</option>
                <option value="declined">Declined</option>
              </Select>
            </Box>
            <Box w="full" mb="16px">
              <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
                Plan
              </FormLabel>
              {!!plans && (
                <Select
                  fontSize={["14px", , "14px", "16px"]}
                  h={["50px"]}
                  w="full"
                  placeholder="All"
                  _focus={{ ringColor: "none", borderColor: "app.primary" }}
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                >
                  <>
                    {plans.map((plan) => (
                      <option value={plan._id} key={plan._id}>
                        {plan.name}
                      </option>
                    ))}
                  </>
                </Select>
              )}
            </Box>
            <Flex gap="12px">
              <Button
                onClick={() => {
                  setPlan("");
                  setStatus("");
                }}
                w="full"
                variant="secondary"
              >
                Reset
              </Button>
              <Button w="full" onClick={onClose}>
                Search
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
