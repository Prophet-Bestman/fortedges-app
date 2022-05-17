import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import PlanProvider from "providers/PlanProvider";
import PlanComponents from "components/plans/PlanComponents";

function PlanDetails() {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [planID, setPlanID] = React.useState("");

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.planDetials,
    });
  }, []);

  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (!!query) {
      setPlanID(query.plan);
    }
  }, [query]);

  return (
    <PlanProvider>
      <PlanComponents planID={planID} />
    </PlanProvider>
  );
}

export default PlanDetails;

PlanDetails.requireAuth = true;
