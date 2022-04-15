import { Modal, ModalOverlay } from "@chakra-ui/react";
import { options } from "data";
import React from "react";
import PaymentForm from "./PaymentForm";
import ProofOfPayment from "./ProofOfPayment";

const FundPlan = ({ onClose, isOpen }) => {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({});
  const [option, setOption] = React.useState(options.btc);
  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay />
      {step === 1 && (
        <PaymentForm
          option={option}
          setOption={setOption}
          setStep={setStep}
          onClose={onClose}
          setData={setData}
          data={data}
        />
      )}
      {step === 2 && (
        <ProofOfPayment
          data={data}
          option={option}
          onClose={onClose}
          setStep={setStep}
        />
      )}
    </Modal>
  );
};

export default FundPlan;
