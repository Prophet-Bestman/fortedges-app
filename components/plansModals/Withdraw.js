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

const optionsArr = Object.entries(options);

const Withdraw = ({ onClose, isOpen, option, setOption }) => {
  const [daysLeft, setDaysLeft] = React.useState(0);
  const { plan } = useContext(PlanContext);
  const [withdrawData, setWithdrawData] = useState({});

  const withdrawSchema = yup.object().shape({
    amount: yup.number().required(),
    walletAddress: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
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

  const { mutate: withdraw, data, isLoading, error } = useWithdraw();

  let payload;

  const submit = (data) => {
    payload = {
      code: "",
      data: {
        amount: data.amount,
        address: data.walletAddress,
        mode_of_payment: option.name,
        plan_id: plan._id,
      },
    };

    console.log(payload);
    withdraw(payload);
  };

  useEffect(() => {
    if (data !== undefined) {
      if (data.toString().includes("Error")) {
        onErrorOpen;
      } else {
        setWithdrawData(data);
        onVerifyOpen();
      }
    }
  }, [data]);

  useEffect(() => {
    if (error !== undefined) {
      onErrorOpen;
    }
  }, [error]);

  console.log(withdrawData);

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent py="24px" px="24px" maxW="380px">
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
          {daysLeft > 0 && (
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
              {daysLeft} days left to Withdraw funds. See{" "}
              <Link href="#" size="xs" variant="link">
                more info
              </Link>
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
                  isDisabled={daysLeft > 0}
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
                  isDisabled={daysLeft > 0}
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
                          <Text textTransform="uppercase">
                            {option[1].name}
                          </Text>
                        </Flex>

                        <Text>{option[1].time}</Text>
                      </Flex>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
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
                  isDisabled={daysLeft > 0}
                  mb="32px"
                  // defaultValue={formState.amount}
                  variant={errors.walletAddress ? "error" : "outline"}
                  {...register("walletAddress")}
                />
              </InputGroup>
            </Stack>

            <Button
              isDisabled={daysLeft > 0}
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
        onClose={onVerifyClose}
        payload={payload}
      />
      <ErrorModal
        isOpen={isErrorOpen}
        closeParent={onErrorClose}
        msg={"An Error Occurred! Try Again Later."}
      />
      {/* <WithdrawalSuccess isOpen={isSuccessOpen} onClose={onSuccessClose} /> */}
    </Modal>
  );
};

export default Withdraw;
