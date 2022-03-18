import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AuthCard from "./AuthCard";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { MdOutlineErrorOutline } from "react-icons/md";
import { signupSchema } from "../../utils";
import Link from "next/link";
import { useRouter } from "next/router";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
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
        Create your account
      </Text>
      <AuthCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text mb="24px" color="text.grey" textAlign="center">
            Required fields have an asterisk: *
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap="16px" mb="24px">
            <GridItem>
              <Text fontWeight="600" fontSize="14px" mb="4px">
                First name *
              </Text>
              <Input
                {...register("firstName")}
                type="text"
                placeholder="First name"
                variant={errors.firstName ? "error" : "outline"}
              />
              {errors.firstName && (
                <Text
                  py="8px"
                  textTransform="capitalize"
                  fontSize="12px"
                  color="red"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                >
                  <MdOutlineErrorOutline color="red" />{" "}
                  {errors.firstName.message}{" "}
                </Text>
              )}
            </GridItem>
            <GridItem>
              <Text fontWeight="600" fontSize="14px" mb="4px">
                Last name *
              </Text>
              <Input
                {...register("lastName")}
                type="text"
                placeholder="Last name"
                variant={errors.lastName ? "error" : "outline"}
              />
              {errors.lastName && (
                <Text
                  py="8px"
                  textTransform="capitalize"
                  fontSize="12px"
                  color="red"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                >
                  <MdOutlineErrorOutline color="red" />{" "}
                  {errors.lastName.message}{" "}
                </Text>
              )}
            </GridItem>
          </Grid>
          <Box mb="24px">
            <Text
              {...register("email")}
              fontWeight="600"
              fontSize="14px"
              mb="4px"
            >
              Email *
            </Text>
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
          <Box mb="24px">
            <Text fontWeight="600" fontSize="14px" mb="4px">
              Password *
            </Text>
            <Input
              {...register("password")}
              type="password"
              placeholder="Choose Password"
              variant={errors.password ? "error" : "outline"}
            />
            {errors.password && (
              <Text
                py="8px"
                textTransform="capitalize"
                fontSize="12px"
                color="red"
                display="flex"
                alignItems="center"
                gap="4px"
              >
                <MdOutlineErrorOutline color="red" /> {errors.password.message}{" "}
              </Text>
            )}
          </Box>
          <Box display="flex" mb="32px">
            <Checkbox mr="12px" size="lg"></Checkbox>
            <Text>
              I certify that I am 18years of age or older, and agree to the{" "}
              <Box display="inline" color="app.primary">
                <Link href="#">User Agreement</Link>{" "}
              </Box>
              and{" "}
              <Box display="inline" color="app.primary">
                <Link href="#">Privacy Policy</Link>
              </Box>
            </Text>
          </Box>

          <Button type="submit" w="full">
            Create Account
          </Button>
        </form>
      </AuthCard>

      <Text textAlign="center" color="white" display="flex" gap="4px">
        Already have a Fortedges account?{" "}
        <Link href="/auth/signin">
          <Text cursor="pointer" fontWeight="600">
            Log in
          </Text>
        </Link>
      </Text>
    </Box>
  );
};

export default SignupForm;
