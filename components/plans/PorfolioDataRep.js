import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import ProgressBar from "./ProgressBar";

const COLORS = ["#F0B263", "#449562", "#7950DA"];

const PorfolioDataRep = ({ portfolio }) => {
  const { asset_mix, net_worth } = portfolio;
  const [premiumStocks, setPremiumStocks] = useState(0);
  const [realEstate, setRealEstate] = useState(0);
  const [fixedIncome, setFixedIncome] = useState(0);

  useEffect(() => {
    if (!!asset_mix && asset_mix?.length > 0) {
      const premiumStocks = asset_mix?.filter(
        (asset) => asset?.asset === "Premium Stock"
      );

      setPremiumStocks(premiumStocks);

      const realEstate = asset_mix?.filter(
        (asset) => asset?.asset === "Real Estate"
      );
      setRealEstate(realEstate);

      const fixedIncome = asset_mix?.filter(
        (asset) => asset?.asset === "Fixed Income"
      );
      setFixedIncome(fixedIncome);
    }
  }, [portfolio]);

  const data = [
    { name: "Premium Stocks", value: 0 || premiumStocks[0]?.total_amount },
    { name: "Real estate", value: 0 || realEstate[0]?.total_amount },
    { name: "Fixed income", value: 0 || fixedIncome[0]?.total_amount },
  ];

  const progress = {
    premiumStocks: (data[0].value / net_worth) * 100 || 0,
    realEstate: (data[1].value / net_worth) * 100 || 0,
    fixedIncome: (data[2].value / net_worth) * 100 || 0,
  };

  return (
    <Box>
      <Text fontSize="20px" fontWeight={600}>
        Your asset mix
      </Text>

      <Box display={[, , , "flex"]} w="full" alignItems="center">
        {/* PIE CHART SECTION */}
        <Box
          display="flex"
          justifyContent="center"
          textAlign="start"
          w="full"
          my="30px"
        >
          <PieChart width={240} height={240}>
            <Pie
              data={data}
              // cx={120}
              // cy={200}
              innerRadius={60}
              outerRadius={80}
              // fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Box>
        {/* PROGRESS BARS SECTION */}
        <Box w="full" maxW="800px">
          <Flex w="full" alignItems="center" mb="50px">
            {/* Icon Circle */}
            <Flex
              w="32px"
              h="32px"
              bg="#F0B2631A"
              justify="center"
              alignItems="center"
              mr="16px"
              rounded="full"
            >
              <AiOutlineStar color="#F0B263" />
            </Flex>

            {/* Progress Bar and Label */}
            <ProgressBar
              name={data[0].name}
              color="text.brown"
              colorScheme="yellow"
              amount={data[0].value.toFixed(2)}
              progress={progress.premiumStocks}
            />
          </Flex>
          <Flex w="full" alignItems="center" mb="50px">
            {/* Icon Circle */}
            <Flex
              w="32px"
              h="32px"
              bg="#F0B2631A"
              justify="center"
              alignItems="center"
              mr="16px"
              rounded="full"
            >
              <AiOutlineStar color="#449562" />
            </Flex>

            {/* Progress Bar and Label */}
            <ProgressBar
              name={data[1].name}
              color="text.green"
              colorScheme="green"
              amount={data[2].value.toFixed(2)}
              progress={progress.realEstate}
            />
          </Flex>
          <Flex w="full" alignItems="center" mb="50px">
            {/* Icon Circle */}
            <Flex
              w="32px"
              h="32px"
              bg="#F0B2631A"
              justify="center"
              alignItems="center"
              mr="16px"
              rounded="full"
            >
              <AiOutlineStar color="#7950DA" />
            </Flex>

            {/* Progress Bar and Label */}
            <ProgressBar
              name={data[2].name}
              color="app.primary"
              colorScheme="purple"
              amount={data[2].value.toFixed(2)}
              progress={progress.fixedIncome}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default PorfolioDataRep;
