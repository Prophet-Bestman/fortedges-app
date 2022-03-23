import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const PlanLarge = ({ plan }) => {
  const { amount: initial, color, img, name, category, gain } = plan;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const amount = formatter.format(initial);
  return (
    <Link href={"/myplans/plan"}>
      <Box
        cursor="pointer"
        bgColor={color}
        bgRepeat="no-repeat"
        w="full"
        maxW="327px"
        h="280px"
        p="16px"
        display="flex"
        justifyContent="center"
        borderRadius="12px"
        bgGradient="linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(196, 196, 196, 0) 0.01%, rgba(0, 0, 0, 0.4) 100%)"
        position="relative"
      >
        <Flex alignItems="center" h="100%">
          <Image
            style={{
              filter: "blur(4px)",
            }}
            src={img}
            objectPosition="center"
            w="full"
          />
        </Flex>
        <Flex
          position="absolute"
          bottom={0}
          p="16px"
          w="full"
          h="100px"
          color="white"
          justifyContent="space-between"
          alignItems="end"
        >
          <Box>
            <Text fontWeight="200" fontSize="12px" maxW="90px" mb="8px">
              {name}
            </Text>
            <Text>{amount}</Text>
          </Box>
          <Box>
            <Text
              display="flex"
              fontWeight="200"
              alignItems={"center"}
              gap="4px"
              fontSize="12px"
              maxW="90px"
              mb="8px"
            >
              <FiArrowUpRight fontSize="18px" />
              {gain}
            </Text>
            <Text>{amount}</Text>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default PlanLarge;
