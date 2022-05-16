import {
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

      <ModalContent maxW={"400px"}>
        <ModalHeader d="flex" alignItems="center">
          <Text textAlign="center" mx="auto">
            Select Plan
          </Text>

          <AiOutlineClose cursor="pointer" onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <Flex
            justifyContent="center"
            alignItems="center"
            gap="20px"
            flexDir="column"
          >
            {userPlans?.length > 0 &&
              userPlans?.map((plan) => (
                <PlanBox
                  onClick={() => handleFundPlan(plan)}
                  plan={plan}
                  key={plan?._id}
                />
              ))}
          </Flex>
        </ModalBody>
      </ModalContent>
      <FundPlan isOpen={isFundOpen} onClose={onFundClose} />
    </Modal>
  );
};

export default UserSelectPlan;
