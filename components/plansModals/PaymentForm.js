import {
  Box,
  Button,
  Circle,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ModalBody,
  ModalContent,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import {
  MdOutlineKeyboardBackspace,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { options } from "data";
import { PlanContext } from "providers/PlanProvider";
import { useBankRequest, useDeposit } from "api/transactions";
import { formatter } from "utils";

const optionsArr = Object.entries(options);
const PaymentForm = ({
  onClose,
  setStep,
  openError,
  option,
  setOption,
  setData,
}) => {
  const { plan } = useContext(PlanContext);
  const [minAmount, setMinAmount] = useState(0);
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    if (plan.parent_plan_name === "Premium Stock") {
      setMinAmount(100000);
    }
    if (plan.parent_plan_name === "Real Estate") {
      setMinAmount(50000);
    }
    if (plan.parent_plan_name === "Fixed Income") {
      setMinAmount(2000);
    }
  }, [plan]);

  const toast = useToast();
  const errorToast = () => {
    toast({
      title: "Request Error",
      description: setRequestError,
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };
  const successToast = () => {
    toast({
      title: "Request successful",
      description: "Request has been sent successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const planSchema = yup.object({
    amount: yup
      .number()
      .required()
      .min(plan?.investment > 0 ? 0 : minAmount),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(planSchema),
  });

  // ========== SEND BANK REQUEST LOGIC =========

  const {
    mutate: sendBankRequest,
    data: requestData,
    error: requestErr,
    isLoading: requesting,
  } = useBankRequest();

  const sendRequest = (data) => {
    const payload = {
      plan_id: plan?.id,
      amount: data.amount,
    };
    sendBankRequest(payload);
  };

  useEffect(() => {
    if (!!requestData && requestData === "Request sent") {
      successToast();
      onClose();
    } else {
      setRequestError("Bank request could not be sent");
    }
  }, [requestData]);

  useEffect(() => {
    if (requestError !== "") {
      errorToast;
    }
    setRequestError("");
  }, [requestError]);

  const {
    data: depositData,
    isLoading,
    mutate: createDeposit,
    error,
  } = useDeposit();

  const submit = (data) => {
    data = { ...data, option: option.name };

    const payload = {
      amount: data.amount,
      plan_id: plan._id,
      mode_of_payment: option.name.toLowerCase(),
    };

    createDeposit(payload);
  };

  useEffect(() => {
    if (depositData !== undefined) {
      if (depositData.toString().includes("Error")) {
        openError();
      } else {
        setStep(2);
        setData(depositData);
      }
    }
  }, [depositData]);

  useEffect(() => {
    if (!!error) {
      openError();
    }
  }, [error]);

  return (
    <ModalContent py="24px" px="24px" maxW="380px">
      <Flex mb="40px" justifyContent="space-between" alignItems="center">
        <Circle onClick={onClose} cursor="pointer" bg="#F1F2F400" size="40px">
          <MdOutlineKeyboardBackspace />
        </Circle>
        <Text fontSize="20px" color="text.black" fontWeight={600}>
          Fund Plan
        </Text>

        <Tooltip
          label="Please confirm wallet address before making transfers. Ubassets would not be responsible for any loss of funds due to incorrect wallet address"
          fontSize="md"
          bg="white"
          color="red.400"
          p={6}
          rounded="md"
        >
          <Circle cursor="pointer" bg="#F1F2F4" size="30px">
            <Text fontSize="16px" fontWeight="600">
              i
            </Text>
          </Circle>
        </Tooltip>
      </Flex>

      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <Stack mb="32px">
            <Text fontSize={"12px"} color="text.grey">
              Amount
            </Text>

            <InputGroup>
              <InputLeftAddon
                fontWeight={600}
                fontSize="18px"
                position="absolute"
                top="0"
                left="0"
                h="48px"
                bg="white"
              >
                $
              </InputLeftAddon>
              <Input
                pl="40px"
                type="number"
                h="48px"
                placeholder="10,000"
                variant={errors.amount ? "error" : "outline"}
                {...register("amount")}
              />
            </InputGroup>

            {plan?.investment > 0 ? null : (
              <Text color="app.primary" fontSize="12px" fontWeight={600}>
                Min- {formatter.format(minAmount)}
              </Text>
            )}

            {!!errors && errors?.amount && (
              <Text color="red.500" fontSize="12px" fontWeight={500}>
                A minimum of {formatter.format(minAmount)} is required on first
                funding of a {plan.parent_plan_name} plan
              </Text>
            )}
          </Stack>

          <Stack mb="32px">
            <Text fontSize={"12px"} color="text.grey">
              Mode of payment
            </Text>
            <Menu w="full">
              <MenuButton
                variant="outline"
                w="full"
                borderColor="#0000001A"
                borderWidth="1px"
                rounded="md"
                as={Button}
                rightIcon={<MdKeyboardArrowDown />}
              >
                <Flex alignItems="center" gap="8px">
                  <Image src={option.icon} />
                  <Text textTransform="uppercase">{option.name}</Text>
                </Flex>
              </MenuButton>
              <MenuList w="full">
                {optionsArr.map((option) => (
                  <MenuItem
                    my="8px"
                    py="12px"
                    w="full"
                    key={option[1].name}
                    onClick={() => setOption(option[1])}
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      w="270px"
                    >
                      <Flex alignItems="center" gap="8px">
                        <Image src={option[1].icon} />
                        <Text textTransform="uppercase">{option[1].name}</Text>
                      </Flex>

                      <Text>{option[1].time}</Text>
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Stack>

          <Box>
            {option.name === "Bank Deposit" ? (
              <Box>
                <Text fontSize="14px" color="text.grey">
                  Currently, only P2P bank deposits are available in your
                  region, click the button below to request Bank details
                </Text>

                <Button
                  mt="30px"
                  w="full"
                  onClick={handleSubmit(sendRequest)}
                  isLoading={requesting}
                >
                  Request Details
                </Button>
              </Box>
            ) : (
              <Button w="full" type="submit" isLoading={isLoading}>
                Continue
              </Button>
            )}
          </Box>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default PaymentForm;
