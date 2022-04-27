import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEditMop } from "api/mop";
import React, { useState, useEffect } from "react";

export const EditBTC = ({ isOpen, onClose, mop }) => {
  const [address, setAddress] = useState(mop.address);
  const [mopDetails, setMopDetails] = useState({});

  useEffect(() => {
    if (mop !== undefined) setAddress(mop.address);
  }, [mop]);

  const toast = useToast();
  const successToast = () => {
    toast({
      title: "MOP Updated",
      description: "You have updated this BTC Address",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const { data: mopEditResp, mutate: editBTC, isLoading } = useEditMop();

  const handleSubmit = (e) => {
    e.preventDefault();
    // onClose();
    const payload = {
      mop_id: mop._id,
      data: {
        type: "btc",
        address: address,
      },
    };

    editBTC(payload);
  };

  useEffect(() => {
    if (mopEditResp !== undefined && mopEditResp.status === 200) {
      setMopDetails(mopEditResp);
      if (mopEditResp !== mopDetails) {
        successToast();
        onClose();
      }
    }
  }, [mopEditResp]);

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalBody>
        <ModalContent p="24px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack mb="24px">
              <Text fontWeight={600}>Edit BTC Address</Text>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                bg="white"
                type="text"
                w-full
                required
              />
            </Stack>

            <Flex gap="12px">
              <Button size={"sm"} type="submit" isLoading={isLoading}>
                Save
              </Button>
              <Button
                size={"sm"}
                variant="secondary"
                type="submit"
                onClick={onClose}
              >
                Cancel
              </Button>
            </Flex>
          </form>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export const EditETH = ({ isOpen, onClose, mop }) => {
  const [address, setAddress] = useState(mop.address);
  const [mopDetails, setMopDetails] = useState({});

  useEffect(() => {
    if (mop !== undefined) setAddress(mop.address);
  }, [mop]);

  const toast = useToast();
  const successToast = () => {
    toast({
      title: "MOP Updated",
      description: "You have updated this BTC Address",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const { data: mopEditResp, mutate: editETH, isLoading } = useEditMop();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mop_id: mop._id,
      data: {
        type: "eth",
        address: address,
      },
    };

    editETH(payload);
  };

  useEffect(() => {
    if (mopEditResp !== undefined && mopEditResp.status === 200) {
      setMopDetails(mopEditResp);
      if (mopEditResp !== mopDetails) {
        successToast();
        onClose();
      }
    }
  }, [mopEditResp]);

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalBody>
        <ModalContent p="24px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack mb="24px">
              <Text fontWeight={600}>Edit ETH Address</Text>
              <Input
                bg="white"
                type="text"
                w-full
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Stack>

            <Flex gap="12px">
              <Button size={"sm"} type="submit" isLoading={isLoading}>
                Save
              </Button>
              <Button size={"sm"} variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </form>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
