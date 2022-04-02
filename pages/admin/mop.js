import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { BiCopy } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { EditBTC, EditETH } from "components/admin/EditBTC";

const Mop = () => {
  const [walletAddress, setWalletAddress] = React.useState(
    "1232878973egueh3e8273927397al02"
  );
  const [copied, setCopied] = React.useState(false);

  const {
    isOpen: isBTCOpen,
    onOpen: onBTCOpen,
    onClose: onBTCClose,
  } = useDisclosure();

  const {
    isOpen: isETHOpen,
    onOpen: onETHOpen,
    onClose: onETHClose,
  } = useDisclosure();

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <Box px={"24px"} py="40px" color="text.black">
      <Text fontSize={"34px"} fontWeight="600">
        M.O.P
      </Text>

      <Box bg="white" w="370px" p="24px" mb="40px">
        <Flex justify="space-between" w="full" pb="24px">
          <Text>BTC Address</Text>
          <Button
            onClick={onBTCOpen}
            w="auto"
            variant="link"
            color="app.primary"
          >
            Edit
          </Button>
        </Flex>

        <Flex justify="space-between" alignItems="center">
          <Text fontWeight="600" overflow="hidden">
            {walletAddress}
          </Text>

          {copied && <AiFillCheckCircle size="24px" />}
          {!copied && (
            <BiCopy size="20px" onClick={handleCopy} cursor="pointer" />
          )}
        </Flex>
      </Box>
      <Box bg="white" w="370px" p="24px">
        <Flex justify="space-between" w="full" pb="24px">
          <Text>ETH Address</Text>
          <Button
            w="auto"
            variant="link"
            color="app.primary"
            onClick={onETHOpen}
          >
            Edit
          </Button>
        </Flex>

        <Flex justify="space-between" alignItems="center">
          <Text fontWeight="600" overflow="hidden">
            {walletAddress}
          </Text>

          {copied && <AiFillCheckCircle size="24px" />}
          {!copied && (
            <BiCopy size="20px" onClick={handleCopy} cursor="pointer" />
          )}
        </Flex>
      </Box>
      <EditBTC isOpen={isBTCOpen} onClose={onBTCClose} />
      <EditETH isOpen={isETHOpen} onClose={onETHClose} />
    </Box>
  );
};

export default Mop;

Mop.isAdmin = true;
