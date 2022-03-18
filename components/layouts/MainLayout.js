import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import MainNav from "./MainNav";

const MainLayout = () => {
  return (
    <Box>
      <Grid minH="100vh" templateColumns={["repeat(12, 1fr)"]}>
        <GridItem bg="#F8FAFC" colSpan={2}>
          <MainNav />
        </GridItem>
        <GridItem bg="" colSpan={10}></GridItem>
      </Grid>
    </Box>
  );
};

export default MainLayout;
