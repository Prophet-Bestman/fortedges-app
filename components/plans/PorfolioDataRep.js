import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import ProgressBar from "./ProgressBar";

const data = [
  { name: "Premium Stocks", value: 312.43 },
  { name: "Real estate", value: 142.04 },
  { name: "Fixed income", value: 200.12 },
];

const progress = {
  premiumStocks:
    (data[0].value / (data[0].value + data[1].value + data[2].value)) * 100,
  realEstate:
    (data[1].value / (data[0].value + data[1].value + data[2].value)) * 100,
  fixedIncome:
    (data[2].value / (data[0].value + data[1].value + data[2].value)) * 100,
};

const COLORS = ["#F0B263", "#449562", "#7950DA"];

const PorfolioDataRep = () => {
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
              name={data[0].value}
              color="text.brown"
              colorScheme="yellow"
              amount={data[0].value}
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
              amount={data[2].value}
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
              <AiOutlineStar color="#F0B263" />
            </Flex>

            {/* Progress Bar and Label */}
            <ProgressBar
              name={data[2].name}
              color="app.primary"
              colorScheme="purple"
              amount={data[2].value}
              progress={progress.fixedIncome}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default PorfolioDataRep;
