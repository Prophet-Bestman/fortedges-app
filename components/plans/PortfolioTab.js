import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { formatter } from "utils";
import PorfolioDataRep from "./PorfolioDataRep";
import { useGetPortfolio } from "api/portfolio";
import OurPortfolio from "components/plansModals/OurPortfolio";

const PortfolioTab = () => {
  const [assetClasses, setAssetClasses] = useState([]);
  const [netWorth, setNetWorth] = useState(0);
  const [portfolio, setPortfolio] = useState({});
  const { data: portfolioData } = useGetPortfolio();

  useEffect(() => {
    if (!!portfolioData && portfolioData?.status === 200) {
      setPortfolio(portfolioData?.data);
    }
  }, [portfolioData]);

  useEffect(() => {
    if (!!portfolio && portfolio?.asset_mix?.length > 0) {
      setAssetClasses(portfolio?.asset_mix);
    }
    if (!!portfolio && portfolio?.net_worth > 0) {
      setNetWorth(portfolio?.net_worth);
    }
  }, [portfolio]);

  const { isOpen, onClose, onOpen } = useDisclosure();

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
            <Text color="app.primary" onClick={onOpen} cursor="pointer">
              See our portfolio
            </Text>
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
            {formatter.format(netWorth)}
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

      <PorfolioDataRep portfolio={portfolio} />
      <OurPortfolio isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default PortfolioTab;
