import { Box, Grid, GridItem } from "@chakra-ui/react";
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
import PlanProvider, { planActions, PlanContext } from "providers/PlanProvider";
import PlanComponents from "components/plans/PlanComponents";

function PlanDetails() {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [planID, setPlanID] = React.useState("");
  // const [planDetails, setPlanDetails] = React.useState({});
  // const { plan, dispatch: setPlan } = useContext(PlanContext);

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

  return (
    <PlanProvider>
      <PlanComponents planID={planID} />
    </PlanProvider>
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
