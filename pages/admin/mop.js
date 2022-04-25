import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { EditBTC, EditETH } from "components/admin/EditBTC";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import { useGetMops } from "api/mop";

const Mop = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [copied, setCopied] = React.useState("");
  const [mops, setMops] = useState([]);
  const [btcDetails, setBtcDetails] = useState({});
  const [ethDetials, setEthDetails] = useState({});

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.modeOfPayment,
    });
  }, []);

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

  const handleCopy = (mop) => {
    navigator.clipboard.writeText(mop.address);
    setCopied(mop.type);
    setTimeout(() => {
      setCopied("false");
    }, 2000);
  };

  // ============ GET MOPS LOGIC ==============

  const { data: mopsData } = useGetMops();

  useEffect(() => {
    if (mopsData !== undefined && mopsData?.length > 0) setMops(mopsData);
  }, [mopsData]);

  useEffect(() => {
    if (mops !== undefined && mops?.length > 0) {
      const btcDetails = mops.filter((mop) => mop.type === "btc");
      setBtcDetails(btcDetails[0]);
      const ethDetails = mops.filter((mop) => mop.type === "eth");
      setEthDetails(ethDetails[0]);
    }
  }, [mops]);

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

        {btcDetails?.address !== undefined && (
          <Flex justify="space-between" alignItems="center" gap="12px">
            <Text fontWeight="600" overflow="hidden" isTruncated>
              {btcDetails?.address || ""}
            </Text>

            {copied === btcDetails?.type ? (
              <AiFillCheckCircle size="24px" />
            ) : (
              <BiCopy
                size="20px"
                onClick={() => handleCopy(btcDetails)}
                cursor="pointer"
              />
            )}
          </Flex>
        )}
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

        {ethDetials?.address !== undefined && (
          <Flex justify="space-between" alignItems="center" gap="12px">
            <Text fontWeight="600" overflow="hidden" isTruncated>
              {ethDetials?.address || ""}
            </Text>

            {copied === ethDetials?.type ? (
              <AiFillCheckCircle size="24px" />
            ) : (
              <BiCopy
                size="20px"
                onClick={() => handleCopy(ethDetials)}
                cursor="pointer"
              />
            )}
          </Flex>
        )}
      </Box>
      <EditBTC isOpen={isBTCOpen} onClose={onBTCClose} mop={btcDetails} />
      <EditETH isOpen={isETHOpen} onClose={onETHClose} mop={ethDetials} />
    </Box>
  );
};

export default Mop;

Mop.isAdmin = true;
