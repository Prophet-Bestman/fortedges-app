import { Box, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const OverviewPlan = ({ plan }) => {
  const { amount, color, img, name, category } = plan;

  return (
    <Link href="/myplans/plan">
      <Box
        bgColor={color}
        cursor="pointer"
        bgRepeat="no-repeat"
        w="full"
        maxW="166px"
        h="196px"
        p="16px"
        display="flex"
        justifyContent="center"
        borderRadius="12px"
        // alignItems='center'
        position="relative"
        _before={{
          content: "''",
          bgGradient:
            "linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(196, 196, 196, 0) 0.01%, rgba(0, 0, 0, 0.4) 100%)",
          position: "absolute",
          borderRadius: "12px",
          top: 0,
          left: 0,
          h: "100%",
          w: "100%",
        }}
      >
        <Box>
          <Image
            style={{
              filter: "blur(4px)",
            }}
            src={img}
            w="101px"
          />
        </Box>

        <Box bottom="14px" position="absolute" color="white">
          <Text mb="4px" fontSize="13px">
            {name}
          </Text>
          <Text mb="4px" fontSize="15px" fontWeight={600}>
            ${amount}
          </Text>
          <Text mb="4px" fontSize="13px">
            {category}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default OverviewPlan;
