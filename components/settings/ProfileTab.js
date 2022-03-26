import {
  Box,
  Button,
  Circle,
  Flex,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ProfileTab = () => {
  return (
    <Box>
      <Flex mb="32px" alignItems="center">
        <Circle size="64px" bgColor="#aaa" mr="24px"></Circle>
        <Box color="text.black" mr="32px">
          <Text fontWeight={600}>Change Picture</Text>
          <Text fontSize="14px">Max file size is 20mb</Text>
        </Box>
        <Button variant="secondary" size="xs">
          Upload
        </Button>
      </Flex>

      <Text fontSize={["20px", , "24px"]} color="tex.black" fontWeight={600}>
        My Profile
      </Text>

      {/* Profile  */}

      <Box my="48px">
        <form>
          <Stack mb="32px">
            <FormLabel m="0" color="text.grey" fontSize="14px">
              Display name
            </FormLabel>
            <Input
              h={["48px", , "56px"]}
              placeholder="Enter Name"
              type="text"
              w="full"
              maxW={"527px"}
            />
          </Stack>
          <Stack mb="32px">
            <FormLabel m="0" color="text.grey" fontSize="14px">
              Email Address
            </FormLabel>
            <Input
              h={["48px", , "56px"]}
              placeholder="email@address.com"
              type="email"
              w="full"
              maxW={"527px"}
            />
          </Stack>

          <Button size="sm">Save</Button>
        </form>
      </Box>

      {/* Personal Information  */}

      <Box my="48px">
        <form>
          <Box>
            <Stack mb="32px">
              <FormLabel m="0" color="text.grey" fontSize="14px">
                Email Address
              </FormLabel>
              <Flex gap="12px" w="full" maxW={"527px"}>
                <Input h={["48px", , "56px"]} placeholder="Month" type="text" />
                <Input h={["48px", , "56px"]} placeholder="Day" type="text" />
                <Input h={["48px", , "56px"]} placeholder="Year" type="text" />
              </Flex>
            </Stack>
            <Stack mb="32px" w="full" maxW={"527px"}>
              <FormLabel m="0" color="text.grey" fontSize="14px">
                Street Name
              </FormLabel>
              <Input
                h={["48px", , "56px"]}
                placeholder="No. 1 First street"
                type="text"
              />
            </Stack>

            <Flex gap="12px" w="full" maxW={"527px"}>
              <Stack mb="32px" w="full">
                <FormLabel m="0" color="text.grey" fontSize="14px">
                  City/Town
                </FormLabel>
                <Input
                  h={["48px", , "56px"]}
                  placeholder="California"
                  type="text"
                  w="full"
                />
              </Stack>
              <Stack mb="32px" w="full">
                <FormLabel m="0" color="text.grey" fontSize="14px">
                  State
                </FormLabel>
                <Input
                  h={["48px", , "56px"]}
                  placeholder="Los Angeles"
                  type="text"
                  w="full"
                />
              </Stack>
            </Flex>
          </Box>

          <Button size="sm">Save</Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProfileTab;
