import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import { Explore, PlansHeader, PlansTab, PortfolioTab } from "components/plans";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";

export default function MyPlans() {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({ type: navActions.SET_ACTIVE, payload: navStates.myPlans });
  }, []);
  return (
    <Padding>
      <Tabs variant="unstyled" defaultIndex={0}>
        <PlansHeader />
        <TabPanels>
          <TabPanel>
            <PlansTab />
            <Explore />
          </TabPanel>
          <TabPanel>
            <PortfolioTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Padding>
  );
}

MyPlans.requireAuth = true;
