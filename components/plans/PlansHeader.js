import { Button, Tab, TabList } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const PlansHeader = () => {
  return (
    <TabList
      justifyContent={["space-evenly", , "start"]}
      mt="128px"
      borderWidth={0}
    >
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
  );
};

export default PlansHeader;
