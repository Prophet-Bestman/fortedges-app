import { Box, Grid, Text } from "@chakra-ui/react";
import { historicalPerformance } from "data";
import React from "react";

const HistoricalPerformance = () => {
  return (
    <Box>
      <Text textAlign={"center"} fontSize="13px">
        Historical Performance
      </Text>

      <Grid
        my="16px"
        maxH="160px"
        overflowY="scroll"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        sx={{
          "::-webkit-": {
            width: "6px",
            h: "6px",
          },
          "::-webkit-scrollbar-track": {
            background: "#11111111",
          },

          "::-webkit-scrollbar-thumb": {
            background: "#7950DA",
            borderRadius: "25px",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "thin",
          scrollbarColor: "#7950DA",
          scrollbarBorderRadius: "25px",
        }}
      >
        {historicalPerformance.map((record) => (
          <Box p="12px" bg="#F2F3F5" key={record.year}>
            <Text fontSize="13px" color={"text.grey"} mb="8px">
              {record.year}
            </Text>
            <Text fontWeight={600} color="text.green">
              {record.profit}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default HistoricalPerformance;
