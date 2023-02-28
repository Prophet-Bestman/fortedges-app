import {
  Box,
  Table,
  Thead,
  Tbody,
  Avatar,
  Tr,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { formatter } from "utils";
import { useGetCryptoCurrencies } from "api/cryptoPrices";
import millify from "millify";

const OverviewMarketTrends = () => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const { data } = useGetCryptoCurrencies();

  useEffect(() => {
    if (!!data && data?.length > 0) {
      setCryptoCurrencies(data);
    }
  }, [data]);

  return (
    <Box px={["12px", , "24px"]}>
      <Text my="24px" fontSize="24px" fontWeight={600} mt="40px">
        Top Cryptocurrency Prices
      </Text>
      <TableContainer w="full">
        <Table variant="unstyled" size="sm" overflowX="scroll">
          <Thead>
            <Tr fontSize="14px" color="text.grey">
              <Td>Name</Td>
              <Td>Last Price</Td>
              <Td>24h change</Td>
              <Td>%change</Td>
              <Td>Market Cap</Td>
            </Tr>
          </Thead>
          {!!cryptoCurrencies && cryptoCurrencies?.length > 0 && (
            // <></>
            <Tbody fontSize="20px" gap="80px">
              {cryptoCurrencies?.map((currency) => (
                <Tr my="20px" h="100px" key={currency.symbol}>
                  <Td d="flex" alignItems="center" gap="16px" h="100px">
                    <Avatar src={currency.image} size="md"></Avatar>

                    <Text textTransform="uppercase" fontWeight={600}>
                      {currency.symbol}
                    </Text>
                  </Td>

                  <Td fontWeight={600}>
                    {formatter.format(currency.current_price)}
                  </Td>
                  <Td
                    fontWeight={600}
                    color={currency.price_change_24h < 0 ? "red" : "green.400"}
                  >
                    {formatter.format(currency.price_change_24h)}
                  </Td>
                  <Td
                    color={currency.price_change_24h < 0 ? "red" : "green.400"}
                  >
                    {currency.price_change_percentage_24h}%
                  </Td>
                  {/* CHART */}
                  <Td color="app.primary" fontWeight={500}>
                    {millify(currency.market_cap)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OverviewMarketTrends;
