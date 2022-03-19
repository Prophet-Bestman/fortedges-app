import { Box, Grid, GridItem } from "@chakra-ui/react";
import MobilePageTitle from "components/MobilePageTitle";
import React from "react";
import MainHeader from "./MainHeader";
import MainNav from "./MainNav";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <Grid
        minH="100vh"
        templateColumns={["repeat(1, 1fr)", , , "repeat(12, 1fr)"]}
      >
        <GridItem
          bg="#F8FAFC"
          colSpan={2}
          display={["none", , , "block"]}
          position="relative"
        >
          <Box position="fixed" w="full">
            <MainNav />
          </Box>
        </GridItem>
        <GridItem position="relative" bg="" colSpan={10}>
          <MainHeader />

          {children}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MainLayout;
