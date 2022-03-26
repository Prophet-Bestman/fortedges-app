import {
  Box,
  Flex,
  FormLabel,
  InputGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import { Padding } from "components/layouts";
import Link from "next/link";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";
import { TransactionHistoryTable } from "components";

const TransactionHisory = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.transactionHisory,
    });
  }, []);
  return (
    <Box mt={["160px", , , "130px"]}>
      <Padding>
        {/* ======  Filters ====== */}
        <Flex
          flexWrap="wrap"
          justifyContent={["space-evenly", , "start"]}
          my="24px"
          gap="24px"
        >
          <Box w="full" maxW={["130px", , "185px"]}>
            <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
              Type
            </FormLabel>
            <Select
              fontSize={["14px", , "14px", "16px"]}
              h={["36px", , "42px"]}
              w="full"
              placeholder="Returns"
              _focus={{ ringColor: "none", borderColor: "app.primary" }}
            ></Select>
          </Box>
          <Box w="full" maxW={["130px", , "185px"]}>
            <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
              Time
            </FormLabel>
            <Select
              fontSize={["14px", , "14px", "16px"]}
              h={["36px", , "42px"]}
              w="full"
              placeholder="Past 30 days"
              _focus={{ ringColor: "none", borderColor: "app.primary" }}
            ></Select>
          </Box>
          <Box w="full" maxW={["130px", , "185px"]}>
            <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
              Status
            </FormLabel>
            <Select
              fontSize={["14px", , "14px", "16px"]}
              h={["36px", , "42px"]}
              w="full"
              placeholder="Successful"
              _focus={{ ringColor: "none", borderColor: "app.primary" }}
            ></Select>
          </Box>
          <Box w="full" maxW={["130px", , "185px"]}>
            <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
              Plan
            </FormLabel>
            <Select
              fontSize={["14px", , "14px", "16px"]}
              h={["36px", , "42px"]}
              w="full"
              placeholder="All"
              _focus={{ ringColor: "none", borderColor: "app.primary" }}
            ></Select>
          </Box>
        </Flex>

        {/* Link */}
        <Link href="#">
          <Text
            fontSize={["14px", , "16px"]}
            color="app.primary"
            textDecor="underline"
          >
            {"Deposit Hasn’t arrived? Click here"}
          </Text>
        </Link>

        <Box my="48px">
          <TransactionHistoryTable />
        </Box>
      </Padding>
    </Box>
  );
};

export default TransactionHisory;

TransactionHisory.requireAuth = true;
