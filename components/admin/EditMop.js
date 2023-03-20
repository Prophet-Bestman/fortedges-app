import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditMop } from "api/mop";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createMOPSchema } from "utils/schemas";

export const EditMOP = ({ isOpen, onClose, mop }) => {
  const [mopDetails, setMopDetails] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createMOPSchema), defaultValues: mop });

  const toast = useToast();
  const successToast = () => {
    toast({
      title: "MOP Updated",
      description: "You have updated this BTC Address",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const { data: mopEditResp, mutate: editBTC, isLoading } = useEditMop();

  const submitMOP = (data) => {
    const payload = {
      mop_id: mop?._id,
      data,
    };
    editBTC(payload);
  };

  useEffect(() => {
    if (
      mopEditResp !== undefined &&
      (mopEditResp.status === 200 || mopEditResp.status === 201)
    ) {
      setMopDetails(mopEditResp);
      if (mopEditResp !== mopDetails) {
        successToast();
        onClose();
      }
    }
  }, [mopEditResp]);

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalBody>
        <ModalContent p="24px">
          <Text my="4" fontSize={24} fontWeight={600}>
            Edit New Mode Of Payment
          </Text>
          <form onSubmit={handleSubmit(submitMOP)}>
            <Stack mb="24px">
              <Text fontWeight={600}>Type</Text>
              <Input {...register("type")} bg="white" w-full />
              {errors?.type && (
                <Text
                  fontSize="14px"
                  color="red.500"
                  textTransform="capitalize"
                >
                  {errors?.type?.message}
                </Text>
              )}
            </Stack>
            <Stack mb="24px">
              <Text fontWeight={600}>Address</Text>
              <Input {...register("address")} bg="white" w-full />
              {errors?.address && (
                <Text
                  fontSize="14px"
                  color="red.500"
                  textTransform="capitalize"
                >
                  {errors?.address?.message}
                </Text>
              )}
            </Stack>

            <Flex justify="end" gap="12px" mt="6">
              <Button
                size={"sm"}
                variant="secondary"
                type="submit"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button size={"sm"} type="submit" isLoading={isLoading}>
                Save
              </Button>
            </Flex>
          </form>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
