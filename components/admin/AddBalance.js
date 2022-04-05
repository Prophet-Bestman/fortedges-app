import {
  Button,
  Circle,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  ModalBody,
  ModalContent,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { options } from "data";
import React, { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ActionSuccessful from "./ActionSuccessful";
import ConfirmModal from "components/ConfirmModal";

const AddBalance = ({ setStep, onActionOpen }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const addBalanceSchema = yup.object().shape({
    amount: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addBalanceSchema),
  });

  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const submit = (data) => {
    console.log(data);
    setTitle("Add Balance");
    setText("Are you sure you want to add balance to this user?");
    onConfirmOpen();
  };

  return (
    <ModalContent py="24px" px="24px" maxW="380px">
      <Flex mb="40px" justifyContent="space-between" alignItems="center">
        <Circle
          onClick={() => setStep(1)}
          cursor="pointer"
          bg="#F1F2F400"
          size="40px"
        >
          <MdOutlineKeyboardBackspace />
        </Circle>
        <Text fontSize="20px" color="text.black" fontWeight={600}>
          Add Balance
        </Text>
        <Circle cursor="pointer" bg="#F1F2F4" size="30px">
          <Text fontSize="16px" fontWeight="600">
            i
          </Text>
        </Circle>
      </Flex>

      <ModalBody px="0">
        <form onSubmit={handleSubmit(submit)}>
          <Stack>
            <Text fontSize={"12px"} color="text.grey">
              Amount
            </Text>

            <InputGroup>
              <InputLeftAddon
                fontWeight={600}
                fontSize="18px"
                position="absolute"
                top="0"
                left="0"
                h="48px"
                bg="white"
              >
                $
              </InputLeftAddon>
              <Input
                pl="40px"
                type="number"
                h="48px"
                placeholder="10,000"
                mb="32px"
                variant={errors.amount ? "error" : "outline"}
                {...register("amount")}
              />
            </InputGroup>
          </Stack>

          <Button w="full" type="submit">
            Add Balance
          </Button>
        </form>
      </ModalBody>
      <ActionSuccessful isOpen={isSuccessOpen} onClose={onSuccessClose} />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        openModal={onActionOpen}
        text={text}
        title={title}
      />
    </ModalContent>
  );
};

export default AddBalance;
