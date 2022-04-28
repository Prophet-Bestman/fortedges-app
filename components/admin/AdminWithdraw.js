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
  ModalBody,
  ModalContent,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { options } from "data";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  MdOutlineKeyboardBackspace,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { WithdrawalSuccess } from "components/plansModals";
import { useAdminWithdraw } from "api/transactions";

const optionsArr = Object.entries(options);

const AdminWithdraw = ({ setStep, planID, onClose }) => {
  const [option, setOption] = React.useState(options.btc);
  const [withdrawalData, setWithdrawalData] = React.useState({});

  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();

  const closeParent = () => {
    onClose();
    onSuccessClose();
  };

  const withdrawSchema = yup.object().shape({
    amount: yup.number().required(),
    walletAddress: yup.string().required(),
  });

  const toast = useToast();

  const insufficientErrorToast = () => {
    toast({
      title: "Withdrawal Failed",
      description: "User Has insufficient balance",
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const errorToast = () => {
    toast({
      title: "Try Again Later",
      description: "Error occurred while making withdrawal",
      status: "error",
      duration: 4000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(withdrawSchema),
  });

  const {
    data: withdrawResp,
    mutate: adminWithraw,
    isLoading,
  } = useAdminWithdraw();

  let payload = {};

  const submit = (data) => {
    setWithdrawalData({});
    payload = {
      address: data.walletAddress,
      plan_id: planID,
      amount: data.amount,
      mode_of_payment: option.name,
    };

    adminWithraw(payload);
  };

  useEffect(() => {
    if (withdrawResp !== undefined) {
      if (
        withdrawResp.toString().includes("Request failed with status code 500")
      ) {
        insufficientErrorToast();
      }
      if (withdrawResp?.status > 400) {
        errorToast();
      }
      if (
        withdrawResp?.status === 201 &&
        withdrawResp.data !== withdrawalData
      ) {
        setWithdrawalData(withdrawResp.data);
        onSuccessOpen();
      }
    }
  }, [withdrawResp]);

  return (
    <ModalContent py="24px" px="24px" maxW="380px">
      <Flex mb="40px" justifyContent="space-between" alignItems="center">
        <Circle
          onClick={() => setStep(1)}
          cursor="pointer"
          bg="#F1F2F400"
          size="40px"
        >
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
                variant={errors.amount ? "error" : "outline"}
                {...register("amount")}
              />
            </InputGroup>
          </Stack>

          <Stack mb="32px">
            <Text fontSize={"12px"} color="text.grey">
              Select Mode of payment
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
                mb="32px"
                variant={errors.walletAddress ? "error" : "outline"}
                {...register("walletAddress")}
              />
            </InputGroup>
          </Stack>

          <Button
            w="full"
            type="submit"
            disabled={option.name === "Bank Deposit"}
            isLoading={isLoading}
          >
            Withdraw
          </Button>
        </form>
      </ModalBody>

      <WithdrawalSuccess
        isOpen={isSuccessOpen}
        onClose={closeParent}
        data={withdrawalData}
      />
    </ModalContent>
  );
};

export default AdminWithdraw;
