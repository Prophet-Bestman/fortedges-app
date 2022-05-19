import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import MainNav from "./MainNav";
import { useGetUser, useGetVerifiedUser } from "api/user";
import { getUserFromLocalStorage } from "api/config";

const MainLayout = ({ children }) => {
  const { data } = useGetVerifiedUser();

  return (
    <Box>
      <Grid
        minH="100vh"
        templateColumns={["repeat(1, 1fr)", , , "repeat(11, 1fr)"]}
      >
        <GridItem
          bg="#F8FAFC"
          colSpan={2}
          display={["none", , , "block"]}
          position="relative"
        >
          <Box top="0" position="sticky" w="full">
            <MainNav />
          </Box>
        </GridItem>
        <GridItem position="relative" bg="" colSpan={9}>
          <MainHeader />

          {children}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MainLayout;
