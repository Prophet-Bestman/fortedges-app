import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import { PlanBalance, PlanDetailsBanner, PlanGraph } from "components/plans";
import React from "react";

function PlanDetails({ data }) {
  return (
    <Padding>
      <Grid
        minH="100vh"
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
          <PlanGraph />
        </GridItem>
        <GridItem colSpan={5}></GridItem>
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
