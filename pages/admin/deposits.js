import { Box } from "@chakra-ui/react";
import { DepositHistory, PendingDeposits } from "components/admin";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";

const Deposits = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.deposits,
    });
  }, []);
  return (
    <Box px="24px">
      <PendingDeposits />
      <DepositHistory />
    </Box>
  );
};

export default Deposits;

Deposits.isAdmin = true;
