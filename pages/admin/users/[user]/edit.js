import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Edit = () => {
  return (
    <Box px="24px" py="40px" color="text.black">
      <Flex gap="40px">
        <Circle size="80px" bg="gray.400"></Circle>

        <Box w="full">
          <form>
            <Grid templateColumns="repeat(2, 1fr)" gap="40px">
              <GridItem colSpan={1}>
                <Stack mb="24px">
                  <Text fontWeight={600}>First Name</Text>
                  <Input bg="white" type="text" w-full />
                </Stack>
                <Stack mb="24px">
                  <Text fontWeight={600}>Middle Name</Text>
                  <Input bg="white" type="text" w-full />
                </Stack>
                <Stack mb="24px">
                  <Text fontWeight={600}>Phone Number</Text>
                  <Input bg="white" type="number" w-full />
                </Stack>
                <Stack mb="24px">
                  <Text fontWeight={600}>Date of Birth</Text>
                  <Input bg="white" type="date" w-full />
                </Stack>
              </GridItem>
              <GridItem colSpan={1}>
                <Stack mb="24px">
                  <Text fontWeight={600}>Last Name</Text>
                  <Input bg="white" type="text" w-full />
                </Stack>
                <Stack mb="24px">
                  <Text fontWeight={600}>Email Address</Text>
                  <Input bg="white" type="text" w-full />
                </Stack>
                <Stack mb="24px">
                  <Text fontWeight={600}>Nationality</Text>
                  <Select></Select>
                </Stack>
              </GridItem>
              <GridItem></GridItem>
            </Grid>
          </form>
        </Box>

        <Flex w="400px" justifyContent="end">
          <Button size="sm">Save</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Edit;

Edit.isAdmin = true;
