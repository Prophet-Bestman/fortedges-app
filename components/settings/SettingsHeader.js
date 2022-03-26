import { Tab, TabList } from "@chakra-ui/react";
import App from "next/app";
import React from "react";

const SettingsHeader = () => {
  return (
    <TabList>
      <Tab
        _selected={{
          outline: "none",
          borderBottomWidth: "2px",
          borderColor: "app.primary",
          color: "app.primary",
        }}
        color="text.grey"
        mx="12px"
        _focus={{
          outline: "none",
        }}
      >
        Profile
      </Tab>
      <Tab
        _selected={{
          outline: "none",
          borderBottomWidth: "2px",
          borderColor: "app.primary",
          color: "app.primary",
        }}
        color="text.grey"
        mx="12px"
        _focus={{
          outline: "none",
        }}
      >
        Security
      </Tab>
      <Tab
        _selected={{
          outline: "none",
          borderBottomWidth: "2px",
          borderColor: "app.primary",
          color: "app.primary",
        }}
        color="text.grey"
        mx="12px"
        _focus={{
          outline: "none",
        }}
      >
        ID Verification
      </Tab>
      <Tab
        _selected={{
          outline: "none",
          borderBottomWidth: "2px",
          borderColor: "app.primary",
          color: "app.primary",
        }}
        color="text.grey"
        mx="12px"
        _focus={{
          outline: "none",
        }}
      >
        Account statements
      </Tab>
    </TabList>
  );
};

export default SettingsHeader;
