import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { planFormActions, PlanFormContext } from "providers/PlanFormProvider";

const SubmitPlan = () => {
  const { planFormState, dispatch: setOpen } = useContext(PlanFormContext);
  const isOpen = planFormState.isOpen;
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setOpen({ type: planFormActions.CLOSE_FORM })}
      isCentered
    >
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          cupiditate at quia fugiat laboriosam repellat laudantium nisi
          molestiae minima, quas facere? Possimus repellendus maiores dolore
          quos temporibus est veniam enim!
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => setOpen({ type: planFormActions.CLOSE_FORM })}
          >
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubmitPlan;
