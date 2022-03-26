import { Box, Button, Tab, TabList } from "@chakra-ui/react";
import MobilePageTitle from "components/MobilePageTitle";
import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const PlansHeader = () => {
  return (
    <TabList
      mt={["178px", , , "128px"]}
      justifyContent={["space-evenly", , "start"]}
      borderWidth={0}
    >
      <Tab
        _selected={{
          outline: "none",
          color: "app.primary",
          borderBottomColor: "app.primary",
          borderBottomWidth: "2px",
        }}
        _focus={{
          outline: "none",
          // color: "app.primary",
          // borderBottomColor: "app.primary",
          // borderBottomWidth: "2px",
        }}
        _active={{
          borderBottomColor: "app.primary",
          borderBottomWidth: "2px",
        }}
        pb="0px"
        li
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
        _active={{
          borderBottomColor: "app.primary",
          borderBottomWidth: "2px",
        }}
        pb="0px"
        h="auto"
      >
        Portfolio
      </Tab>

      <Link href="/myplans/create">
        <Button
          ml="auto"
          display={["none", , "flex"]}
          variant="secondary"
          leftIcon={<AiOutlinePlus />}
          color="app.primary"
          w="265px"
        >
          Create New Plan
        </Button>
      </Link>
    </TabList>
  );
};

export default PlansHeader;
