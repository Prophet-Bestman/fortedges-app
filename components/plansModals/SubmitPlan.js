import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Circle,
  Text,
  Progress,
  Box,
  FormLabel,
  Input,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { planFormActions, PlanFormContext } from "providers/PlanFormProvider";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getLocalWallet } from "api/config.js";
import { useCreateCustomPlan } from "api/plans";
import SuccessModal from "components/SuccessModal";
import ErrorModal from "components/ErrorModal";
import { PlanContext } from "providers/PlanProvider";

const SubmitPlan = ({ closeParent }) => {
  const { planFormState, dispatch: setOpen } = useContext(PlanFormContext);
  const [newPlan, setnewPlan] = useState({});

  const {
    isOpen: isSuccessOpen,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onClose: onErrorClose,
    onOpen: onErrorOpen,
  } = useDisclosure();

  const onParentClose = () => {
    closeParent();
    setOpen({ type: planFormActions.CLOSE_FORM });
    onErrorClose();
    onSuccessClose();
  };

  const isOpen = planFormState.isOpen;
  const id = planFormState.id;
  const parent_plan_name = planFormState.parent_plan_name;
  const user_id = planFormState.user_id;

  const planSchema = yup.object({
    planName: yup.string().required().min(3),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(planSchema),
  });

  const onClose = () => {
    reset();
    setOpen({ type: planFormActions.CLOSE_FORM });
  };

  const {
    mutate: createPlan,
    isLoading,
    error,
    data: createdPlan,
  } = useCreateCustomPlan();

  const submitPlan = (data) => {
    const plan = {
      data: {
        user_id: user_id,
        name: data.planName,
        parent_plan_id: id,
        description: "",
        parent_plan_name: parent_plan_name,
      },
    };

    createPlan(plan);
  };

  useEffect(() => {
    if (createdPlan !== undefined) {
      if (createdPlan.status === 201) {
        onSuccessOpen();
        setnewPlan(createdPlan);
      } else {
        onErrorOpen();
      }
    }
  }, [createdPlan]);

  useEffect(() => {
    if (!!error) {
      onErrorOpen();
    }
  }, [error]);

  console.log("Plan Created: ", createdPlan);

  return (
    <Modal isOpen={isOpen} isCentered size="sm">
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent py="16px">
        <ModalHeader display="flex" justifyContent="space-between">
          <Text>Name Your Plan</Text>
          <Circle
            onClick={() => setOpen({ type: planFormActions.CLOSE_FORM })}
            cursor="pointer"
            size="40px"
            bg="#F1F2F4"
            _hover={{
              bg: "#e1e1e3",
            }}
          >
            <AiOutlineClose fontSize="14px" />
          </Circle>
        </ModalHeader>

        <ModalBody>
          <Text fontSize={"13px"} color="text.grey">
            Question 1 of 1
          </Text>
          <Progress colorScheme="purple" value={100} size="xs" rounded="full" />

          <Box mt="32px">
            <form onSubmit={handleSubmit(submitPlan)}>
              <FormLabel fontWeight={600}>Give your plan a name</FormLabel>
              <Input
                type="text"
                h="48px"
                placeholder="E.g Itanian Cuisine"
                mb="32px"
                variant={errors.planName ? "error" : "outline"}
                {...register("planName")}
              />
              <Flex>
                <Button
                  onClick={onClose}
                  leftIcon={<IoIosArrowBack />}
                  variant="ghost"
                >
                  Back
                </Button>
                <Button
                  isLoading={isLoading}
                  w="full"
                  ml={1}
                  size="md"
                  type="submit"
                >
                  Continue
                </Button>
              </Flex>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
      <SuccessModal
        isOpen={isSuccessOpen}
        msg="Plan Creation Successful"
        closeParent={onParentClose}
      />
      <ErrorModal
        isOpen={isErrorOpen}
        msg="Error Occurred. Try again later"
        closeParent={onParentClose}
      />
    </Modal>
  );
};

export default SubmitPlan;
