import { Box, Flex, Text } from "@chakra-ui/react";
import { format, formatDistance } from "date-fns";
import { PlanContext } from "providers/PlanProvider";
import React, { useContext } from "react";
import { formatter } from "utils";

const AccountSummary = () => {
  const { plan } = useContext(PlanContext);
  const [lastProfit, setLastProfit] = React.useState();
  const [profit, setProfit] = React.useState();
  const [deposit, setDeposit] = React.useState();
  const [total_withdrawal, setTotal_withdrawal] = React.useState();

  React.useEffect(() => {
    if (plan !== undefined) {
      setLastProfit(plan?.last_roi?.amount);
      setProfit(plan?.profit);
      setDeposit(plan?.total_investment);
      setTotal_withdrawal(plan?.total_withdrawal);
    }
  }, [plan]);
  return (
    <Box fontWeight="14px">
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Total Earnings</Text>
        <Text color="text.black">
          {!!profit && profit !== NaN ? formatter?.format(profit) : "$0.00"}
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Last Earnings</Text>
        <Text color="text.black">
          {!!lastProfit && lastProfit !== NaN
            ? formatter?.format(lastProfit)
            : "$0.00"}
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Total Deposit </Text>
        <Text color="text.black">
          {!!deposit && deposit !== NaN ? formatter.format(deposit) : "$0.00"}
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Total Withdrawals</Text>
        <Text color="text.black">
          {!!total_withdrawal && total_withdrawal !== NaN
            ? formatter.format(total_withdrawal)
            : "$0.00"}
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Plan created on</Text>
        <Text color="text.black">
          {/* {plan.createdAt} */}
          {plan.createdAt !== undefined &&
            format(new Date(plan.createdAt), "dd MMM, yyyy")}
        </Text>
      </Flex>
    </Box>
  );
};

export default AccountSummary;
