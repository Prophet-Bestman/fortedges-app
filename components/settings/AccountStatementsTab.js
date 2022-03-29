import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  MenuItemOption,
  MenuOptionGroup,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsCalendar4Event } from "react-icons/bs";
import { MdKeyboardArrowRight, MdError } from "react-icons/md";
import { accountStatementSchema } from "utils";
import AccountSuccess from "./AccountSuccess";

const AccountStatementsTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountStatementSchema),
  });

  const submitPlan = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <Box maxW={"575px"}>
        <form onSubmit={handleSubmit(submitPlan)}>
          <Stack mb="32px">
            <Text fontSize="14px" color="text.grey" mb="8px">
              Select Plans
            </Text>
            <Select
              placeholder="Select Plans"
              control={control}
              {...register("selectPlan")}
              h={["48px", , "56px"]}
              _focus={{
                outline: "none",
                borderColor: errors.selectPlan ? "red" : "app.primary",
              }}
              borderColor={errors.selectPlan ? "red" : null}
            >
              <option value="Premium Stock">Premium Stock</option>
            </Select>
            {errors.selectPlan && (
              <Text
                display="flex"
                color="red"
                fontSize={"12px"}
                alignItems="center"
                gap="4px"
              >
                <MdError size="16px" /> {errors.selectPlan.message}
              </Text>
            )}
          </Stack>

          <Stack mb="32px">
            <Text fontSize="14px" color="text.grey" mb="8px">
              From this date
            </Text>
            <InputGroup pos="relative" h={["48px", , "56px"]}>
              <InputLeftAddon
                pos="absolute"
                bg="transparent"
                border="none"
                h="full"
                color="app.primary"
              >
                <BsCalendar4Event />
              </InputLeftAddon>
              <Input
                control={control}
                {...register("from")}
                placeholder="Select Date"
                px="40px"
                type="date"
                variant={errors.to ? "error" : "outline"}
              />
              <InputRightAddon
                pos="absolute"
                bg="transparent"
                right="0"
                border="none"
                h="full"
                color="app.primary"
              >
                <MdKeyboardArrowRight />
              </InputRightAddon>
            </InputGroup>
            {errors.from && (
              <Text
                display="flex"
                color="red"
                fontSize={"12px"}
                alignItems="center"
                gap="4px"
              >
                <MdError size="16px" /> {errors.from.message}
              </Text>
            )}
          </Stack>
          <Stack mb="32px">
            <Text fontSize="14px" color="text.grey" mb="8px">
              To this date
            </Text>
            <InputGroup pos="relative" h={["48px", , "56px"]}>
              <InputLeftAddon
                pos="absolute"
                bg="transparent"
                border="none"
                h="full"
                color="app.primary"
              >
                <BsCalendar4Event />
              </InputLeftAddon>
              <Input
                control={control}
                {...register("to")}
                px="40px"
                type="date"
                placeholder="Select Date"
                variant={errors.to ? "error" : "outline"}
              />
              <InputRightAddon
                pos="absolute"
                bg="transparent"
                right="0"
                border="none"
                h="full"
                color="app.primary"
              >
                <MdKeyboardArrowRight />
              </InputRightAddon>
            </InputGroup>
            {errors.to && (
              <Text
                display="flex"
                color="red"
                fontSize={"12px"}
                alignItems="center"
                gap="4px"
              >
                <MdError size="16px" /> {errors.to.message}
              </Text>
            )}
          </Stack>

          <Text color="text.grey" mb="32px">
            Your statement will be forwarded to your email address
            l********@*****.com in few minutes
          </Text>
          <Button onClick={onOpen} type="submit" w="full" maxW="327px">
            Request Statement
          </Button>
        </form>
      </Box>
      <AccountSuccess isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default AccountStatementsTab;
