import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import PorfolioDataRep from "./PorfolioDataRep";

const PortfolioTab = () => {
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
            $20,000.00
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
            3
          </Text>
        </Box>
      </Flex>

      <PorfolioDataRep />
    </Box>
  );
};

export default PortfolioTab;
