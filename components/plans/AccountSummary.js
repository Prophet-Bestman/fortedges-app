import { Box, Flex, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { PlanContext } from "providers/PlanProvider";
import React, { useContext } from "react";
import { formatter } from "utils";

const AccountSummary = () => {
  const { plan, dispatch } = useContext(PlanContext);
  const [balance, setBalance] = React.useState();
  const [profit, setProfit] = React.useState();
  const [deposit, setDeposit] = React.useState();

  React.useEffect(() => {
    if (plan !== undefined) {
      setBalance(plan.balance);
      setProfit(plan.profit);
      setDeposit(plan.investment);
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
          {!!balance && balance == NaN ? balance : "$0.00"}
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
          {!!profit && profit !== NaN ? profit : "$0.00"}
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Deposit Value</Text>
        <Text color="text.black">
          {!!deposit && deposit !== NaN ? deposit : "$0.00"}
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Total Withdrawals</Text>
        <Text color="text.black">$2,000.00</Text>
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
          {!!plan.createdAt &&
            tance(new Date(plan.createdAt), new Date(), {
              addSuffix: true,
            })}
        </Text>
      </Flex>
    </Box>
  );
};

export default AccountSummary;
