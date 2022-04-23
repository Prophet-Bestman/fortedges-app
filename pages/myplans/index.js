import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useGetCustomPlans } from "api/plans";
import { Padding } from "components/layouts";
import { Explore, PlansHeader, PlansTab, PortfolioTab } from "components/plans";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useState, useContext, useEffect } from "react";

export default function MyPlans() {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({ type: navActions.SET_ACTIVE, payload: navStates.myPlans });
  }, []);

  const [customPlans, setCustomPlans] = useState();

  const { data: plansData, error } = useGetCustomPlans();

  useEffect(() => {
    if (plansData !== undefined) {
      setCustomPlans(plansData.custom_plans);
    }
  }, [plansData]);

  return (
    <Padding>
      <Tabs variant="line" defaultIndex={0}>
        <PlansHeader />
        <TabPanels>
          <TabPanel w={["85vw", , , "70vw"]}>
            <PlansTab plans={customPlans} />
            <Explore />
          </TabPanel>
          <TabPanel>
            <PortfolioTab plans={customPlans} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Padding>
  );
}

MyPlans.requireAuth = true;
