import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import {
  PlanBalance,
  PlanDetailsBanner,
  PlanGraph,
  TransactionCol,
} from "components/plans";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";

function PlanDetails({ data }) {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.creatPlans,
    });
  }, []);
  return (
    <Padding>
      <Grid
        mt={["180", , , "130px"]}
        templateColumns={["repeat(1, 1fr)", , , "repeat(12, 1fr)"]}
      >
        <GridItem
          colSpan={7}
          pr={[, , , "50px"]}
          borderRightColor="#F1F2F4"
          borderRightWidth={[0, , , "1px"]}
        >
          <PlanDetailsBanner name={"School Fees"} category={"Premium Stock"} />
          <PlanBalance />
          <Box display={["none", , "block"]}>
            <PlanGraph />
          </Box>
        </GridItem>
        <GridItem pl={[, , , "18px"]} colSpan={5}>
          <TransactionCol />
        </GridItem>
      </Grid>
    </Padding>
  );
}

export default PlanDetails;

PlanDetails.requireAuth = true;

export const getServerSideProps = ({ params }) => {
  const { plan } = params;
  return {
    props: {
      data: plan,
      //   plan,
    },
  };
};
