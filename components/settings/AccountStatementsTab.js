import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  // MenuItemOption,
  // MenuOptionGroup,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsCalendar4Event } from "react-icons/bs";
import { MdKeyboardArrowRight, MdError } from "react-icons/md";
import { accountStatementSchema } from "utils";
import AccountSuccess from "./AccountSuccess";
import { useGetCustomPlans, useRequestStatement } from "api/plans";

const AccountStatementsTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plans, setPlans] = useState([]);
  const [requestError, setRequestError] = useState("");
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountStatementSchema),
  });

  const toast = useToast();

  const errorToast = () => {
    toast({
      title: "Request Error",
      description: requestError,
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const {
    mutate: sendRequest,
    data: requestResp,
    isLoading,
  } = useRequestStatement();

  const submitPlan = (data) => {
    setRequestError("");
    sendRequest(data);
  };

  useEffect(() => {
    if (!!requestResp) {
      if (requestResp?.status === 200) {
        onOpen();
        reset();
      } else {
        setRequestError("Request could not be sent");
      }
    }
  }, [requestResp]);

  useEffect(() => {
    if (!!requestError && requestError !== "") {
      errorToast();
    }
  }, [requestError]);

  const { data } = useGetCustomPlans();
  useEffect(() => {
    if (!!data && data?.custom_plans?.length > 0) {
      setPlans(data?.custom_plans);
    }
  }, [data]);

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
              {...register("plan")}
              h={["48px", , "56px"]}
              _focus={{
                outline: "none",
                borderColor: errors.plan ? "red" : "app.primary",
              }}
              borderColor={errors.plan ? "red" : null}
            >
              {plans?.length > 0 &&
                plans?.map((plan) => (
                  <option value={plan?.id}>{plan?.name}</option>
                ))}
            </Select>
            {errors.plan && (
              <Text
                display="flex"
                color="red"
                fontSize={"12px"}
                alignItems="center"
                gap="4px"
              >
                <MdError size="16px" /> {errors.plan.message}
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
          <Button type="submit" w="full" maxW="327px" isLoading={isLoading}>
            Request Statement
          </Button>
        </form>
      </Box>
      <AccountSuccess isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default AccountStatementsTab;
