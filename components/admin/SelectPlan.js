import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ConfirmModal } from "components";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ActionSuccessful from "./ActionSuccessful";
import AddBalance from "./AddBalance";
import AdminWithdraw from "./AdminWithdraw";
import PlanBox from "./PlanBox";
import AddBonus from "./AddBonus";
import { useAdminGetCustomPlans } from "api/plans";
import AdminDepositForm from "./AdminDepositForm";
import ConfirmDeleteModal from "./ConfirmDelete";

const SelectPlan = ({ isOpen, onClose, action, userID }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userPlans, setUserPlans] = useState([]);
  const { isOpen: isActionOpen, onOpen: onActionOpen } = useDisclosure();
  const [planID, setPlanID] = useState();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const {
    isOpen: isConfirmDeleteOpen,
    onOpen: onConfirmDeleteOpen,
    onClose: onConfirmDeleteClose,
  } = useDisclosure();

  const { data: plansData } = useAdminGetCustomPlans(userID);

  useEffect(() => {
    if (plansData !== undefined) {
      if (Object.keys(plansData).length > 0) {
        setUserPlans(plansData.custom_plans);
      }
    }
  }, [plansData]);

  const closeParent = () => {
    onClose();
    onConfirmClose();
    onConfirmDeleteClose();
  };

  const next = (plan) => {
    if (action === "CLEAR_BALANCE") {
      setTitle("Clear Balance");
      setText("Are you sure you want to clear this user's balance?");
      onConfirmOpen();
    } else if (action === "DELETE_PLAN") {
      setTitle("Delete Plan");
      setText("Are you sure you want to delete this user's plan?");
      onConfirmDeleteOpen();
    } else {
      setStep(2);
    }
    setPlanID(plan.id);
  };

  //  ========================== ACTIONS ===================================

  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay />
      {step === 1 && (
        <ModalContent maxW={"400px"}>
          <ModalHeader d="flex" alignItems="center">
            <Text textAlign="center" mx="auto">
              Select Plan
            </Text>

            <AiOutlineClose
              onClick={() => {
                setStep(1);
                onClose();
              }}
            />
          </ModalHeader>
          <ModalBody>
            <Flex
              justifyContent="center"
              alignItems="center"
              gap="20px"
              flexDir="column"
            >
              {userPlans.map((plan, i) => (
                <PlanBox onClick={() => next(plan)} plan={plan} key={i} />
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      )}

      {step === 2 && action === "DEPOSIT" && (
        <AdminDepositForm setStep={setStep} planID={planID} onClose={onClose} />
      )}
      {step === 2 && action === "WITHDRAW" && (
        <AdminWithdraw setStep={setStep} planID={planID} onClose={onClose} />
      )}
      {step === 2 && action === "ADD_BALANCE" && (
        <AddBalance onActionOpen={onActionOpen} setStep={setStep} />
      )}
      {step === 2 && action === "ADD_BONUS" && (
        <AddBonus onActionOpen={onActionOpen} setStep={setStep} />
      )}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        openModal={onActionOpen}
        text={text}
        title={title}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={onConfirmDeleteClose}
        planID={planID}
        closeParent={closeParent}
      />

      {/* <ActionSuccessful isOpen={isActionOpen} /> */}
    </Modal>
  );
};

export default SelectPlan;
