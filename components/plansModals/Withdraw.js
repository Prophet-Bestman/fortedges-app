import {
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
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { options } from "data";
import Link from "next/link";
import React, { useEffect, useContext, useState } from "react";
import {
  MdOutlineKeyboardBackspace,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EnterVerificationCodeModal from "./EnterVerificationCodeModal";
import { PlanContext } from "providers/PlanProvider";
import { useWithdraw } from "api/transactions";
import ErrorModal from "components/ErrorModal";
import { useGetMops } from "api/mop";

const optionsArr = Object.entries(options);

const Withdraw = ({ onClose, isOpen, option, setOption }) => {
  const [days, setDays] = React.useState(0);
  const { plan } = useContext(PlanContext);
  const [withdrawData, setWithdrawData] = useState({});
  const [withdrawForm, setWithdrawForm] = useState({});

  const { data: mopsResp, isLoading: loadingMops } = useGetMops();

  const withdrawSchema = yup.object().shape({
    amount: yup.number().required(),
    walletAddress: yup.string().required(),
  });

  let today;
  let created_at;

  useEffect(() => {
    if (!!plan?.createdAt) {
      today = new Date(Date.now());
      created_at = new Date(plan.createdAt);
      const diff = Math.floor(today.getTime() - created_at.getTime());
      const day = 1000 * 60 * 60 * 24;
      const days = Math.floor(diff / day);
      setDays(days);
    }
  }, [plan]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(withdrawSchema),
  });

  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();

  const {
    isOpen: isVerifyOpen,
    onOpen: onVerifyOpen,
    onClose: onVerifyClose,
  } = useDisclosure();

  const closeParent = () => {
    onVerifyClose();
    onErrorClose();
    onClose();
  };

  const { mutate: withdraw, data, isLoading, error } = useWithdraw();

  let payload = { code: "" };

  const submit = (data) => {
    payload = {
      ...payload,

      data: {
        amount: data.amount,
        address: data.walletAddress,
        mode_of_payment: option.type,
        plan_id: plan._id,
      },
    };
    withdraw(payload);
    setWithdrawForm(payload);
  };

  useEffect(() => {
    if (data !== undefined) {
      if (data.toString().includes("Error")) {
        onErrorOpen;
      } else {
        setWithdrawData(data);
        onVerifyOpen();
      }
      reset();
    }
  }, [data]);

  useEffect(() => {
    if (!!error) {
      onErrorOpen();
    }
    reset();
  }, [error]);

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent py="24px" px="24px" maxW="400px">
        <Flex mb="40px" justifyContent="space-between" alignItems="center">
          <Circle onClick={onClose} cursor="pointer" bg="#F1F2F400" size="40px">
            <MdOutlineKeyboardBackspace />
          </Circle>
          <Text fontSize="20px" color="text.black" fontWeight={600}>
            Withdraw
          </Text>
          <Circle cursor="pointer" bg="#F1F2F4" size="30px">
            <Text fontSize="16px" fontWeight="600">
              i
            </Text>
          </Circle>
        </Flex>

        <ModalBody px="0">
          {days < 60 && (
            <Text
              fontSize="13px"
              py="12px"
              px="10px"
              borderWidth={"1px"}
              borderColor="#E6CF7D"
              rounded={"md"}
              bg="#E6CF7D33"
              mb="40px"
            >
              <Circle
                borderWidth={"1px"}
                borderColor="#E6CF7D"
                size={"20px"}
                fontSize="12px"
                color="#E6CF7D"
                display="inline-flex"
                mr="12px"
              >
                i
              </Circle>
              {60 - days} {"day(s) left to Withdraw funds."}{" "}
              <a
                href={process.env.NEXT_PUBLIC_LANDING_URL + "/support"}
                rel="noreferrer"
                target="_blank"
              >
                See more info
              </a>
            </Text>
          )}

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
                  isDisabled={days < 60}
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
              {loadingMops ? (
                <Progress isIndeterminate colorScheme="gray" size="sm" />
              ) : (
                <Menu w="full">
                  <MenuButton
                    variant="outline"
                    isDisabled={days < 60}
                    w="full"
                    borderColor="#0000001A"
                    borderWidth="1px"
                    rounded="md"
                    as={Button}
                    rightIcon={<MdKeyboardArrowDown />}
                  >
                    <Flex alignItems="center" gap="8px">
                      <Image src={option.icon} />
                      <Text textTransform="uppercase">{option.type}</Text>
                    </Flex>
                  </MenuButton>
                  <MenuList w="full">
                    {!!mopsResp?.length > 0 &&
                      mopsResp?.map((option) => (
                        <MenuItem
                          my="8px"
                          py="12px"
                          w="full"
                          key={option?._id}
                          onClick={() => setOption(option)}
                        >
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            w="270px"
                          >
                            <Flex alignItems="center" gap="8px">
                              <Image src={option?.icon} />
                              <Text textTransform="uppercase">
                                {option?.type}
                              </Text>
                            </Flex>

                            {/* <Text>{option[1].time}</Text> */}
                          </Flex>
                        </MenuItem>
                      ))}
                  </MenuList>
                </Menu>
              )}
            </Stack>
            <Stack>
              <Text fontSize={"12px"} color="text.grey">
                {option.name} Address
              </Text>

              <InputGroup>
                <Input
                  pl="40px"
                  type="text"
                  h="48px"
                  placeholder=""
                  isDisabled={days < 60}
                  mb="32px"
                  // defaultValue={formState.amount}
                  variant={errors.walletAddress ? "error" : "outline"}
                  {...register("walletAddress")}
                />
              </InputGroup>
            </Stack>

            <Button
              isDisabled={days < 60}
              w="full"
              type="submit"
              isLoading={isLoading}
            >
              Continue
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
      <EnterVerificationCodeModal
        isOpen={isVerifyOpen}
        onClose={closeParent}
        payload={withdrawForm}
      />
      <ErrorModal
        isOpen={isErrorOpen}
        closeParent={closeParent}
        msg={"An Error Occurred! Try Again Later."}
      />
      {/* <WithdrawalSuccess isOpen={isSuccessOpen} onClose={onSuccessClose} /> */}
    </Modal>
  );
};

export default Withdraw;
