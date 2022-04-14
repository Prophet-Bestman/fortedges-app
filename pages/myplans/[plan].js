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
import { useRouter } from "next/router";
import { useGetSingleCustomPlan } from "api/plans";

function PlanDetails() {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [planID, setPlanID] = React.useState("");
  const [planDetails, setPlanDetails] = React.useState({});

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.creatPlans,
    });
  }, []);

  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (!!query) {
      setPlanID(query.plan);
    }
  }, [query]);

  console.log("ID", planID);

  const { data: planData, error: planError } = useGetSingleCustomPlan(planID);

  useEffect(() => {
    if (!!planData) {
      if (!planData.isArray) setPlanDetails(planData);
    }
  }, [planData]);

  console.log("Plan Details: ", planDetails);

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
          {!!planData && <PlanDetailsBanner plan={planData} />}
          {!!planData && <PlanBalance plan={planData} />}
          <Box display={["none", , "block"]}>
            <PlanGraph />
          </Box>
        </GridItem>
        <GridItem pl={[, , , "18px"]} colSpan={5}>
          {!!planData && <TransactionCol plan={planDetails} />}
        </GridItem>
      </Grid>
    </Padding>
  );
}

export default PlanDetails;

PlanDetails.requireAuth = true;

// export const getServerSideProps = ({ params }) => {
//   const { id } = params;
//   return {
//     props: {
//       id,
//     },
//   };
// };
