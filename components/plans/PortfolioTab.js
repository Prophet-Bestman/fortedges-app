import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { config, formatter } from "utils";
import PorfolioDataRep from "./PorfolioDataRep";

const PortfolioTab = ({ plans }) => {
  const [assetClasses, setAssetClasses] = useState([]);
  const [netWorth, setNetWorth] = useState("");
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    const localWallet = localStorage.getItem(config.key.wallet);
    if (localWallet != undefined) {
      const wallet = JSON.parse(localWallet);
      setWallet(wallet);
    }
  }, []);

  useEffect(() => {
    if (plans !== undefined) {
      const clasees = plans.filter((plan) => plan.type === "plan");
      setAssetClasses(clasees);
    }
  }, [plans]);

  console.log("Networth", netWorth);

  return (
    <Box>
      <Flex
        alignItems="center"
        gap={[, , "129px"]}
        justifyContent={["space-between", , "start"]}
      >
        <Text fontSize="20px" fontWeight={600}>
          Your Portfolio
        </Text>

        <Link href="#">
          <Flex alignItems="center" gap="4px">
            <Text color="app.primary">See our portfolio</Text>
            <RiArrowRightSLine color="#7950DA" />
          </Flex>
        </Link>
      </Flex>

      <Flex
        // display={["block", , , "flex"]}
        alignItems="center"
        mt="28px"
        mb="40px"
        gap={["12px", , "30px", "50px"]}
        justifyContent={["space-between", , "start"]}
      >
        <Box
          bg="#F2F3F5"
          p="12px"
          rounded="8px"
          w="full"
          maxW="157px"
          mb="12px"
        >
          <Text mb="4px" fontSize="13px" color="text.grey">
            Net worth
          </Text>
          <Text fontWeight={600} color="text.black">
            {formatter.format(wallet?.balance)}
          </Text>
        </Box>
        <Box
          bg="#F2F3F5"
          p="12px"
          rounded="8px"
          w="full"
          maxW="157px"
          mb="12px"
        >
          <Text mb="4px" fontSize="13px" color="text.grey">
            Asset Classes
          </Text>
          <Text fontWeight={600} color="text.black">
            {!!assetClasses && assetClasses?.length}
          </Text>
        </Box>
      </Flex>

      <PorfolioDataRep />
    </Box>
  );
};

export default PortfolioTab;
