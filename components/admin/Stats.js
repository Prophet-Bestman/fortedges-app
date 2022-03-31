import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { formatter } from "utils";

const data = {
  pendingDeposits: 10,
  pendingWithdrawals: 10,
  totalDeposits: 17700,
  pendingDepositsAmt: 3000,
  totalWithdrawals: 3000,
  numberOfUsers: 120,
};

const Stats = () => {
  const {
    pendingDeposits,
    pendingDepositsAmt,
    pendingWithdrawals,
    totalDeposits,
    totalWithdrawals,
    numberOfUsers,
  } = data;

  return (
    <Box>
      <Grid mb="40px" templateColumns="repeat(2, 1fr)" gap="24px">
        <GridItem
          bg="white"
          d="flex"
          justifyContent="space-between"
          px="24px"
          alignItems="center"
          h="64px"
        >
          <Text fontWeight="600" d="flex" color="text.grey" gap="2px">
            <Text color="text.black">{pendingDeposits}</Text>Pending Deposits
          </Text>

          <Link href="admin/deposits">
            <Button px="8px" w="auto" size="sm" variant="outline">
              Go to Deposits
            </Button>
          </Link>
        </GridItem>
        <GridItem
          bg="white"
          d="flex"
          justifyContent="space-between"
          px="24px"
          alignItems="center"
          h="64px"
        >
          <Text fontWeight="600" d="flex" color="text.grey" gap="2px">
            <Text color="text.black">{pendingWithdrawals}</Text>Pending
            Withdrawals
          </Text>

          <Link href="/admin/withdrawals">
            <Button px="8px" w="auto" size="sm" variant="outline">
              Go to Withdrawals
            </Button>
          </Link>
        </GridItem>
      </Grid>

      <Flex
        h="130px"
        px="24px"
        justifyContent="space-between"
        bg="white"
        alignItems="center"
      >
        <Box>
          <Text fontSize="14px" color="text.grey">
            Total Deposits
          </Text>
          <Text fontSize="28px" fontWeight="600" color="text.black">
            {formatter.format(totalDeposits)}
          </Text>
        </Box>
        <Box>
          <Text fontSize="14px" color="text.grey">
            Total Withdrawal
          </Text>
          <Text fontSize="28px" fontWeight="600" color="text.black">
            {formatter.format(totalWithdrawals)}
          </Text>
        </Box>

        <Box>
          <Text fontSize="14px" color="text.grey">
            Pending Deposits
          </Text>
          <Text fontSize="28px" fontWeight="600" color="text.black">
            {formatter.format(pendingDepositsAmt)}
          </Text>
        </Box>
        <Box>
          <Text fontSize="14px" color="text.grey">
            Total No. of Users
          </Text>
          <Text fontSize="28px" fontWeight="600" color="text.black">
            {numberOfUsers}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Stats;
