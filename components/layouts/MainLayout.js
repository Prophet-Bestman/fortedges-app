import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import MainHeader from "./MainHeader";
import MainNav from "./MainNav";
import { AuthContext } from "providers/AuthProvider";
import { useRouter } from "next/router";
import PlanProvider from "providers/PlanProvider";

const MainLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user?.has_plan) router?.push("/create_plan");
  }, [user, router.asPath]);

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
            <PlanProvider>
              <MainNav />
            </PlanProvider>
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
