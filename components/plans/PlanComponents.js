import React, { useContext, useEffect } from "react";
import { Padding } from "components/layouts";
import {
  PlanBalance,
  PlanDetailsBanner,
  PlanGraph,
  TransactionCol,
} from "components/plans";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useGetSingleCustomPlan } from "api/plans";
import PlanProvider, { planActions, PlanContext } from "providers/PlanProvider";

const PlanComponents = ({ planID }) => {
  const { plan, dispatch: setPlan } = useContext(PlanContext);
  const [error, setError] = React.useState("");

  const {
    data: planData,
    error: planError,
    refetch,
  } = useGetSingleCustomPlan(planID);

  useEffect(() => {
    if (!!planData) {
      if (!planData.isArray)
        setPlan({ type: planActions.SET_PLAN, payload: planData });
    }
  }, [planData]);

  useEffect(() => {
    if (planError !== undefined) {
      setError(planError);
    }
  }, [planError]);

  console.log("Plan Details: ", plan);
  console.log("Error: ", error);

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
          {!!plan && <PlanDetailsBanner />}
          {!!plan && <PlanBalance />}
          <Box display={["none", , "block"]}>
            <PlanGraph />
          </Box>
        </GridItem>
        <GridItem pl={[, , , "18px"]} colSpan={5}>
          {!!plan && <TransactionCol />}
        </GridItem>
      </Grid>
    </Padding>
  );
};

export default PlanComponents;
