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

const MarketTrends = () => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const { data } = useGetCryptoCurrencies();

  useEffect(() => {
    if (!!data && data?.length > 0) {
      setCryptoCurrencies(data);
    }
  }, [data]);

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
              <Td>Market </Td>
            </Tr>
          </Thead>
          {!!cryptoCurrencies && cryptoCurrencies.length > 0 && (
            <Tbody fontSize="20px" gap="80px">
              {cryptoCurrencies?.map((currency) => (
                <Tr my="20px" h="100px" key={currency?.symbol}>
                  <Td d="flex" alignItems="center" gap="16px" h="100px">
                    <Avatar src={currency.image} size="md"></Avatar>

                    <Text textTransform="uppercase" fontWeight={600}>
                      {currency.symbol}
                    </Text>
                  </Td>

                  <Td fontWeight={600}>
                    {formatter.format(currency.current_price)}
                  </Td>
                  <Td color="app.primary">
                    {currency.price_change_percentage_24h}%
                  </Td>
                  {/* CHART */}
                  <Td></Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MarketTrends;
