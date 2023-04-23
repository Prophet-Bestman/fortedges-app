import {
  Box,
  Button,
  Circle,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AuthContext } from "providers/AuthProvider";
import { PlanFormContext, planFormActions } from "providers/PlanFormProvider";
import React, { useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
// import { BsArrowRight } from "react-icons/bs";

const PlanCreated = ({ isOpen, msg, closeParent, plan }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const {
    planFormState: { plan_user },
    dispatch: resetPlan,
  } = useContext(PlanFormContext);

  useEffect(() => {
    if (user?._id === plan_user?._id) {
      if (isOpen && user?.has_plan) {
        router.push(`/myplans/${plan?._id}`);
        resetPlan({ type: planFormActions.RESET_PLAN });
        closeParent();
      }
    } else {
      if (isOpen && plan_user?.has_plan) {
        router.push(`/admin/users/${plan_user?._id}`);
        resetPlan({ type: planFormActions.RESET_PLAN });
        closeParent();
      }
    }
  }, [user, isOpen, plan_user]);

  return (
    <Modal isOpen={isOpen} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent py="14px" px="24px" w="full">
        <Box w="full" h="full" position="relative">
          <Circle
            pos="absolute"
            right={0}
            onClick={closeParent}
            cursor="pointer"
            size="40px"
          >
            <AiOutlineClose />
          </Circle>
        </Box>

        <ModalBody px="0">
          <Flex
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            mb="20px"
          >
            <Image src="/img/success.svg" mb="20px" />

            <Box w="full" maxW={"380px"}>
              <Text
                textAlign="center"
                fontWeight="600"
                mb="40px"
                fontSize={"20px"}
              >
                {msg}
              </Text>
            </Box>

            <Spinner
              borderColor="app.primary"
              w="40px"
              h="40px"
              borderWidth="3px"
              mb="12px"
            />
            <Text fontSize="18px">Redirecting to new plan...</Text>

            {/* <Button
              rightIcon={<BsArrowRight fontSize="20px" />}
              variant="ghost"
              fontWeight={600}
              color="app.primary"
              size="lg"
              // onClick={() =>}
            >
              Go to plan
            </Button> */}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlanCreated;
