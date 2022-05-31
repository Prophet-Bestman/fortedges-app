import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlanBox from "components/admin/PlanBox";
import { useGetCustomPlans } from "api/plans";
import { planActions, PlanContext } from "providers/PlanProvider";
import { FundPlan } from "components/plansModals";
import Link from "next/link";

const UserSelectPlan = ({ isOpen, onClose }) => {
  const { dispatch: setPlan } = useContext(PlanContext);
  const [userPlans, setUserPlans] = useState([]);

  const {
    isOpen: isFundOpen,
    onOpen: onFundOpen,
    onClose: onFundClose,
  } = useDisclosure();

  const { data: plansData } = useGetCustomPlans();

  useEffect(() => {
    if (plansData !== undefined) {
      if (Object.keys(plansData)?.length > 0) {
        setUserPlans(plansData?.custom_plans);
      }
    }
  }, [plansData]);

  const handleFundPlan = (plan) => {
    setPlan({ type: planActions.SET_PLAN, payload: plan });
    onFundOpen();
  };

  return (
    <Modal isOpen={isOpen} size="full" onClose={onClose}>
      <ModalOverlay />

      <ModalContent h="full" maxW={"400px"}>
        <ModalHeader d="flex" alignItems="center">
          <Text textAlign="center" mx="auto">
            Select Plan
          </Text>

          <AiOutlineClose cursor="pointer" onClick={onClose} />
        </ModalHeader>
        <ModalBody h="full" overflowY="scroll" my="50px">
          <Flex
            my="30px"
            justifyContent="center"
            alignItems="center"
            gap="20px"
            flexDir="column"
            h="full"
          >
            {userPlans?.length > 0 ? (
              userPlans?.map((plan) => (
                <PlanBox
                  onClick={() => handleFundPlan(plan)}
                  plan={plan}
                  key={plan?._id}
                />
              ))
            ) : (
              <Box>
                <Text textAlign="center" fontWeight={500} fontSize="28px">
                  You have not created a plan yet
                </Text>

                <Link href="/myplans/create">
                  <Button w="full" mt="28px">
                    Create A New Plan
                  </Button>
                </Link>
              </Box>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
      <FundPlan isOpen={isFundOpen} onClose={onFundClose} />
    </Modal>
  );
};

export default UserSelectPlan;
