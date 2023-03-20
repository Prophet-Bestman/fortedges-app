import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import ErrorModal from "components/ErrorModal";
import { options } from "data";
import React from "react";
import PaymentForm from "./PaymentForm";
import ProofOfPayment from "./ProofOfPayment";

const FundPlan = ({ onClose, isOpen, options }) => {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({});
  const [option, setOption] = React.useState(options.btc);

  const {
    isOpen: isErrorOpen,
    onClose: onErrorClose,
    onOpen: onErrorOpen,
  } = useDisclosure();

  const closeParent = () => {
    onErrorClose();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay />
      {step === 1 && (
        <PaymentForm
          option={option}
          options={options}
          setOption={setOption}
          setStep={setStep}
          onClose={onClose}
          setData={setData}
          data={data}
          openError={onErrorOpen}
          closeParent={closeParent}
        />
      )}
      {step === 2 && (
        <ProofOfPayment
          data={data}
          option={option}
          onClose={onClose}
          setStep={setStep}
          openError={onErrorOpen}
          closeParent={closeParent}
        />
      )}

      <ErrorModal
        isOpen={isErrorOpen}
        msg={"Error ccurred creating deposit request"}
        closeParent={closeParent}
      />
    </Modal>
  );
};

export default FundPlan;
