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
import { useAdminGetUser } from "api/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import ViewVerification from "./ViewVerification";
import { differenceInYears, format, parse } from "date-fns";
import { useAdminGetUserVerifications } from "api/verification";

const calculateAge = (dob) => {
  dob = format(new Date(dob), "dd/MM/yyyy");
  const date = parse(dob, "dd/MM/yyyy", new Date());
  const age = differenceInYears(new Date(), date);
  return age;
};

const UserDetails = ({ userID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});
  const [verificationDetails, setVerificationDetails] = useState({});

  // ======== User details logic ======
  const { data: userData } = useAdminGetUser(userID);

  useEffect(() => {
    if (!!userData) {
      setUser(userData);
    }
  }, [userData]);

  // ========= User's Verifications Logic ==========
  const { data: verificationData } = useAdminGetUserVerifications(userID);

  useEffect(() => {
    if (!!verificationData) {
      if (
        verificationData
          .toString()
          .includes("Request failed with status code 404")
      ) {
        setVerificationDetails({});
      } else setVerificationDetails(verificationData);
    }
  }, [verificationData]);

  return (
    <Box py="40px" color="text.black">
      {user !== undefined && (
        <Grid templateColumns="repeat(3, 1fr)" gap="6">
          <GridItem>
            <Flex gap="40px">
              <Circle size="80px" bg="gray.300"></Circle>
              <Box>
                <Text fontSize="24px" fontWeight={600} mb="16px">
                  {user?.display_name ||
                    `${user?.firstname || ""} ${user?.lastname || ""}`}
                </Text>
                <Text color="text.grey" mb="16px">
                  {user?.email}
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
                {user?.address ? user?.address?.country : "No Address"}
              </Text>
              <Text color="text.grey" mb="16px">
                {user?.dob !== undefined
                  ? `${format(
                      new Date(user?.dob),
                      "dd/MM/yyyy"
                    )},  ${calculateAge(user?.dob)} yrs old`
                  : "No Date of Birth"}
              </Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex alignItems="end" flexDir="column" gap="16px">
              <Flex color="app.primary" alignItems="center" gap="8px">
                <Text fontWeight={600} color="text.black">
                  Full Verification
                </Text>
                {user?.is_verifieed ? <BsFillCheckCircleFill /> : <FcCancel />}
              </Flex>
              <Button onClick={onOpen} variant="outline" size="sm" w="auto">
                View Verification
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      )}

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
        isEmailVerified={user?.is_email_verified}
        verificationDetails={verificationDetails}
      />
    </Box>
  );
};

export default UserDetails;
