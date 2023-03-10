import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Circle,
  Text,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";
import { planFormActions, PlanFormContext } from "providers/PlanFormProvider";
import { AiOutlineClose } from "react-icons/ai";
import { useCreateCustomPlan, useEditCustomPlan } from "api/plans";
import ErrorModal from "components/ErrorModal";
import PlanCreated from "./PlanCreated";
import { AuthContext } from "providers/AuthProvider";

const SubmitPlan = ({ closeParent }) => {
  const { user: loggedInUser } = useContext(AuthContext);
  const { planFormState, dispatch: setOpen } = useContext(PlanFormContext);

  const isOpen = planFormState.isOpen;
  const id = planFormState.id;
  const parent_plan_name = planFormState.parent_plan_name;
  const user = planFormState?.plan_user;

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
    onSuccessClose();
    onErrorClose();
    setOpen({ type: planFormActions.CLOSE_FORM });
    closeParent();
  };

  // const user_id = planFormState.user_id;

  const {
    mutate: createPlan,
    isLoading,
    error,
    data: createdPlan,
  } = useCreateCustomPlan();

  const {
    mutate: updatePlan,
    isLoading: updating,
    error: updateError,
    data: updatedPlan,
  } = useEditCustomPlan();

  const submitPlan = () => {
    let payload;
    if (user?.has_plan) {
      payload = {
        plan_id: planFormState?.plan_id,
        data: {
          parent_plan_id: id,
          description: "",
        },
      };
      updatePlan(payload);
    } else {
      payload = {
        data: {
          // user_id: user_id,
          name: "",
          parent_plan_id: id,
          description: "",
          parent_plan_name: parent_plan_name,
          ...(user?._id !== loggedInUser?._id && { user_id: user?._id }),
        },
      };
      createPlan(payload);
    }
  };

  // AUTO SUBMIT PLAN ON COMPONENT MOUNT
  useEffect(() => {
    if (!!parent_plan_name && !!id) {
      submitPlan();
    }
  }, [id, parent_plan_name]);

  useEffect(() => {
    if (!!createdPlan) {
      if (createdPlan?.status >= 200) {
        onSuccessOpen();
      } else {
        onErrorOpen();
      }
    }
  }, [createdPlan]);

  useEffect(() => {
    if (!!updatedPlan) {
      if (updatedPlan?.status >= 200) {
        onSuccessOpen();
      } else {
        onErrorOpen();
      }
    }
  }, [updatedPlan]);

  // useEffect(() => {
  //   if (createdPlan !== undefined) {
  //     if (createdPlan.status === 201) {
  //       onSuccessOpen();
  //       setnewPlan(createdPlan);
  //     } else {
  //       onErrorOpen();
  //     }
  //   }
  // }, [createdPlan]);

  useEffect(() => {
    if (!!error || !!updateError) {
      onErrorOpen();
    }
  }, [error, updateError]);

  return (
    <Modal isOpen={isOpen} isCentered size="sm">
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent py="16px">
        <ModalHeader display="flex" justifyContent="space-between">
          {/* <Text>Name Your Plan</Text> */}
          <Circle
            onClick={() => setOpen({ type: planFormActions.CLOSE_FORM })}
            cursor="pointer"
            size="40px"
            bg="#F1F2F4"
            _hover={{
              bg: "#e1e1e3",
            }}
            ml="auto"
          >
            <AiOutlineClose fontSize="14px" />
          </Circle>
        </ModalHeader>

        <ModalBody py="6">
          <Text fontSize={"18px"} fontWeight="600" mb="3">
            Submiting Plan
          </Text>
          <Progress
            isIndeterminate
            colorScheme="purple"
            value={isLoading || updating ? 100 : 0}
            size="xs"
            rounded="full"
          />
          {/* <Text fontSize={"13px"} color="text.grey">
            Question 1 of 1
          </Text> */}

          {/* <Box mt="32px">
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
                  isLoading={isLoading || updating}
                  w="full"
                  ml={1}
                  size="md"
                  type="submit"
                >
                  Continue
                </Button>
              </Flex>
            </form>
          </Box> */}
        </ModalBody>
      </ModalContent>

      {(createdPlan?.data || updatedPlan?.data) && (
        <PlanCreated
          isOpen={isSuccessOpen}
          msg={
            updatedPlan?.data
              ? "Plan Upgrade Successful"
              : "Plan Creation Successful"
          }
          closeParent={onParentClose}
          plan={createdPlan?.data || updatedPlan?.data}
        />
      )}

      <ErrorModal
        isOpen={isErrorOpen}
        msg="Error Occurred. Try again later"
        closeParent={onParentClose}
      />
    </Modal>
  );
};

export default SubmitPlan;
