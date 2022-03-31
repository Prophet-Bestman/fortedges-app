import { Box } from "@chakra-ui/react";
import { MarketTrends, Stats } from "components/admin";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";

const AdminDashoard = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.dashboard,
    });
  }, []);
  return (
    <Box px="24px">
      <Stats />
      <MarketTrends />
    </Box>
  );
};

export default AdminDashoard;

AdminDashoard.isAdmin = true;
