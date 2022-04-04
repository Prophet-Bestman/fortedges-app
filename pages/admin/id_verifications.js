import { Box } from "@chakra-ui/react";
import { PendingVerifications } from "components/admin";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";

const IDVerifications = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.idVerification,
    });
  }, []);
  return (
    <Box px="24px">
      <PendingVerifications />
    </Box>
  );
};

export default IDVerifications;
IDVerifications.isAdmin = true;
