import { Box } from "@chakra-ui/react";
import { UserDetailsPage } from "components/admin";
import React, { useContext, useEffect, useState } from "react";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import { useRouter } from "next/router";

const User = () => {
  const [userID, setUserID] = useState("");
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.userDetails,
    });
  }, []);

  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    setUserID("");
  }, []);

  useEffect(() => {
    if (!!query) {
      setUserID(query.user);
    }
  }, [query]);

  return <Box>{!!userID && <UserDetailsPage userID={userID} />}</Box>;
};

export default User;

User.isAdmin = true;
