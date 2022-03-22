import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const PlanGraph = () => {
  return (
    <Box>
      <Flex justify="space-between" alignItems="center">
        <Text fontSize={"14px"} color="text.grey">
          {"What’s this plan made of?"}
        </Text>

        <Link href="#">
          <Text
            display="flex"
            gap="12px"
            alignItems="center"
            fontSize="14px"
            _hover={{
              color: "app.primary",
            }}
          >
            View Portfolio
            <MdKeyboardArrowRight />
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default PlanGraph;
