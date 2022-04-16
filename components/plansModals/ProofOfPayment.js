import {
  Box,
  Button,
  Circle,
  Flex,
  Image,
  Input,
  ModalBody,
  ModalContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CgSoftwareUpload } from "react-icons/cg";
import RequestSuccess from "./RequestSuccess";
import { useSendPOP } from "api/transactions";
import ErrorModal from "components/ErrorModal";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ProofOfPayment = ({ onClose, option, data, setStep }) => {
  const [walletAddress, setWalletAddress] = React.useState(
    "1232878973egueh3e8273927397al02"
  );
  const [copied, setCopied] = useState("Copy");
  const [selectedFile, setSelctedFile] = useState(null);
  const [POPImg, setPOPImg] = useState(null);
  const filePickerRef = useRef(null);
  const [POPResponse, setPOPResponse] = useState({});

  const {
    isOpen: isReqOpen,
    onOpen: onReqOpen,
    onClose: onReqClose,
  } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen } = useDisclosure();

  const addImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelctedFile(readerEvent.target.result);
    };
    setPOPImg(e.target.files[0]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied("Copied");
    setTimeout(() => {
      setCopied("Copy");
    }, 3000);
  };

  const { mutate: sendPOP, isLoading, data: depositData } = useSendPOP();

  const handleSendPOP = () => {
    const pop = new FormData();
    pop.append("pop", POPImg);

    const payload = { pop: pop, id: data.id };

    console.log(payload.id);

    sendPOP(payload);
  };

  useEffect(() => {
    if (depositData !== undefined) {
      setPOPResponse(depositData);
      if (depositData.pop !== undefined) {
        console.log("Created POP");
        onReqOpen();
      }
    }
  }, [depositData]);

  console.log("POP Response: ", POPResponse);
  console.log("Transaction Data: ", data);

  return (
    <ModalContent
      pt="24px"
      px="24px"
      maxW="380px"
      bg="white"
      color="text.black"
    >
      <Flex alignItems="center" position="relative">
        <Circle
          pos="absolute"
          onClick={() => setStep(1)}
          cursor="pointer"
          bg="#F1F2F400"
          size="40px"
        >
          <MdOutlineKeyboardBackspace />
        </Circle>
        <Circle bg="#F1F2F4" size="60px" mx="auto">
          <Image w="40px" src={option.icon} />
        </Circle>
      </Flex>

      <ModalBody px="0px" my="20px">
        <Flex flexDir="column" alignItems="center" justify="center">
          <Text alignItems="center" fontWeight="600">
            Pay to the {option.name} wallet Address
          </Text>
          <Text fontWeight={600} fontSize="20px" mt="8px">
            0.03483{data.option} ={" "}
            <small>{formatter.format(data.amount)}</small>
          </Text>
        </Flex>

        <Box my="48px">
          <Flex fontSize="14px" alignItems={"center"} gap="12px">
            <Circle size="24px" bg="text.black" color="white">
              1
            </Circle>
            <Text color="text.grey">
              To fund your wallet, deposit btc to your unique wallet address
            </Text>
          </Flex>

          <Text fontSize={"12px"} color="text.grey" mt="20px">
            {data.option} Address
          </Text>

          <Flex mb="40px" my="8px">
            <Text w="70%" fontWeight={600}>
              {walletAddress}
            </Text>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCopy}
              ml="6px"
              flexGrow={1}
            >
              {copied}
            </Button>
          </Flex>

          <Flex my="20px" fontSize="14px" alignItems={"center"} gap="12px">
            <Circle size="24px" bg="text.black" color="white">
              2
            </Circle>
            <Text color="text.grey">
              Take a screenshot of the transaction reciept and past in the space
              below
            </Text>
          </Flex>

          {/* <Flex
            borderColor="#71879C"
            h="172px"
            borderStyle="dashed"
            borderWidth="2px"
            alignItems="center"
            justifyContent="center"
            mb="40px"
            rounded="md"
          >
            <Circle size="52px" bg="text.black" color="white">
              <CgSoftwareUpload size="24px" />
            </Circle>
          </Flex> */}

          {/* UPLOAD FRONT COVER */}
          <Box>
            {selectedFile ? (
              <Box>
                <Image
                  w="full"
                  h="280px"
                  objectFit="contain"
                  src={selectedFile}
                  bg="#F6F6F6"
                  p="20px"
                />

                <Flex justify="center">
                  <Button
                    mt="14px"
                    onClick={() => setSelctedFile(null)}
                    size="sx"
                    py="4px"
                    px="12px"
                    variant="link"
                  >
                    Select Another Photo
                  </Button>
                </Flex>
              </Box>
            ) : (
              <Flex
                borderColor="#71879C"
                h="172px"
                borderStyle="dashed"
                borderWidth="2px"
                alignItems="center"
                justifyContent="center"
                mb="40px"
                rounded="md"
                cursor="pointer"
                onClick={() => filePickerRef.current.click()}
              >
                <Input
                  type="file"
                  ref={filePickerRef}
                  hidden
                  accept=".jpg, .jpeg, .png"
                  onChange={addImg}
                />
                <Circle size="52px" bg="text.black" color="white">
                  <CgSoftwareUpload size="24px" />
                </Circle>
              </Flex>
            )}
          </Box>

          <Box mt="24px">
            <Button variant="secondary" size="sm">
              Need Help?
            </Button>

            <Button
              onClick={handleSendPOP}
              isDisabled={!selectedFile}
              w="full"
              my="16px"
              isLoading={isLoading}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </ModalBody>
      {POPResponse.pop !== undefined && (
        <RequestSuccess
          isOpen={isReqOpen}
          onClose={onReqClose}
          data={POPResponse}
        />
      )}
      <ErrorModal
        isOpen={isErrorOpen}
        msg={"Error ccurred creating deposit request"}
      />
    </ModalContent>
  );
};

export default ProofOfPayment;
