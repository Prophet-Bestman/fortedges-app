import { Box, Button, Tab, TabList } from "@chakra-ui/react";
import MobilePageTitle from "components/MobilePageTitle";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const PlansHeader = () => {
  return (
    <Box mt={["178px", , , "128px"]}>
      <TabList justifyContent={["space-evenly", , "start"]} borderWidth={0}>
        <Tab
          _focus={{
            outline: "none",
            color: "app.primary",
            borderBottomColor: "app.primary",
            borderBottomWidth: "2px",
          }}
          pb="0px"
          h="auto"
        >
          Plans
        </Tab>
        <Tab
          _focus={{
            outline: "none",
            color: "app.primary",
            borderBottomColor: "app.primary",
            borderBottomWidth: "2px",
          }}
          pb="0px"
          h="auto"
        >
          Portfolio
        </Tab>

        <Button
          ml="auto"
          display={["none", , "flex"]}
          variant="secondary"
          leftIcon={<AiOutlinePlus />}
          color="app.primary"
        >
          Create Plan
        </Button>
      </TabList>
    </Box>
  );
};

export default PlansHeader;
