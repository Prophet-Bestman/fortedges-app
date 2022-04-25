import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useAdminGetDashboard } from "api/admin";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { formatter } from "utils";

const Stats = () => {
  const [dashboardData, setDashboardData] = useState({});

  const { data } = useAdminGetDashboard();

  useEffect(() => {
    if (data !== undefined) {
      setDashboardData(data);
    }
  }, [data]);

  return (
    <Box>
      {!!dashboardData && (
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
              <Text color="text.black">
                {dashboardData?.pending_deposit_count || ""}
              </Text>
              Pending Deposits
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
              <Text color="text.black">
                {dashboardData?.pending_withdrawal_count || ""}
              </Text>
              Pending Withdrawals
            </Text>

            <Link href="/admin/withdrawals">
              <Button px="8px" w="auto" size="sm" variant="outline">
                Go to Withdrawals
              </Button>
            </Link>
          </GridItem>
        </Grid>
      )}

      {!!dashboardData && (
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
              {formatter.format(dashboardData?.total_deposit_amount || "")}
            </Text>
          </Box>
          <Box>
            <Text fontSize="14px" color="text.grey">
              Total Withdrawal
            </Text>
            <Text fontSize="28px" fontWeight="600" color="text.black">
              {formatter.format(dashboardData?.total_withdrawal_amount || "")}
            </Text>
          </Box>

          <Box>
            <Text fontSize="14px" color="text.grey">
              Pending Deposits
            </Text>
            <Text fontSize="28px" fontWeight="600" color="text.black">
              {formatter.format(dashboardData?.pending_deposit_amount || "")}
            </Text>
          </Box>
          <Box>
            <Text fontSize="14px" color="text.grey">
              Total No. of Users
            </Text>
            <Text fontSize="28px" fontWeight="600" color="text.black">
              {dashboardData?.total_user_count || ""}
            </Text>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Stats;
