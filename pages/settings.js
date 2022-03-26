import {
  Box,
  TabPanel,
  TabPanels,
  Tabs,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
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
        <Tabs
          display={["none", , , "block"]}
          variant="unstyled"
          defaultIndex={0}
        >
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

        <Accordion display={["block", , , "none"]}>
          <AccordionItem border="none" mb="24px">
            <h2>
              <AccordionButton
                _focus={{
                  outline: "none",
                  color: "app.primary",
                }}
                _hover={{
                  bg: "white",
                  color: "app.primary",
                }}
              >
                <Box flex="1" textAlign="left">
                  Profile
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <ProfileTab />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="none" mb="24px">
            <h2>
              <AccordionButton
                _focus={{
                  outline: "none",
                  color: "app.primary",
                }}
                _hover={{
                  bg: "white",
                  color: "app.primary",
                }}
              >
                <Box flex="1" textAlign="left">
                  Security
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SecurityTab />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="none" mb="24px">
            <h2>
              <AccordionButton
                _focus={{
                  outline: "none",
                  color: "app.primary",
                }}
                _hover={{
                  bg: "white",
                  color: "app.primary",
                }}
              >
                <Box flex="1" textAlign="left">
                  ID Verification
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <IDVerificationTab />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="none" mb="24px">
            <h2>
              <AccordionButton
                _focus={{
                  outline: "none",
                  color: "app.primary",
                }}
                _hover={{
                  bg: "white",
                  color: "app.primary",
                }}
              >
                <Box flex="1" textAlign="left">
                  Account statements
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <AccountStatementsTab />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Padding>
    </Box>
  );
};

export default Settings;

Settings.requireAuth = true;
