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
import ConfirmModal from "components/ConfirmModal";
import { OverviewPlans } from "data";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ActionSuccessful from "./ActionSuccessful";
import AddBalance from "./AddBalance";
import AdminPaymentForm from "./AdminPaymentForm";
import AdminWithdraw from "./AdminWithdraw";
import PlanBox from "./PlanBox";
import AddBonus from "./AddBonus";

const SelectPlan = ({ isOpen, onClose, action }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { isOpen: isActionOpen, onOpen: onActionOpen } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const next = () => {
    if (action === "CLEAR_BALANCE") {
      setTitle("Clear Balance");
      setText("Are you sure you want to clear this user's balance?");
      onConfirmOpen();
    } else if (action === "DELETE_PLAN") {
      setTitle("Delete Plan");
      setText("Are you sure you want to delete this user's plan?");
      onConfirmOpen();
    } else {
      setStep(2);
    }
  };

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
              {OverviewPlans.map((plan, i) => (
                <PlanBox onClick={next} plan={plan} key={i} />
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      )}

      {step === 2 && action === "DEPOSIT" && (
        <AdminPaymentForm setStep={setStep} />
      )}
      {step === 2 && action === "WITHDRAW" && (
        <AdminWithdraw setStep={setStep} />
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
      <ActionSuccessful isOpen={isActionOpen} />
    </Modal>
  );
};

export default SelectPlan;
