import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { users } from "data";
import Link from "next/link";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ViewVerification from "./ViewVerification";

const UserDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box py="40px" color="text.black">
      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem>
          <Flex gap="40px">
            <Circle size="80px" bg="gray.300"></Circle>
            <Box>
              <Text fontSize="24px" fontWeight={600} mb="16px">
                Abbie lane
              </Text>
              <Text color="text.grey" mb="16px">
                Abbielane@gmail.com
              </Text>
              <Text color="text.grey" mb="16px">
                +123456789012
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex flexDir="column">
            <Link href="/admin/users/user/edit">
              <Button ml="auto" size="sm" mb="16px">
                Edit
              </Button>
            </Link>
            <Text color="text.grey" mb="16px">
              Portugal
            </Text>
            <Text color="text.grey" mb="16px">
              4/02/1990 (30 Years old)
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex alignItems="end" flexDir="column" gap="16px">
            <Flex color="app.primary" alignItems="center" gap="8px">
              <Text fontWeight={600} color="text.black">
                Full Verification
              </Text>
              <BsFillCheckCircleFill />
            </Flex>
            <Button onClick={onOpen} variant="outline" size="sm" w="auto">
              View Verification
            </Button>
          </Flex>
        </GridItem>
      </Grid>

      <Flex justifyContent="space-around" gap="40px" px="30px" my="30px">
        <Box h="110px" w="full" bg="white">
          <Text fontSize="14px" color="text.grey" mt="16px" textAlign="center">
            Total Balance
          </Text>
          <Text textAlign="center" fontSize={"28px"}>
            $2000.93
          </Text>
        </Box>
        <Box h="110px" w="full" bg="white">
          <Text fontSize="14px" color="text.grey" mt="16px" textAlign="center">
            Total Investment
          </Text>
          <Text textAlign="center" fontSize={"28px"}>
            $1800.00
          </Text>
        </Box>
        <Box h="110px" w="full" bg="white">
          <Text fontSize="14px" color="text.grey" mt="16px" textAlign="center">
            Total Profit
          </Text>
          <Text textAlign="center" fontSize={"28px"}>
            $200.93
          </Text>
        </Box>
      </Flex>
      <ViewVerification
        isOpen={isOpen}
        onClose={onClose}
        verificationDetails={users[0].verificationDetails}
      />
    </Box>
  );
};

export default UserDetails;
