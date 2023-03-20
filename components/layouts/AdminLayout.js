import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import AdminNav from "./AdminNav";
import AdminTopBar from "./AdminTopBar";

const AdminLayout = ({ children }) => {
  return (
    <Box>
      <Grid
        minH="100vh"
        templateColumns={["repeat(1, 1fr)", , , "repeat(11, 1fr)"]}
      >
        <GridItem
          bg="#fff"
          colSpan={2}
          display={["none", , , "block"]}
          position="relative"
        >
          <Box top="0" position="sticky" w="full">
            <AdminNav />
          </Box>
        </GridItem>
        <GridItem w={"full"} position="relative" colSpan={9} bg="#FAFAFA">
          <AdminTopBar />

          {children}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
