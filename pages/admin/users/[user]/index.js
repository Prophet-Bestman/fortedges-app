import { Box } from "@chakra-ui/react";
import { UserDetailsPage } from "components/admin";
import React from "react";

const User = () => {
  return (
    <Box>
      <UserDetailsPage />
    </Box>
  );
};

export default User;

User.isAdmin = true;
