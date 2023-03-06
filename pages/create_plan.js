import { Box } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import { Explore } from "components/plans";
import { useRouter } from "next/router";
import { AuthContext } from "providers/AuthProvider";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";

export default function CreatePlan() {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.choosePlan,
    });
  }, []);

  useEffect(() => {
    if (user?.has_plan) {
      router.back();
    }
  }, [user]);

  return (
    <Padding>
      <Box pt="32">
        <Explore />
      </Box>
    </Padding>
  );
}

CreatePlan.requireAuth = true;
