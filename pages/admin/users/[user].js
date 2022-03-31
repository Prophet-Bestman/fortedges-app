import { Box, Button, Flex } from "@chakra-ui/react";
import { TransactionHistoryTable } from "components";
import { UserDetails, UserPlans } from "components/admin";
import { YourPlans } from "components/overview";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";

const UserDetailsPage = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.userDetails,
    });
  }, []);
  return (
    <Box px="24px">
      <UserDetails />
      <UserPlans />
      <Flex justify="space-evenly" mb="30px">
        <Button size="sm" variant="outline" w="auto">
          Add Deposit
        </Button>
        <Button size="sm" variant="outline" w="auto">
          Withdraw
        </Button>
        <Button size="sm" variant="outline" w="auto">
          Add Balance
        </Button>
        <Button size="sm" variant="outline" w="auto">
          Clear Balance
        </Button>
        <Button size="sm" variant="outline" w="auto">
          Add bonus
        </Button>
        <Button size="sm" variant="outline" w="auto">
          Create new plan
        </Button>
        <Button size="sm" variant="outline" w="auto">
          Delete Plan
        </Button>
        <Button
          size="sm"
          variant="outline"
          w="auto"
          color="red"
          borderColor="red"
        >
          Delete Account
        </Button>
      </Flex>

      <TransactionHistoryTable />
    </Box>
  );
};

export default UserDetailsPage;

UserDetailsPage.isAdmin = true;
