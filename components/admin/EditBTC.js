import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

export const EditBTC = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalBody>
        <ModalContent p="24px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack mb="24px">
              <Text fontWeight={600}>Edit BTC Address</Text>
              <Input bg="white" type="text" w-full />
            </Stack>

            <Button size={"sm"} type="submit">
              Save
            </Button>
          </form>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export const EditETH = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalBody>
        <ModalContent p="24px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack mb="24px">
              <Text fontWeight={600}>Edit ETH Address</Text>
              <Input bg="white" type="text" w-full />
            </Stack>

            <Button size={"sm"} type="submit">
              Save
            </Button>
          </form>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
