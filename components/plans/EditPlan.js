import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { PlanContext } from "providers/PlanProvider";
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEditCustomPlan } from "api/plans";

const EditPlan = ({ isOpen, onClose, openSuccess }) => {
  const { plan } = useContext(PlanContext);
  const [updateError, setUpdateError] = useState("");

  const editPlanSchema = yup.object({
    name: yup.string().required().min(3),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editPlanSchema),
    defaultValues: {
      name: plan?.name,
    },
  });

  const toast = useToast();

  const errorToast = () => {
    toast({
      title: "Try Again Later",
      description: updateError,
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const {
    mutate: updatePlan,
    data: updateResp,
    isLoading,
  } = useEditCustomPlan();

  const submitUpdate = (data) => {
    const payload = {
      plan_id: plan?._id,
      data: { ...data },
    };

    updatePlan(payload);
  };

  useEffect(() => {
    if (!!updateResp) {
      if (updateResp?.status === 200) {
        onClose();
        openSuccess();
      } else {
        setUpdateError("Error Occurred while trying to update plan");
      }
    }
  }, [updateResp]);

  useEffect(() => {
    if (!!updateError && updateError !== "") {
      errorToast();
      setUpdateError("");
    }
  }, [updateError]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py="40px" px="24px">
        <Text fontSize="24px" fontWeight="600" textAlign="center">
          Edit Plan
        </Text>

        <Box>
          <form onSubmit={handleSubmit(submitUpdate)}>
            <Stack my="30px">
              <FormLabel fontWeight={600}>Plan Name</FormLabel>
              <Input
                type="text"
                {...register("name")}
                defaultValue={plan?.name}
              />
              {errors?.name && (
                <Text fontSize="12px" fontWeight={600} color="red">
                  {errors?.name?.message}
                </Text>
              )}
            </Stack>

            <Flex>
              <Button ml="auto" size="sm" type="submit" isLoading={isLoading}>
                Update
              </Button>
            </Flex>
          </form>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default EditPlan;
