import { Box, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import {
  AccountStatementsTab,
  IDVerificationTab,
  ProfileTab,
  SecurityTab,
  SettingsHeader,
} from "components/settings";
import React from "react";

const Settings = () => {
  return (
    <Box mt={["160", , , "130px"]}>
      <Padding>
        <Tabs variant="unstyled" defaultIndex={0}>
          <SettingsHeader />
          <TabPanels>
            <TabPanel>
              <ProfileTab />
            </TabPanel>
            <TabPanel>
              <SecurityTab />
            </TabPanel>
            <TabPanel>
              <IDVerificationTab />
            </TabPanel>
            <TabPanel>
              <AccountStatementsTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Padding>
    </Box>
  );
};

export default Settings;

Settings.requireAuth = true;
