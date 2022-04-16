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
  useDisclosure,
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
import { useDeposit } from "api/transactions";
import ErrorModal from "components/ErrorModal";

const optionsArr = Object.entries(options);
const PaymentForm = ({
  onClose,
  setStep,
  option,
  setOption,
  setData,
  data: paymentData,
}) => {
  const { plan } = useContext(PlanContext);
  const [requestSent, setRequestSent] = useState(false);
  const planSchema = yup.object({
    amount: yup.number().required(),
  });
  const [transactionData, setTransactionData] = useState();

  const { isOpen: isErrorOpen, onOpen: onErrorOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(planSchema),
  });

  const sendRequest = () => {
    if (requestSent) return;
    setRequestSent(true);
  };

  const { data: depositData, isLoading, mutate: createDeposit } = useDeposit();

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
        onErrorOpen();
      } else {
        setData(depositData);
        setStep(2);
      }
    }
  }, [depositData]);

  return (
    <ModalContent py="24px" px="24px" maxW="380px">
      <Flex mb="40px" justifyContent="space-between" alignItems="center">
        <Circle onClick={onClose} cursor="pointer" bg="#F1F2F400" size="40px">
          <MdOutlineKeyboardBackspace />
        </Circle>
        <Text fontSize="20px" color="text.black" fontWeight={600}>
          Fund Plan
        </Text>
        <Circle cursor="pointer" bg="#F1F2F4" size="30px">
          <Text fontSize="16px" fontWeight="600">
            i
          </Text>
        </Circle>
      </Flex>

      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <Stack>
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
                mb="32px"
                // defaultValue={formState.amount}
                variant={errors.amount ? "error" : "outline"}
                {...register("amount")}
              />
            </InputGroup>
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
                  onClick={sendRequest}
                  bg={requestSent ? "#71879C" : "app.primary"}
                  isDisabled={requestSent}
                >
                  {requestSent ? "Request Sent" : "Request Details"}
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
      <ErrorModal
        isOpen={isErrorOpen}
        msg={"Error ccurred creating deposit request"}
      />
    </ModalContent>
  );
};

export default PaymentForm;
