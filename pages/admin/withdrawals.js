import { Box } from "@chakra-ui/react";
import { PendingWithdrawals, WithdrwalHistory } from "components/admin";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";

const Withdrawals = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.withdrawals,
    });
  }, []);

  return (
    <Box px="24px" py="40px">
      <PendingWithdrawals />
      <WithdrwalHistory />
    </Box>
  );
};

export default Withdrawals;

Withdrawals.isAdmin = true;
