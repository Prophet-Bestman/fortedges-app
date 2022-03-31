import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Circle,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { formatter } from "utils";

const MarketTrends = () => {
  return (
    <Box>
      <Text my="24px" fontSize="24px" fontWeight={600} mt="40px">
        Market Trend
      </Text>
      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr fontSize="14px" color="text.grey">
              <Td>Name</Td>
              <Td>Last Price</Td>
              <Td>24h change</Td>
              <Td>Market</Td>
            </Tr>
          </Thead>
          <Tbody fontSize="20px" gap="80px">
            <Tr my="20px" h="100px">
              <Td d="flex" alignItems="center" gap="16px" h="100px">
                <Circle bg={"text.grey"} size="32px"></Circle>
                <Text fontWeight={600}>BNB</Text>
              </Td>

              <Td fontWeight={600}>{formatter.format(394.98)}</Td>
              <Td color="app.primary">{"-1.58%"}</Td>
              {/* CHART */}
              <Td></Td>
            </Tr>
            <Tr my="20px" h="100px">
              <Td d="flex" alignItems="center" gap="16px" h="100px">
                <Circle bg={"text.grey"} size="32px"></Circle>
                <Text fontWeight={600}>BNB</Text>
              </Td>

              <Td fontWeight={600}>{formatter.format(394.98)}</Td>
              <Td color="app.primary">{"-1.58%"}</Td>
              {/* CHART */}
              <Td></Td>
            </Tr>
            <Tr my="20px" h="100px">
              <Td d="flex" alignItems="center" gap="16px" h="100px">
                <Circle bg={"text.grey"} size="32px"></Circle>
                <Text fontWeight={600}>BNB</Text>
              </Td>

              <Td fontWeight={600}>{formatter.format(394.98)}</Td>
              <Td color="app.primary">{"-1.58%"}</Td>
              {/* CHART */}
              <Td></Td>
            </Tr>
            <Tr my="20px" h="100px">
              <Td d="flex" alignItems="center" gap="16px" h="100px">
                <Circle bg={"text.grey"} size="32px"></Circle>
                <Text fontWeight={600}>BNB</Text>
              </Td>

              <Td fontWeight={600}>{formatter.format(394.98)}</Td>
              <Td color="app.primary">{"-1.58%"}</Td>
              {/* CHART */}
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MarketTrends;
