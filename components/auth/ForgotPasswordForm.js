import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import AuthCard from "./AuthCard";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { MdOutlineErrorOutline } from "react-icons/md";
import { forgotPassswordSchema } from "utils";
import { useRouter } from "next/router";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPassswordSchema),
  });

  const router = useRouter();

  const onSubmit = (data) => {
    router.push(`/auth/verify/?email=${data.email}`);
    console.log(data);
  };

  return (
    <Box
      w="full"
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      my="80px"
    >
      <Text fontSize={[24, , 28, 32]} color="white" fontWeight="600">
        Forgot Password
      </Text>
      <AuthCard>
        <Text mb="24px" color="text.grey" textAlign="center">
          Enter email address associated with your fortedges
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb="24px">
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              variant={errors.email ? "error" : "outline"}
            />
            {errors.email && (
              <Text
                py="8px"
                textTransform="capitalize"
                fontSize="12px"
                color="red"
                display="flex"
                alignItems="center"
                gap="4px"
              >
                <MdOutlineErrorOutline color="red" /> {errors.email.message}{" "}
              </Text>
            )}
          </Box>

          <Button type="submit" w="full">
            Reset Password
          </Button>
        </form>
      </AuthCard>
    </Box>
  );
};

export default ForgotPasswordForm;
