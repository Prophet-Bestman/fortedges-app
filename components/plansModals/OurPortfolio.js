import {
  Circle,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Box,
  Img,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import assets from "data/assets";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import HistoricalPerformance from "./HistoricalPerformance";

const OurPortfolio = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />

      <ModalContent pos="relative" maxW={[, "480px"]} p="24px" w="full">
        <Circle
          bg="gray.100"
          size="40px"
          pos="absolute"
          right="24px"
          top="24px"
          onClick={onClose}
          cursor={"pointer"}
        >
          <AiOutlineClose size="18px" />
        </Circle>

        <Text fontSize={["20", , , "24px"]} fontWeight={600} textAlign="center">
          Our Portfolio
        </Text>

        <Box my="41px">
          <Text fontSize="14px" color="text.grey" textAlign="center">
            Investing in a portfolio of 70 high-growth Stocks. Own stocks in
            popular companies like Google, Alibaba, Facebook and many more
          </Text>

          <Box my="24px">
            <HistoricalPerformance />
          </Box>

          <Box my="32px">
            <Text
              mt="8px"
              fontSize="18px"
              fontWeight="600"
            >{`Assets (26)`}</Text>
            <Text color="text.grey" fontSize="13px">
              {`The FEI (Fortedges Equity Index) is managed by FortEdges
              Technologies`}
            </Text>
          </Box>

          <Grid
            templateColumns="repeat(4, 1fr)"
            justifyContent="space-between"
            rowGap="20px"
            my="30px"
          >
            {assets.map((asset) => (
              <GridItem
                mx="auto"
                w="64px"
                d="flex"
                flexDir="column"
                alignItems="center"
                key={asset.img}
              >
                <Circle
                  borderWidth="1px"
                  borderColor="#e7e7e9"
                  size="64px"
                  mb="8px"
                >
                  <Img src={asset?.img} />
                </Circle>
                <Text fontSize="12px" textAlign="center">
                  {asset.name}
                </Text>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default OurPortfolio;
